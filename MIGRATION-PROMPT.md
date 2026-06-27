# MIGRATION-PROMPT — RAI-Experte → Next.js + Payload CMS

> **Kopiere diesen kompletten Prompt in einen neuen Claude-Code-Chat**, der im
> Zielverzeichnis des neuen Next.js-Projekts läuft. Die Datei **`CLAUDE.md`** (im
> alten Projektordner) ist die verbindliche Design-/Inhalts-Referenz und enthält
> **alle Farben, Fonts, Inhalte, Links und Asset-Pfade**. Der alte Projektordner
> liegt unter `…/Webtree/Kunden/rai-experte/` — du darfst dort jederzeit in die
> HTML/CSS schauen und Bilder herauskopieren.

---

## ROLLE & ZIEL

Du migrierst die bestehende **statische HTML-Website „BURGMEIJER RAI-Experte"**
(rai-experte.ch) nach **Next.js (App Router, TypeScript) + Payload CMS + Tailwind CSS**.

**Anforderung: Das Ergebnis soll im Look, Inhalt und in den URLs 1:1 der alten Seite
entsprechen** — gleiche Farben, gleiche Fonts (Montserrat), gleiche Sektionen in
gleicher Reihenfolge, gleiche Links. Du darfst Details *etwas* moderner/cooler machen
(weichere Animationen, sauberere Komponenten), aber **Layout, Inhalt und Navigation
bleiben gleich**. Alles **voll responsive** (Breakpoints 1199 / 991 / 767 / 479 px).

Lies zuerst **`CLAUDE.md`** vollständig. Dort stehen alle konkreten Werte.

---

## TECH-STACK & SETUP

1. **Next.js 15 App Router + TypeScript** (`create-next-app`), Tailwind CSS aktiviert.
2. **Payload CMS 3** (läuft nativ *innerhalb* von Next.js, `@payloadcms/next`).
   - DB: **MongoDB** (`@payloadcms/db-mongodb`) ODER Postgres — wähle MongoDB, einfach.
   - Rich Text: Lexical. Admin-Panel unter `/admin`.
   - **Media-Uploads → Cloudflare R2 (S3-kompatibel)** via `@payloadcms/storage-s3`
     (NICHT lokal). Config siehe Abschnitt **„MEDIA / S3 (Cloudflare R2)"** unten.
3. **E-Mail → Resend** (`@payloadcms/email-resend` bzw. `resend` SDK). Ersetzt Basin.
   Kontaktformular & Event-Anmeldungen versenden Bestätigungs-/Benachrichtigungs-Mails
   über Resend (an `rai-experte@gmx.ch` + optional Auto-Reply an den Absender).
4. **Font:** `Montserrat` via `next/font/google` (Weights 300, 400, 600, 700).
5. **Design-Tokens als CSS-Variablen (zwingend):** Definiere alle Farben/Spacing in
   `:root` als CSS Custom Properties (z.B. `--color-petrol: #007f8b;`) in
   `app/globals.css` und referenziere sie im Tailwind-Theme
   (`petrol: 'var(--color-petrol)'`). So sind Farben **an einer Stelle** zentral
   pflegbar/konsistent. Werte aus `CLAUDE.md §2–§5`. **Keine hartkodierten Hex-Werte
   in Komponenten** — immer über die Tokens/Tailwind-Klassen.
6. **Assets:** Den kompletten Ordner `assets_marco/` aus dem alten Projekt nach
   `public/assets_marco/` kopieren (Pfade beibehalten, damit `og:image` & Logos
   gleich bleiben). Referenz-Logos & Bilder, die der Kunde pflegen soll, zusätzlich als
   **Payload-Media (R2)** seedbar machen.

### Effizienz / Code-Qualität (durchgehend einhalten)
- **Server Components by default**, `'use client'` nur wo nötig (Formulare, Carousel,
  Filter, Scroll-Button). Daten serverseitig aus Payload (`getPayload`) holen.
- **Wiederverwendbare Komponenten** statt Copy-Paste (Header/Footer/Section/Button/
  AngebotCard/PreisTabelle als eigene Komponenten — einmal bauen, überall nutzen).
- **`next/image`** für Raster-Bilder (Lazy-Loading, Sizing), SVG via `<img>`/inline.
- **Statisch wo möglich** (`generateStaticParams`, ISR/`revalidate`) — Angebote,
  Referenzen, Rechtstexte ändern selten → cachen, nicht bei jedem Request neu laden.
- **Typsicher**: Payload generiert Types (`payload generate:types`) → in Komponenten nutzen.
- Konsistente Struktur: `src/components`, `src/collections`, `src/globals`, `src/lib`.

