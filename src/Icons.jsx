const S = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
}

function Svg({ size = 18, children }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden="true" {...S}>
      {children}
    </svg>
  )
}

export const TempIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M12 2a2 2 0 0 0-2 2v9.17A5 5 0 1 0 14 17V4a2 2 0 0 0-2-2z"/>
    <line x1="10" y1="8" x2="14" y2="8"/>
    <line x1="10" y1="12" x2="14" y2="12"/>
  </Svg>
)

export const WeightIcon = ({ size }) => (
  <Svg size={size}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/>
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/>
    <path d="M7 21h10"/>
    <line x1="12" y1="3" x2="12" y2="21"/>
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/>
  </Svg>
)

export const LengthIcon = ({ size }) => (
  <Svg size={size}>
    <rect x="2" y="8" width="20" height="8" rx="1.5"/>
    <line x1="6" y1="8" x2="6" y2="13"/>
    <line x1="10" y1="8" x2="10" y2="13"/>
    <line x1="14" y1="8" x2="14" y2="13"/>
    <line x1="18" y1="8" x2="18" y2="13"/>
  </Svg>
)

export const VolumeIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M9 3h6"/>
    <path d="M9 3v7l-5 9a1 1 0 0 0 .9 1.5h14.2a1 1 0 0 0 .9-1.5L15 10V3"/>
    <line x1="5" y1="15" x2="19" y2="15"/>
  </Svg>
)

export const StorageIcon = ({ size }) => (
  <Svg size={size}>
    <rect x="2" y="5" width="20" height="6" rx="2"/>
    <rect x="2" y="13" width="20" height="6" rx="2"/>
    <circle cx="18" cy="8" r="1" fill="currentColor" stroke="none"/>
    <circle cx="18" cy="16" r="1" fill="currentColor" stroke="none"/>
  </Svg>
)

export const EnergyIcon = ({ size }) => (
  <Svg size={size}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
  </Svg>
)

export const PressureIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M3 17A9 9 0 1 1 21 17"/>
    <line x1="12" y1="17" x2="15.5" y2="10.5"/>
    <circle cx="12" cy="17" r="1.5" fill="currentColor" stroke="none"/>
    <line x1="7" y1="6.5" x2="8.5" y2="8"/>
    <line x1="17" y1="6.5" x2="15.5" y2="8"/>
  </Svg>
)

export const ForceIcon = ({ size }) => (
  <Svg size={size}>
    <line x1="12" y1="2" x2="12" y2="16"/>
    <polyline points="7 11 12 16 17 11"/>
    <line x1="4" y1="20" x2="20" y2="20"/>
  </Svg>
)

export const VoltageIcon = ({ size }) => (
  <Svg size={size}>
    <rect x="2" y="8" width="16" height="8" rx="2"/>
    <line x1="22" y1="10" x2="22" y2="14"/>
    <path d="M9 12h1.5l1-2 2 4 1-2H17"/>
  </Svg>
)

export const CurrentIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M2 12c1-2.5 2.5-2.5 3.5 0S8 14.5 9 12s2.5-2.5 3.5 0 2.5 2.5 3.5 0 2.5-2.5 3.5 0"/>
  </Svg>
)

export const ResistanceIcon = ({ size }) => (
  <Svg size={size}>
    <line x1="2" y1="12" x2="5" y2="12"/>
    <path d="M5 12l1.5-3 2 6 2-6 2 6 2-6 1.5 3"/>
    <line x1="17" y1="12" x2="22" y2="12"/>
  </Svg>
)

export const MomentIcon = ({ size }) => (
  <Svg size={size}>
    <path d="M12 5a7 7 0 1 0 7 7"/>
    <polyline points="16 3 19 5 16 7"/>
    <line x1="12" y1="12" x2="17" y2="9"/>
    <circle cx="12" cy="12" r="1.5" fill="currentColor" stroke="none"/>
  </Svg>
)

export const StarIcon = ({ size }) => (
  <Svg size={size}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </Svg>
)
