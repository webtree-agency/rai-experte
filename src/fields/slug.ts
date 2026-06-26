/**
 * Wiederverwendbares Slug-Feld. Index + Unique für schnelle Route-Lookups.
 */
import type { Field } from 'payload'

export function slugField(overrides: Partial<Field> = {}): Field {
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    admin: {
      position: 'sidebar',
      description:
        'URL-Fragment, klein und mit Bindestrichen — z. B. "tarifstufen". Wird Teil der öffentlichen URL.',
    },
    ...overrides,
  } as Field
}
