export default function Header() {
  return (
    <header style={headerStyle}>
      <div>
        <div style={logoRowStyle}>
          <span style={logoMarkStyle}>◈</span>
          <h1 style={titleStyle}>PeptideStack</h1>
        </div>
        <p style={subtitleStyle}>Research-grade protocol builder · Powered by Claude AI</p>
      </div>
      <a
        href="https://aminoclub.com?utm_source=affiliate_marketing&code=NICK1898"
        target="_blank"
        rel="noopener noreferrer"
        style={shopLinkStyle}
      >
        Shop AminoClub.com ↗
      </a>
    </header>
  )
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '28px',
  paddingBottom: '24px',
  borderBottom: '1px solid #1e1e35',
  flexWrap: 'wrap',
  gap: '16px',
}

const logoRowStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  marginBottom: '4px',
}

const logoMarkStyle = {
  fontSize: '20px',
  color: '#7c3aed',
}

const titleStyle = {
  fontSize: '22px',
  fontWeight: 700,
  color: '#f1f5f9',
  letterSpacing: '-0.02em',
  fontFamily: "'Space Grotesk', sans-serif",
}

const subtitleStyle = {
  fontSize: '12px',
  color: '#475569',
  letterSpacing: '0.06em',
  fontFamily: "'IBM Plex Mono', monospace",
}

const shopLinkStyle = {
  color: '#a78bfa',
  textDecoration: 'none',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  letterSpacing: '0.04em',
  border: '1px solid #3f3f5a',
  padding: '7px 14px',
  borderRadius: '6px',
  transition: 'border-color 0.2s',
}
