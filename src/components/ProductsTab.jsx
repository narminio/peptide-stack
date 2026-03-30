import { useState } from 'react'

const AFF = '?utm_source=affiliate_marketing&code=NICK1898'
const BASE = 'https://www.aminoclub.com/us/products'
const url = (slug) => `${BASE}/${slug}${AFF}`

const PRODUCTS = [
  // Fat Loss
  {
    name: 'Retatrutide (GLP-3)',
    category: 'Fat Loss',
    desc: 'Triple agonist (GLP-1/GIP/glucagon). Most powerful fat loss peptide in clinical trials — outperforms semaglutide and tirzepatide. Preserves lean muscle better than other GLP-1s. Phase 2 trials show 24%+ body weight reduction.',
    research: 'moderate',
    routes: ['SubQ'],
    commonDose: '0.5–12 mg/week (titrated)',
    link: url('glp-3'),
  },
  {
    name: 'Cagrilinitide',
    category: 'Fat Loss',
    desc: 'Long-acting amylin analog. Synergizes powerfully with GLP-1 agonists for fat loss. Reduces appetite centrally, improves glucose control, and promotes satiety independently of GLP-1 pathway.',
    research: 'moderate',
    routes: ['SubQ'],
    commonDose: '0.3–2.4 mg/week',
    link: url('cagrilintide'),
  },
  {
    name: 'AOD-9604',
    category: 'Fat Loss',
    desc: 'GH fragment 176–191. Promotes lipolysis via fat cell beta-3 receptors without elevating IGF-1 or affecting blood sugar. Best taken fasted in the morning.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '300 mcg/day, fasted AM',
    link: url('aod-9604'),
  },
  {
    name: '5-Amino-1MQ',
    category: 'Fat Loss',
    desc: 'NNMT inhibitor. Elevates NAD+, activates SIRT1, and induces adipocyte browning. Oral bioavailability makes it easy to stack. Strong synergy with GLP-1 agonists.',
    research: 'limited',
    routes: ['Oral'],
    commonDose: '50–100 mg/day',
    link: url('5-amino-1mq'),
  },
  // Muscle Building
  {
    name: 'CJC-1295 No DAC + Ipamorelin',
    category: 'Muscle Building',
    desc: 'The gold standard GH secretagogue stack. CJC-1295 (GHRH analog) amplifies GH pulse amplitude; Ipamorelin (selective GHRP) triggers the pulse cleanly without cortisol or prolactin bleed. Take together pre-sleep.',
    research: 'moderate',
    routes: ['SubQ'],
    commonDose: '100–300 mcg each, pre-sleep',
    link: url('cjc-ipa-no-dac'),
  },
  {
    name: 'Ipamorelin',
    category: 'Muscle Building',
    desc: 'Selective ghrelin mimetic. Cleanest GH pulse available — minimal cortisol, prolactin, or appetite stimulation. Benchmark GHRP for stacking with CJC-1295. Ideal for muscle building and recovery.',
    research: 'moderate',
    routes: ['SubQ'],
    commonDose: '100–300 mcg pre-sleep',
    link: url('ipamorelin'),
  },
  {
    name: 'IGF-1 LR3',
    category: 'Muscle Building',
    desc: 'Long R3 analog of IGF-1. Directly stimulates muscle hyperplasia and hypertrophy via IGF-1 receptor. Longer half-life than native IGF-1. Powerful for recomp when used post-workout.',
    research: 'limited',
    routes: ['SubQ', 'IM'],
    commonDose: '20–60 mcg/day post-workout',
    link: url('igf-1-lr3'),
  },
  {
    name: 'BPC-157',
    category: 'Muscle Building',
    desc: 'Synthetic pentadecapeptide. Gold standard for tendon, ligament, and muscle repair. Promotes angiogenesis, accelerates healing, and protects the gut. Essential in any heavy training stack.',
    research: 'moderate',
    routes: ['SubQ', 'IM', 'Oral'],
    commonDose: '250–500 mcg/day',
    link: url('bpc-157T'),
  },
  {
    name: 'Tesamorelin',
    category: 'Muscle Building',
    desc: 'FDA-approved GHRH analog. Clinically proven visceral fat reduction and GH secretion. More potent than CJC-1295 for metabolic and recomp effects. Strong choice for body recomposition.',
    research: 'robust',
    routes: ['SubQ'],
    commonDose: '1–2 mg/day',
    link: url('tesamorlin'),
  },
  {
    name: 'MOTS-C',
    category: 'Muscle Building',
    desc: 'Mitochondrial-derived peptide. Enhances insulin sensitivity, fatty acid oxidation, and exercise capacity. Called an "exercise mimetic" — improves training response and metabolic efficiency.',
    research: 'limited',
    routes: ['SubQ', 'IM'],
    commonDose: '5–10 mg/week',
    link: url('mots-c'),
  },
  // Recovery & Repair
  {
    name: 'GHK-Cu',
    category: 'Recovery',
    desc: 'Copper-binding tripeptide. Upregulates collagen synthesis, BDNF, and wound healing genes. Anti-inflammatory and neuroprotective. Excellent for joint health and skin in any stack.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '1–2 mg/day',
    link: url('ghk-cu'),
  },
  {
    name: 'KPV',
    category: 'Recovery',
    desc: 'C-terminal fragment of α-MSH. Potent anti-inflammatory in the gut via NF-κB inhibition. Used for IBD, colitis, and intestinal permeability. Pairs well with BPC-157 for gut protocols.',
    research: 'limited',
    routes: ['SubQ', 'Oral'],
    commonDose: '250–500 mcg/day',
    link: url('kpv'),
  },
  // Cognitive
  {
    name: 'Semax',
    category: 'Cognitive',
    desc: 'ACTH 4–7 analog developed in Russia. Potently upregulates BDNF and NGF. Enhances focus, memory, and neuroprotection. Fast-acting via intranasal delivery.',
    research: 'moderate',
    routes: ['Nasal'],
    commonDose: '200–600 mcg/nostril',
    link: url('semax'),
  },
  {
    name: 'Selank',
    category: 'Cognitive',
    desc: 'Synthetic heptapeptide analog of tuftsin. Anxiolytic without sedation, nootropic via IL-6 modulation. Often stacked with Semax for cognitive enhancement + mood stabilization.',
    research: 'moderate',
    routes: ['Nasal'],
    commonDose: '250–1000 mcg/nostril',
    link: url('selank'),
  },
  // Sleep
  {
    name: 'DSIP',
    category: 'Sleep',
    desc: 'Delta Sleep Inducing Peptide. Promotes slow-wave (deep) sleep, reduces cortisol, and modulates circadian rhythm. Taken pre-sleep for improved recovery and GH pulse quality.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '100–300 mcg pre-sleep',
    link: url('dsip'),
  },
  // Sexual Health
  {
    name: 'PT-141 (Bremelanotide)',
    category: 'Sexual Health',
    desc: 'FDA-approved melanocortin agonist. Acts centrally on the hypothalamus to drive libido and sexual arousal in both men and women. PRN dosing — not daily.',
    research: 'robust',
    routes: ['SubQ'],
    commonDose: '0.5–2 mg as needed',
    link: url('pt-141'),
  },
  // Anti-Aging
  {
    name: 'Epithalon',
    category: 'Anti-Aging',
    desc: 'Tetrapeptide that activates telomerase, extending telomere length. Regulates melatonin and circadian rhythm. Anti-aging flagship compound. Run as 10–20 day cycles.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '5–10 mg/day, 10–20 day cycle',
    link: url('epithalon'),
  },
  {
    name: 'SNAP-8',
    category: 'Anti-Aging',
    desc: 'Octapeptide that reduces expression of neurotransmitters that cause muscle contraction. Topical anti-wrinkle peptide that mimics the effect of botulinum toxin. Used in cosmetic protocols.',
    research: 'limited',
    routes: ['Topical'],
    commonDose: 'Topical per formulation',
    link: url('snap-8'),
  },
  // Immune
  {
    name: 'Thymosin Alpha-1',
    category: 'Immune',
    desc: 'Approved in 35+ countries. Thymic peptide that enhances T-cell function, antiviral immunity, and dendritic cell maturation. Approved for hepatitis and cancer adjunct therapy.',
    research: 'robust',
    routes: ['SubQ'],
    commonDose: '0.5–1.6 mg, 2–3x/week',
    link: url('thymosin-alpha-1'),
  },
  // Wellness / Essentials
  {
    name: 'NAD+',
    category: 'Wellness',
    desc: 'Essential coenzyme in cellular energy metabolism. IV or SubQ supplementation raises NAD+ levels rapidly, supporting mitochondrial function, DNA repair, and sirtuin activation.',
    research: 'moderate',
    routes: ['SubQ', 'IV'],
    commonDose: '100–500 mg/week',
    link: url('nad-plus'),
  },
  {
    name: 'Glutathione',
    category: 'Wellness',
    desc: 'Master antioxidant. Reduces oxidative stress, supports liver detox, and enhances immune function. Injectable glutathione has dramatically higher bioavailability than oral.',
    research: 'moderate',
    routes: ['SubQ', 'IV'],
    commonDose: '200–600 mg, 2–3x/week',
    link: url('glutathione'),
  },
  {
    name: 'Bacteriostatic Water',
    category: 'Essentials',
    desc: '0.9% benzyl alcohol sterile water. Required for reconstituting all lyophilized peptides. Bacteriostatic agent extends vial life after opening. Always use BAC water — not saline, not sterile water.',
    research: 'robust',
    routes: ['Reconstitution'],
    commonDose: '1–3 mL per vial',
    link: url('bac-water'),
  },
]

