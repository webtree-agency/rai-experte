# syntax=docker/dockerfile:1.7
#
# BURGMEIJER RAI-Experte — Next.js (standalone) + Payload CMS 3, ein Image.
# Multi-Stage: deps → builder → runner. Gebaut für Dokploy (Traefik davor).

# ─── Stage 1: deps ────────────────────────────────────────────────────────
FROM node:22-alpine AS deps
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

COPY package.json pnpm-lock.yaml ./
RUN --mount=type=cache,id=pnpm-store,target=/pnpm-store \
    pnpm config set store-dir /pnpm-store && \
    pnpm install --frozen-lockfile --prod=false


# ─── Stage 2: builder ─────────────────────────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app

RUN apk add --no-cache libc6-compat
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# NEXT_PUBLIC_* wird zur Build-Zeit in den Client-Bundle gebacken (Canonicals,
# Sitemap, JSON-LD). Dokploy muss NEXT_PUBLIC_SITE_URL als Build-Arg injecten.
ARG NEXT_PUBLIC_SITE_URL=http://localhost:3000
ENV NEXT_PUBLIC_SITE_URL=${NEXT_PUBLIC_SITE_URL}

ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# payload-types.ts und importMap.js sind gitignored → im Build-Context erzeugen.
RUN pnpm payload generate:types

# importMap MIT gesetzten (Dummy-)S3-Vars generieren, damit der
# S3ClientUploadHandler in der Map landet (hasS3=true). Sonst crasht der Admin-
# Render zur Laufzeit, sobald echte R2-Credentials gesetzt sind.
RUN S3_BUCKET=placeholder \
    S3_ACCESS_KEY_ID=placeholder \
    S3_ENDPOINT=https://placeholder.example \
    pnpm payload generate:importmap

# ─── Security-Gate ────────────────────────────────────────────────
# Blockt verwundbare Next.js-Versionen (Server-Actions-RCE < 15.4.11) BEIM BUILD.
# Failt der Build, schlaegt der Dokploy-Deploy fehl und die alte, funktionierende
# Version bleibt live (0 Downtime). Referenz: Server-Kompromittierungen 2026-06-03 + 2026-07-01.
# EINFUEGEN im builder-Stage, direkt VOR `RUN pnpm build` (node_modules muss da sein).
RUN node -e "let v;try{v=require('next/package.json').version}catch(e){console.log('security-gate: kein next, skip');process.exit(0)}var p=v.split('.').map(Number);if(p[0]<=14||(p[0]===15&&(p[1]<4||(p[1]===4&&p[2]<11)))){console.error('SECURITY-GATE: next '+v+' verwundbar (<15.4.11 Server-Actions-RCE). Build blockiert. Auf >=15.4.11 bumpen.');process.exit(1)}console.log('security-gate ok: next '+v)"

RUN pnpm run build


# ─── Stage 3: runner ──────────────────────────────────────────────────────
FROM node:22-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN apk add --no-cache curl tini
RUN corepack enable && corepack prepare pnpm@10.28.0 --activate

RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Standalone-Output (Next-Server + gebundelte Deps)
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

# Seed-Support: Payload-CLI/Seed braucht den TS-Source-Tree + die vollen Deps.
COPY --from=builder --chown=nextjs:nodejs /app/src ./src
COPY --from=builder --chown=nextjs:nodejs /app/scripts ./scripts
COPY --from=builder --chown=nextjs:nodejs \
     /app/package.json /app/pnpm-lock.yaml /app/tsconfig.json \
     /app/next.config.ts /app/postcss.config.mjs ./
RUN rm -rf /app/node_modules
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules

COPY --chown=nextjs:nodejs scripts/docker-entrypoint.sh /usr/local/bin/docker-entrypoint.sh
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

USER nextjs
EXPOSE 3000

# 127.0.0.1 statt localhost: musl-Resolver auf Alpine liefert sonst ::1 zuerst.
HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD curl -fsS http://127.0.0.1:3000/api/health || exit 1

ENTRYPOINT ["/sbin/tini", "--", "/usr/local/bin/docker-entrypoint.sh"]
CMD ["node", "server.js"]
