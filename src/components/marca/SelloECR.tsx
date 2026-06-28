type SelloECRProps = {
  codigo?: string
  barrio?: string
  color?: string
  size?: number
  className?: string
}

export default function SelloECR({
  codigo = 'ECR',
  barrio = 'REALEJO',
  color = '#2f6b4f',
  size,
  className,
}: SelloECRProps) {
  return (
    <svg
      viewBox="0 0 220 220"
      width={size}
      height={size}
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label={`Sello Economía Circular ${barrio}`}
    >
      <defs>
        <path id="ecr-arco-sup" d="M 30 110 A 80 80 0 0 1 190 110" fill="none" />
        <path id="ecr-arco-inf" d="M 36 110 A 74 74 0 0 0 184 110" fill="none" />
      </defs>

      <g style={{ color }}>
        <circle cx="110" cy="110" r="104" fill="none" stroke="currentColor" strokeWidth="3" />
        <circle cx="110" cy="110" r="95" fill="none" stroke="currentColor" strokeWidth="1.5" />

        <text
          fill="currentColor"
          fontSize="15"
          fontWeight="700"
          letterSpacing="2.5"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          <textPath href="#ecr-arco-sup" startOffset="50%" textAnchor="middle">
            ECONOMÍA CIRCULAR
          </textPath>
        </text>
        <text
          fill="currentColor"
          fontSize="13"
          fontWeight="700"
          letterSpacing="4"
          style={{ fontFamily: 'system-ui, sans-serif' }}
        >
          <textPath href="#ecr-arco-inf" startOffset="50%" textAnchor="middle">
            {barrio}
          </textPath>
        </text>

        <g fill="currentColor">
          <circle cx="18.5" cy="110" r="3.2" />
          <circle cx="201.5" cy="110" r="3.2" />
        </g>

        <g>
          <circle cx="110" cy="80" r="16" fill="none" stroke="currentColor" strokeWidth="2.5" />
          <text
            x="110"
            y="84.5"
            textAnchor="middle"
            fill="currentColor"
            fontSize="11"
            fontWeight="800"
            letterSpacing="-0.8"
            style={{ fontFamily: 'system-ui, sans-serif' }}
          >
            QPQ
          </text>
        </g>

        <text
          x="110"
          y="140"
          textAnchor="middle"
          fill="currentColor"
          fontSize="42"
          fontWeight="900"
          letterSpacing="1"
          style={{ fontFamily: 'Georgia, serif' }}
        >
          {codigo}
        </text>
      </g>
    </svg>
  )
}