const CATEGORIES = ['All', 'Fat Loss', 'Muscle Building', 'Recovery', 'Cognitive', 'Sleep', 'Sexual Health', 'Anti-Aging', 'Immune', 'Wellness', 'Essentials']

const CATEGORY_COLORS = {
  'Fat Loss':       { bg: 'linear-gradient(135deg, #fdf2f8, #fce7f3)', border: '#f9a8d4', badge: '#db2777' },
  'Muscle Building':{ bg: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '#86efac', badge: '#16a34a' },
  'Recovery':       { bg: 'linear-gradient(135deg, #eff6ff, #dbeafe)', border: '#93c5fd', badge: '#2563eb' },
  'Cognitive':      { bg: 'linear-gradient(135deg, #faf5ff, #ede9fe)', border: '#c4b5fd', badge: '#7c3aed' },
  'Sleep':          { bg: 'linear-gradient(135deg, #f0f9ff, #e0f2fe)', border: '#7dd3fc', badge: '#0284c7' },
  'Sexual Health':  { bg: 'linear-gradient(135deg, #fff7ed, #fed7aa)', border: '#fdba74', badge: '#ea580c' },
  'Anti-Aging':     { bg: 'linear-gradient(135deg, #fefce8, #fef9c3)', border: '#fde047', badge: '#ca8a04' },
  'Immune':         { bg: 'linear-gradient(135deg, #f0fdfa, #ccfbf1)', border: '#6ee7b7', badge: '#059669' },
  'Wellness':       { bg: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', border: '#cbd5e1', badge: '#475569' },
  'Essentials':     { bg: 'linear-gradient(135deg, #f8fafc, #f1f5f9)', border: '#cbd5e1', badge: '#475569' },
}

const RESEARCH_META = {
  robust:    { label: 'Robust Evidence',   color: '#15803d', bg: '#f0fdf4', border: '#bbf7d0' },
  moderate:  { label: 'Moderate Evidence', color: '#1d4ed8', bg: '#eff6ff', border: '#bfdbfe' },
  limited:   { label: 'Limited Evidence',  color: '#b45309', bg: '#fffbeb', border: '#fde68a' },
  anecdotal: { label: 'Anecdotal',         color: '#7c3aed', bg: '#faf5ff', border: '#ede9fe' },
}

export default function ProductsTab() {
  const [filter, setFilter] = useState('All')
  const visible = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter)

  return (
    <div>
      {/* Page header */}
      <div style={pageHeaderStyle}>
        <div>
          <h1 style={pageTitleStyle}>Shop Research Peptides</h1>
          <p style={pageSubStyle}>
            All products sourced from AminoClub.com — 99%+ purity, COA with every batch, ships from USA.
            Use code <strong style={{ color: '#7c3aed' }}>NICK1898</strong> at checkout.
          </p>
        </div>
        <a href={`https://www.aminoclub.com${AFF}`} target="_blank" rel="noopener noreferrer" style={visitStoreStyle}>
          Visit AminoClub.com ↗
        </a>
      </div>

      {/* Category filters */}
      <div style={filterRowStyle}>
        {CATEGORIES.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={filterBtnStyle(filter === cat)}>
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div style={gridStyle}>
        {visible.map(product => <ProductCard key={product.name} product={product} />)}
      </div>

      <p style={disclaimerStyle}>
        PeptideStack is an independent affiliate of AminoClub.com. For research purposes only.
        These statements have not been evaluated by the FDA. Not intended to diagnose, treat, cure, or prevent any disease.
      </p>
    </div>
  )
}

function ProductCard({ product }) {
  const catStyle = CATEGORY_COLORS[product.category] || CATEGORY_COLORS['Wellness']
  const researchMeta = RESEARCH_META[product.research] || RESEARCH_META.anecdotal

  return (
    <div className="card-hover" style={cardStyle}>
      {/* Color header */}
      <div style={{ ...cardHeaderStyle, background: catStyle.bg, borderBottom: `1px solid ${catStyle.border}` }}>
        <span style={catBadgeStyle(catStyle.badge)}>{product.category}</span>
        <span style={researchPillStyle(researchMeta)}>{researchMeta.label}</span>
      </div>

      <div style={cardBodyStyle}>
        <h3 style={cardNameStyle}>{product.name}</h3>
        <p style={cardDescStyle}>{product.desc}</p>

        <div style={metaBoxStyle}>
          <div style={metaRowStyle}>
            <span style={metaKeyStyle}>Route</span>
            <span style={metaValStyle}>{product.routes.join(' · ')}</span>
          </div>
          <div style={metaRowStyle}>
            <span style={metaKeyStyle}>Dose</span>
            <span style={metaValStyle}>{product.commonDose}</span>
          </div>
        </div>

        <a href={product.link} target="_blank" rel="noopener noreferrer" style={shopBtnStyle}>
          View on AminoClub.com →
        </a>
      </div>
    </div>
  )
}

const pageHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  gap: '20px',
  marginBottom: '24px',
  flexWrap: 'wrap',
}

