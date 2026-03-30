const TRUST_ITEMS = [
  {
    icon: '✓',
    title: '99%+ Purity Guaranteed',
    desc: 'Every AminoClub batch tested via HPLC and Mass Spec by US-accredited labs.',
    color: '#10b981',
  },
  {
    icon: '📄',
    title: 'Free COA With Every Order',
    desc: 'Certificate of Analysis included. You see exactly what you\'re getting.',
    color: '#7c3aed',
  },
  {
    icon: '🚚',
    title: 'Shipment Protection',
    desc: 'Every order fully covered. Lost, damaged, or stolen — reshipped at no cost.',
    color: '#0ea5e9',
  },
  {
    icon: '↩',
    title: '60-Day Money-Back',
    desc: 'Full refund within 60 days, no questions asked.',
    color: '#f59e0b',
  },
]

const AFF = '?utm_source=affiliate_marketing&code=NICK1898'

export default function TrustBar() {
  return (
    <div style={wrapStyle}>
      <div style={innerStyle}>
        <div style={headerRowStyle}>
          <div>
            <h2 style={titleStyle}>Quality You Can Verify, Not Just Trust</h2>
            <p style={subtitleStyle}>
              All peptides recommended on PeptideStack are sourced from{' '}
              <a href={`https://www.aminoclub.com${AFF}`} target="_blank" rel="noopener noreferrer" style={linkStyle}>
                AminoClub.com
              </a>
              {' '}— guaranteed 99%+ pure, always third-party tested, ships from the USA.
            </p>
          </div>
          <a
            href={`https://www.aminoclub.com${AFF}`}
            target="_blank"
            rel="noopener noreferrer"
            style={shopButtonStyle}
          >
            Shop Now →
          </a>
        </div>

        <div style={gridStyle}>
          {TRUST_ITEMS.map((item, i) => (
            <div key={i} style={itemStyle}>
              <div style={iconStyle(item.color)}>{item.icon}</div>
              <div>
                <div style={itemTitleStyle}>{item.title}</div>
                <div style={itemDescStyle}>{item.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={footerRowStyle}>
          <span style={footerStatStyle}><strong>5,000+</strong> researchers in the AminoClub community</span>
          <span style={footerDivStyle}>·</span>
          <span style={footerStatStyle}><strong>Always in stock</strong> — no backorders</span>
          <span style={footerDivStyle}>·</span>
          <span style={footerStatStyle}><strong>Volume discounts</strong> up to 20%</span>
        </div>
      </div>
    </div>
  )
}

const wrapStyle = {
  background: '#0f172a',
  borderRadius: '16px',
  margin: '0 0 40px',
  overflow: 'hidden',
}

const innerStyle = {
  padding: '40px',
}

const headerRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '24px',
  marginBottom: '32px',
  flexWrap: 'wrap',
}

const titleStyle = {
  fontSize: '22px',
  fontWeight: 700,
  color: '#f1f5f9',
  marginBottom: '8px',
  letterSpacing: '-0.02em',
}

const subtitleStyle = {
  fontSize: '14px',
  color: '#64748b',
  lineHeight: 1.6,
  maxWidth: '480px',
}

const linkStyle = {
  color: '#a78bfa',
  textDecoration: 'underline',
}

const shopButtonStyle = {
  background: '#7c3aed',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '14px',
  fontWeight: 700,
  padding: '12px 24px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  fontFamily: "'Space Grotesk', sans-serif",
}

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '20px',
  marginBottom: '28px',
}

const itemStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
}

const iconStyle = (color) => ({
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  background: `${color}22`,
  border: `1px solid ${color}44`,
  color: color,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  flexShrink: 0,
})

const itemTitleStyle = {
  fontSize: '13px',
  fontWeight: 600,
  color: '#e2e8f0',
  marginBottom: '3px',
}

const itemDescStyle = {
  fontSize: '12px',
  color: '#475569',
  lineHeight: 1.5,
  fontFamily: "'IBM Plex Mono', monospace",
}

const footerRowStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'center',
  flexWrap: 'wrap',
  borderTop: '1px solid #1e293b',
  paddingTop: '20px',
}

const footerStatStyle = {
  fontSize: '13px',
  color: '#64748b',
}

const footerDivStyle = {
  color: '#334155',
}
