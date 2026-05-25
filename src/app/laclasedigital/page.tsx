import type { Metadata } from 'next'
import { LaClaseDigitalCard } from './LaClaseDigitalCard'

export const metadata: Metadata = {
  title: 'La Clase Digital — Javier Benítez Láinez',
  description: 'Formación docente en inteligencia artificial · Digitalización para el sector productivo',
  openGraph: {
    title: 'La Clase Digital — Javier Benítez Láinez',
    description: 'Formación docente en inteligencia artificial · Digitalización para el sector productivo',
    url: 'https://www.por2duros.com/laclasedigital',
  },
}

export default function LaClaseDigitalPage() {
  return <LaClaseDigitalCard />
}
