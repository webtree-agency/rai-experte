/**
 * Veranstaltungen — Schulungen/Events (ersetzt Pretix, läuft komplett in Payload).
 * Offene Veranstaltungen erscheinen in der „Veranstaltungen"-Sektion der
 * Startseite mit Anmelde-Button. Restplätze = plaetze − bestätigte Anmeldungen.
 */
import type { CollectionConfig } from 'payload'
import { slugField } from '../fields/slug'

export const Veranstaltungen: CollectionConfig = {
  slug: 'veranstaltungen',
  labels: { singular: 'Veranstaltung', plural: 'Veranstaltungen' },
  admin: {
    useAsTitle: 'titel',
    defaultColumns: ['titel', 'datumVon', 'ort', 'plaetze', 'status'],
    group: 'Inhalt',
    description: 'Schulungen & Veranstaltungen. Status „offen" erscheint auf der Startseite.',
  },
  defaultSort: 'datumVon',
  access: { read: () => true },
  fields: [
    { name: 'titel', type: 'text', required: true },
    slugField(),
    {
      name: 'datumVon',
      type: 'date',
      required: true,
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime', timeFormat: 'HH:mm' },
        description: 'Start (Datum + Uhrzeit).',
      },
    },
    {
      name: 'datumBis',
      type: 'date',
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime', timeFormat: 'HH:mm' },
        description: 'Ende (Datum + Uhrzeit). Optional.',
      },
    },
    { name: 'ort', type: 'text', required: true, admin: { description: 'z. B. „Stiftung Loogarten, Esslingen".' } },
    { name: 'bild', type: 'upload', relationTo: 'media', admin: { description: 'Optionales Bild.' } },
    { name: 'zielgruppe', type: 'text', admin: { description: 'z. B. „Pflegehelferinnen und Pflegehelfer".' } },
    {
      name: 'ziele',
      type: 'array',
      labels: { singular: 'Ziel', plural: 'Ziele' },
      admin: { description: 'Lernziele der Schulung (Aufzählung).' },
      fields: [{ name: 'text', type: 'textarea', required: true }],
    },
    {
      name: 'themen',
      type: 'richText',
      admin: { description: 'Programm / Themenbereiche (mit Zwischenüberschriften und Listen).' },
    },
    {
      name: 'preis',
      type: 'number',
      admin: { position: 'sidebar', description: 'CHF. 0 = kostenlos.' },
    },
    {
      name: 'preisInfo',
      type: 'text',
      admin: { description: 'z. B. „Halbtages-Schulung CHF 95, Zahlung auf Rechnung".' },
    },
    {
      name: 'plaetze',
      type: 'number',
      required: true,
      admin: { position: 'sidebar', description: 'Maximale Teilnehmerzahl.' },
    },
    {
      name: 'anmeldeschluss',
      type: 'date',
      admin: { position: 'sidebar', date: { pickerAppearance: 'dayOnly' }, description: 'Optional.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'offen',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Offen', value: 'offen' },
        { label: 'Ausgebucht', value: 'ausgebucht' },
        { label: 'Abgesagt', value: 'abgesagt' },
        { label: 'Vergangen', value: 'vergangen' },
      ],
    },
  ],
}
