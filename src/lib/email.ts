/**
 * Resend-Mailing für Kontaktanfragen und Event-Anmeldungen (ersetzt Basin/Pretix).
 *
 * Kontakt: nur Team-Alert an Marco (kein Dankesmail an den Absender).
 * Anmeldung: Team-Alert an Marco + Bestätigungsmail mit Übersicht an die Person.
 *
 * Robust by design: fehlt `RESEND_API_KEY` (z. B. lokal), no-op't das Modul leise
 * — der Eintrag ist in Payload bereits gespeichert, der Versand ist additiv und
 * darf das Submit nie gefährden. Resend wirft bei API-Fehlern NICHT, sondern
 * resolved mit `{ data, error }` — wir prüfen `error` selbst.
 *
 * HTML ist bewusst tabellenbasiert mit Inline-Styles (Gmail/Outlook rendern weder
 * Flexbox noch CSS-Variablen zuverlässig).
 */
import { Resend } from 'resend'

// Brand-Tokens (inline, da E-Mails keine Stylesheets/Variablen kennen).
const PETROL = '#007f8b'
const INK = '#26272d'
const BODY = '#4a4a4a'
const FONT = "'Montserrat','Helvetica Neue',Arial,sans-serif"

let cached: { key: string; client: Resend } | null = null
function getResend(): Resend | null {
  const key = process.env.RESEND_API_KEY?.trim()
  if (!key) return null
  if (cached?.key !== key) cached = { key, client: new Resend(key) }
  return cached.client
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function layout(opts: { previewText: string; bodyHtml: string }): string {
  return `<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="color-scheme" content="light" />
</head>
<body style="margin:0;padding:0;background-color:#f0f5fb;">
<span style="display:none;max-height:0;overflow:hidden;opacity:0;">${esc(opts.previewText)}</span>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#f0f5fb;">
  <tr><td align="center" style="padding:40px 20px;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;width:100%;">
      <tr><td align="left" style="padding:0 0 24px;">
        <span style="font-family:${FONT};font-size:24px;line-height:1.2;color:${INK};letter-spacing:-0.01em;">
          <strong style="font-weight:700;">BURGMEIJER</strong> <span style="font-weight:400;">RAI-Experte</span>
        </span>
      </td></tr>
      <tr><td style="border-top:3px solid ${PETROL};font-size:0;line-height:0;">&nbsp;</td></tr>
      <tr><td style="background-color:#ffffff;padding:36px 32px;border-radius:0 0 6px 6px;">
        ${opts.bodyHtml}
      </td></tr>
      <tr><td align="left" style="padding:20px 4px 0;">
        <p style="margin:0;font-family:${FONT};font-size:14px;line-height:1.6;color:#8c8f94;">
          BURGMEIJER RAI-Experte &nbsp;·&nbsp; Sunnmatt 1, 8634 Hombrechtikon &nbsp;·&nbsp; rai-experte@gmx.ch
        </p>
      </td></tr>
    </table>
  </td></tr>
</table>
</body>
</html>`
}

const h1 = (text: string) =>
  `<h1 style="margin:0 0 20px;font-family:${FONT};font-weight:600;font-size:22px;line-height:1.3;color:${INK};">${text}</h1>`
const p = (text: string) =>
  `<p style="margin:0 0 18px;font-family:${FONT};font-weight:400;font-size:16px;line-height:1.75;color:${BODY};">${text}</p>`

function row(label: string, value: string): string {
  return `<tr>
    <td style="padding:9px 0;border-bottom:1px solid #eeeeee;font-family:${FONT};font-size:11px;letter-spacing:0.04em;text-transform:uppercase;color:${PETROL};white-space:nowrap;vertical-align:top;width:140px;">${esc(label)}</td>
    <td style="padding:9px 0 9px 14px;border-bottom:1px solid #eeeeee;font-family:${FONT};font-size:16px;line-height:1.5;color:${INK};">${value}</td>
  </tr>`
}

/* ───────────────────────────── Kontakt ───────────────────────────── */

export type KontaktLead = {
  name: string
  email: string
  telefon?: string
  nachricht: string
  herkunft?: string
}

export async function sendKontaktMails(lead: KontaktLead): Promise<void> {
  const resend = getResend()
  const from = process.env.EMAIL_FROM
  const to = process.env.EMAIL_TO
  if (!resend || !from) {
    console.warn(
      '[kontakt] Mailversand übersprungen — %s%s fehlt in process.env.',
      resend ? '' : 'RESEND_API_KEY ',
      from ? '' : 'EMAIL_FROM',
    )
    return
  }

  const rows = [row('Name', esc(lead.name)), row('E-Mail', `<a href="mailto:${esc(lead.email)}" style="color:${INK};">${esc(lead.email)}</a>`)]
  if (lead.telefon) rows.push(row('Telefon', esc(lead.telefon)))
  if (lead.herkunft) rows.push(row('Anfrage zu', esc(lead.herkunft)))

  const alert =
    h1('Neue Kontaktanfrage') +
    p('Über das Kontaktformular ist eine neue Anfrage eingegangen. Antworte direkt auf diese Mail, um den Absender zu erreichen.') +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;">${rows.join('')}</table>` +
    `<p style="margin:0 0 6px;font-family:${FONT};font-size:11px;letter-spacing:0.04em;text-transform:uppercase;color:${PETROL};">Nachricht</p>` +
    `<div style="font-family:${FONT};font-size:16px;line-height:1.65;color:${INK};white-space:pre-wrap;">${esc(lead.nachricht)}</div>`

  if (!to) {
    console.warn('[kontakt] EMAIL_TO fehlt — kein Empfänger für Team-Alert, Mailversand übersprungen.')
    return
  }

  // Kontaktformular: bewusst KEIN Dankesmail an den Absender — nur Alert an Marco.
  await report([
    {
      label: `team-alert → ${to}`,
      send: resend.emails.send({
        from,
        to,
        replyTo: lead.email,
        subject: `Neue Kontaktanfrage – ${lead.name}`,
        html: layout({ previewText: `Neue Anfrage von ${lead.name}`, bodyHtml: alert }),
      }),
    },
  ])
}

/* ─────────────────────────── Anmeldung ───────────────────────────── */

export type AnmeldungLead = {
  referenz: string
  vorname: string
  nachname: string
  email: string
  telefon?: string
  firma?: string
  anzahlPersonen: number
  bemerkung?: string
  veranstaltungTitel: string
  veranstaltungDatum?: string
  veranstaltungOrt?: string
  veranstaltungPreis?: string
}

export async function sendAnmeldungMails(lead: AnmeldungLead): Promise<void> {
  const resend = getResend()
  const from = process.env.EMAIL_FROM
  const to = process.env.EMAIL_TO
  if (!resend || !from) {
    console.warn(
      '[anmeldung] Mailversand übersprungen — %s%s fehlt in process.env.',
      resend ? '' : 'RESEND_API_KEY ',
      from ? '' : 'EMAIL_FROM',
    )
    return
  }

  const name = `${lead.vorname} ${lead.nachname}`.trim()
  const rows = [
    row('Anmelde-Code', `<strong style="font-weight:600;">${esc(lead.referenz)}</strong>`),
    row('Veranstaltung', esc(lead.veranstaltungTitel)),
    row('Name', esc(name)),
    row('E-Mail', `<a href="mailto:${esc(lead.email)}" style="color:${INK};">${esc(lead.email)}</a>`),
    row('Personen', String(lead.anzahlPersonen)),
  ]
  if (lead.telefon) rows.push(row('Telefon', esc(lead.telefon)))
  if (lead.firma) rows.push(row('Firma', esc(lead.firma)))
  if (lead.veranstaltungDatum) rows.push(row('Datum', esc(lead.veranstaltungDatum)))
  if (lead.veranstaltungOrt) rows.push(row('Ort', esc(lead.veranstaltungOrt)))

  const alert =
    h1('Neue Veranstaltungs-Anmeldung') +
    p('Es ist eine neue Anmeldung eingegangen. Antworte direkt auf diese Mail, um die Person zu erreichen.') +
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;">${rows.join('')}</table>` +
    (lead.bemerkung
      ? `<p style="margin:0 0 6px;font-family:${FONT};font-size:11px;letter-spacing:0.04em;text-transform:uppercase;color:${PETROL};">Bemerkung</p>` +
        `<div style="font-family:${FONT};font-size:16px;line-height:1.65;color:${INK};white-space:pre-wrap;">${esc(lead.bemerkung)}</div>`
      : '')

  const detail = [
    lead.veranstaltungDatum ? `<strong style="color:${INK};font-weight:600;">${esc(lead.veranstaltungDatum)}</strong>` : '',
    lead.veranstaltungOrt ? esc(lead.veranstaltungOrt) : '',
  ]
    .filter(Boolean)
    .join(' · ')

  const ticket =
    `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin:8px 0 22px;background-color:#f0f5fb;border-radius:6px;border-left:4px solid ${PETROL};">
      <tr><td style="padding:18px 20px;">
        <p style="margin:0 0 6px;font-family:${FONT};font-size:11px;font-weight:600;letter-spacing:0.06em;text-transform:uppercase;color:${PETROL};">Ihr Anmelde-Code</p>
        <p style="margin:0 0 12px;font-family:${FONT};font-size:24px;font-weight:700;letter-spacing:0.04em;color:${INK};">${esc(lead.referenz)}</p>
        <p style="margin:0;font-family:${FONT};font-size:14px;font-weight:400;line-height:1.6;color:${BODY};">Bitte bewahren Sie diese E-Mail auf und zeigen Sie sie (oder den Code) beim Eintreffen vor Ort vor.</p>
      </td></tr>
    </table>`

  const preisZeile = lead.veranstaltungPreis
    ? p(`<strong style="color:${INK};font-weight:600;">Kosten:</strong> ${esc(lead.veranstaltungPreis)}. Die Rechnung wird vor Ort bezahlt.`)
    : p('Die Rechnung wird vor Ort bezahlt.')

  const confirm =
    h1('Anmeldung bestätigt') +
    p(`Guten Tag ${esc(lead.vorname)},`) +
    p(`vielen Dank für Ihre Anmeldung zu <strong style="color:${INK};font-weight:600;">${esc(lead.veranstaltungTitel)}</strong>${detail ? ` (${detail})` : ''}.`) +
    p(`Wir haben Ihre Anmeldung für ${lead.anzahlPersonen} Person(en) erhalten. Ich melde mich mit weiteren Details bei Ihnen.`) +
    preisZeile +
    ticket +
    p('Freundliche Grüsse<br />Marco Burgmeijer')

  const tasks: { label: string; send: Promise<{ error: unknown }> }[] = []
  if (to) {
    tasks.push({
      label: `team-alert → ${to}`,
      send: resend.emails.send({
        from,
        to,
        replyTo: lead.email,
        subject: `Neue Anmeldung – ${lead.veranstaltungTitel} – ${name}`,
        html: layout({ previewText: `Anmeldung von ${name}`, bodyHtml: alert }),
      }),
    })
  }
  tasks.push({
    label: `confirm → ${lead.email}`,
    send: resend.emails.send({
      from,
      to: lead.email,
      subject: `Anmeldebestätigung – ${lead.veranstaltungTitel}`,
      html: layout({ previewText: 'Ihre Anmeldung ist bestätigt.', bodyHtml: confirm }),
    }),
  })

  await report(tasks)
}

async function report(tasks: { label: string; send: Promise<{ error: unknown }> }[]): Promise<void> {
  const results = await Promise.allSettled(tasks.map((t) => t.send))
  results.forEach((r, i) => {
    const { label } = tasks[i]
    if (r.status === 'rejected') {
      console.error('[mail] %s — Versand fehlgeschlagen (throw):', label, r.reason)
    } else if (r.value?.error) {
      console.error('[mail] %s — Resend lehnte ab:', label, r.value.error)
    }
  })
}
