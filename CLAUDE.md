# CLAUDE.md — BURGMEIJER RAI-Experte

Kompakte Orientierung. Die Migration der alten statischen HTML-Seite ist **abgeschlossen** —
das hier ist eine laufende Next.js + Payload-Site.

## Worum geht's

Website von **Marco Burgmeijer** (Marke „BURGMEIJER RAI-Experte"): Beratung & Schulung für
**Pflegedokumentation** (RAI / interRAI LTCF / BESA) in Alters- & Pflegezentren der Schweiz.
Verkauft 4 Angebote + Schulungs-Veranstaltungen (mit Online-Anmeldung).

- **Domain:** https://www.rai-experte.ch
- **Sprache:** Deutsch, **Schweizer Hochdeutsch** — immer „ss" statt „ß" (dass, Spass, grosse).
- **Kontakt:** Sunnmatt 1, 8634 Hombrechtikon · rai-experte@gmx.ch · +41 76 457 44 82 · UID CHE-294.549.553
- **Agentur:** Webtree (Footer-Credit → https://webtree.ch)

## Stack

Next.js **15.4** (App Router, TS) · React 19 · Payload **3.84** · Postgres · Tailwind **v4** ·
Cloudflare R2 (Media, S3-kompatibel) · Resend (Mails). Referenz-Projekt mit gleichem Setup: `../sportara-ag`.

### Struktur
- `src/app/(frontend)/` — öffentliche Site (eigenes Root-Layout, `lang="de-CH"`).
- `src/app/(payload)/` — Payload-Admin (eigenes Root-Layout). → **Zwei Root-Layouts**, daher
  globale 404 via `src/app/global-not-found.tsx` + `experimental.globalNotFound` in `next.config.ts`.
- `src/collections/` — Angebote, Referenzen, Veranstaltungen, Anmeldungen, Kontaktanfragen, Media, Users.
- `src/globals/` — Kontakt, SeoDefaults, Preise, Rechtstexte, UeberMich.
- `src/components/{sections,site,ui,seo,preview}/` · `src/lib/` (cms, site, jsonld, assets, email, utils).
- `src/app/{sitemap,robots,manifest}.ts` — SEO-Routen.

### Prinzip: **alles CMS-gepflegt**, nichts hartkodiert
Angebote, Referenzen, Veranstaltungen/Anmeldungen, Preise, Rechtstexte, Über-mich, Kontaktdaten,
SEO-Defaults kommen aus Payload (`src/lib/cms.ts`). Server Components default.

## Design

**Tailwind v4** — keine `tailwind.config`. Farben als CSS-Variablen im `@theme`-Block von
`src/app/globals.css`. **Keine Hex-Werte in Komponenten** — immer die Tokens nutzen.

| Token | Hex | Wofür |
|---|---|---|
| `petrol` (`-alt`/`-dark`) | `#007f8b` / `#008891` / `#006064` | Leitfarbe: Akzente, Hover, CTA |
| `ink` / `ink-soft` | `#26272d` / `#26292c` | Text & Headings |
| `body` | `#4a4a4a` | Fliesstext |
| `offer-1..4` | `#3c98a0` `#5fb0b5` `#c3d7ef` `#a5c7e8` | je eine Farbe pro Angebot |
| `surface-blue/gray/soft/carousel` | `#f0f5fb` … | Sektion-Hintergründe |

- **Font:** Montserrat (`next/font`), Weights 300/400/500/600/700. Body 400.
- **Buttons:** `.btn` (Pille, weiss→petrol), `.btn-fill` (solid petrol), `.btn-green`/`.btn-border`/`.btn-hero` (Outline-Varianten).
- **Headings:** `.heading-hero` (62→34px), `.heading-section` (petrol, zentriert), `.heading-sub`.
- **Section-Padding:** Klasse `.section-pad` — **konstant symmetrisch** 80px → 56px (≤991) → 48px (≤767). Alle Sections nutzen sie.
- **Header:** transparent über Hero, weisse Schrift. Auf hellen Seiten (z. B. 404) Marker
  `data-light-header` am Section-Wrapper → CSS-Regel schaltet Header auf dunkle Schrift (flash-frei).
- Effekte: Hero-Verlaufsbild, Parallax-Divider, Pfeil-SVG-Hover-Swap, Referenzen-Carousel,
  Angebots-Filter (React-State), Tarife-Toggle, Mobile-Hamburger-Overlay.

## SEO (vollständig eingerichtet)

`sitemap.ts`, `robots.ts`, `manifest.ts`, JSON-LD (`ProfessionalService` global, `Service` je
Angebot, `Review`/`AggregateRating` aus Referenzen, `BreadcrumbList` auf Detailseiten),
`alternates.canonical` je Seite, OG-Defaults im Layout, `lang="de-CH"`, 301-Redirects der alten
`.html`-URLs in `next.config.ts`. Alles relativ zu `SITE_URL` (= `NEXT_PUBLIC_SITE_URL`).

## Befehle & Dev

- `pnpm dev` · `pnpm build` · `pnpm seed` · `pnpm generate:types` (nach Schema-Änderungen!).
- **Lokal:** nativer Postgres auf `localhost:5432` (`payload`/`payload`/`rai_experte`).
  `.env`: `DATABASE_URI`, `PAYLOAD_SECRET`, `NEXT_PUBLIC_SITE_URL=http://localhost:3000`.
- **Prod:** `NEXT_PUBLIC_SITE_URL=https://www.rai-experte.ch` setzen (SEO hängt komplett dran).

### Gotchas
- **Alle `@payloadcms/*` + `payload` müssen exakt dieselbe Version haben** — sonst 500 beim Request.
- Node 24: `payload run`-Scripts können zicken (empfohlen Node 20/22). `next dev` läuft trotzdem.
- Mails/Media sind No-ops ohne `RESEND_*` bzw. `S3_*` ENV — Einträge werden trotzdem gespeichert.
