export interface RetoStatus {
  pct: number
  champion: boolean
  wins: number
}

export async function getMundialRetoPct(): Promise<RetoStatus> {
  try {
    const res = await fetch('https://www.espanias.com/api/mundial-reto', {
      next: { revalidate: 300 },
    })
    if (!res.ok) return { pct: 0, champion: false, wins: 0 }
    return (await res.json()) as RetoStatus
  } catch {
    return { pct: 0, champion: false, wins: 0 }
  }
}
