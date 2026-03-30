const DAYS = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday']
const DAY_LABELS = { monday: 'Mon', tuesday: 'Tue', wednesday: 'Wed', thursday: 'Thu', friday: 'Fri', saturday: 'Sat', sunday: 'Sun' }

// Assign a consistent color to each peptide name
const PALETTE = [
  '#7c3aed', '#0ea5e9', '#10b981', '#f59e0b', '#ef4444',
  '#ec4899', '#8b5cf6', '#06b6d4', '#84cc16', '#f97316',
]

function peptideColor(name, colorMap) {
  if (!colorMap[name]) {
    const keys = Object.keys(colorMap)
    colorMap[name] = PALETTE[keys.length % PALETTE.length]
  }
  return colorMap[name]
}

const ROUTE_ABBR = {
  subcutaneous: 'SubQ',
  intramuscular: 'IM',
  intranasal: 'Nasal',
  oral: 'Oral',
}

export default function ScheduleTab({ recommendation, onGoRecommender }) {
  if (!recommendation?.weeklySchedule) {
    return (
      <div style={emptyStateStyle}>
        <div style={emptyIconStyle}>⊟</div>
        <h2 style={emptyTitleStyle}>No schedule yet</h2>
        <p style={emptyBodyStyle}>
          Generate a stack recommendation first — the weekly schedule is created automatically.
        </p>
        <button onClick={onGoRecommender} style={goButtonStyle}>
          Go to Recommender →
        </button>
      </div>
    )
  }

  const schedule = recommendation.weeklySchedule
  const colorMap = {}

  // Pre-build colorMap from all peptides so colors are consistent across days
  DAYS.forEach(day => {
    (schedule[day] || []).forEach(entry => peptideColor(entry.peptide, colorMap))
  })

  // Collect all unique peptides for the legend
  const allPeptides = Object.keys(colorMap)

  // Group entries by timing (morning = before noon / before sleep, evening = pre-sleep / night)
  function splitByTime(entries) {
    const morning = entries.filter(e => /morning|fasted|am|breakfast|wake/i.test(e.timing))
    const evening = entries.filter(e => /sleep|night|pm|evening|post.meal|bed/i.test(e.timing))
    const other   = entries.filter(e => !morning.includes(e) && !evening.includes(e))
    return { morning, evening, other }
  }

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* Header summary */}
      <div style={summaryBarStyle}>
        <div>
          <span style={summaryLabelStyle}>CYCLE PROTOCOL</span>
          <p style={summaryValueStyle}>{recommendation.cycleProtocol || '—'}</p>
        </div>
        <div>
          <span style={summaryLabelStyle}>PEPTIDES IN STACK</span>
          <p style={summaryValueStyle}>{recommendation.stack?.length || 0} compounds</p>
        </div>
      </div>

      {/* Legend */}
      <div style={legendStyle}>
        {allPeptides.map(name => (
          <span key={name} style={legendItemStyle(colorMap[name])}>
            {name}
          </span>
        ))}
      </div>

      {/* Day grid */}
      <div style={gridStyle}>
        {DAYS.map(day => {
          const entries = schedule[day] || []
          const { morning, evening, other } = splitByTime(entries)
          const isEmpty = entries.length === 0

          return (
            <div key={day} style={dayCardStyle(isEmpty)}>
              <div style={dayHeaderStyle}>
                <span style={dayLabelStyle}>{DAY_LABELS[day]}</span>
                {isEmpty && <span style={restLabelStyle}>Rest</span>}
              </div>

              {morning.length > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <div style={timeSlotLabelStyle}>AM</div>
                  {morning.map((entry, i) => (
                    <EntryPill key={i} entry={entry} color={colorMap[entry.peptide]} />
                  ))}
                </div>
              )}

              {evening.length > 0 && (
                <div style={{ marginBottom: '8px' }}>
                  <div style={timeSlotLabelStyle}>PM / PRE-SLEEP</div>
                  {evening.map((entry, i) => (
                    <EntryPill key={i} entry={entry} color={colorMap[entry.peptide]} />
                  ))}
                </div>
              )}

              {other.length > 0 && (
                <div>
                  {other.map((entry, i) => (
                    <EntryPill key={i} entry={entry} color={colorMap[entry.peptide]} />
                  ))}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Detailed breakdown */}
      <div style={{ marginTop: '28px' }}>
        <h3 style={detailTitleStyle}>Injection Detail</h3>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {['Peptide', 'Dose', 'Route', 'Timing', 'Days'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recommendation.stack?.map((peptide, i) => {
                const daysActive = DAYS.filter(d =>
                  (schedule[d] || []).some(e => e.peptide === peptide.name)
                ).map(d => DAY_LABELS[d]).join(', ')
                const color = colorMap[peptide.name]
                return (
                  <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                    <td style={tdStyle}>
                      <span style={tdPeptideStyle(color)}>{peptide.name}</span>
                    </td>
                    <td style={tdStyle}>{peptide.dose}</td>
                    <td style={tdStyle}>{ROUTE_ABBR[peptide.route] || peptide.route}</td>
                    <td style={tdStyle}>{peptide.timing}</td>
                    <td style={{ ...tdStyle, color: '#94a3b8' }}>{daysActive || 'As needed'}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Warnings */}
      {recommendation.warnings?.length > 0 && (
        <div style={warningBoxStyle}>
          <strong style={{ color: '#92400e', fontSize: '11px', letterSpacing: '0.08em' }}>IMPORTANT NOTES</strong>
          <ul style={warningListStyle}>
            {recommendation.warnings.map((w, i) => <li key={i}>{w}</li>)}
          </ul>
        </div>
      )}
    </div>
  )
}

function EntryPill({ entry, color }) {
  const route = ROUTE_ABBR[entry.route] || entry.route
  return (
    <div style={pillStyle(color)}>
      <span style={pillNameStyle}>{entry.peptide}</span>
      <span style={pillDoseStyle}>{entry.dose} · {route}</span>
    </div>
  )
}

const emptyStateStyle = {
  textAlign: 'center',
  padding: '80px 20px',
}

const emptyIconStyle = {
  fontSize: '48px',
  color: '#e2e8f0',
  marginBottom: '16px',
}

const emptyTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '18px',
  fontWeight: 700,
  color: '#64748b',
  marginBottom: '8px',
}

const emptyBodyStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#94a3b8',
  marginBottom: '24px',
  lineHeight: 1.6,
}

const goButtonStyle = {
  background: '#7c3aed',
  border: 'none',
  borderRadius: '7px',
  color: '#fff',
  cursor: 'pointer',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '14px',
  fontWeight: 600,
  padding: '12px 24px',
}

const summaryBarStyle = {
  display: 'flex',
  gap: '32px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '16px 20px',
  marginBottom: '20px',
  flexWrap: 'wrap',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const summaryLabelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '10px',
  color: '#475569',
  letterSpacing: '0.1em',
  display: 'block',
  marginBottom: '4px',
}

const summaryValueStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '14px',
  fontWeight: 600,
  color: '#0f172a',
}

const legendStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '6px',
  marginBottom: '20px',
}

const legendItemStyle = (color) => ({
  background: `${color}22`,
  border: `1px solid ${color}55`,
  borderRadius: '4px',
  color: color,
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  padding: '3px 9px',
})

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(7, 1fr)',
  gap: '6px',
  marginBottom: '28px',
  overflowX: 'auto',
  minWidth: '560px',
}

const dayCardStyle = (isEmpty) => ({
  background: isEmpty ? '#f8fafc' : '#ffffff',
  border: `1px solid ${isEmpty ? '#e2e8f0' : '#e2e8f0'}`,
  borderRadius: '8px',
  padding: '10px 8px',
  minHeight: '80px',
  boxShadow: isEmpty ? 'none' : '0 1px 3px rgba(0,0,0,0.06)',
})

const dayHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
}

const dayLabelStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '11px',
  fontWeight: 700,
  color: '#64748b',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
}

const restLabelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '9px',
  color: '#94a3b8',
  letterSpacing: '0.06em',
}

const timeSlotLabelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '9px',
  color: '#94a3b8',
  letterSpacing: '0.06em',
  marginBottom: '4px',
}

const pillStyle = (color) => ({
  background: `${color}18`,
  borderLeft: `2px solid ${color}`,
  borderRadius: '3px',
  padding: '4px 6px',
  marginBottom: '4px',
})

const pillNameStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '9px',
  color: '#0f172a',
  display: 'block',
  fontWeight: 600,
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
}

const pillDoseStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '8px',
  color: '#64748b',
  display: 'block',
}

const detailTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '14px',
  fontWeight: 600,
  color: '#0f172a',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  marginBottom: '12px',
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
}

const thStyle = {
  textAlign: 'left',
  padding: '8px 12px',
  color: '#64748b',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  borderBottom: '1px solid #e2e8f0',
  whiteSpace: 'nowrap',
  background: '#ffffff',
}

const tdStyle = {
  padding: '10px 12px',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#64748b',
  verticalAlign: 'top',
}

const tdPeptideStyle = (color) => ({
  color: color,
  fontWeight: 600,
})

const warningBoxStyle = {
  marginTop: '20px',
  background: '#fffbeb',
  border: '1px solid #fde68a',
  borderRadius: '8px',
  padding: '14px 18px',
}

const warningListStyle = {
  marginTop: '8px',
  paddingLeft: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#92400e',
  lineHeight: 1.6,
}
