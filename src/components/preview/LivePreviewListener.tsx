'use client'

/**
 * LivePreviewListener — verbindet das Frontend mit Payloads Live-Preview-Iframe.
 *
 * Läuft das Frontend im Admin-Preview-Iframe, schickt der Admin bei jeder
 * Feld-Änderung postMessage-Events. Diese Komponente reagiert mit
 * `router.refresh()`, sodass die Server-Components mit den frisch gespeicherten
 * CMS-Daten neu rendern. Bewusst OHNE Drafts: jede Änderung speichert direkt,
 * der Refresh holt die produktiven Daten via Local API.
 *
 * Self-Gating: rendert RefreshRouteOnSave NUR, wenn die App tatsächlich in
 * einem Iframe läuft (window.self !== window.top — nur im Admin-Preview wahr).
 * Auf normalen Public-Pages → null, kein globaler message-Listener.
 */
import { RefreshRouteOnSave } from '@payloadcms/live-preview-react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export function LivePreviewListener() {
  const router = useRouter()
  const serverURL = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'
  const [inIframe, setInIframe] = useState(false)

  // useState + useEffect statt direktem window-Check → SSR-sicher, keine
  // Hydration-Mismatches (Server kennt window.top nicht).
  useEffect(() => {
    setInIframe(window.self !== window.top)
  }, [])

  if (!inIframe) return null

  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />
}
