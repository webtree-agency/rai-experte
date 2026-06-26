/**
 * Preise (Global) — die Tarif-Tabelle. Eine Quelle für Startseite + alle 4
 * Angebots-Seiten (DRY). Voll editierbar: Zeilen frei hinzufügen/ändern/sortieren.
 */
import type { GlobalConfig } from 'payload'

export const Preise: GlobalConfig = {
  slug: 'preise',
  label: 'Preise / Tarife',
  admin: {
    group: 'Inhalt',
    description: 'Tarif-Tabelle. Wird auf Startseite und allen Angebots-Seiten angezeigt.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'zeilen',
      type: 'array',
      label: 'Tarif-Zeilen',
      labels: { singular: 'Zeile', plural: 'Zeilen' },
      admin: { description: 'Jede Zeile: Titel (links) + Beschreibung (rechts).' },
      fields: [
        { name: 'titel', type: 'text', required: true },
        {
          name: 'beschreibung',
          type: 'textarea',
          required: true,
          admin: { description: 'Mehrzeilig erlaubt (Zeilenumbrüche werden angezeigt).' },
        },
      ],
    },
  ],
}
