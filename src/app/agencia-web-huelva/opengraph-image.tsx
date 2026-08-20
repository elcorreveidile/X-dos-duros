import { ogCiudad, ogSize, ogContentType } from '@/lib/og-ciudad'

export const size = ogSize
export const contentType = ogContentType

export default function Image() {
  return ogCiudad('Huelva')
}
