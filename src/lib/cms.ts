/**
 * CMS-Daten-Getter — eine Schicht über der Payload Local API.
 *
 * Jeder Getter ist in `safe()` gewrappt: fällt die DB aus (z. B. Build ohne
 * laufende DB), liefert er `null`/`[]` statt zu crashen. Server Components rufen
 * ausschliesslich diese Getter, nie `getPayload` inline.
 */
import { getPayloadClient } from './payload'
import type {
  Angebote,
  Referenzen,
  Veranstaltungen,
  Preise,
  Kontakt,
  Rechtstexte,
  UeberMich,
  SeoDefault,
} from '@/payload-types'

async function safe<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await fn()
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.warn('[cms] Lesefehler:', err instanceof Error ? err.message : err)
    }
    return fallback
  }
}

export function getSeoDefaults(): Promise<SeoDefault | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'seoDefaults', depth: 1 })
  }, null)
}

export function getKontakt(): Promise<Kontakt | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'kontakt', depth: 0 })
  }, null)
}

export function getPreise(): Promise<Preise | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'preise', depth: 0 })
  }, null)
}

export function getRechtstexte(): Promise<Rechtstexte | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'rechtstexte', depth: 0 })
  }, null)
}

export function getUeberMich(): Promise<UeberMich | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    return payload.findGlobal({ slug: 'ueberMich', depth: 1 })
  }, null)
}

export function getAngebote(): Promise<Angebote[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'angebote',
      sort: 'nummer',
      limit: 20,
      depth: 1,
    })
    return res.docs
  }, [])
}

export async function getAngebot(slug: string): Promise<Angebote | null> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'angebote',
      where: { slug: { equals: slug } },
      limit: 1,
      depth: 1,
    })
    return res.docs[0] ?? null
  }, null)
}

export function getReferenzen(): Promise<Referenzen[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'referenzen',
      sort: 'reihenfolge',
      limit: 100,
      depth: 1,
    })
    return res.docs
  }, [])
}

/** Offene, nicht-vergangene Veranstaltungen (Startseite). */
export function getVeranstaltungen(): Promise<Veranstaltungen[]> {
  return safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'veranstaltungen',
      where: { status: { not_equals: 'vergangen' } },
      sort: 'datumVon',
      limit: 50,
      depth: 1,
    })
    return res.docs
  }, [])
}

/**
 * Restplätze = plaetze − Anzahl bestätigter Anmeldungen.
 * Bestätigt = status „bestätigt" ODER „neu" (Reservierung zählt bereits).
 */
export async function getRestplaetze(veranstaltungId: number, plaetze: number): Promise<number> {
  const belegt = await safe(async () => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'anmeldungen',
      where: {
        and: [
          { veranstaltung: { equals: veranstaltungId } },
          { status: { in: ['neu', 'bestätigt'] } },
        ],
      },
      limit: 0,
      depth: 0,
    })
    // Summe der angemeldeten Personen (anzahlPersonen), nicht nur Anmeldungen.
    return res.docs.reduce((sum, a) => sum + (a.anzahlPersonen ?? 1), 0)
  }, 0)
  return Math.max(0, plaetze - belegt)
}
