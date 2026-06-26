'use server'

/**
 * Server Actions für Kontaktformular und Event-Anmeldung.
 *
 * Beide schreiben über die Payload Local API in die jeweilige Collection und
 * versenden danach additiv Resend-Mails (Fehler dort gefährden das Submit nie).
 * Honeypot-Feld `kontakt_ref`: ist es gefüllt → „Erfolg" vortäuschen, nichts
 * anlegen (Bots erfahren nicht, dass sie gefiltert wurden).
 *
 * Feld-Fehler kommen als stabile Keys (`required` | `invalid`) zurück; die
 * Übersetzung/Anzeige macht das Frontend.
 */
import { getPayloadClient } from '@/lib/payload'
import { sendKontaktMails, sendAnmeldungMails } from '@/lib/email'

export type FormState =
  | { status: 'idle' }
  | { status: 'success' }
  | { status: 'error'; reason: 'validation' | 'server'; fields?: Record<string, string> }

export const INITIAL_STATE: FormState = { status: 'idle' }

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
// Name: Buchstaben (inkl. Umlaute) + Leerzeichen + Bindestrich, mind. 2 Zeichen.
const NAME_RE = /^[A-Za-zÄÖÜäöüéèàç\s-]{2,}$/

function str(value: FormDataEntryValue | null): string {
  return typeof value === 'string' ? value.trim() : ''
}

function int(value: string, fallback: number): number {
  const n = Number.parseInt(value, 10)
  return Number.isFinite(n) && n > 0 ? n : fallback
}

/* ───────────────────────────── Kontakt ───────────────────────────── */

export async function submitKontakt(_prev: FormState, formData: FormData): Promise<FormState> {
  if (str(formData.get('kontakt_ref'))) return { status: 'success' }

  const name = str(formData.get('name'))
  const email = str(formData.get('email'))
  const telefon = str(formData.get('telefon'))
  const nachricht = str(formData.get('nachricht'))

  const fields: Record<string, string> = {}
  if (!name) fields.name = 'required'
  else if (!NAME_RE.test(name)) fields.name = 'invalid'
  if (!email) fields.email = 'required'
  else if (!EMAIL_RE.test(email)) fields.email = 'invalid'
  if (!telefon) fields.telefon = 'required'
  if (!nachricht) fields.nachricht = 'required'
  if (Object.keys(fields).length > 0) return { status: 'error', reason: 'validation', fields }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'kontaktanfragen',
      data: { name, email, telefon, nachricht, status: 'neu' },
    })
    await sendKontaktMails({ name, email, telefon: telefon || undefined, nachricht })
    return { status: 'success' }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[kontakt] create failed:', err instanceof Error ? err.message : err)
    }
    return { status: 'error', reason: 'server' }
  }
}

/* ─────────────────────────── Anmeldung ───────────────────────────── */

function formatDatum(iso?: string | null): string | undefined {
  if (!iso) return undefined
  try {
    return new Intl.DateTimeFormat('de-CH', {
      dateStyle: 'long',
      timeStyle: 'short',
      timeZone: 'Europe/Zurich',
    }).format(new Date(iso))
  } catch {
    return undefined
  }
}

export async function submitAnmeldung(_prev: FormState, formData: FormData): Promise<FormState> {
  if (str(formData.get('kontakt_ref'))) return { status: 'success' }

  const veranstaltungId = int(str(formData.get('veranstaltung')), 0)
  const vorname = str(formData.get('vorname'))
  const nachname = str(formData.get('nachname'))
  const email = str(formData.get('email'))
  const telefon = str(formData.get('telefon'))
  const firma = str(formData.get('firma'))
  const anzahlPersonen = int(str(formData.get('anzahlPersonen')), 1)
  const bemerkung = str(formData.get('bemerkung'))

  const fields: Record<string, string> = {}
  if (!vorname) fields.vorname = 'required'
  if (!nachname) fields.nachname = 'required'
  if (!email) fields.email = 'required'
  else if (!EMAIL_RE.test(email)) fields.email = 'invalid'
  if (!veranstaltungId) fields.veranstaltung = 'required'
  if (Object.keys(fields).length > 0) return { status: 'error', reason: 'validation', fields }

  try {
    const payload = await getPayloadClient()
    await payload.create({
      collection: 'anmeldungen',
      data: {
        veranstaltung: veranstaltungId,
        vorname,
        nachname,
        email,
        telefon: telefon || undefined,
        firma: firma || undefined,
        anzahlPersonen,
        bemerkung: bemerkung || undefined,
        status: 'neu',
      },
    })

    let titel = 'Veranstaltung'
    let datum: string | undefined
    let ort: string | undefined
    try {
      const v = await payload.findByID({
        collection: 'veranstaltungen',
        id: veranstaltungId,
        depth: 0,
      })
      titel = typeof v?.titel === 'string' ? v.titel : titel
      datum = formatDatum(v?.datumVon)
      ort = typeof v?.ort === 'string' ? v.ort : undefined
    } catch {
      /* Detail-Auflösung optional. */
    }

    await sendAnmeldungMails({
      vorname,
      nachname,
      email,
      telefon: telefon || undefined,
      firma: firma || undefined,
      anzahlPersonen,
      bemerkung: bemerkung || undefined,
      veranstaltungTitel: titel,
      veranstaltungDatum: datum,
      veranstaltungOrt: ort,
    })

    return { status: 'success' }
  } catch (err) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('[anmeldung] create failed:', err instanceof Error ? err.message : err)
    }
    return { status: 'error', reason: 'server' }
  }
}
