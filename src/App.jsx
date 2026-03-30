import { useState } from 'react'
import Header from './components/Header.jsx'
import Hero from './components/Hero.jsx'
import TrustBar from './components/TrustBar.jsx'
import RecommenderTab from './components/RecommenderTab.jsx'
import DosingTab from './components/DosingTab.jsx'
import ReconstitutionTab from './components/ReconstitutionTab.jsx'
import ScheduleTab from './components/ScheduleTab.jsx'
import ProductsTab from './components/ProductsTab.jsx'

export default function App() {
  const [activeTab, setActiveTab] = useState('recommender')
  const [recommendation, setRecommendation] = useState(null)

  function handleRecommendation(data) {
    setRecommendation(data)
  }

  function goToSchedule() {
    setActiveTab('schedule')
  }

  function renderTab() {
    switch (activeTab) {
      case 'recommender':
        return (
          <>
            {!recommendation && <Hero onBuildStack={() => document.getElementById('recommender-form')?.scrollIntoView({ behavior: 'smooth' })} />}
            <RecommenderTab
              onRecommendation={handleRecommendation}
              recommendation={recommendation}
              onViewSchedule={goToSchedule}
            />
            <TrustBar />
          </>
        )
      case 'dosing':
        return <DosingTab recommendation={recommendation} />
      case 'reconstitution':
        return <ReconstitutionTab />
      case 'schedule':
        return <ScheduleTab recommendation={recommendation} onGoRecommender={() => setActiveTab('recommender')} />
      case 'products':
        return (
          <>
            <ProductsTab />
            <TrustBar />
          </>
        )
      default:
        return null
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
      <Header activeTab={activeTab} onTabChange={setActiveTab} />

      <main style={mainStyle}>
        <div className="fade-in" key={activeTab}>
          {renderTab()}
        </div>
      </main>

      <footer style={footerStyle}>
        <p style={footerTextStyle}>
          PeptideStack is an independent research tool and AminoClub affiliate. For research purposes only.
          Not medical advice. Always consult a licensed physician before beginning any peptide protocol.
        </p>
      </footer>
    </div>
  )
}

const mainStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  padding: '40px 24px 80px',
}

const footerStyle = {
  borderTop: '1px solid #e2e8f0',
  padding: '24px',
  background: '#fff',
}

const footerTextStyle = {
  maxWidth: '1100px',
  margin: '0 auto',
  fontSize: '12px',
  color: '#94a3b8',
  textAlign: 'center',
  lineHeight: 1.6,
  fontFamily: "'IBM Plex Mono', monospace",
}