const pageTitleStyle = {
  fontSize: '28px',
  fontWeight: 800,
  color: '#0f172a',
  letterSpacing: '-0.02em',
  marginBottom: '6px',
}

const pageSubStyle = {
  fontSize: '14px',
  color: '#64748b',
  lineHeight: 1.6,
  maxWidth: '520px',
}

const visitStoreStyle = {
  background: '#0f172a',
  borderRadius: '9px',
  color: '#fff',
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '11px 20px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
}

const filterRowStyle = {
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
  marginBottom: '24px',
}

const filterBtnStyle = (active) => ({
  background: active ? '#0f172a' : '#fff',
  border: `1.5px solid ${active ? '#0f172a' : '#e2e8f0'}`,
  borderRadius: '999px',
  color: active ? '#fff' : '#475569',
  cursor: 'pointer',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '13px',
  fontWeight: active ? 600 : 500,
  padding: '6px 16px',
  transition: 'all 0.15s',
})

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
  gap: '16px',
  marginBottom: '32px',
}

const cardStyle = {
  background: '#fff',
  border: '1.5px solid #e2e8f0',
  borderRadius: '14px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const cardHeaderStyle = {
  padding: '14px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
}

const catBadgeStyle = (color) => ({
  background: color,
  color: '#fff',
  borderRadius: '999px',
  fontSize: '11px',
  fontWeight: 700,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '3px 10px',
})

