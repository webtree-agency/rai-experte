import { NextResponse, type NextRequest } from 'next/server'

/**
 * Sperrt die Erst-Registrierung des CMS.
 *
 * Solange kein Admin-Konto existiert, liefert Payload unter
 * `/admin/create-first-user` ein offenes Registrierungsformular aus und nimmt
 * unter `POST /api/<users>/first-register` beliebige Konten entgegen: wer die
 * URL kennt, wird Administrator. Beides ist hier standardmässig dicht.
 *
 * Zum einmaligen Anlegen des Admin-Kontos `ALLOW_ADMIN_SETUP=true` in der
 * Umgebung setzen, Konto erstellen, Variable wieder entfernen. Danach greift
 * Payloads eigene Prüfung (Route existiert nicht mehr, sobald ein User da ist).
 */
export function middleware(req: NextRequest) {
  if (process.env.ALLOW_ADMIN_SETUP === 'true') return NextResponse.next()

  // Wie ein nicht existierender Pfad antworten, verrät nicht, dass es die Route gibt.
  return new NextResponse('Not Found', {
    status: 404,
    headers: { 'content-type': 'text/plain; charset=utf-8', 'x-robots-tag': 'noindex' },
  })
}

export const config = {
  matcher: ['/admin/create-first-user', '/api/:collection/first-register'],
}
