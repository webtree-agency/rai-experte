/**
 * Kontakt (Global) — zentrale Kontaktdaten. Genutzt in Kontakt-Sektion, Footer
 * und JSON-LD. Eine Quelle, überall identisch.
 */
import type { GlobalConfig } from 'payload'

export const Kontakt: GlobalConfig = {
  slug: 'kontakt',
  label: 'Kontaktdaten',
  admin: {
    group: 'Inhalt',
    description: 'Adresse, E-Mail, Telefon, UID, LinkedIn — überall identisch verwendet.',
  },
  access: { read: () => true },
  fields: [
    { name: 'strasse', type: 'text', required: true, defaultValue: 'Sunnmatt 1' },
    { name: 'plzOrt', type: 'text', required: true, defaultValue: '8634 Hombrechtikon' },
    { name: 'land', type: 'text', defaultValue: 'Schweiz' },
    { name: 'email', type: 'email', required: true, defaultValue: 'rai-experte@gmx.ch' },
    { name: 'telefon', type: 'text', required: true, defaultValue: '+41 76 457 44 82' },
    { name: 'uid', type: 'text', defaultValue: 'CHE-294.549.553' },
    {
      name: 'linkedin',
      type: 'text',
      defaultValue: 'https://www.linkedin.com/in/marco-BURGMEIJER-7408641a5/',
    },
  ],
}
