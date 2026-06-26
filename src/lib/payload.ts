/**
 * Payload Local-API-Client für Server Components & Server Actions.
 * `getPayload` ist teuer (DB-Pool) — daher pro Process cachen.
 */
import { getPayload, type Payload } from 'payload'
import config from '@payload-config'

let cached: Promise<Payload> | null = null

export function getPayloadClient(): Promise<Payload> {
  if (!cached) cached = getPayload({ config })
  return cached
}