---

## PAYLOAD COLLECTIONS

Erstelle mindestens diese Collections (Feldnamen sind Vorschläge):

### `angebote` (Services) — 4 Einträge
```
- nummer        number        (1–4)
- titel         text          (z.B. "Tarifstufen Controlling und Coaching")
- slug          text  unique  (tarifstufen | heiminterne | beratung | wechselbesarai)
- kachelFarbe   text          (#3c98a0 | #5fb0b5 | #c3d7ef | #a5c7e8)
- filterGruppe  select        (coaching | beratung | wechsel)
- kurztext      text          (Kachel-Text auf Startseite)
- beschreibung  richText      (Seiteninhalt unter H3 "Beschreibung")
- seo: title / description / ogImage
```
Inhalte siehe `CLAUDE.md §9.1`. Reihenfolge per `nummer`.

### `referenzen` (Testimonials) — 34 Einträge
```
- einrichtung   text          (Name der Institution)
- websiteUrl    text          (externe URL, target _blank)
- logo          upload(media) (Logo/Bild)
- zitat         textarea      (Testimonial-Text; kann leer sein, vgl. Engelhof)
- autorName     text
- autorFunktion text
- projektInfo   text          (z.B. "Februar – April 2026, Wechsel … Go-Life 01.04.2026")
- reihenfolge   number
```
Inhalte/Reihenfolge siehe `CLAUDE.md §9.4` + Volltexte aus `index.html`/`referenzen.md`.

