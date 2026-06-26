/**
 * Referenzen — Testimonials der Einrichtungen (Carousel auf der Startseite).
 * Reihenfolge über das Feld „reihenfolge".
 */
import type { CollectionConfig } from 'payload'

export const Referenzen: CollectionConfig = {
  slug: 'referenzen',
  labels: { singular: 'Referenz', plural: 'Referenzen' },
  admin: {
    useAsTitle: 'einrichtung',
    defaultColumns: ['reihenfolge', 'einrichtung', 'autorName'],
    group: 'Inhalt',
    description: 'Kundenstimmen / Referenzen. Reihenfolge über „Reihenfolge".',
  },
  defaultSort: 'reihenfolge',
  access: { read: () => true },
  fields: [
    {
      name: 'reihenfolge',
      type: 'number',
      required: true,
      admin: { position: 'sidebar', description: 'Position im Carousel.' },
    },
    { name: 'einrichtung', type: 'text', required: true, admin: { description: 'Name der Institution.' } },
    {
      name: 'websiteUrl',
      type: 'text',
      admin: { description: 'Externe Website der Einrichtung (öffnet in neuem Tab). Optional.' },
    },
    {
      name: 'logo',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'Logo / Bild der Einrichtung.' },
    },
    {
      name: 'zitat',
      type: 'textarea',
      admin: { description: 'Testimonial-Text. Darf leer sein (z. B. nur Projekt-Info).' },
    },
    { name: 'autorName', type: 'text', admin: { description: 'Name der zitierten Person.' } },
    { name: 'autorFunktion', type: 'text', admin: { description: 'Funktion / Rolle der Person.' } },
    {
      name: 'projektInfo',
      type: 'textarea',
      admin: { description: 'Zeitraum / Go-Life / Art des Projekts.' },
    },
  ],
}
