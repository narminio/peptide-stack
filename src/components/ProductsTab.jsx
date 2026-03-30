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

const RESEARCH_COLORS = {
  robust:    { bg: '#14532d', color: '#4ade80' },
  moderate:  { bg: '#1e3a5f', color: '#60a5fa' },
  limited:   { bg: '#3b2200', color: '#fb923c' },
  anecdotal: { bg: '#2d1f3d', color: '#c084fc' },
}

const RESEARCH_LABELS = { robust: 'ROBUST', moderate: 'MODERATE', limited: 'LIMITED', anecdotal: 'ANECDOTAL' }

export default function ProductsTab() {
  const [filter, setFilter] = useState('All')

  const visible = filter === 'All' ? PRODUCTS : PRODUCTS.filter(p => p.category === filter)

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <div style={heroBannerStyle}>
        <div>
          <h2 style={heroTitleStyle}>AminoClub.com</h2>
          <p style={heroSubStyle}>Research-grade peptides · Third-party tested · Ships from USA</p>
          <p style={heroCodeStyle}>Use code <strong style={{ color: '#a78bfa' }}>NICK1898</strong> at checkout</p>
        </div>
        <a
          href={`https://www.aminoclub.com${AFF}`}
          target="_blank"
          rel="noopener noreferrer"
          style={heroLinkStyle}
        >
          Visit Store ↗
        </a>
      </div>

      {/* Category filter */}
      <div style={filterRowStyle}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            style={filterButtonStyle(filter === cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Product grid */}
      <div style={gridStyle}>
        {visible.map(product => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>

      <p style={disclaimerStyle}>
        For research purposes only. These statements have not been evaluated by the FDA. Always verify certificate of analysis before use.
      </p>
    </div>
  )
}

function ProductCard({ product }) {
  const level = RESEARCH_COLORS[product.research] || RESEARCH_COLORS.anecdotal
  const label = RESEARCH_LABELS[product.research] || 'ANECDOTAL'

  return (
    <div style={cardStyle}>
      <div style={cardTopStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px', marginBottom: '6px' }}>
          <h3 style={cardNameStyle}>{product.name}</h3>
          <span style={researchBadgeStyle(level)}>{label}</span>
        </div>
        <span style={categoryBadgeStyle}>{product.category}</span>
      </div>

      <p style={cardDescStyle}>{product.desc}</p>

      <div style={cardMetaStyle}>
        <div style={metaRowStyle}>
          <span style={metaLabelStyle}>Routes</span>
          <span style={metaValueStyle}>{product.routes.join(' · ')}</span>
        </div>
        <div style={metaRowStyle}>
          <span style={metaLabelStyle}>Common Dose</span>
          <span style={metaValueStyle}>{product.commonDose}</span>
        </div>
      </div>

      <a
        href={product.link}
        target="_blank"
        rel="noopener noreferrer"
        style={shopButtonStyle}
      >
        Shop on AminoClub.com ↗
      </a>
    </div>
  )
}

const heroBannerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #0f0f1a 0%, #1e1040 100%)',
  border: '1px solid #7c3aed44',
  borderRadius: '12px',
  padding: '20px 24px',
  marginBottom: '20px',
  flexWrap: 'wrap',
  gap: '12px',
}

const heroTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '18px',
  fontWeight: 700,
  color: '#f1f5f9',
  marginBottom: '4px',
}

const heroSubStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#64748b',
  marginBottom: '4px',
}

const heroCodeStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#64748b',
}

const heroLinkStyle = {
  background: '#7c3aed',
  border: 'none',
  borderRadius: '7px',
  color: '#fff',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '13px',
  fontWeight: 600,
  padding: '10px 18px',
  textDecoration: 'none',
  whiteSpace: 'nowrap',
}

const filterRowStyle = {
  display: 'flex',
  gap: '6px',
  flexWrap: 'wrap',
  marginBottom: '20px',
}

const filterButtonStyle = (active) => ({
  background: active ? '#1e1040' : 'transparent',
  border: `1px solid ${active ? '#7c3aed' : '#1e1e35'}`,
  borderRadius: '20px',
  color: active ? '#a78bfa' : '#475569',
  cursor: 'pointer',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  padding: '5px 12px',
  transition: 'all 0.15s',
  letterSpacing: '0.03em',
})

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
  gap: '12px',
  marginBottom: '24px',
}

const cardStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '10px',
  padding: '16px',
  display: 'flex',
  flexDirection: 'column',
  gap: '12px',
}

const cardTopStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}

const cardNameStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '14px',
  fontWeight: 700,
  color: '#f1f5f9',
}

const researchBadgeStyle = (level) => ({
  background: level.bg,
  color: level.color,
  borderRadius: '4px',
  fontSize: '9px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  padding: '2px 6px',
  fontFamily: "'IBM Plex Mono', monospace",
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

const categoryBadgeStyle = {
  background: '#12121e',
  color: '#475569',
  borderRadius: '4px',
  fontSize: '10px',
  letterSpacing: '0.06em',
  padding: '2px 7px',
  fontFamily: "'IBM Plex Mono', monospace",
  alignSelf: 'flex-start',
}

const cardDescStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#64748b',
  lineHeight: 1.7,
  flex: 1,
}

const cardMetaStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  borderTop: '1px solid #12121e',
  paddingTop: '10px',
}

const metaRowStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: '8px',
}

const metaLabelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '10px',
  color: '#334155',
  letterSpacing: '0.06em',
  flexShrink: 0,
}

const metaValueStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#94a3b8',
  textAlign: 'right',
}

const shopButtonStyle = {
  background: 'transparent',
  border: '1px solid #7c3aed',
  borderRadius: '6px',
  color: '#a78bfa',
  cursor: 'pointer',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  padding: '9px 12px',
  textAlign: 'center',
  textDecoration: 'none',
  display: 'block',
  letterSpacing: '0.03em',
  transition: 'all 0.15s',
}

const disclaimerStyle = {
  fontSize: '11px',
  color: '#334155',
  lineHeight: 1.6,
  borderTop: '1px solid #12121e',
  paddingTop: '16px',
  fontFamily: "'IBM Plex Mono', monospace",
}
