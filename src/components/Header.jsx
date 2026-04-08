import { useState } from 'react'
import { useIsMobile } from '../hooks/useIsMobile'

const AFF = '?utm_source=affiliate_marketing&code=NICK1898'

export default function Header({ activeTab, onTabChange }) {
  const isMobile = useIsMobile()
  const [menuOpen, setMenuOpen] = useState(false)

  function handleNavClick(tab) {
    onTabChange(tab)
    setMenuOpen(false)
  }

  return (
    <>
      <header style={headerStyle}>
        <div style={innerStyle}>
          {/* Logo */}
          <div style={logoStyle} onClick={() => handleNavClick('recommender')} role="button">
            <div style={logoMarkStyle}>P</div>
            {!isMobile && (
              <div>
                <div style={logoTextStyle}>PeptideStack.AI</div>
                <div style={logoSubStyle}>AminoClub Partner</div>
              </div>
            )}
            {isMobile && <div style={logoTextStyle}>PeptideStack.AI</div>}
          </div>

          {/* Desktop Nav */}
          {!isMobile && (
            <nav style={navStyle}>
              <NavLink active={activeTab === 'recommender'} onClick={() => handleNavClick('recommender')}>
                Recommender
              </NavLink>
              <NavLink active={activeTab === 'dosing'} onClick={() => handleNavClick('dosing')}>
                Dosing Calc
              </NavLink>
              <NavLink active={activeTab === 'reconstitution'} onClick={() => handleNavClick('reconstitution')}>
                Recon Guide
              </NavLink>
              <NavLink active={activeTab === 'schedule'} onClick={() => handleNavClick('schedule')}>
                Schedule
              </NavLink>
              <NavLink active={activeTab === 'products'} onClick={() => handleNavClick('products')} shop>
                Shop Peptides
              </NavLink>
            </nav>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <a
              href={`https://www.aminoclub.com${AFF}`}
              target="_blank"
              rel="noopener noreferrer"
              style={shopButtonStyle}
            >
              Shop AminoClub ↗
            </a>
          )}

          {/* Mobile right: Shop link + Hamburger */}
          {isMobile && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <a
                href={`https://www.aminoclub.com${AFF}`}
                target="_blank"
                rel="noopener noreferrer"
                style={mobileShopStyle}
              >
                Shop ↗
              </a>
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={hamburgerStyle}
                aria-label="Menu"
              >
                {menuOpen ? '✕' : '☰'}
              </button>
            </div>
          )}
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {isMobile && menuOpen && (
        <div style={dropdownStyle} className="fade-in">
          {[
            { key: 'recommender',    label: 'Recommender' },
            { key: 'dosing',         label: 'Dosing Calc' },
            { key: 'reconstitution', label: 'Recon Guide' },
            { key: 'schedule',       label: 'Schedule' },
            { key: 'products',       label: 'Shop Peptides' },
          ].map(item => (
            <button
              key={item.key}
              onClick={() => handleNavClick(item.key)}
              style={dropdownItemStyle(activeTab === item.key)}
            >
              {item.label}
              {activeTab === item.key && <span style={activeIndicatorStyle} />}
            </button>
          ))}
        </div>
      )}
    </>
  )
}

function NavLink({ children, active, onClick, shop }) {
  return (
    <button onClick={onClick} style={shop ? shopNavLinkStyle(active) : navLinkStyle(active)}>
      {children}
    </button>
  )
}

// ── Styles ──────────────────────────────────────────────────────────────────

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
  padding: '0 16px',
  height: '56px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: '16px',
}

const logoStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '10px',
  cursor: 'pointer',
  flexShrink: 0,
}

const logoMarkStyle = {
  width: '32px',
  height: '32px',
  borderRadius: '8px',
  background: 'linear-gradient(135deg, #7c3aed, #5b21b6)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '16px',
  fontWeight: 800,
  fontFamily: "'Space Grotesk', sans-serif",
  flexShrink: 0,
}

const logoTextStyle = {
  fontSize: '15px',
  fontWeight: 700,
  color: '#0f172a',
  letterSpacing: '-0.01em',
  fontFamily: "'Space Grotesk', sans-serif",
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

const shopNavLinkStyle = (active) => ({
  background: active ? '#0f172a' : '#f8fafc',
  border: `1px solid ${active ? '#0f172a' : '#e2e8f0'}`,
  borderRadius: '999px',
  color: active ? '#fff' : '#0f172a',
  cursor: 'pointer',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '12px',
  fontWeight: 600,
  padding: '6px 14px',
  transition: 'all 0.15s',
  whiteSpace: 'nowrap',
  letterSpacing: '0.01em',
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
  textDecoration: 'none',
  display: 'inline-block',
}

const mobileShopStyle = {
  background: '#0f172a',
  borderRadius: '7px',
  color: '#fff',
  fontSize: '12px',
  fontWeight: 600,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '7px 14px',
  whiteSpace: 'nowrap',
  textDecoration: 'none',
  display: 'inline-block',
}

const hamburgerStyle = {
  background: 'none',
  border: '1px solid #e2e8f0',
  borderRadius: '7px',
  color: '#0f172a',
  cursor: 'pointer',
  fontSize: '18px',
  lineHeight: 1,
  padding: '6px 10px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minWidth: '40px',
}

const dropdownStyle = {
  position: 'fixed',
  top: '56px',
  left: 0,
  right: 0,
  background: '#ffffff',
  borderBottom: '1px solid #e2e8f0',
  zIndex: 99,
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
}

const dropdownItemStyle = (active) => ({
  background: active ? '#f5f3ff' : 'transparent',
  border: 'none',
  borderBottom: '1px solid #f1f5f9',
  color: active ? '#7c3aed' : '#0f172a',
  cursor: 'pointer',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '15px',
  fontWeight: active ? 600 : 500,
  padding: '16px 20px',
  textAlign: 'left',
  transition: 'background 0.1s',
})

const activeIndicatorStyle = {
  width: '7px',
  height: '7px',
  borderRadius: '50%',
  background: '#7c3aed',
}
