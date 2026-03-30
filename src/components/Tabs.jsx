// Tabs are now in the Header nav — this renders the Shop tab pill only
// since Shop doesn't fit cleanly in the top nav with the other tools

export default function ShopTab({ activeTab, onTabChange }) {
  if (activeTab === 'products') return null
  return null
}
