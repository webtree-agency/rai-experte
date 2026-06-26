'use client'

/**
 * Kontaktformular — postet via Server Action `submitKontakt` in
 * `kontaktanfragen` + Resend. Bei Erfolg cleane Inline-Bestätigung (kein
 * Redirect, kein Basin). Validierung wie alt (Name-Pattern, required).
 */
import { useActionState } from 'react'
import { submitKontakt, INITIAL_STATE, type FormState } from '@/app/(frontend)/actions/forms'
import { FormField, Honeypot } from '@/components/ui/FormField'

export function KontaktFormular() {
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
  const serverError = state.status === 'error' && state.reason === 'server'

  return (
    <form action={action} noValidate className="flex flex-col gap-5">
      <Honeypot />
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <FormField
          name="name"
          label="Vor-/Nachname"
          required
          pattern="[A-Za-zÄÖÜäöüéèàç\s-]{2,}"
          title="Nur Buchstaben und Leerzeichen"
          autoComplete="name"
          error={errors.name}
        />
        <FormField name="email" label="E-Mail" type="email" required autoComplete="email" error={errors.email} />
      </div>
      <FormField name="telefon" label="Telefonnummer" type="tel" required autoComplete="tel" error={errors.telefon} />
      <FormField name="nachricht" label="Nachricht" multiline required error={errors.nachricht} />

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
