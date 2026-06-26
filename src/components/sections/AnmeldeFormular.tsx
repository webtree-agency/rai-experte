'use client'

/**
 * AnmeldeFormular — pro Veranstaltung. „Anmelden" klappt das Formular inline auf.
 * Postet via Server Action `submitAnmeldung` → `anmeldungen` + Resend. Bei Erfolg
 * cleane Inline-Bestätigung. Bei „ausgebucht" ist der Button deaktiviert.
 */
import { useActionState, useState } from 'react'
import { submitAnmeldung, INITIAL_STATE, type FormState } from '@/app/(frontend)/actions/forms'
import { FormField, Honeypot } from '@/components/ui/FormField'

type Props = { veranstaltungId: number; ausgebucht: boolean }

export function AnmeldeFormular({ veranstaltungId, ausgebucht }: Props) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState<FormState, FormData>(
    submitAnmeldung,
    INITIAL_STATE,
  )

  if (ausgebucht) {
    return (
      <button type="button" disabled className="btn btn-border cursor-not-allowed opacity-60">
        Ausgebucht
      </button>
    )
  }

  if (state.status === 'success') {
    return (
      <div className="rounded-lg border border-petrol/20 bg-surface-gray p-6">
        <h4 className="text-lg font-semibold text-petrol">Anmeldung erfolgreich!</h4>
        <p className="mt-2 font-light">
          Vielen Dank für Ihre Anmeldung. Sie erhalten in Kürze eine Bestätigung per E-Mail.
        </p>
      </div>
    )
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn btn-green">
        Anmelden
      </button>
    )
  }

  const errors = state.status === 'error' ? (state.fields ?? {}) : {}
  const serverError = state.status === 'error' && state.reason === 'server'

  return (
    <form action={action} noValidate className="mt-4 flex flex-col gap-5 rounded-lg bg-white p-6 shadow-sm">
      <Honeypot />
      <input type="hidden" name="veranstaltung" value={veranstaltungId} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField name="vorname" label="Vorname" required autoComplete="given-name" error={errors.vorname} />
        <FormField name="nachname" label="Nachname" required autoComplete="family-name" error={errors.nachname} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField name="email" label="E-Mail" type="email" required autoComplete="email" error={errors.email} />
        <FormField name="telefon" label="Telefon" type="tel" autoComplete="tel" error={errors.telefon} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField name="firma" label="Firma (optional)" autoComplete="organization" error={errors.firma} />
        <FormField name="anzahlPersonen" label="Anzahl Personen" type="number" min={1} defaultValue="1" error={errors.anzahlPersonen} />
      </div>
      <FormField name="bemerkung" label="Bemerkung (optional)" multiline error={errors.bemerkung} />

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
        </p>
      )}

      <div className="flex flex-col items-start gap-3">
        <button type="submit" disabled={pending} className="btn btn-green disabled:opacity-60">
          {pending ? 'Senden …' : 'Anmeldung absenden'}
        </button>
        <button type="button" onClick={() => setOpen(false)} className="btn btn-border">
          Abbrechen
        </button>
      </div>
    </form>
  )
}
