# CLAUDE.md — BURGMEIJER RAI-Experte

> Vollständige Projekt-, Design- und Inhalts-Referenz für die Migration der bestehenden
> statischen HTML-Website nach **Next.js (App Router) + Payload CMS**.
> Diese Datei ist die **Single Source of Truth**. Sie enthält alle Farben, Fonts, Inhalte,
> Links und Assets. Ein neuer Claude-Chat soll die Seite damit **1:1** nachbauen können.

---

## 1. Projekt-Überblick

| | |
|---|---|
| **Marke** | BURGMEIJER RAI-Experte |
| **Person** | Marco Burgmeijer |
| **Domain** | https://www.rai-experte.ch |
| **Sprache** | Deutsch (Schweizer Hochdeutsch — „ss" statt „ß", z.B. „dass", „Spass", „grosse") |
| **Branche** | Beratung / Schulung für Pflegedokumentation (RAI / interRAI LTCF / BESA) in Alters- & Pflegezentren CH |
| **Aktueller Stack** | Statisches HTML, Bootstrap 3, jQuery, Swiper, FontAwesome 4, Montserrat |
| **Ziel-Stack** | Next.js (App Router, TypeScript) + Payload CMS + Tailwind CSS |
| **Hosting aktuell** | GitHub Pages (CNAME `rai-experte.ch`) |

### Kontaktdaten (überall identisch verwenden)
- **Adresse:** Sunnmatt 1, 8634 Hombrechtikon, Schweiz
- **E-Mail:** rai-experte@gmx.ch
- **Telefon:** +41 76 457 44 82
- **UID:** CHE-294.549.553
- **LinkedIn:** https://www.linkedin.com/in/marco-BURGMEIJER-7408641a5/
- **Agentur-Credit (Footer):** „Made with ❤️ by Webtree" → https://webtree.ch

### Systeme in der NEUEN Version (Migration — bewusste Änderungen)
- **Kontaktformular:** ~~Basin~~ → **Resend**. Anfrage in Payload (`kontaktanfragen`)
  speichern + Mail an `rai-experte@gmx.ch`. **Keine `/erfolg`-Seite** mehr → **cleane
  Inline-Erfolgsmeldung** direkt im Formular.
- **Ticket-/Veranstaltungssystem:** ~~Pretix~~ → **komplett über Payload CMS**.
  Collections `veranstaltungen` (Events) + `anmeldungen` (Registrierungen). Anmeldung
  über eigenes Formular → Eintrag in Payload + Resend-Bestätigung. Hier melden sich
  Leute für Schulungen an. *(Altes Pretix-Event `pretix.eu/mabu/` wird abgelöst.)*
- **Media-Uploads:** **Cloudflare R2** (S3-kompatibel), Bucket `webtree-media`,
  Prefix `rai-experte`, öffentliche URLs über `https://media.webtree.ch`.
- **Google Site Verification:** `<meta name="google-site-verification" content="7rD4xKAmDRZU1KuMYKzSwWw9Z56MsKYF6ACq9FpxJus">` — beibehalten.

> Details & ENV-Variablen zu Resend, R2 und den Collections: siehe **`MIGRATION-PROMPT.md`**.

---

## 2. Design-System / Farben

### Primärfarben
| Token | Hex | Verwendung |
|---|---|---|
| `petrol` (Primary) | `#007f8b` | Hauptakzent: Button-Hover, Links-Hover, aktive Tabs, Scrollbar, Checkbox/Radio checked, Pagination active, Parallax-Fallback, Quote-Icons |
| `petrol-alt` | `#008891` | Carousel-Controls & -Indikatoren (Variante des Primary) |
| `petrol-dark` | `#006064` | Carousel-Control Hover |
| `dark` (Text) | `#26272d` | Primäre Textfarbe: h1–h5, Labels, Borders |
| `dark-2` | `#26292c` | Alternative dunkle Headings / Post-Titles |

### Angebots-Kacheln (Portfolio-Farben — wichtig, je Angebot eine Farbe)
| Token | Hex | Angebot |
|---|---|---|
| `offer-1` | `#3c98a0` | Angebot 1 — Tarifstufen Controlling und Coaching |
| `offer-2` | `#5fb0b5` | Angebot 2 — Heiminterne Schulungen |
| `offer-3` | `#c3d7ef` | Angebot 3 — Beratung / Unterstützung / Tagesschulung |
| `offer-4` | `#a5c7e8` | Angebot 4 — Wechsel von BESA auf interRAI LTCF |

### Hintergründe
| Token | Hex | Verwendung |
|---|---|---|
| `bg-blue-light` | `#f0f5fb` | Angebot-Container, Veranstaltungs-Sektion, Marco-Bilder-Sektion, Footer |
| `bg-gray` | `#f5f5f8` | Form-Focus, Mobile-Menu-Panel, Comment-Boxen |
| `bg-blue-soft` | `#c2d9f5` | Bild-Container |
| `carousel-bg` | `#f8f8f8` | Referenzen-Carousel-Hintergrund |
| `white` | `#ffffff` | Standard-Button-BG, Zitat-Boxen |

### Text / Links / States
| Token | Hex | Verwendung |
|---|---|---|
| `text-body` | `#4a4a4a` | Paragraph-Text (Fallback) |
| `link` | `#9fa3a7` | Standard Link-Farbe (vor Hover) |
| `muted` | `#8c8f94` | Footer-Links, Icons |
| `quote-text` | `#666666` | Zitat-Text (italic) in Referenzen |
| `form-focus-border` | `#2d2d2d` | Border bei Form-Focus |
| `border-light` | `#eeeeee` | Pricing-Items, leichte Borders |

### Social-Farben (falls verwendet)
LinkedIn `#007bb5` · Twitter `#55acee` · Facebook `#3b5998` · Pinterest `#dd4b39`

> **Umsetzung:** Diese Farben als **CSS-Variablen** in `:root` (`globals.css`)
> definieren (`--color-petrol: #007f8b;` …) und im Tailwind-Theme darüber referenzieren
> (`petrol: 'var(--color-petrol)'`). Keine hartkodierten Hex-Werte in Komponenten —
> zentral, konsistent, an einer Stelle pflegbar.

### Tailwind-Mapping (Vorschlag `tailwind.config.ts` → `theme.extend.colors`)
```ts
colors: {
  petrol:       { DEFAULT: '#007f8b', alt: '#008891', dark: '#006064' },
  ink:          { DEFAULT: '#26272d', soft: '#26292c' },
  offer:        { 1: '#3c98a0', 2: '#5fb0b5', 3: '#c3d7ef', 4: '#a5c7e8' },
  surface:      { blue: '#f0f5fb', gray: '#f5f5f8', soft: '#c2d9f5', carousel: '#f8f8f8' },
  body:         '#4a4a4a',
  link:         '#9fa3a7',
  muted:        '#8c8f94',
  quote:        '#666666',
}
```

---

## 3. Typografie

- **Font:** `Montserrat`, sans-serif (Google Fonts, Weights **300, 300i, 400, 600, 700**)
  → In Next.js via `next/font/google` einbinden (Montserrat, subsets `latin`).
- **Body:** 16px / line-height ~1.35 / weight 300 / Farbe `#4a4a4a`
- **Globale Textfarbe:** `#26272d`
- `scroll-behavior: smooth` global.

### Responsive Heading-Skalierung (Breakpoints: 1199 / 991 / 767 px)
| Element | Desktop | ≤1199 | ≤991 | ≤767 |
|---|---|---|---|---|
| h1 | 62px | 52px | 42px | 34px |
| h2 | 42px | – | 36px | 30px |
| Hero-Subtitle (h3) | 24px | – | – | – |
| Hero-Text p | 24px | 18px | 16px | 18px |
| `.textmarco h3` | 24px | | | |
| `.textmarco p` | 18px | | | |
| Buttons | 16px (uppercase) | | line-height 40px | 18px |

**Font-Weights:** 300 Standard-Text & Buttons · 600 Post-Titles · 700 `.site-title span` + fette Heading-Teile.
**Letter-spacing:** 1px bei Widget-Titles & Kontakt-Heading.

---

## 4. Buttons

| Klasse | Stil |
|---|---|
| `.btn` (Standard) | bg `#fff`, Text `#26272d`, **border-radius 50px**, line-height 50px, min-width 200px, uppercase, weight 300, transition 0.25s |
| `.btn:hover` | bg `#007f8b`, Text `#fff` |
| `.btn-green` (Haupt-CTA) | **transparent**, Text schwarz, `border 1px solid black`; Hover → border `#007f8b` |
| `.btn-border` | `border 1px solid #26272d` |
| `.btn-border1` | `border 1px solid #fff` |
| Hero-Button | transparent, weisser Text; Hover → bg weiss, Text schwarz |

Standard-Transition für Buttons & Links: `0.25s ease-in-out`. Hover-Effekte allgemein `0.3s ease`.

---

## 5. Layout & Spacing

- **Section-Padding:** `100px 0 140px` (Desktop) → `60px 0` (≤991) → `30px 0 60px` (≤767)
- **Subpage-Section:** `30px 0`
- **Content-Container:** max `1280px`, `max-width: 95%`, zentriert
- **Hero-Text:** max `990px` (≤991: 750px)
- **Footer:** padding-top 95px (≤991: 55, ≤767: 25); container padding-bottom 170px (120 / 50)
- **Major Breakpoints:** 1199 · 991 · 767 · 479 px (plus diverse Feinabstufungen 850/800/750/650/450/350)
- **Custom Scrollbar:** 8px, Thumb `#007f8b`, radius 6px

---

## 6. Schlüssel-Effekte & Animationen (nachbauen!)

- **Hero:** Vollflächiges Hintergrund-Bild mit Farbverlauf.
  - Desktop: `assets_marco/webelem/Burgm_Startseite_HGFarbverlauf.webp` (center/cover)
  - Mobile (≤800px): `assets_marco/images/ui/handystart.webp` (left/cover)
- **Parallax-Divider** (`.parallax`): `background-attachment: fixed`, Bild `Burgm_Startseite_Divider_Text.webp`, Fallback-Farbe `#007f8b`. Auf Mobile (≤800px) → `Burgm_Startseite_Divider_Mob_230907.webp`, `background-attachment: scroll` (Parallax aus). Zentrierter weisser `h2`-Text per `translate(-50%,-50%)`.
- **Pfeil-SVG-Hover-Swap:** Zwei übereinanderliegende SVGs (`#downSvg1` weiss / `#downSvg2` petrol). Bei `:hover` auf `#customSvgLink` wird getauscht. Rotationen: `.svgstart` 180° · `.svgback` 270° · `.svgforward` 90°.
- **Scroll-to-Top-Button** (`.svgContainer`): fixed unten rechts, erscheint nach 100px Scroll, gleicher Hover-Swap (`#svg1`/`#svg2`), klick → smooth scroll top.
- **Angebots-Kacheln** (`.portfolio-item`): 270px hoch, je Angebot eine `offer`-Farbe, uppercase Titel oben, grosser Titel zentriert, Pfeil-Link unten.
- **Angebot-Filter:** Buttons „Alle / Coaching / Beratung / Wechsel" filtern das Grid (aktuell shuffle.js). In Next.js mit React-State neu umsetzen (`data-group`: coaching, beratung, wechsel).
- **Tarife-Toggle:** Button „Tarife öffnen/schliessen" blendet die Preistabelle ein/aus (React-State).
- **Referenzen-Carousel** (`.modern-referenz`): Logo links + Zitat-Box rechts (Mobile gestapelt). Zitat-Box weiss mit Schatten + kleinem 45°-Pfeil unten, Quote-Icon petrol (opacity 0.4), Bild-Hover `scale(1.05)`. Auto-rotate alle 6s, pause on hover. **34 Referenzen** (siehe §9).
- **Marco-Bilder-Galerie:** 3 Bilder, `object-fit: cover`, Hover `scale(1.05)`, radius 8px, Schatten.
- **Mobile-Navigation:** Hamburger → Vollbild-Overlay (weiss), Menüpunkte faden gestaffelt ein (`--i` Custom-Property steuert `transition-delay`).

---

## 7. Seitenstruktur & Navigation

### Startseite (`/`) — Sektionen in dieser Reihenfolge
1. **Header** (transparent, weisse Schrift) — Titel „BURGMEIJER RAI-Experte" + Nav
2. **Hero** — h1 „BURGMEIJER RAI-Experte", h3 „Optimale Tarifstufen mit minimalem Dokumentationsaufwand", Scroll-Pfeil
3. **Über-mich-Intro** (`#main`) — „Pflegedokumentation einfach und Krankenkassentauglich, ich zeige Ihnen wie." + rundes Foto (`Burgm_Foto_Farbverlauf.webp`)
4. **Angebote** (`#angebot`) — Filter + 4 Kacheln + Toggle-Preistabelle
5. **Veranstaltungen** — Pretix-Widget (bg `#f0f5fb`)
6. **Über mich** (`#ubermich`) — 2-spaltiger Text + Kontakt-Button
7. **Marco-Bilder** — 3 Fotos (Hund / Computer / Garten)
8. **Referenzen** — Carousel mit 34 Einträgen
9. **Parallax-Divider**
10. **Kontakt** (`#kontakt`) — Formular (Basin) + Kontaktinfos
11. **Footer** — Logo, Kontakt, AGB/Impressum/Datenschutz, LinkedIn, Webtree-Credit

### Navigation (Header, überall gleich)
`Start (./)` · `Angebote (./#angebot)` · `Über mich (./#ubermich)` · `Kontakt (./#kontakt)` · LinkedIn (extern)

### Footer-Links
`AGB (/agb)` · `Impressum (/impressum)` · `Datenschutz (/datenschutz)`

### URL-Map (Links MÜSSEN identisch bleiben — siehe §8)
| Next.js Route | alt (HTML) | Inhalt |
|---|---|---|
| `/` | index.html | Startseite |
| `/tarifstufen` | tarifstufen.html | Angebot 1 |
| `/heiminterne` | heiminterne.html | Angebot 2 |
| `/beratung` | beratung.html | Angebot 3 |
| `/wechselbesarai` | wechselbesarai.html | Angebot 4 |
| `/agb` | agb.html | AGB |
| `/impressum` | impressum.html | Impressum |
| `/datenschutz` | datenschutz.html | Datenschutz |
| `not-found` | 404.html | 404 |

---

## 8. SEO (wichtig — 1:1 erhalten / verbessern)

- **Titles** je Seite (exakt beibehalten):
  - `/` → `Optimale Tarifstufen mit minimalem Dokumentationsaufwand | Rai-experte.ch`
  - `/tarifstufen` → `Tarifstufen Controlling und Coaching | Rai-experte.ch`
  - `/heiminterne` → `Heiminterne Schulungen | Rai-experte.ch`
  - `/beratung` → `Beratung / Unterstützung / Tagesschulung | Rai-experte.ch`
  - `/wechselbesarai` → `Wechsel von BESA auf interRAI LTCF | Rai-experte.ch`
  - `/erfolg` → `Erfolgsnachricht | Rai-experte.ch`
  - `/agb` → `Allgemeine Geschäftsbedingungen | Rai-experte.ch`
  - `/impressum` → `Impressum | Rai-experte.ch`
  - `/datenschutz` → `Datenschutzerklärung | Rai-experte.ch`
- **Meta-Description (Start):** „BURGMEIJER RAI-Experte bietet in der Schweiz professionelle Beratungen und Schulungen zur pflegegerechten Dokumentation. Ich helfe Ihnen, Tarifstufen zu optimieren und den Dokumentationsaufwand zu minimieren, um Krankenkassentauglichkeit zu erreichen. Entdecken Sie unsere Dienstleistungen für den Wechsel von BESA auf interRAI LTCF und verbessern Sie Ihre Pflegeprozesse."
- **og:image** überall: `https://www.rai-experte.ch/assets_marco/webelem/Burgm_Foto_Farbverlauf.webp`
- **og:type** website, **og:site_name** `Rai-experte.ch`
- **Keywords (Start):** Pflegedokumentation Schweiz, Krankenkassentaugliche Dokumentation, Tarifstufen optimieren, Pflegeaufwand-Gruppen, Controlling, Coaching, Heiminterne Schulungen, BESA, interRAI LTCF, Pflegeberatung, RAI-Experte Schweiz, Marco Burgmeijer, RAI Hombrechtikon, Coaching Zürich, Coaching Stäfa …
- **Pflicht-Dateien neu erzeugen:**
  - `robots.txt` → `Sitemap: https://www.rai-experte.ch/sitemap.xml`
  - `sitemap.xml` (Next.js `app/sitemap.ts`) — alle Routen oben.
  - `CNAME` → `rai-experte.ch` (falls weiter GitHub Pages, sonst Hosting-DNS).
- **WICHTIG — alte `.html`-URLs:** Die bestehende `sitemap.xml` und externe Backlinks zeigen auf `index.html`, `tarifstufen.html`, etc. → **301-Redirects** in `next.config.js` von `/tarifstufen.html` → `/tarifstufen` (für alle Seiten), damit kein SEO-Verlust.
- **Strukturierte Daten neu hinzufügen (Verbesserung):** JSON-LD `LocalBusiness` / `Person` (Marco Burgmeijer, Adresse, Telefon, E-Mail) + `Service` je Angebot + `Review`/`AggregateRating` aus den Referenzen.
- **Empfohlen:** `lang="de-CH"` auf `<html>` (aktuell fälschlich `en` — bei Migration korrigieren).

---

## 9. Inhalte

### 9.1 Angebote (4) — für Payload Collection `angebote`
Jedes Angebot: Nummer, Titel, Slug, Kachel-Farbe, Filter-Gruppe, Beschreibung, og.

| # | Titel | Slug | Farbe | Gruppe | Beschreibung (Kern) |
|---|---|---|---|---|---|
| 1 | Tarifstufen Controlling und Coaching | `tarifstufen` | `#3c98a0` | coaching | Fehlerkosten bei Kodierung vermeiden; Coaching & Unterstützung der Mitarbeitenden. |
| 2 | Heiminterne Schulungen | `heiminterne` | `#5fb0b5` | beratung | Praxisorientierte Schulungen, korrekte Dokumentation & Kodierung pflegestufenrelevanter Items, angepasst an Ihre Wünsche. |
| 3 | Beratung / Unterstützung / Tagesschulung | `beratung` | `#c3d7ef` | beratung | Fehlende RAI-Erfahrung? Unterstützung für Supervisor:in / RAI-Expert:in. Ich übernehme die Experten-Aufgaben, bis eine interne Lösung aufgebaut ist. |
| 4 | Wechsel von BESA auf interRAI LTCF | `wechselbesarai` | `#a5c7e8` | wechsel | Begleitung des Veränderungsprozesses, Implementierung von interRAI LTCF, korrekte Kodierung, Support für Supervisor:in & interne RAI-Expert:in solange nötig. |

Jede Angebots-Seite hat zusätzlich: H3 „Beschreibung", die gemeinsame **Preistabelle** (§9.2), CTA „Kontakt" (→ `/#kontakt`), „Tarife öffnen"-Toggle, „Zurück" (→ `/#angebot`) und Cross-Links zu den 3 anderen Angeboten (das eigene wird ausgelassen).

### 9.2 Preistabelle / Tarife (identisch auf allen Angebots-Seiten + Startseite)
Im CMS als editierbare Zeilen **Titel + Beschreibung** (Global `preise`, siehe `MIGRATION-PROMPT.md`).
| Titel | Beschreibung |
|---|---|
| Erstberatung | Kostenlos |
| Beratung / Unterstützung / Tagesschulung | CHF 1900 |
| Tagesschulung | 8 - 12 H \| Pause \| 13 - 16 H — Die Pausenzeiten können nach Absprache mit den Teilnehmenden angepasst werden. |
| Halbtageseinsätze | Nach Vereinbarung |
| Preise 2025 | Die Preise entsprechen ihren Gesamtkosten, da keine MwSt. erhoben wird. |
| Tarife ab 2026 | exkl. MwSt. |
| Reisespesen | CHF 0.70 pro Kilometer. |

### 9.3 Über mich (Marco)
- „Marco Burgmeijer" — Niederländer, 1997 in die Schweiz, seither in Führung tätig, BESA-Tutor & RAI-Experte. 2022 eigene Firma gegründet. Vermittelt RAI-NH- und interRAI-LTCF-Expertise praxisnah, mit Humor. Zielgruppe: Alters- & Pflegezentren mit Fachkräftemangel / Unterstützungsbedarf.

### 9.4 Referenzen (34) — für Payload Collection `referenzen`
Felder je Referenz: Einrichtung (Name), Website-URL, Logo/Bild, Zitat, Autor (Name + Funktion), Projekt-Info (Zeitraum/Go-Life). Reihenfolge wie aktuell. Quelle für Volltexte: `index.html` (Carousel-Sektion) + `referenzen.md`.

Liste (Einrichtung → Bild → Autor):
1. APH St. Katharinen Solothurn → `gemeinde-solothurn.webp` → Verena Abegglen
2. Seniorenzentrum Im Reiat → `seniorenzentrum-im-reiat.svg` → Melanie Roth
3. Stiftung Loogarten → `logo_loogarten.webp` → Sandra Häfeli
4. Sophie Guyer → `sophie-guyer_logo.svg` → Sandra Bundi (Go-Life 01.07.2025)
5. Frohmatt → `frohmatt_logo.webp` → Monika Pirovino-Zürcher
6. Lindenhof → `lindenhof.webp` → Christian Prasciolu
7. Altersheim Neuhof → `LG-Altersheim-Neuhof-Logo_RGB.svg` → Bettina Keller
8. Alterszentrum Bachtele → `Bachtele.png` → Andrea Rüfenacht
9. Blumenau → `logo-blumenau.png` → Lea Graf
10. Zentrum Rämismühle → `logo_zentrum_raemismuehle.svg` → Eva Meier-Heusser
11. Luegeten → `luegeten.svg` → Remo Fehlmann
12. Lindehus im Spiegel (Pflegezentren Tösstal) → `lindehus-im-spiegel.svg` → Arlette Brunner-Benz
13. Alterswohnen Muttenz → `Logo_Alterswohnen_Muttenz.svg` → Teilnehmer der Fortbildung
14. Alterszentrum am Etzel → `logo-am-etzel.png` → Claudia Tschümperlin
15. Pflegezentrum Forch → `logo_pflegezentrum_forch.svg` → Kai Kröber (Wechsel)
16. Pflegezentrum Forch → `logo_pflegezentrum_forch.svg` → Kai Kröber (Controlling)
17. Pflegezentrum Wildbach Wetzikon → `Wetzikon_Pflegezentrum_Wildbach.svg` → Anna Job
18. Luegeten → `luegeten.svg` → Alexander Kranzdorf (Controlling)
19. OGRJ → `logo-ogrj.png` → Agnes Rüegg
20. Alterszentrum Sunnetal → `alterszentrum-sunnetal.png` → Fouzia Bashir
21. Institut Menzingen → `Logo_Kloster_Menzingen.svg` → Sanja Andrejic
22. Kompetenzzentrum Oberarth → `Logo-Kompetenzzentrum_Arth.png` → Ursula Heinl (Wechsel)
23. APH Lachen (Biberzelten) → `logo-aph-lachen.svg` → Ramona Fröhli
24. Im Spitz Pflegezentrum Kloten → `im-spitz-pflegezentrum.jpg` → Meltem Aykol
25. Seniorenzentrum Engelhof → `Engelhof_Logo.svg` → (nur Projekt-Info, Go-Life 01.01.2026)
26. Öffentl. interRAI LTCF Grundschulung → `Burgm_Logo_web.svg` → Yvonne HF & Doris FaGe
27. Öffentl. interRAI LTCF Aufbauschulung → `Burgm_Logo_web.svg` → Birgit
28. Kompetenzzentrum Oberarth → `oberarth.jpg` → Ursula Heinl (Audits)
29. Kompetenzzentrum Oberarth → `oberarth.jpg` → Regula Winkler (Basisschulung)
30. Alterszentrum Böndler → `boendler.jpg` → Miriam Wiedmer
31. Haus Tabea → `haustabea.jpg` → Karin Daunois
32. Zentrum im Hof → `zentrum-im-hof.jpg` → Christa De Mey
33. Grünhalde → `GH-Logo.png` → Nerina Selemovic
34. Sophie Guyer → `sophie-guyer_logo.svg` → Sandra Bundi (Inhouse 17.04.2026)

### 9.5 Veranstaltungen / Tickets — komplett über Payload (kein Pretix mehr)
- Collection `veranstaltungen` (Titel, Datum von/bis, Ort, Ziele, Zielgruppe, Themen,
  Preis + Preis-Info, Plätze, Anmeldeschluss, Status, Bild) → Anzeige in der
  „Veranstaltungen"-Sektion der Startseite.
- Collection `anmeldungen` — Leute melden sich über ein eigenes Formular an; Eintrag
  in Payload + **Resend**-Bestätigung an die Person & Benachrichtigung an Marco.
- Restplätze = Plätze − bestätigte Anmeldungen; bei 0 → „ausgebucht".

**Aktuelle Beispiel-Veranstaltung (aus Pretix übernommen, als Seed):**
- **Titel:** interRAI LTCF Pflegehelferin oder Pflegehelfer
- **Datum:** Do, 27. August 2026, 13:00–16:00 · **Ort:** Stiftung Loogarten, Esslingen
- **Zielgruppe:** Pflegehelferinnen und Pflegehelfer
- **Ziele:** einfache & korrekte Dokumentation in interRAI-LTCF-Sprache · Wichtigkeit
  ADL-Index, Level & korrekte Dokumentation · wirtschaftliche Bedeutung von interRAI LTCF
- **Themen:** interRAI LTCF Basics (Philosophie/Hauptfunktionen, ADL-Index & Level) ·
  Leitlinien der Dokumentation (Empfehlungen BESA Qsys, einfache aussagekräftige
  Dokumentation der ADL-Index-Items) · wirtschaftliche Auswirkungen von RAI-Beurteilungen ·
  praktische Beispiele & Übungen
- **Preis:** CHF 95 (Halbtages-Schulung), Zahlung auf Rechnung · **Verfügbar:** 7 Plätze
- *(Volltext-Felder siehe `MIGRATION-PROMPT.md` → „Seed: Beispiel-Veranstaltung".)*

### 9.6 Rechtstexte (Volltexte aus den HTML-Dateien übernehmen)
- **Impressum:** Marco Burgmeijer · Sunnmatt 1, 8634 Hombrechtikon · Tel +41 76 457 44 82 · rai-experte@gmx.ch · UID CHE-294.549.553 · Haftungsausschluss · Urheberrecht.
- **AGB:** Stand Mai 2025. Kapitel: Allgemeines, Geltungsbereich, Vertragsabschluss, Leistungen/Treuepflicht, Geistiges Eigentum, Zahlungsbedingungen, Annullation (4 Wochen = 50 %, 2 Wochen = 100 %), Änderungen, Gerichtsstand Zürich / Schweizer Recht.
- **Datenschutz:** Stand Mai 2025, Schweizer DSG, Verweis EDÖB (https://www.edoeb.admin.ch). Kapitel inkl. Server-Logfiles, Kontaktformular, Rechte der Betroffenen etc.

---

## 10. Assets (alle nach `public/` übernehmen, Pfade beibehalten)

Aktuelle Ordner → empfohlen unter `public/` 1:1 spiegeln, damit `og:image`-/Logo-URLs gleich bleiben:
- `assets_marco/webelem/` — Logos, Favicon, Hero-Verläufe, Pfeile, Marco-Rundfoto
  - Logo: `Burgm_Logo_web.svg`, `Burgm_LogoEZ_rgb.svg`, `Burgm_LogoEZ_weiss_rgb.svg`
  - Favicon: `Burgm_Favicon_B.svg`
  - Hero: `Burgm_Startseite_HGFarbverlauf.webp` (+ `_small`), Mobile `images/ui/handystart.webp`
  - Marco-Foto: `Burgm_Foto_Farbverlauf.webp` (auch og:image)
  - Divider/Parallax: `Burgm_Startseite_Divider_Text.webp`, Mobile `images/ui/Burgm_Startseite_Divider_Mob_230907.webp`
  - Pfeile: `Burgm_Pfeil_HGweiss.svg`, `Burgm_Pfeil_HGpetrol.svg`, `images/ui/Burgm_Pfeil_weiss.svg`, `images/ui/Burgm_Pfeil_HGweiss_petrol.svg`
- `assets_marco/images/referenzen/` — 30+ Logos der Einrichtungen (siehe §9.4)
- `assets_marco/images/marco/` — `Foto_Marco_Hund.webp`, `Foto_Marco_Computer.webp`, `marco-garten-computer.webp`
- `assets_marco/images/ui/` — `404.svg`, `icons8-linkedin.svg`, Divider, handystart

> In Next.js: statische Logos/Hero über `next/image` (oder `<img>` für SVG). Bilder, die später vom Kunden gepflegt werden (Referenz-Logos, Veranstaltungen), als **Payload Media-Uploads**.

---

## 11. Migration-Prinzipien (Kurzfassung)

1. **Visuell 1:1** — gleiche Farben (Petrol-Palette, keine neue Leitfarbe), Fonts, Spacing, Effekte, Reihenfolge. Punktuell „etwas cooler" erlaubt (sanfte Motion/Hover), aber Layout & Inhalt bleiben gleich.
2. **Links identisch** — gleiche Slugs/Anker; alte `.html`-URLs per 301 weiterleiten.
3. **Voll responsive** — Breakpoints 1199/991/767/479 px nachbilden; Mobile-Hamburger-Overlay.
4. **Alles CMS-gepflegt (Payload)** — Angebote, Referenzen, **Veranstaltungen + Anmeldungen**, **Preise/Tarife**, Rechtstexte, Über-mich, Kontaktdaten. Nichts hartkodiert.
5. **Neue Infrastruktur** — **Resend** statt Basin (Inline-Erfolg statt `/erfolg`), **Payload-Events** statt Pretix, **Cloudflare R2** für Media.
6. **Effizienter, konsistenter Code** — Server Components default, wiederverwendbare Komponenten, CSS-Variablen für Farben, Typsicherheit, statisch/ISR wo möglich.
7. **SEO ≥ heute** — Metadata-API, sitemap, robots, JSON-LD, `lang="de-CH"`.

> Detaillierter Umsetzungs-Auftrag & Payload-Schemas: siehe **`MIGRATION-PROMPT.md`**.


bei unsicherheiten kannst du in ../sportara-ag schauen gehen, das projekt ist gleich mit payload und next