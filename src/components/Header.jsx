const AFF = '?utm_source=affiliate_marketing&code=NICK1898'

export default function Header({ activeTab, onTabChange }) {
  return (
    <header style={headerStyle}>
      <div style={innerStyle}>
        {/* Logo */}
        <div style={logoStyle} onClick={() => onTabChange('recommender')} role="button">
          <div style={logoMarkStyle}>P</div>
          <div>
            <div style={logoTextStyle}>PeptideStack</div>
            <div style={logoSubStyle}>by Nick · AminoClub Partner</div>
          </div>
        </div>

        {/* Nav */}
        <nav style={navStyle}>
          <NavLink active={activeTab === 'recommender'} onClick={() => onTabChange('recommender')}>
            Recommender
          </NavLink>
          <NavLink active={activeTab === 'dosing'} onClick={() => onTabChange('dosing')}>
            Dosing Calc
          </NavLink>
          <NavLink active={activeTab === 'reconstitution'} onClick={() => onTabChange('reconstitution')}>
            Recon Guide
          </NavLink>
          <NavLink active={activeTab === 'schedule'} onClick={() => onTabChange('schedule')}>
            Schedule
          </NavLink>
        </nav>

        {/* CTA */}
        <a
          href={`https://www.aminoclub.com${AFF}`}
          target="_blank"
          rel="noopener noreferrer"
          style={shopButtonStyle}
        >
          Shop AminoClub ↗
        </a>
      </div>
    </header>
  )
}

function NavLink({ children, active, onClick }) {
  return (
    <button onClick={onClick} style={navLinkStyle(active)}>
      {children}
    </button>
  )
}

const headerStyle = {
  background: '#fff',
  borderBottom: '1px solid #e2e8f0',
  position: 'sticky',
  top: 0,
  zIndex: 100,
  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
}

const innerStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '0 24px',
  height: '64px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '24px',
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  flexShrink: 0,
}

const logoMarkStyle = {
  width: '36px',
  height: '36px',
  borderRadius: '8px',
  background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '18px',
  fontWeight: 800,
  fontFamily: "'Space Grotesk', sans-serif",
}

const logoTextStyle = {
  fontSize: '15px',
  fontWeight: 700,
  color: '#0f172a',
  letterSpacing: '-0.01em',
}

const logoSubStyle = {
  fontSize: '10px',
  color: '#94a3b8',
  fontFamily: "'IBM Plex Mono', monospace",
  letterSpacing: '0.03em',
}

const navStyle = {
  display: 'flex',
  gap: '4px',
  flex: 1,
  justifyContent: 'center',
}

const navLinkStyle = (active) => ({
  background: active ? '#f5f3ff' : 'transparent',
  border: 'none',
  borderRadius: '7px',
  color: active ? '#7c3aed' : '#64748b',
  cursor: 'pointer',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '13px',
  fontWeight: active ? 600 : 500,
  padding: '7px 14px',
  transition: 'all 0.15s',
  whiteSpace: 'nowrap',
})

const shopButtonStyle = {
  background: '#0f172a',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '13px',
  fontWeight: 600,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '9px 18px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
  transition: 'background 0.2s',
}
