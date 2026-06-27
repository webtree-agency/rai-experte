'use client'

/**
 * AnmeldeFormular — pro Veranstaltung. „Anmelden" klappt das Formular inline auf.
 * Postet via Server Action `submitAnmeldung` → `anmeldungen` + Resend. Bei Erfolg
 * cleane Inline-Bestätigung. Bei „ausgebucht" ist der Button deaktiviert.
 */
import { useActionState, useState } from 'react'
import { submitAnmeldung } from '@/app/(frontend)/actions/forms'
import { INITIAL_STATE, type FormState } from '@/app/(frontend)/actions/form-state'
import { FormField, Honeypot } from '@/components/ui/FormField'
import { cn } from '@/lib/utils'

type Props = { veranstaltungId: number; ausgebucht: boolean; maxTickets: number }

export function AnmeldeFormular({ veranstaltungId, ausgebucht, maxTickets }: Props) {
  const [open, setOpen] = useState(false)
  const [state, action, pending] = useActionState<FormState, FormData>(
    submitAnmeldung,
    INITIAL_STATE,
  )

  if (ausgebucht) {
    return (
      <button type="button" disabled className="btn btn-border !w-full cursor-not-allowed opacity-60">
        Ausgebucht
      </button>
    )
  }

  if (state.status === 'success') {
    return (
      <div className="rounded-lg border border-petrol/20 bg-surface-gray p-6">
        <h4 className="text-lg font-semibold text-petrol">Anmeldung erfolgreich!</h4>
        <p className="mt-2 font-normal">
          Vielen Dank für Ihre Anmeldung. Sie erhalten in Kürze eine Bestätigung per E-Mail.
        </p>
      </div>
    )
  }

  if (!open) {
    return (
      <button type="button" onClick={() => setOpen(true)} className="btn btn-fill !w-full">
        Anmelden
      </button>
    )
  }

  const errors = state.status === 'error' ? (state.fields ?? {}) : {}
  const values = state.status === 'error' ? (state.values ?? {}) : {}
  const serverError = state.status === 'error' && state.reason === 'server'

  return (
    <form action={action} noValidate className="mt-4 flex flex-col gap-5 rounded-lg bg-white p-6 shadow-sm">
      <Honeypot />
      <input type="hidden" name="veranstaltung" value={veranstaltungId} />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField name="vorname" label="Vorname" required autoComplete="given-name" defaultValue={values.vorname} error={errors.vorname} />
        <FormField name="nachname" label="Nachname" required autoComplete="family-name" defaultValue={values.nachname} error={errors.nachname} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField name="email" label="E-Mail" type="email" required autoComplete="email" defaultValue={values.email} error={errors.email} />
        <FormField name="telefon" label="Telefon" type="tel" autoComplete="tel" defaultValue={values.telefon} error={errors.telefon} />
      </div>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField name="firma" label="Firma (optional)" autoComplete="organization" defaultValue={values.firma} error={errors.firma} />
        <FormField name="anzahlPersonen" label="Anzahl Personen" type="number" min={1} max={maxTickets} defaultValue={values.anzahlPersonen ?? '1'} error={errors.anzahlPersonen} />
      </div>
      <FormField name="bemerkung" label="Bemerkung (optional)" multiline defaultValue={values.bemerkung} error={errors.bemerkung} />

      <div className="flex flex-col">
        <label htmlFor="agb" className="flex items-start gap-3 text-sm font-normal text-ink">
          <input
            id="agb"
            name="agb"
            type="checkbox"
            value="ja"
            required
            aria-invalid={Boolean(errors.agb)}
            className={cn(
              'mt-0.5 h-4 w-4 shrink-0',
              errors.agb ? 'accent-red-600 outline outline-1 outline-red-500' : 'accent-petrol',
            )}
          />
          <span>
            Ich akzeptiere die{' '}
            <a
              href="/agb"
              target="_blank"
              rel="noopener noreferrer"
              className="text-petrol underline underline-offset-2 hover:no-underline"
            >
              AGB
            </a>
            .
          </span>
        </label>
        {errors.agb && <p className="mt-1.5 text-sm text-red-600">Bitte akzeptieren Sie die AGB.</p>}
      </div>

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
        </p>
      )}

      <div className="flex flex-col items-center gap-3">
        <button type="submit" disabled={pending} className="btn btn-fill !w-full disabled:opacity-60">
          {pending ? 'Senden …' : 'Anmeldung absenden'}
        </button>
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="text-sm font-medium text-muted underline-offset-2 transition-colors hover:text-petrol hover:underline"
        >
          Abbrechen
        </button>
      </div>
    </form>
  )
}
