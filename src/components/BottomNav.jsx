import { useIsMobile } from '../hooks/useIsMobile'

const TABS = [
  { key: 'recommender',    label: 'Stack'    },
  { key: 'dosing',         label: 'Dosing'   },
  { key: 'reconstitution', label: 'Recon'    },
  { key: 'schedule',       label: 'Schedule' },
  { key: 'products',       label: 'Shop'     },
]

export default function BottomNav({ activeTab, onTabChange }) {
  const isMobile = useIsMobile()
  if (!isMobile) return null

  return (
    <nav style={navStyle}>
      {TABS.map(tab => {
        const active = activeTab === tab.key
        return (
          <button
            key={tab.key}
            onClick={() => onTabChange(tab.key)}
            style={tabButtonStyle(active)}
          >
            <span style={dotStyle(active)} />
            <span style={labelStyle(active)}>{tab.label}</span>
          </button>
        )
      })}
    </nav>
  )
}

const navStyle = {
  position: 'fixed',
  bottom: 0,
  left: 0,
  right: 0,
  zIndex: 200,
  background: '#ffffff',
  borderTop: '1px solid #e2e8f0',
  display: 'flex',
  alignItems: 'stretch',
  height: '60px',
  paddingBottom: 'env(safe-area-inset-bottom)',
  boxShadow: '0 -2px 12px rgba(0,0,0,0.06)',
}

const tabButtonStyle = (active) => ({
  flex: 1,
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '4px',
  padding: '8px 4px',
  borderTop: active ? '2px solid #7c3aed' : '2px solid transparent',
  transition: 'all 0.15s',
})

const dotStyle = (active) => ({
  width: '6px',
  height: '6px',
  borderRadius: '50%',
  background: active ? '#7c3aed' : 'transparent',
  transition: 'background 0.15s',
})

const labelStyle = (active) => ({
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '10px',
  fontWeight: active ? 700 : 500,
  color: active ? '#7c3aed' : '#94a3b8',
  letterSpacing: '0.04em',
  lineHeight: 1,
})
