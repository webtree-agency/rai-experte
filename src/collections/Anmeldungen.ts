/**
 * Anmeldungen — Event-Registrierungen.
 *
 * Access:
 *   - create: public (Anmeldeformular schreibt direkt rein, via Server Action)
 *   - read/update/delete: nur Admin
 *
 * Restplätze einer Veranstaltung = plaetze − Anzahl bestätigter Anmeldungen.
 * Mailversand passiert in der Server Action (lib/email), nicht als Hook.
 */
import type { CollectionConfig } from 'payload'

export const Anmeldungen: CollectionConfig = {
  slug: 'anmeldungen',
  labels: { singular: 'Anmeldung', plural: 'Anmeldungen' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['nachname', 'vorname', 'veranstaltung', 'anzahlPersonen', 'status', 'createdAt'],
    group: 'Anmeldungen',
    description: 'Eingegangene Event-Anmeldungen.',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    {
      name: 'veranstaltung',
      type: 'relationship',
      relationTo: 'veranstaltungen',
      required: true,
    },
    { name: 'vorname', type: 'text', required: true },
    { name: 'nachname', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'telefon', type: 'text' },
    { name: 'firma', type: 'text', admin: { description: 'Optional, z. B. Pflegezentrum.' } },
    { name: 'anzahlPersonen', type: 'number', defaultValue: 1, min: 1 },
    { name: 'bemerkung', type: 'textarea' },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'neu',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Neu', value: 'neu' },
        { label: 'Bestätigt', value: 'bestätigt' },
        { label: 'Storniert', value: 'storniert' },
      ],
    },
  ],
}
