/**
 * Veranstaltungen-Seed-Daten (Quelle: veranstaltungen.md).
 *
 * `ziele` → array von Textzeilen (Collection-Feld `ziele[].text`).
 * `themen` → Zeilen für den rich()-Builder: „### …" = h3, „- …" = Listenpunkt,
 *            sonst Absatz.
 * Zeitzonen: August 2026 = +02:00 (Sommerzeit), November 2026 = +01:00 (Winterzeit).
 *
 * Hinweis: Die 3. Veranstaltung (11.11.) hatte in der MD keinen Titel — als
 * „interRAI LTCF Supervisorenschulung" benannt; im CMS jederzeit anpassbar.
 */
export type SeedVeranstaltung = {
  titel: string
  slug: string
  datumVon: string
  datumBis: string
  ort: string
  zielgruppe: string
  ziele: string[]
  themen: string[]
  preis: number
  preisInfo: string
  plaetze: number
}

// Themenblock für die beiden Pflegehelfer-Schulungen (identisch).
const PFLEGEHELFER_THEMEN = [
  'Die Weiterbildung umfasst folgende Themenbereiche:',
  '### interRAI LTCF Basics',
  '- interRAI LTCF: Philosophie und Hauptfunktionen',
  '- ADL-Index und Level',
  '### interRAI LTCF – Leitlinien der Dokumentation',
  '- Empfehlungen BESA Qsys',
  '- Mit Schwerpunkt auf eine einfache und aussagekräftige Dokumentation der relevanten Items des ADL-Index',
  '### Wirtschaftliche Auswirkungen von RAI-Beurteilungen auf die Pflegequalität',
  '### Praktische Beispiele und Übungen',
]

const PFLEGEHELFER_ZIELE = [
  'Die Schulung vermittelt den Teilnehmenden eine einfache und korrekte Dokumentation in der interRAI-LTCF-Sprache.',
  'Die Teilnehmenden kennen die Wichtigkeit des ADL-Index, die einzelnen Level sowie deren korrekte Dokumentation.',
  'Die Teilnehmenden kennen die wirtschaftliche Bedeutung von interRAI LTCF.',
]

