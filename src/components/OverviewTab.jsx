export default function OverviewTab({ data }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Section title="Stack Overview">
        <p style={bodyTextStyle}>{data.stackOverview}</p>
      </Section>

      {data.motsCAssessment?.researchGaps && (
        <Section title="Research Gaps">
          <p style={bodyTextStyle}>{data.motsCAssessment.researchGaps}</p>
        </Section>
      )}
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
  marginBottom: '12px',
}

const bodyTextStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#cbd5e1',
  lineHeight: 1.8,
}
