const AFF = '?utm_source=affiliate_marketing&code=NICK1898'

const STATS = [
  { num: '22',    label: 'Research Peptides' },
  { num: 'AI',    label: 'AI Powered' },
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
        Answer a few questions. Get an AI-powered stack recommendation based on real research —
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
          <div key={i} className="stat-item" style={statItemStyle}>
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
  padding: '40px 16px 40px',
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
  fontSize: '11px',
  fontWeight: 500,
  padding: '6px 14px',
  marginBottom: '24px',
  textAlign: 'center',
  lineHeight: 1.5,
}

const badgeDotStyle = {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: '#7c3aed',
  flexShrink: 0,
}

const headlineStyle = {
  fontSize: 'clamp(26px, 6vw, 52px)',
  fontWeight: 800,
  lineHeight: 1.1,
  letterSpacing: '-0.02em',
  color: '#0f172a',
  marginBottom: '16px',
}

const headlineAccentStyle = {
  color: '#7c3aed',
}

const subheadStyle = {
  fontSize: 'clamp(14px, 3vw, 17px)',
  color: '#64748b',
  lineHeight: 1.7,
  marginBottom: '28px',
  fontWeight: 400,
}

const ctaRowStyle = {
  display: 'flex',
  gap: '10px',
  justifyContent: 'center',
  flexWrap: 'wrap',
  marginBottom: '36px',
}

const primaryCtaStyle = {
  background: '#7c3aed',
  border: 'none',
  borderRadius: '10px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: 'clamp(13px, 3.5vw, 15px)',
  fontWeight: 700,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '13px 28px',
  letterSpacing: '-0.01em',
  boxShadow: '0 4px 14px rgba(124,58,237,0.35)',
  transition: 'all 0.2s',
  flex: '1 1 auto',
  maxWidth: '220px',
}

const secondaryCtaStyle = {
  background: '#fff',
  border: '1.5px solid #e2e8f0',
  borderRadius: '10px',
  color: '#475569',
  cursor: 'pointer',
  fontSize: 'clamp(13px, 3.5vw, 15px)',
  fontWeight: 600,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '13px 24px',
  transition: 'all 0.2s',
  display: 'inline-block',
  flex: '1 1 auto',
  maxWidth: '220px',
}

const statsRowStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  borderTop: '1px solid #e2e8f0',
  paddingTop: '24px',
  gap: '0',
}

const statItemStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
  padding: '8px 12px',
  borderRight: '1px solid #e2e8f0',
}

const statNumStyle = {
  fontSize: 'clamp(16px, 4vw, 22px)',
  fontWeight: 800,
  color: '#0f172a',
  letterSpacing: '-0.02em',
}

const statLabelStyle = {
  fontSize: '11px',
  color: '#94a3b8',
  fontFamily: "'IBM Plex Mono', monospace",
  letterSpacing: '0.04em',
  textAlign: 'center',
  lineHeight: 1.3,
}