export const VERANSTALTUNGEN: SeedVeranstaltung[] = [
  /* 1 ─ Pflegehelfer, 27.08.2026 ─────────────────────────────────────── */
  {
    titel: 'interRAI LTCF Pflegehelferin oder Pflegehelfer',
    slug: 'interrai-ltcf-pflegehelfer-2026-08-27',
    datumVon: '2026-08-27T13:00:00+02:00',
    datumBis: '2026-08-27T16:00:00+02:00',
    ort: 'Stiftung Loogarten, Esslingen',
    zielgruppe: 'Pflegehelferinnen und Pflegehelfer',
    ziele: PFLEGEHELFER_ZIELE,
    themen: PFLEGEHELFER_THEMEN,
    preis: 95,
    preisInfo: 'Halbtages-Schulung CHF 95, Zahlung auf Rechnung',
    plaetze: 16,
  },

  /* 2 ─ Basisschulung, 02.11.2026 ────────────────────────────────────── */
  {
    titel: 'interRAI LTCF Basisschulung',
    slug: 'interrai-ltcf-basisschulung-2026-11-02',
    datumVon: '2026-11-02T08:30:00+01:00',
    datumBis: '2026-11-02T16:00:00+01:00',
    ort: 'Stiftung Loogarten, Esslingen',
    zielgruppe:
      'Personen mit wenig Erfahrung als Koordinator:innen und solche, die demnächst Koordinator:innen-Aufgaben übernehmen.',
    ziele: [
      'Die Schulung vermittelt den Teilnehmenden praxisnah die korrekte und effiziente Anwendung des interRAI LTCF-Instruments in der stationären Langzeitpflege. Dabei werden sowohl die praktische Umsetzung im Pflegealltag als auch die Bedeutung des Instruments für die Qualitätssicherung und den Betrieb aufgezeigt.',
    ],
    themen: [
      '### interRAI LTCF Basics',
      '- interRAI LTCF: Philosophie und Hauptfunktionen',
      '- ADL-Index, Level und Kodierregeln',
      '- Assessment A–S Items',
      '- Identifikationsprotokoll',
      '- RAIsoft.net',
      '### interRAI LTCF – Leitlinien der Dokumentation',
      '- Empfehlungen BESA Qsys',
      '### interRAI LTCF und Evaluation',
      '### Wirtschaftliche Auswirkungen von RAI-Beurteilungen auf die Pflegequalität',
      '### Praktische Beispiele und Übungen',
      '### Methoden',
      'Fachinputs, Praxisübungen, Arbeit direkt im eigenen RAIsoft.net, Diskussion und Erfahrungsaustausch.',
      'Hinweis: Bitte nach Möglichkeit einen Laptop mit Zugang zum RAIsoft.net der eigenen Institution mitbringen (freiwillig, nicht zwingend erforderlich).',
    ],
    preis: 240,
    preisInfo: 'Normales Ticket – CHF 240, Zahlung auf Rechnung',
    plaetze: 16,
  },

  /* 3 ─ Supervisorenschulung, 11.11.2026 ─────────────────────────────── */
  {
    titel: 'interRAI LTCF Supervisorenschulung',
    slug: 'interrai-ltcf-supervisorenschulung-2026-11-11',
    datumVon: '2026-11-11T08:30:00+01:00',
    datumBis: '2026-11-11T16:00:00+01:00',
    ort: 'Stiftung Loogarten, Esslingen',
    zielgruppe:
      'Personen mit wenig Erfahrung als Supervisor:innen und solche, die demnächst Aufgaben als Supervisor:in übernehmen. interRAI LTCF Basisschulung oder BESA QSys Koordinatoren 1+2 wird als Voraussetzung empfohlen.',
    ziele: [
      'Die Schulung zeigt den Teilnehmenden, wie interRAI LTCF gezielt eingesetzt und optimal in den Pflegealltag integriert werden kann. Die Teilnehmenden lernen, wie sie die passende Tarifstufe korrekt bestimmen und so den Kodieraufwand für die Koordinatoren minimieren können.',
    ],
    themen: [
      '### Inhalte',
      '- Beobachtungsphasen effizient planen, neue Beurteilungen starten und effizient durchführen',
      '- Kontrolle/Prüfung der RUG-Liste',
      '- Anwendung der ADL-Index-Tabelle und CPS-Skala',
      '- Anwendung von Merkblatt 5.30, Identifikation der PAG sowie die PAG-relevanten Items',
      '- Levels, Kodierregeln und Leitlinien der Dokumentation',
      '- Nutzung des Identifikationsprotokolls',
      '- Coaching und Aufbau von Koordinatoren',
      '- Beurteilung von Praxisbeispielen',
      '- Wirtschaftliche Auswirkungen von RAI-Beurteilungen auf die Pflegequalität',
      '### Methoden',
      'Fachinputs, Praxisübungen, Arbeit direkt im System RAIsoft.net, Diskussion und Erfahrungsaustausch.',
      'Hinweis: Bitte nach Möglichkeit einen Laptop mit Zugang zum RAIsoft.net der eigenen Institution mitbringen (freiwillig, nicht zwingend erforderlich).',
      'Auf Praxisnähe wird in der Schulung viel Wert gelegt.',
    ],
    preis: 240,
    preisInfo: 'Normales Ticket – CHF 240, Zahlung auf Rechnung',
    plaetze: 16,
  },

  /* 4 ─ Pflegehelfer, 20.11.2026 ─────────────────────────────────────── */
  {
    titel: 'interRAI LTCF Pflegehelferin oder Pflegehelfer',
    slug: 'interrai-ltcf-pflegehelfer-2026-11-20',
    datumVon: '2026-11-20T13:00:00+01:00',
    datumBis: '2026-11-20T16:00:00+01:00',
    ort: 'Stiftung Loogarten, Esslingen',
    zielgruppe: 'Pflegehelferinnen und Pflegehelfer',
    ziele: PFLEGEHELFER_ZIELE,
    themen: PFLEGEHELFER_THEMEN,
    preis: 95,
    preisInfo: 'Halbtages-Schulung CHF 95, Zahlung auf Rechnung',
    plaetze: 16,
  },
]
