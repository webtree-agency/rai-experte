/**
 * Rechtstexte (Global) — Impressum / AGB / Datenschutz als RichText.
 * Die Seiten /impressum, /agb, /datenschutz rendern diese Felder.
 */
import type { GlobalConfig } from 'payload'

export const Rechtstexte: GlobalConfig = {
  slug: 'rechtstexte',
  label: 'Rechtstexte',
  admin: {
    group: 'Inhalt',
    description: 'Impressum, AGB und Datenschutzerklärung — voll editierbar.',
  },
  access: { read: () => true },
  fields: [
    { name: 'impressum', type: 'richText' },
    { name: 'agb', type: 'richText' },
    { name: 'datenschutz', type: 'richText' },
  ],
}
