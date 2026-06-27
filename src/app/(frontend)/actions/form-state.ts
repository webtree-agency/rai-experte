/**
 * Geteilte Typen & Konstanten für die Formular-Server-Actions.
 *
 * Bewusst eine eigene Datei OHNE `'use server'`: Module mit `'use server'`
 * dürfen ausschliesslich async-Funktionen exportieren — Objekte/Typen wie
 * `INITIAL_STATE`/`FormState` müssen daher hier liegen.
 */
export type FormState =
  | { status: 'idle' }
  | { status: 'success' }
  | {
      status: 'error'
      reason: 'validation' | 'server'
      fields?: Record<string, string>
      /** Bereits eingegebene Werte — als defaultValue zurückgespielt, damit nach
       *  einem Fehler nichts verloren geht (React 19 resettet das Form sonst). */
      values?: Record<string, string>
    }

export const INITIAL_STATE: FormState = { status: 'idle' }

/** Hard-Cap: max. Tickets pro einzelner Anmeldung (zusätzlich zur Restplatz-Prüfung). */
export const MAX_TICKETS = 5
