import type { Metadata } from 'next'
import { JavierCard } from './JavierCard'

export const metadata: Metadata = {
  title: 'Javier Benitez Láinez',
  description: 'Profesor de español · Formador de formadores',
  openGraph: {
    title: 'Javier Benitez Láinez',
    description: 'Profesor de español · Formador de formadores',
    url: 'https://www.por2duros.com/javier',
  },
}

export default function JavierPage() {
  return <JavierCard />
}
