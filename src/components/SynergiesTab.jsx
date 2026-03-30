export default function SynergiesTab({ synergies = [] }) {
  if (!synergies.length) {
    return <p style={emptyStyle}>No synergies reported.</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
      {synergies.map((s, i) => (
        <div key={i} style={cardStyle}>
          <div style={pairsRowStyle}>
            {s.peptides.map((name, j) => (
              <span key={j} style={pillStyle}>{name}</span>
            ))}
          </div>
          <p style={interactionStyle}>{s.interaction}</p>
        </div>
      ))}
    </div>
  )
}

const cardStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '10px',
  padding: '16px 20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

const pairsRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
}

const pillStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  fontWeight: 500,
  color: '#a78bfa',
  background: 'rgba(124,58,237,0.12)',
  border: '1px solid rgba(124,58,237,0.25)',
  padding: '3px 10px',
  borderRadius: '4px',
}

const interactionStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#94a3b8',
  lineHeight: 1.7,
}

const emptyStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#475569',
  padding: '40px 0',
  textAlign: 'center',
}
