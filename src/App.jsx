import { useState } from 'react'
import Header from './components/Header.jsx'
import Tabs from './components/Tabs.jsx'
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
          <RecommenderTab
            onRecommendation={handleRecommendation}
            recommendation={recommendation}
            onViewSchedule={goToSchedule}
          />
        )
      case 'dosing':
        return <DosingTab recommendation={recommendation} />
      case 'reconstitution':
        return <ReconstitutionTab />
      case 'schedule':
        return <ScheduleTab recommendation={recommendation} onGoRecommender={() => setActiveTab('recommender')} />
      case 'products':
        return <ProductsTab />
      default:
        return null
    }
  }

  return (
    <div style={{ maxWidth: '960px', margin: '0 auto', padding: '24px 16px 80px' }}>
      <Header />
      <Tabs activeTab={activeTab} onTabChange={setActiveTab} />
      <div className="fade-in" key={activeTab}>
        {renderTab()}
      </div>
    </div>
  )
}
