'use client'

/**
 * Kontaktformular — postet via Server Action `submitKontakt` in
 * `kontaktanfragen` + Resend. Bei Erfolg cleane Inline-Bestätigung (kein
 * Redirect, kein Basin). Validierung wie alt (Name-Pattern, required).
 */
import { useActionState } from 'react'
import { submitKontakt } from '@/app/(frontend)/actions/forms'
import { INITIAL_STATE, type FormState } from '@/app/(frontend)/actions/form-state'
import { FormField, Honeypot } from '@/components/ui/FormField'

type Props = {
  /** Herkunft des Formulars, z. B. „Angebot 1: …" — landet in Mail & CMS, damit Marco die Quelle kennt. */
  herkunft?: string
}

export function KontaktFormular({ herkunft }: Props = {}) {
  const [state, action, pending] = useActionState<FormState, FormData>(submitKontakt, INITIAL_STATE)

  if (state.status === 'success') {
    return (
      <div className="rounded-lg border border-petrol/20 bg-surface-gray p-8">
        <h3 className="heading-sub text-petrol">Nachricht erfolgreich gesendet!</h3>
        <p className="mt-3 text-[18px]">Ich melde mich möglichst bald bei Ihnen.</p>
      </div>
    )
  }

  const errors = state.status === 'error' ? (state.fields ?? {}) : {}
  const values = state.status === 'error' ? (state.values ?? {}) : {}
  const serverError = state.status === 'error' && state.reason === 'server'

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <Honeypot />
      {herkunft && <input type="hidden" name="herkunft" value={herkunft} />}
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          name="name"
          label="Vor-/Nachname"
          required
          pattern="[A-Za-zÄÖÜäöüéèàç\s-]{2,}"
          title="Nur Buchstaben und Leerzeichen"
          autoComplete="name"
          defaultValue={values.name}
          error={errors.name}
        />
        <FormField name="email" label="E-Mail" type="email" required autoComplete="email" defaultValue={values.email} error={errors.email} />
      </div>
      <FormField name="telefon" label="Telefonnummer" type="tel" required autoComplete="tel" defaultValue={values.telefon} error={errors.telefon} />
      <FormField name="nachricht" label="Nachricht" multiline required defaultValue={values.nachricht} error={errors.nachricht} />

      {serverError && (
        <p role="alert" className="text-sm text-red-600">
          Es ist ein Fehler aufgetreten. Bitte versuchen Sie es später erneut.
        </p>
      )}

      <div className="text-center">
        <button type="submit" disabled={pending} className="btn btn-green disabled:opacity-60">
          {pending ? 'Senden …' : 'Senden'}
        </button>
      </div>
    </form>
  )
}
