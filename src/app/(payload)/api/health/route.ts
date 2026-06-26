/**
 * Health-Endpoint für den Docker-/Traefik-Healthcheck. Bewusst ohne DB-Zugriff
 * (liveness, nicht readiness) → schnell und unabhängig von der DB-Latenz.
 */
import { NextResponse } from 'next/server'

export const dynamic = 'force-dynamic'

export function GET() {
  return NextResponse.json({ status: 'ok' }, { status: 200 })
}
