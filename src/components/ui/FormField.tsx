/**
 * FormField — einheitliches Eingabefeld für die Formulare. Zeigt Label,
 * Pflicht-/Optional-Hinweis und lokalisierte Fehlermeldung (Keys aus den
 * Server Actions: `required` | `invalid`).
 */
import { cn } from '@/lib/utils'

type Props = {
  name: string
  label: string
  type?: string
  required?: boolean
  multiline?: boolean
  pattern?: string
  title?: string
  min?: number
  defaultValue?: string
  autoComplete?: string
  error?: string
}

export function FormField({
  name,
  label,
  type = 'text',
  required = false,
  multiline = false,
  pattern,
  title,
  min,
  defaultValue,
  autoComplete,
  error,
}: Props) {
  const msg = error === 'invalid' ? 'Bitte gültigen Wert eingeben.' : error ? 'Pflichtfeld.' : null
  const base = cn(
    'w-full rounded-md border bg-white px-4 py-3 text-base text-ink transition-colors',
    'placeholder:text-ink/35 focus:outline-none focus:border-form-focus focus:bg-surface-gray',
    error ? 'border-red-400' : 'border-ink/20',
  )

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="mb-2 text-sm font-normal text-ink">
        {label}
      </label>
      {multiline ? (
        <textarea
          id={name}
          name={name}
          rows={5}
          required={required}
          defaultValue={defaultValue}
          aria-invalid={Boolean(error)}
          className={cn(base, 'resize-y')}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          min={min}
          required={required}
          pattern={pattern}
          title={title}
          defaultValue={defaultValue}
          autoComplete={autoComplete}
          aria-invalid={Boolean(error)}
          className={base}
        />
      )}
      {msg && <p className="mt-1.5 text-sm text-red-600">{msg}</p>}
    </div>
  )
}

/** Off-screen Honeypot — von echten Nutzern nie befüllt. */
export function Honeypot() {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden" tabIndex={-1}>
      <label htmlFor="kontakt_ref">Bitte dieses Feld leer lassen</label>
      <input type="text" id="kontakt_ref" name="kontakt_ref" tabIndex={-1} autoComplete="off" />
    </div>
  )
}
