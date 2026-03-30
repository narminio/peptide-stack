const AFF = '?utm_source=affiliate_marketing&code=NICK1898'

const STATS = [
  { num: '22',    label: 'Research Peptides' },
  { num: 'AI',    label: 'Claude Powered' },
  { num: '99%+',  label: 'AminoClub Purity' },
  { num: 'COA',   label: 'Every Batch Tested' },
]

export default function Hero({ onBuildStack }) {
  return (
    <div style={heroWrapStyle}>
      {/* Partner badge */}
      <div style={partnerBadgeStyle}>
        <span style={badgeDotStyle} />
        AminoClub Affiliate Partner — Use code <strong>NICK1898</strong> for exclusive pricing
      </div>

      {/* Main headline */}
      <h1 style={headlineStyle}>
        Research-Grade Peptide Protocols,
        <span style={headlineAccentStyle}> Built For You</span>
      </h1>

      <p style={subheadStyle}>
        Answer a few questions. Get a Claude AI-powered stack recommendation based on real research —
        with exact dosing, timing, reconstitution, and direct links to verified peptides.
      </p>

      {/* CTAs */}
      <div style={ctaRowStyle}>
        <button onClick={onBuildStack} style={primaryCtaStyle}>
          Build My Stack →
        </button>
        <a
          href={`https://www.aminoclub.com${AFF}`}
          target="_blank"
          rel="noopener noreferrer"
          style={secondaryCtaStyle}
        >
          Shop AminoClub.com ↗
        </a>
      </div>

      {/* Stats row */}
      <div style={statsRowStyle}>
        {STATS.map((s, i) => (
          <div key={i} style={statItemStyle}>
            <span style={statNumStyle}>{s.num}</span>
            <span style={statLabelStyle}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

const heroWrapStyle = {
  textAlign: 'center',
  padding: '64px 20px 56px',
  maxWidth: '720px',
  margin: '0 auto',
}

const partnerBadgeStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  background: '#f0ebff',
  border: '1px solid #ede9fe',
  borderRadius: '999px',
  color: '#6d28d9',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  fontWeight: 500,
  padding: '6px 16px',
  marginBottom: '28px',
}

const badgeDotStyle = {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: '#7c3aed',
  flexShrink: 0,
}

const headlineStyle = {
  fontSize: 'clamp(32px, 5vw, 52px)',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: '#0f172a',
  marginBottom: '20px',
}

const headlineAccentStyle = {
  color: '#7c3aed',
}

const subheadStyle = {
  fontSize: '17px',
  color: '#64748b',
  lineHeight: 1.7,
  marginBottom: '32px',
  fontWeight: 400,
}

const ctaRowStyle = {
  display: 'flex',
  gap: '12px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '48px',
}

const primaryCtaStyle = {
  background: '#7c3aed',
  border: 'none',
  borderRadius: '10px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 700,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '14px 32px',
  letterSpacing: '-0.01em',
  boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
  transition: 'all 0.2s',
}

const secondaryCtaStyle = {
  background: '#fff',
  border: '1.5px solid #e2e8f0',
  borderRadius: '10px',
  color: '#475569',
  cursor: 'pointer',
  fontSize: '15px',
  fontWeight: 600,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '14px 28px',
  transition: 'all 0.2s',
  display: 'inline-block',
}

const statsRowStyle = {
  display: 'flex',
  justifyContent: 'center',
  gap: '0',
  flexWrap: 'wrap',
  borderTop: '1px solid #e2e8f0',
  paddingTop: '32px',
}

const statItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  padding: '0 32px',
  borderRight: '1px solid #e2e8f0',
}

const statNumStyle = {
  fontSize: '22px',
  fontWeight: 800,
  color: '#0f172a',
  letterSpacing: '-0.02em',
}

const statLabelStyle = {
  fontSize: '12px',
  color: '#94a3b8',
  fontFamily: "'IBM Plex Mono', monospace",
  letterSpacing: '0.04em',
}
