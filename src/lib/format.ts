/**
 * Datums-Formatierung (Schweizer Format, Europe/Zurich).
 */
const TZ = 'Europe/Zurich'

export function formatDatum(iso?: string | null, withTime = true): string {
  if (!iso) return ''
  try {
    return new Intl.DateTimeFormat('de-CH', {
      dateStyle: 'long',
      ...(withTime ? { timeStyle: 'short' } : {}),
      timeZone: TZ,
    }).format(new Date(iso))
  } catch {
    return ''
  }
}

function timeOnly(iso: string): string {
  return new Intl.DateTimeFormat('de-CH', { timeStyle: 'short', timeZone: TZ }).format(new Date(iso))
}

function sameDay(a: string, b: string): boolean {
  const fmt = new Intl.DateTimeFormat('de-CH', { dateStyle: 'short', timeZone: TZ })
  return fmt.format(new Date(a)) === fmt.format(new Date(b))
}

/** „27. August 2026, 13:00–16:00 Uhr" bzw. mit Bis-Datum an anderem Tag. */
export function formatDatumBereich(von: string, bis?: string | null): string {
  const start = formatDatum(von, true)
  if (!bis) return `${start} Uhr`
  if (sameDay(von, bis)) {
    return `${start}–${timeOnly(bis)} Uhr`
  }
  return `${start} – ${formatDatum(bis, true)} Uhr`
}
