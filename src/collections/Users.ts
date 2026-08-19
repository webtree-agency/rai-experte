/**
 * Users — Admin-Auth (Login unter /admin).
 */
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Benutzer', plural: 'Benutzer' },
  /*
   * Brute-Force-Bremse: nach 5 Fehlversuchen 10 Minuten gesperrt. Ohne das
   * nimmt Payload unbegrenzt viele Anmeldeversuche entgegen.
   */
  auth: {
    maxLoginAttempts: 5,
    lockTime: 1000 * 60 * 10,
  },
  admin: {
    useAsTitle: 'email',
    group: 'System',
    description: 'Wer kann sich im RAI-Experte-Admin anmelden?',
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Name',
    },
  ],
}
