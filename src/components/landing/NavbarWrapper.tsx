import { prisma } from '@/lib/db'
import { Navbar } from './Navbar'

const LAUNCH_TOTAL = 20

export async function NavbarWrapper() {
  let remainingSlots: number | undefined

  try {
    const count = await prisma.project.count()
    remainingSlots = Math.max(0, LAUNCH_TOTAL - count)
  } catch {
    // If DB is unreachable, don't crash the page — just hide the banner
  }

  return <Navbar remainingSlots={remainingSlots} />
}
