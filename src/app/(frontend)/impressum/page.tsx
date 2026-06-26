import type { Metadata } from 'next'
import { LegalPage } from '@/components/sections/LegalPage'
import { getRechtstexte } from '@/lib/cms'

export const metadata: Metadata = {
  title: { absolute: 'Impressum | Rai-experte.ch' },
  description: 'Impressum von BURGMEIJER RAI-Experte, Marco Burgmeijer, Hombrechtikon.',
}

export default async function ImpressumSeite() {
  const rechtstexte = await getRechtstexte()
  return <LegalPage title="Impressum" data={rechtstexte?.impressum} />
}
