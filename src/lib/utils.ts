import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/** Tailwind-sichere Klassen-Komposition. */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs))
}

/** Bild-URL aus einem Payload-Media-Relation-Wert (id|Media|null) ziehen. */
export function mediaUrl(value: unknown): string | null {
  if (value && typeof value === 'object' && 'url' in value) {
    const url = (value as { url?: string | null }).url
    return url ?? null
  }
  return null
}

/** Alt-Text aus einem Payload-Media-Relation-Wert ziehen. */
export function mediaAlt(value: unknown, fallback = ''): string {
  if (value && typeof value === 'object' && 'alt' in value) {
    return (value as { alt?: string | null }).alt ?? fallback
  }
  return fallback
}
