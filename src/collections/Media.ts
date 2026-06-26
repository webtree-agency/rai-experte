/**
 * Media — Bilder (Referenz-Logos, Veranstaltungsbilder, Marco-Fotos).
 *
 * Uploads gehen nach Cloudflare R2 (sofern S3-Env gesetzt), sonst lokal.
 * Sharp resized auf 3 Sizes (thumb/card/hero) und schreibt WebP.
 * alt ist Pflicht (Barrierefreiheit + SEO).
 */
import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Bild / Medium', plural: 'Medien' },
  admin: {
    useAsTitle: 'alt',
    group: 'Inhalt',
    description: 'Bilder und Logos. Alt-Text ist Pflicht: kurze, konkrete Beschreibung.',
  },
  access: { read: () => true },
  upload: {
    staticDir: 'public/uploads',
    imageSizes: [
      { name: 'thumb', width: 400, position: 'centre' },
      { name: 'card', width: 800, position: 'centre' },
      { name: 'hero', width: 2400, position: 'centre' },
    ],
    formatOptions: {
      format: 'webp',
      options: { quality: 82 },
    },
    mimeTypes: ['image/*'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: {
        description: 'Was ist auf dem Bild zu sehen? 1 Satz, konkret. Pflicht für Screenreader und SEO.',
      },
    },
  ],
}
