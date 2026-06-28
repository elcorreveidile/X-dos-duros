type SimboloQPQProps = {
  color?: string
  size?: number
  className?: string
}

export default function SimboloQPQ({ color = '#2f6b4f', size, className }: SimboloQPQProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="QPQ, moneda circular"
    >
      <g style={{ color }}>
        <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="5" />

        <g fill="currentColor">
          <path d="M 62 12 l 1 9 l 8 -5 z" />
          <path d="M 38 88 l -1 -9 l -8 5 z" />
        </g>

        <text
          x="50"
          y="62"
          textAnchor="middle"
          fill="currentColor"
          fontSize="30"
          fontWeight="800"
          letterSpacing="-1.5"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          QPQ
        </text>
      </g>
    </svg>
  )
}
