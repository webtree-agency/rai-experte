import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'
import { getRechtstexte } from '@/lib/cms'

export const metadata: Metadata = {
  title: { absolute: 'Allgemeine Geschäftsbedingungen | Rai-experte.ch' },
  description:
    'Allgemeine Geschäftsbedingungen von BURGMEIJER RAI-Experte. Stand Mai 2025.',
  alternates: { canonical: '/agb' },
}

export default async function AgbSeite() {
  const rechtstexte = await getRechtstexte()
  return <LegalPage title="AGB" data={rechtstexte?.agb} />
}
