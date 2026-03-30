import { useState, useEffect } from 'react'

// Parse dose schedule from dose string like "0.5mg week 1, ramping to 1mg weeks 2-4"
// Returns array of 4 values (one per week), or single value repeated if no ramp info
function parseDoseSchedule(doseStr) {
  const weeks = ['', '', '', '']

  // Pattern: "X mg week 1, ramping to Y mg weeks 2-4"
  const rampMatch = doseStr.match(/([\d.]+\s*m?c?g)\s+week\s+1.*?([\d.]+\s*m?c?g)\s+weeks?\s+2/i)
  if (rampMatch) {
    weeks[0] = rampMatch[1].trim()
    weeks[1] = rampMatch[2].trim()
    weeks[2] = rampMatch[2].trim()
    weeks[3] = rampMatch[2].trim()
    return weeks
  }

  // Pattern: just extract first dose value and apply to all weeks
  const simpleMatch = doseStr.match(/([\d.]+\s*m?c?g)/)
  if (simpleMatch) {
    const d = simpleMatch[1].trim()
    return [d, d, d, d]
  }

  return [doseStr, doseStr, doseStr, doseStr]
}

const TIMING_COLORS = {
  morning: { bg: '#1a2744', border: '#2563eb', text: '#93c5fd', label: 'Morning' },
  night:   { bg: '#1c1030', border: '#7c3aed', text: '#c4b5fd', label: 'Night'   },
}

export default function TimelineTab() {
  const [morning, setMorning] = useState([])
  const [night, setNight]     = useState([])

  useEffect(() => {
    fetch('/api/stack')
      .then(r => r.json())
      .then(data => {
        setMorning(data.morningStack || [])
        setNight(data.nightStack   || [])
      })
      .catch(() => {})
  }, [])

  const allPeptides = [
    ...morning.map(p => ({ ...p, timing: 'morning' })),
    ...night.map(p => ({   ...p, timing: 'night'   })),
  ]

  if (allPeptides.length === 0) {
    return (
      <div className="fade-in" style={{ color: '#475569', fontSize: '13px', fontFamily: "'IBM Plex Mono', monospace", padding: '40px 0' }}>
        Loading stack...
      </div>
    )
  }

  return (
    <div className="fade-in" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* Legend */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
        {Object.entries(TIMING_COLORS).map(([key, c]) => (
          <div key={key} style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px' }}>
            <div style={{ width: '14px', height: '14px', borderRadius: '3px', background: c.bg, border: `1px solid ${c.border}` }} />
            <span style={{ color: '#94a3b8' }}>{c.label}</span>
          </div>
        ))}
      </div>

      {/* Week header */}
      <div style={gridStyle}>
        <div style={peptideColStyle} />
        {[1, 2, 3, 4].map(w => (
          <div key={w} style={weekHeaderStyle}>Week {w}</div>
        ))}
      </div>

      {/* Divider */}
      <div style={{ borderBottom: '1px solid #1e1e35', marginBottom: '4px' }} />

      {/* Rows */}
      {allPeptides.map((p, i) => {
        const doses = parseDoseSchedule(p.dose)
        const colors = TIMING_COLORS[p.timing] || TIMING_COLORS.morning
        return (
          <div key={i} style={{ ...gridStyle, marginBottom: '6px' }}>
            <div style={peptideNameStyle}>
              <span style={{ color: colors.text }}>{p.name}</span>
              <span style={{ color: '#334155', fontSize: '11px', marginLeft: '6px' }}>
                {p.route.replace('subcutaneous injectable', 'subq').replace('injectable', 'inj').replace('intranasal', 'IN')}
              </span>
            </div>
            {doses.map((dose, wi) => (
              <div key={wi} style={cellStyle(colors, dose !== doses[wi - 1] && wi > 0)}>
                <span style={{ color: colors.text, fontSize: '12px', fontWeight: 500 }}>
                  {dose || '—'}
                </span>
              </div>
            ))}
          </div>
        )
      })}

      <p style={{ color: '#334155', fontSize: '12px', marginTop: '24px' }}>
        Dose changes between weeks are highlighted with a brighter border.
      </p>
    </div>
  )
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '200px repeat(4, 1fr)',
  gap: '6px',
  alignItems: 'center',
}

const peptideColStyle = {
  // spacer for header row
}

const weekHeaderStyle = {
  textAlign: 'center',
  fontSize: '12px',
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 600,
  color: '#475569',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  padding: '6px 0',
}

const peptideNameStyle = {
  fontSize: '13px',
  fontFamily: "'IBM Plex Mono', monospace",
  padding: '4px 0',
  display: 'flex',
  alignItems: 'baseline',
  flexWrap: 'wrap',
  gap: '4px',
}

const cellStyle = (colors, changed) => ({
  background: colors.bg,
  border: `1px solid ${changed ? colors.text : colors.border}`,
  borderRadius: '6px',
  padding: '8px 6px',
  textAlign: 'center',
  minHeight: '38px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'border-color 0.2s',
})
