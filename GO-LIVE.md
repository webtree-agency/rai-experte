# Go-Live — BURGMEIJER RAI-Experte

Next.js 15 (App Router) + Payload CMS 3 + Postgres + Cloudflare R2 + Resend.

## Lokale Entwicklung

```bash
pnpm install
pnpm generate:types          # Payload-Typen erzeugen
pnpm dev                     # http://localhost:3000  (Admin: /admin)
pnpm seed                    # Inhalte seeden (braucht laufende Postgres-DB)
```

Voraussetzung: eine erreichbare Postgres-DB unter `DATABASE_URI` (Default
`postgres://payload:payload@localhost:5432/rai_experte`). Das Schema legt Payload
beim ersten Zugriff automatisch an (`postgresAdapter push:true`).

Erste Admin-Anmeldung: `/admin` aufrufen → Payload zeigt das „Ersten Benutzer
anlegen"-Formular.

## Environment-Variablen (`.env` / Dokploy)

| Variable | Zweck |
|---|---|
| `PAYLOAD_SECRET` | Pflicht in Produktion (≥ 32 Zeichen). |
| `DATABASE_URI` | Postgres-Connection-String. |
| `NEXT_PUBLIC_SITE_URL` | Kanonischer Origin (Canonicals/Sitemap/JSON-LD). **Build-Arg.** |
| `RESEND_API_KEY` | Resend-API-Key (Kontakt + Anmeldungen). |
| `EMAIL_FROM` | Verifizierter Absender, z. B. `no-reply@rai-experte.ch`. |
| `EMAIL_TO` | Empfänger der Benachrichtigungen: `rai-experte@gmx.ch`. |
| `EMAIL_LOGO_URL` | Öffentliche Logo-URL für den Mail-Kopf (sonst Asset an der Domain). |
| `S3_BUCKET` | `webtree-media` |
| `S3_ENDPOINT` | R2-Endpoint (`https://<account>.r2.cloudflarestorage.com`). |
| `S3_REGION` | `auto` |
| `S3_ACCESS_KEY_ID` / `S3_SECRET_ACCESS_KEY` | R2-Credentials. |
| `S3_PUBLIC_URL` | `https://media.webtree.ch` |
| `S3_PREFIX` | **`rai-experte`** (nicht `sportara-ag`!). |
| `SEED_ON_BOOT` | `true` beim allerersten Deploy, danach `false`. |

> Ohne `S3_*`-Keys speichert Payload Uploads lokal (`public/uploads`, Volume).
> Ohne `RESEND_API_KEY` werden Formular-Einträge gespeichert, aber keine Mail
> versendet (stiller No-op).

## Resend-Domain

`rai-experte.ch` (bzw. die Absender-Domain von `EMAIL_FROM`) in Resend
verifizieren (SPF/DKIM-DNS-Einträge setzen), sonst werden Mails abgelehnt.

## Deployment (Dokploy / Docker)

`docker-compose.yml` enthält Postgres + App (Traefik-Labels für TLS). In Dokploy
einen Compose-Service anlegen, die Variablen oben setzen, Domain auf den
`app`-Service (Port 3000) mappen. Healthcheck: `/api/health`.

## SEO / Migration

- Alle alten `.html`-URLs werden per **301** auf die neuen Slugs umgeleitet
  (inkl. `/erfolg.html` → `/`) — siehe `next.config.ts`.
- `public/CNAME` (`rai-experte.ch`) für statisches Hosting; bei Dokploy via DNS.
- `sitemap.xml`, `robots.txt`, JSON-LD und `lang="de-CH"` sind aktiv.
- Google-Site-Verification ist im SEO-Global hinterlegt.

## Bewusste Änderungen gegenüber der alten Seite

- **Basin → Resend** (Inline-Erfolgsmeldung statt `/erfolg`-Seite).
- **Pretix → Payload** (`veranstaltungen` + `anmeldungen`).
- **Lokale Uploads → Cloudflare R2**.
- Alle Inhalte (Angebote, 34 Referenzen, Preise, Veranstaltungen, Rechtstexte,
  Über-mich, Kontakt) sind im Admin (`/admin`) pflegbar.
