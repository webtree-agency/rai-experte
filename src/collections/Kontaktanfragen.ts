/**
 * Kontaktanfragen — Eingänge aus dem Kontaktformular (ersetzt Basin).
 *
 * Access: create public, alles andere nur Admin. Mailversand in der Server
 * Action (lib/email), nicht als Hook.
 */
import type { CollectionConfig } from 'payload'

export const Kontaktanfragen: CollectionConfig = {
  slug: 'kontaktanfragen',
  labels: { singular: 'Kontaktanfrage', plural: 'Kontaktanfragen' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'herkunft', 'status', 'createdAt'],
    group: 'Anmeldungen',
    description: 'Eingegangene Kontaktanfragen aus dem Formular.',
  },
  access: {
    create: () => true,
    read: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'email', type: 'email', required: true },
    { name: 'telefon', type: 'text' },
    { name: 'nachricht', type: 'textarea', required: true },
    {
      name: 'herkunft',
      type: 'text',
      label: 'Anfrage zu',
      admin: {
        position: 'sidebar',
        readOnly: true,
        description: 'Angebot/Seite, von der die Anfrage kam (leer = Startseite).',
      },
    },
    {
      name: 'status',
      type: 'select',
      defaultValue: 'neu',
      admin: { position: 'sidebar' },
      options: [
        { label: 'Neu', value: 'neu' },
        { label: 'Erledigt', value: 'erledigt' },
      ],
    },
  ],
}
