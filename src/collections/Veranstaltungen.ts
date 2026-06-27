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
  hooks: {
    /**
     * Cascade: Beim Löschen einer Veranstaltung zuerst alle zugehörigen
     * Anmeldungen entfernen. Sonst verletzt der Foreign-Key (anmeldungen.
     * veranstaltung) den Constraint und die Transaktion bricht ab.
     */
    beforeDelete: [
      async ({ req, id }) => {
        await req.payload.delete({
          collection: 'anmeldungen',
          where: { veranstaltung: { equals: id } },
          req,
        })
      },
    ],
  },
  fields: [
    { name: 'titel', type: 'text', required: true },
    slugField(),
    {
      name: 'beschreibung',
      type: 'textarea',
      admin: {
        description: 'Kurze Einleitung / Beschreibung der Veranstaltung (erscheint oben im Detail).',
      },
    },
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
    {
      name: 'ortMapsUrl',
      type: 'text',
      admin: {
        description: 'Optionaler Google-Maps-Link zum Ort (Ort wird dann anklickbar).',
      },
    },
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
    /**
     * Angemeldete Personen direkt in der Veranstaltung — Join auf die
     * Anmeldungen-Collection (Feld „veranstaltung"). So sieht der Kunde mit
     * einem Klick, wer sich für genau diese Veranstaltung angemeldet hat.
     */
    {
      name: 'anmeldungen',
      type: 'join',
      collection: 'anmeldungen',
      on: 'veranstaltung',
      label: 'Angemeldete Personen',
      admin: {
        defaultColumns: ['nachname', 'vorname', 'email', 'telefon', 'anzahlPersonen', 'status'],
        description: 'Wer sich für diese Veranstaltung angemeldet hat.',
      },
    },
  ],
}
