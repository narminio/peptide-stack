export default function Recommendation({ recommendation }) {
  if (!recommendation) return null
  return (
    <div style={containerStyle}>
      <span style={labelStyle}>OVERALL RECOMMENDATION</span>
      <p style={textStyle}>{recommendation}</p>
    </div>
  )
}

const containerStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '10px',
  padding: '18px 24px',
  marginBottom: '24px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

const labelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#475569',
  letterSpacing: '0.1em',
}

const textStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#cbd5e1',
  lineHeight: 1.7,
}
