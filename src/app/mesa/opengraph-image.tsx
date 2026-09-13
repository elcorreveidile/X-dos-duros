import { ogMesa, ogSize, ogContentType } from '@/lib/og-mesa'

export const alt = 'La mesa: diez agentes de IA, cien dólares. Experimento en público de Por 2 Duros.'
export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return ogMesa()
}
