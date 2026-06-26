/**
 * Angebote — die 4 Dienstleistungen (Tarifstufen, Heiminterne, Beratung,
 * Wechsel BESA→interRAI). Erscheinen als farbige Kacheln auf der Startseite
 * (gefiltert) und jeweils als eigene Unterseite (/<slug>).
 */
import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'
import { seoGroup } from '../fields/seo'

export const Angebote: CollectionConfig = {
  slug: 'angebote',
  labels: { singular: 'Angebot', plural: 'Angebote' },
  admin: {
    useAsTitle: 'titel',
    defaultColumns: ['nummer', 'titel', 'slug', 'filterGruppe'],
    group: 'Inhalt',
    description: 'Die 4 Angebote. Reihenfolge über das Feld „Nummer".',
  },
  defaultSort: 'nummer',
  access: { read: () => true },
  fields: [
    {
      name: 'nummer',
      type: 'number',
      required: true,
      admin: { position: 'sidebar', description: 'Reihenfolge (1–4).' },
    },
    { name: 'titel', type: 'text', required: true },
    slugField({
      admin: {
        position: 'sidebar',
        description: 'Muss exakt bleiben: tarifstufen | heiminterne | beratung | wechselbesarai',
      },
    }),
    {
      name: 'kachelFarbe',
      type: 'select',
      required: true,
      defaultValue: 'offer-1',
      admin: { position: 'sidebar', description: 'Farbe der Kachel (je Angebot eine Farbe).' },
      options: [
        { label: 'Petrol dunkel (#3c98a0) — Angebot 1', value: 'offer-1' },
        { label: 'Petrol mittel (#5fb0b5) — Angebot 2', value: 'offer-2' },
        { label: 'Blau hell (#c3d7ef) — Angebot 3', value: 'offer-3' },
        { label: 'Blau mittel (#a5c7e8) — Angebot 4', value: 'offer-4' },
      ],
    },
    {
      name: 'filterGruppe',
      type: 'select',
      required: true,
      admin: { position: 'sidebar', description: 'Filter-Zuordnung auf der Startseite.' },
      options: [
        { label: 'Coaching', value: 'coaching' },
        { label: 'Beratung', value: 'beratung' },
        { label: 'Wechsel', value: 'wechsel' },
      ],
    },
    {
      name: 'kurztext',
      type: 'textarea',
      required: true,
      admin: { description: 'Kurzer Kachel-Text auf der Startseite (kann mit Zeilenumbrüchen).' },
    },
    {
      name: 'beschreibung',
      type: 'richText',
      required: true,
      admin: { description: 'Seiteninhalt unter der Überschrift „Beschreibung".' },
    },
    seoGroup(),
  ],
}