### `veranstaltungen` (Events / Ticketsystem — ERSETZT Pretix, läuft komplett in Payload)
```
- titel          text
- slug           text  unique
- datumVon       date          (Start, mit Uhrzeit)
- datumBis       date          (Ende, mit Uhrzeit; optional)
- ort            text          (z.B. "Stiftung Loogarten, Esslingen")
- bild           upload(media) (optional)
- ziele          array         → { text }   (Aufzählung der Lernziele)
- zielgruppe     text          (z.B. "Pflegehelferinnen und Pflegehelfer")
- themen         richText      (Themenbereiche / Programm, mit Zwischenüberschriften)
- preis          number        (CHF; 0 = kostenlos)
- preisInfo      text          (z.B. "Halbtages-Schulung CHF 95, Zahlung auf Rechnung")
- plaetze        number        (max. Teilnehmer:innen)
- anmeldeschluss date          (optional)
- status         select        (offen | ausgebucht | abgesagt | vergangen)
```
Anzeige der offenen Veranstaltungen auf der Startseite (Sektion „Veranstaltungen").
Jede zeigt Titel, Datum/Zeit, Ort, Ziele, Zielgruppe, Themen, Preis-Info und **Restplätze**.
Anmelde-Button → Anmeldeformular (siehe `anmeldungen`).
Restplätze = `plaetze` − Anzahl bestätigter `anmeldungen`. Bei 0 → „ausgebucht".

### `anmeldungen` (Event-Registrierungen — wo sich Leute anmelden)
```
- veranstaltung  relationship → veranstaltungen
- vorname / nachname  text
- email          email
- telefon        text
- firma          text          (optional, z.B. Pflegezentrum)
- anzahlPersonen number        (default 1)
- bemerkung      textarea
- status         select        (neu | bestätigt | storniert)   default: neu
- createdAt      (auto)
```
Wird per **Server Action / Route Handler** aus dem Anmeldeformular erstellt.
`afterChange`-Hook: schickt via **Resend** eine Bestätigungs-Mail an die Person +
eine Benachrichtigung an `rai-experte@gmx.ch`. Admin verwaltet Anmeldungen in Payload.
**Kein Pretix mehr.**

### `kontaktanfragen` (Kontaktformular-Eingänge)
```
- name / email / telefon / nachricht   + status (neu|erledigt) + createdAt
```
Speichert jede Kontaktanfrage in Payload **und** versendet sie via **Resend** an
`rai-experte@gmx.ch`. (Ersetzt Basin.)

### `preise` (Global) — Tarif-Tabelle  ⚠️ wichtig, voll editierbar
**Wiederholbares Array-Feld** `zeilen[]`, jede Zeile = **`titel` (text) + `beschreibung`
(textarea, mehrzeilig erlaubt)**. So kann der Kunde Zeilen frei hinzufügen/ändern/sortieren.
Wird auf Startseite + allen 4 Angebots-Seiten aus *einer* Quelle gerendert (DRY).

**Seed-Werte (genau diese 7 Zeilen, Reihenfolge beibehalten):**
| titel | beschreibung |
|---|---|
| Erstberatung | Kostenlos |
| Beratung / Unterstützung / Tagesschulung | CHF 1900 |
| Tagesschulung | 8 - 12H \| Pause \| 13 - 16H<br>Die Pausenzeiten können nach Absprache mit den Teilnehmenden angepasst werden. |
| Halbtageseinsätze | Nach Vereinbarung |
| Preise 2025 | Die Preise entsprechen ihren Gesamtkosten, da keine MwSt. erhoben wird. |
| Tarife ab 2026 | exkl. MwSt. |
| Reisespesen | CHF 0.70 pro Kilometer. |

### Globals
- `kontakt` (Adresse, E-Mail, Telefon, UID, LinkedIn) — `CLAUDE.md §1`
- `rechtstexte` (Impressum / AGB / Datenschutz je als RichText) — `CLAUDE.md §9.6`,
  voll editierbar; die `/agb`, `/impressum`, `/datenschutz`-Seiten rendern diese.
- `ueberMich` (Marco-Text, Bilder) — `CLAUDE.md §9.3`
- `seoDefaults` (Default-OG, Site-Name)

> **Grundsatz:** ALLES inhaltlich Relevante kommt aus Payload — Angebote, Referenzen,
> Veranstaltungen/Anmeldungen, Preise/Tarife, Rechtstexte, Über-mich, Kontaktdaten.
> Keine Texte/Preise hartkodiert in Komponenten.

### Seed: Beispiel-Veranstaltung (genau so anlegen, Status `offen`)
```
titel:       interRAI LTCF Pflegehelferin oder Pflegehelfer
datumVon:    2026-08-27T13:00 (Do, 27. August 2026, 13:00)
datumBis:    2026-08-27T16:00 (16:00)
ort:         Stiftung Loogarten, Esslingen
zielgruppe:  Pflegehelferinnen und Pflegehelfer
ziele:
  - Die Schulung vermittelt den Teilnehmenden eine einfache und korrekte Dokumentation
    in der interRAI-LTCF-Sprache.
  - Die Teilnehmenden kennen die Wichtigkeit des ADL-Index, die einzelnen Level sowie
    deren korrekte Dokumentation.
  - Die Teilnehmenden kennen die wirtschaftliche Bedeutung von interRAI LTCF.
themen (richText, Programm „Die Weiterbildung umfasst folgende Themenbereiche:"):
  • interRAI LTCF Basics
      – interRAI LTCF: Philosophie und Hauptfunktionen
      – ADL-Index und Level
  • interRAI LTCF – Leitlinien der Dokumentation
      – Empfehlungen BESA Qsys
      – Mit Schwerpunkt auf eine einfache und aussagekräftige Dokumentation der
        relevanten Items des ADL-Index
  • Wirtschaftliche Auswirkungen von RAI-Beurteilungen auf die Pflegequalität
  • Praktische Beispiele und Übungen
preis:       95
preisInfo:   Halbtages-Schulung CHF 95, Zahlung auf Rechnung
plaetze:     7   (= aktuell verfügbare Plätze beim Seed; Restplätze sinken mit Anmeldungen)
status:      offen
```

---

## E-MAIL (Resend) & MEDIA (Cloudflare R2)

### Resend
- Adapter `@payloadcms/email-resend` als `email` in `payload.config.ts` registrieren.
- ENV: `RESEND_API_KEY`, `EMAIL_FROM` (verifizierte Absender-Domain, z.B.
  `no-reply@rai-experte.ch`), `EMAIL_TO=rai-experte@gmx.ch`.
- Verwendung: Kontaktformular-Eingang, Event-Anmeldung (Bestätigung + Benachrichtigung).

### Cloudflare R2 (S3-kompatibel) — `@payloadcms/storage-s3`
Auf der `media`-Collection aktivieren. ENV (`.env`):
```
S3_BUCKET=webtree-media
S3_ENDPOINT=https://256f2599fd4fde46bb7b18d7b1ad75ae.r2.cloudflarestorage.com
S3_REGION=auto
S3_ACCESS_KEY_ID=<einsetzen>
S3_SECRET_ACCESS_KEY=<einsetzen>
S3_PUBLIC_URL=https://media.webtree.ch
S3_PREFIX=rai-experte
```
- `forcePathStyle: true`, `region: 'auto'`, `endpoint` = R2-Endpoint.
- Öffentliche Bild-URLs über `S3_PUBLIC_URL` (`https://media.webtree.ch/rai-experte/...`).
- **`next.config.js`:** `media.webtree.ch` zu `images.remotePatterns` hinzufügen.
- ⚠️ **Hinweis:** Der vom Kunden gelieferte `S3_PREFIX` war `sportara-ag` (aus einem
  anderen Projekt kopiert). Für dieses Projekt **`rai-experte`** verwenden, damit die
  Medien im geteilten Bucket sauber getrennt liegen.

---

## ROUTEN / SEITEN (App Router)

Lege diese Routen an (Inhalte/Sektionen exakt wie `CLAUDE.md §7`):

| Route | Quelle | Inhalt |
|---|---|---|
| `app/page.tsx` (`/`) | index.html | Alle Startseiten-Sektionen (siehe unten) |
| `app/tarifstufen/page.tsx` | angebote[slug=tarifstufen] | Angebots-Detail |
| `app/heiminterne/page.tsx` | … | |
| `app/beratung/page.tsx` | … | |
| `app/wechselbesarai/page.tsx` | … | |
| `app/agb/page.tsx` | agb.html | RichText aus Global |
| `app/impressum/page.tsx` | impressum.html | RichText aus Global |
| `app/datenschutz/page.tsx` | datenschutz.html | RichText aus Global |
| `app/not-found.tsx` | 404.html | 404 |

> Die 4 Angebots-Seiten am besten als **eine** dynamische Route `app/(angebote)/[slug]/page.tsx`
> mit `generateStaticParams` aus Payload — aber die **finalen URLs müssen exakt**
> `/tarifstufen`, `/heiminterne`, `/beratung`, `/wechselbesarai` sein (keine Präfixe).
>
> **Keine `/erfolg`-Seite mehr.** Nach erfolgreichem Absenden des Kontaktformulars
> wird eine **cleane Inline-Erfolgsmeldung** an Ort und Stelle angezeigt (z.B. das
> Formular wird durch eine Bestätigungs-Box ersetzt: „Nachricht erfolgreich gesendet!
> Ich melde mich möglichst bald bei Ihnen.") — kein Redirect.

### Startseiten-Sektionen (Reihenfolge zwingend)
Header → Hero → Über-mich-Intro → **Angebote (Filter + 4 Kacheln + Tarif-Toggle)** →
**Veranstaltungen (aus Payload, mit Anmeldeformular)** → Über mich → Marco-Bilder →
**Referenzen-Carousel** → Parallax-Divider → **Kontakt (Formular)** → Footer.

---

## KOMPONENTEN (React, aus Payload-Daten)

- **Header / Nav** — transparent über Hero, weisse Schrift; Mobile = Hamburger →
  Vollbild-Overlay mit gestaffelt einfadenden Links (`CLAUDE.md §6`). Nav-Links:
  Start `/`, Angebote `/#angebot`, Über mich `/#ubermich`, Kontakt `/#kontakt`, LinkedIn.
- **Hero** — Hintergrund-Verlaufsbild (Desktop/Mobile unterschiedlich), h1+h3, Scroll-Pfeil mit Hover-Swap.
- **AngebotsGrid** — Filter-Buttons (Alle/Coaching/Beratung/Wechsel) mit React-State
  (ersetzt shuffle.js), 4 farbige Kacheln, Link zur jeweiligen Angebots-Seite.
- **TarifTabelle** + **Toggle-Button** („Tarife öffnen/schliessen", React-State).
  Daten aus dem `preise`-Global (eine Quelle für Startseite + Angebots-Seiten).
- **VeranstaltungenListe** — rendert offene `veranstaltungen` aus Payload (Titel, Datum,
  Ort, Restplätze). Jede mit **„Anmelden"-Button**. Ersetzt das Pretix-Widget komplett.
- **AnmeldeFormular** (Client) — Modal/Inline pro Veranstaltung. Felder: Vorname,
  Nachname, E-Mail, Telefon, Firma, Anzahl Personen, Bemerkung. Absenden → Server
  Action/Route Handler → erstellt `anmeldungen`-Eintrag + Resend-Mails. Danach **cleane
  Inline-Erfolgsmeldung** (kein Redirect). Bei „ausgebucht" Button deaktiviert.
- **ReferenzenCarousel** — Logo links + Zitat-Box rechts (Mobile gestapelt), Quote-Icon,
  Auto-Rotate 6 s, Pause on Hover, Bild-Hover `scale(1.05)`. Daten aus `referenzen`.
  (Embla empfohlen — leichtgewichtig.)
- **MarcoGalerie** — 3 Bilder, Hover-Zoom.
- **Parallax-Divider** — `background-attachment: fixed` Desktop, `scroll` Mobile.
- **KontaktFormular** (Client) — Felder Name / E-Mail / Telefon / Nachricht
  (Validierung wie alt: Name-Pattern Buchstaben/Leerzeichen, required). Absenden →
  Server Action/Route Handler → speichert `kontaktanfragen` + **Resend**-Mail an
  `rai-experte@gmx.ch`. Bei Erfolg **cleane Inline-Bestätigung** statt Formular
  (kein `/erfolg`-Redirect, kein Basin).
- **Footer** — Logo, Kontaktinfos, Links AGB/Impressum/Datenschutz, LinkedIn,
  „Made with ❤️ by Webtree" → https://webtree.ch.
- **Scroll-to-Top-Button** — fixed, erscheint nach 100 px, Hover-Swap, smooth scroll.

---

## SEO (Pflicht — siehe `CLAUDE.md §8`)

- Pro Seite **Metadata-API** (`export const metadata` / `generateMetadata`): exakte
  Titles & Descriptions aus `CLAUDE.md §8`, `og:image`, `og:type=website`, `og:site_name`.
- **`<html lang="de-CH">`** (alte Seite hatte fälschlich `en` — hier korrigieren).
- **`app/sitemap.ts`** mit allen Routen, **`app/robots.ts`** mit Sitemap-Verweis.
- **301-Redirects** in `next.config.js`: `/index.html`→`/`, `/tarifstufen.html`→`/tarifstufen`,
  usw. für **alle** alten `.html`-URLs (auch `/erfolg.html`→`/`, da es die Seite nicht
  mehr gibt). Die Backlinks/alte Sitemap zeigen auf die `.html`-URLs.
- **`CNAME`** (`rai-experte.ch`) in `public/` falls weiter GitHub/Static-Hosting.
- **JSON-LD hinzufügen** (Verbesserung): `LocalBusiness`/`Person` (Marco Burgmeijer,
  Adresse, Tel, E-Mail), `Service` je Angebot, `Review` + `AggregateRating` aus Referenzen.
- Google-Site-Verification-Meta beibehalten (`CLAUDE.md §1`).

---

## RESPONSIVE / DESIGN-TREUE

- Breakpoints **1199 / 991 / 767 / 479 px** nachbilden (Heading-Skalierung in `CLAUDE.md §3`).
- Buttons, Spacing, Container-max `1280px/95%`, Section-Padding wie `CLAUDE.md §4–§5`.
- Custom Scrollbar (Thumb über `--color-petrol`).
- Smooth Scroll für Anker-Navigation.
- **Design bleibt 1:1 identisch** zur alten Seite (gleiche Petrol-Palette, gleiche
  Anordnung). Erlaubt sind nur dezente Verfeinerungen (weichere Transitions, sauberere
  Komponenten). **Keine neue Leitfarbe einführen** — die Marke ist Petrol `#007f8b`.

---

## ARBEITSWEISE

1. Lies `CLAUDE.md` komplett. Stelle Rückfragen nur bei echten Lücken.
2. Scaffolde Next.js + Payload + Tailwind. Design-Tokens als **CSS-Variablen** in
   `globals.css` + Tailwind-Theme darüber. R2-Storage & Resend in `payload.config.ts`.
3. Kopiere `assets_marco/` nach `public/`.
4. Baue Collections/Globals und **seede** sie mit den realen Inhalten aus
   `CLAUDE.md §9` + alten HTML-Dateien (Angebote, 34 Referenzen, **Preise/Tarife**,
   Rechtstexte, Über-mich). Referenz-Logos in R2 hochladen & verknüpfen.
5. Baue wiederverwendbare Komponenten & Seiten, binde Payload-Daten serverseitig an.
6. Formulare verdrahten: Kontakt → `kontaktanfragen` + Resend; Event-Anmeldung →
   `anmeldungen` + Resend. Jeweils **cleane Inline-Erfolgsmeldung** (kein Redirect,
   kein Basin, kein Pretix).
7. SEO: Metadata, sitemap, robots, Redirects (inkl. `.html`), JSON-LD, `lang="de-CH"`.
8. Responsive prüfen (Mobile-Hamburger, Carousel, Parallax-Mobile).
9. Build muss durchlaufen (`next build`), Admin (`/admin`) & R2-Upload funktionieren.

**Sprache:** Alle Inhalte Schweizer Hochdeutsch („ss" statt „ß").
**Nicht ändern:** Slugs, Anker, externe URLs (LinkedIn, Webtree), Kontaktdaten, UID,
das visuelle Design (Petrol-Palette).
**Bewusst ersetzt:** Basin → **Resend**, Pretix → **Payload-Events/Anmeldungen**,
`/erfolg`-Seite → **Inline-Erfolgsmeldung**, lokale Uploads → **Cloudflare R2**.