const researchPillStyle = (meta) => ({
  background: meta.bg,
  border: `1px solid ${meta.border}`,
  color: meta.color,
  borderRadius: '999px',
  fontSize: '10px',
  fontWeight: 600,
  fontFamily: "'IBM Plex Mono', monospace",
  padding: '2px 8px',
  letterSpacing: '0.02em',
})

const cardBodyStyle = {
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
  flex: 1,
}

const cardNameStyle = {
  fontSize: '16px',
  fontWeight: 700,
  color: '#0f172a',
  letterSpacing: '-0.01em',
}

const cardDescStyle = {
  fontSize: '13px',
  color: '#64748b',
  lineHeight: 1.65,
  flex: 1,
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 400,
}

const metaBoxStyle = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '10px 12px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}

const metaRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  gap: '8px',
}

const metaKeyStyle = {
  fontSize: '11px',
  color: '#94a3b8',
  fontFamily: "'IBM Plex Mono', monospace",
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
}

const metaValStyle = {
  fontSize: '12px',
  color: '#475569',
  fontFamily: "'IBM Plex Mono', monospace",
  fontWeight: 500,
  textAlign: 'right',
}

const shopBtnStyle = {
  display: 'block',
  background: '#0f172a',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '13px',
  fontWeight: 700,
  fontFamily: "'Space Grotesk', sans-serif",
  padding: '11px 16px',
  textAlign: 'center',
  transition: 'background 0.2s',
}

const disclaimerStyle = {
  fontSize: '11px',
  color: '#94a3b8',
  lineHeight: 1.6,
  borderTop: '1px solid #e2e8f0',
  paddingTop: '20px',
  fontFamily: "'IBM Plex Mono', monospace",
  textAlign: 'center',
}
