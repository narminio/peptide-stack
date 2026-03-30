export default function RisksTab({ redFlags = [], sources = [] }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Section title="Red Flags">
        {redFlags.length === 0
          ? <p style={emptyStyle}>No red flags identified.</p>
          : (
            <ul style={listStyle}>
              {redFlags.map((flag, i) => (
                <li key={i} style={flagItemStyle}>
                  <span style={dotStyle}>⚑</span>
                  <span style={flagTextStyle}>{flag}</span>
                </li>
              ))}
            </ul>
          )
        }
      </Section>

      <Section title="Sources & References">
        {sources.length === 0
          ? <p style={emptyStyle}>No sources provided.</p>
          : (
            <ul style={{ ...listStyle, gap: '8px' }}>
              {sources.map((src, i) => (
                <li key={i} style={sourceItemStyle}>
                  <span style={{ color: '#475569', minWidth: '20px', fontSize: '11px' }}>{String(i + 1).padStart(2, '0')}</span>
                  <span style={sourceTextStyle}>{src}</span>
                </li>
              ))}
            </ul>
          )
        }
      </Section>
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={sectionStyle}>
      <h3 style={sectionTitleStyle}>{title}</h3>
      {children}
    </div>
  )
}

const sectionStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '10px',
  padding: '20px 24px',
}

const sectionTitleStyle = {
  fontSize: '14px',
  fontWeight: 600,
  color: '#94a3b8',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: '14px',
}

const listStyle = {
  listStyle: 'none',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

const flagItemStyle = {
  display: 'flex',
  gap: '10px',
  alignItems: 'flex-start',
}

const dotStyle = {
  color: '#ef4444',
  fontSize: '12px',
  marginTop: '2px',
  flexShrink: 0,
}

const flagTextStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#cbd5e1',
  lineHeight: 1.6,
}

const sourceItemStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
  fontFamily: "'IBM Plex Mono', monospace",
}

const sourceTextStyle = {
  fontSize: '12px',
  color: '#64748b',
  lineHeight: 1.6,
}

const emptyStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#475569',
}
