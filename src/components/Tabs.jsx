const TABS = [
  { id: 'recommender',    label: 'Recommender',     icon: '◎' },
  { id: 'dosing',         label: 'Dosing Calc',      icon: '⊞' },
  { id: 'reconstitution', label: 'Recon Guide',      icon: '⊡' },
  { id: 'schedule',       label: 'Weekly Schedule',  icon: '⊟' },
  { id: 'products',       label: 'Shop',             icon: '◇' },
]

export default function Tabs({ activeTab, onTabChange }) {
  return (
    <nav style={navStyle}>
      {TABS.map(tab => (
        <button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          style={tabStyle(tab.id === activeTab)}
        >
          <span style={iconStyle}>{tab.icon}</span>
          {tab.label}
        </button>
      ))}
    </nav>
  )
}

const navStyle = {
  display: 'flex',
  gap: '0',
  marginBottom: '28px',
  borderBottom: '1px solid #1e1e35',
  flexWrap: 'wrap',
}

const tabStyle = (active) => ({
  background: 'transparent',
  border: 'none',
  borderBottom: active ? '2px solid #7c3aed' : '2px solid transparent',
  color: active ? '#a78bfa' : '#475569',
  cursor: 'pointer',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  letterSpacing: '0.04em',
  padding: '10px 16px',
  marginBottom: '-1px',
  transition: 'color 0.15s, border-color 0.15s',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
  whiteSpace: 'nowrap',
})

const iconStyle = {
  fontSize: '13px',
  opacity: 0.8,
}
