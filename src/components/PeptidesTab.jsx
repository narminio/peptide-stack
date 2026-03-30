import { useState } from 'react'

const STATUS_COLORS = {
  robust:     { color: '#22c55e', bg: 'rgba(34,197,94,0.1)'  },
  moderate:   { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)' },
  limited:    { color: '#eab308', bg: 'rgba(234,179,8,0.1)'  },
  anecdotal:  { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)'},
}

export default function PeptidesTab({ peptides = [] }) {
  const [expanded, setExpanded] = useState(null)

  function toggle(name) {
    setExpanded(prev => prev === name ? null : name)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      {peptides.map(p => {
        const isOpen = expanded === p.name
        const status = STATUS_COLORS[p.researchStatus] || STATUS_COLORS.anecdotal
        return (
          <div key={p.name} style={{ ...cardStyle, borderColor: isOpen ? '#2a2a4a' : '#1e1e35' }}>
            <button onClick={() => toggle(p.name)} style={cardHeaderStyle}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <span style={peptideNameStyle}>{p.name}</span>
                <span style={{ ...statusBadgeStyle, color: status.color, background: status.bg }}>
                  {p.researchStatus}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {p.timing && <span style={timingStyle}>{p.timing}</span>}
                <span style={{ color: '#475569', fontSize: '16px', transition: 'transform 0.2s', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▾
                </span>
              </div>
            </button>

            {isOpen && (
              <div style={cardBodyStyle} className="fade-in">
                <p style={mechanismStyle}>{p.mechanism}</p>

                <div style={gridStyle}>
                  {p.keyBenefits?.length > 0 && (
                    <div>
                      <span style={gridLabelStyle}>KEY BENEFITS</span>
                      <ul style={listStyle}>
                        {p.keyBenefits.map((b, i) => (
                          <li key={i} style={listItemStyle}><span style={{ color: '#22c55e' }}>+</span> {b}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {p.knownRisks?.length > 0 && (
                    <div>
                      <span style={gridLabelStyle}>KNOWN RISKS</span>
                      <ul style={listStyle}>
                        {p.knownRisks.map((r, i) => (
                          <li key={i} style={listItemStyle}><span style={{ color: '#f97316' }}>!</span> {r}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {p.halfLife && (
                  <div style={{ marginTop: '12px' }}>
                    <span style={gridLabelStyle}>HALF-LIFE</span>
                    <span style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: '12px', color: '#94a3b8', marginLeft: '8px' }}>{p.halfLife}</span>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

const cardStyle = {
  background: '#0f0f1a',
  border: '1px solid',
  borderRadius: '10px',
  overflow: 'hidden',
  transition: 'border-color 0.2s',
}

const cardHeaderStyle = {
  width: '100%',
  background: 'none',
  border: 'none',
  padding: '16px 20px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  textAlign: 'left',
  gap: '12px',
}

const peptideNameStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '15px',
  fontWeight: 600,
  color: '#e2e8f0',
}

const statusBadgeStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  padding: '2px 8px',
  borderRadius: '4px',
  textTransform: 'uppercase',
}

const timingStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#475569',
}

const cardBodyStyle = {
  padding: '0 20px 18px',
  borderTop: '1px solid #1a1a2e',
}

const mechanismStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#64748b',
  lineHeight: 1.7,
  padding: '14px 0 12px',
  borderBottom: '1px solid #1a1a2e',
  marginBottom: '14px',
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
  gap: '16px',
}

const gridLabelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '10px',
  color: '#475569',
  letterSpacing: '0.1em',
  display: 'block',
  marginBottom: '6px',
}

const listStyle = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}

const listItemStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#94a3b8',
  lineHeight: 1.5,
  display: 'flex',
  gap: '6px',
}
