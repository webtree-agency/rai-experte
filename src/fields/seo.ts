/**
 * Wiederverwendbare SEO-Field-Group (Title, Description, OG-Image).
 * Wenn leer, nutzt die jeweilige Seite ihren Titel als Fallback.
 */
import type { Field } from 'payload'

export function seoGroup(): Field {
  return {
    name: 'seo',
    type: 'group',
    label: 'SEO',
    admin: {
      description:
        'Suchmaschinen-Snippet und Social-Sharing-Karte. Wenn leer, wird der Seiten-Titel als Fallback verwendet.',
    },
    fields: [
      {
        name: 'title',
        type: 'text',
        maxLength: 70,
        admin: { description: 'Empfohlen max. 60–70 Zeichen — Google schneidet länger ab.' },
      },
      {
        name: 'description',
        type: 'textarea',
        maxLength: 180,
        admin: { description: 'Empfohlen max. 160 Zeichen, aktiv und knackig formuliert.' },
      },
      {
        name: 'ogImage',
        type: 'upload',
        relationTo: 'media',
        admin: { description: 'Optional. Empfohlen: 1200×630. Fallback ist das Marco-Foto.' },
      },
    ],
  }
}
