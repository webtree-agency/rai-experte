/**
 * Über mich (Global) — Editorial-Inhalt zu Marco: der Intro-Block (#main) mit
 * rundem Foto sowie die zweispaltige „Über mich"-Sektion (#ubermich) und die
 * Marco-Bildergalerie (3 Fotos).
 */
import type { GlobalConfig } from 'payload'

export const UeberMich: GlobalConfig = {
  slug: 'ueberMich',
  label: 'Über mich',
  admin: {
    group: 'Inhalt',
    description: 'Intro-Text, Über-mich-Text und Marco-Bilder der Startseite.',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'collapsible',
      label: 'Intro-Sektion (unter dem Hero)',
      fields: [
        {
          name: 'introHeading',
          type: 'textarea',
          admin: { description: 'Überschrift der Intro-Sektion. Zeilenumbrüche werden übernommen.' },
        },
        {
          name: 'introAbsaetze',
          type: 'array',
          labels: { singular: 'Absatz', plural: 'Absätze' },
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        {
          name: 'rundfoto',
          type: 'upload',
          relationTo: 'media',
          admin: { description: 'Rundes Foto rechts neben dem Intro-Text.' },
        },
      ],
    },
    {
      type: 'collapsible',
      label: 'Über-mich-Sektion',
      fields: [
        { name: 'name', type: 'text', defaultValue: 'Marco Burgmeijer' },
        {
          name: 'spalte1',
          type: 'array',
          label: 'Spalte 1 (Absätze)',
          labels: { singular: 'Absatz', plural: 'Absätze' },
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
        {
          name: 'spalte2',
          type: 'array',
          label: 'Spalte 2 (Absätze)',
          labels: { singular: 'Absatz', plural: 'Absätze' },
          fields: [{ name: 'text', type: 'textarea', required: true }],
        },
      ],
    },
    {
      name: 'galerie',
      type: 'array',
      label: 'Marco-Bildergalerie',
      labels: { singular: 'Bild', plural: 'Bilder' },
      maxRows: 3,
      admin: { description: '3 Fotos (Hund / Computer / Garten).' },
      fields: [{ name: 'bild', type: 'upload', relationTo: 'media', required: true }],
    },
  ],
}
