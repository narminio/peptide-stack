const FIT_CONFIG = {
  good:    { color: '#22c55e', bg: 'rgba(34,197,94,0.08)',   border: 'rgba(34,197,94,0.25)',   label: 'GOOD FIT',   icon: '✓' },
  neutral: { color: '#eab308', bg: 'rgba(234,179,8,0.08)',   border: 'rgba(234,179,8,0.25)',   label: 'NEUTRAL',    icon: '~' },
  caution: { color: '#f97316', bg: 'rgba(249,115,22,0.08)',  border: 'rgba(249,115,22,0.25)',  label: 'CAUTION',    icon: '!' },
  avoid:   { color: '#ef4444', bg: 'rgba(239,68,68,0.08)',   border: 'rgba(239,68,68,0.25)',   label: 'AVOID',      icon: '✕' },
}

export default function VerdictBanner({ assessment }) {
  if (!assessment) return null
  const fit = FIT_CONFIG[assessment.fitWithStack] || FIT_CONFIG.neutral

  return (
    <div style={{ ...bannerStyle, background: fit.bg, borderColor: fit.border }}>
      <div style={leftStyle}>
        <span style={{ ...badgeStyle, color: fit.color, borderColor: fit.border }}>
          {fit.icon} MOTS-C: {fit.label}
        </span>
        <p style={{ color: '#cbd5e1', fontSize: '13px', lineHeight: 1.6 }}>{assessment.rationale}</p>
      </div>
      <div style={rightStyle}>
        <DetailRow label="Dose" value={assessment.recommendedDose} />
        <DetailRow label="Timing" value={assessment.recommendedTiming} />
      </div>
    </div>
  )
}

function DetailRow({ label, value }) {
  return (
    <div style={{ marginBottom: '6px' }}>
      <span style={{ color: '#475569', fontSize: '11px', letterSpacing: '0.1em', display: 'block' }}>{label.toUpperCase()}</span>
      <span style={{ color: '#e2e8f0', fontSize: '13px' }}>{value || '—'}</span>
    </div>
  )
}

const bannerStyle = {
  display: 'flex',
  gap: '24px',
  padding: '20px 24px',
  borderRadius: '10px',
  border: '1px solid',
  marginBottom: '16px',
  flexWrap: 'wrap',
}

const leftStyle = {
  flex: 1,
  minWidth: '220px',
  display: 'flex',
  flexDirection: 'column',
  gap: '10px',
}

const rightStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
  minWidth: '180px',
  fontFamily: "'IBM Plex Mono', monospace",
}

const badgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.1em',
  border: '1px solid',
  padding: '4px 10px',
  borderRadius: '4px',
  width: 'fit-content',
}
