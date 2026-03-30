import { useState } from 'react'

const PRODUCTS = [
  // Recovery & Repair
  {
    name: 'BPC-157',
    category: 'Recovery',
    desc: 'Synthetic pentadecapeptide derived from human gastric juice. Gold standard for tendon, ligament, and gut repair. Promotes angiogenesis and accelerates wound healing.',
    research: 'moderate',
    routes: ['SubQ', 'IM', 'Oral'],
    commonDose: '250–500 mcg/day',
    slug: 'bpc-157',
  },
  {
    name: 'TB-500',
    category: 'Recovery',
    desc: 'Thymosin Beta-4 fragment (aa 17–23). Promotes actin polymerization, angiogenesis, and systemic tissue repair. Widely used for injury loading protocols.',
    research: 'limited',
    routes: ['SubQ', 'IM'],
    commonDose: '2–5 mg/week (loading)',
    slug: 'tb-500',
  },
  {
    name: 'GHK-Cu',
    category: 'Recovery',
    desc: 'Copper-binding tripeptide. Upregulates collagen synthesis, BDNF, and wound healing genes. Anti-inflammatory and neuroprotective properties.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '1–2 mg/day',
    slug: 'ghk-cu',
  },
  // GH Secretagogues
  {
    name: 'CJC-1295 (No DAC)',
    category: 'GH / Anti-aging',
    desc: 'Modified GHRH analog without drug affinity complex. Amplifies natural pulsatile GH release without blunting the feedback axis. Always stack with a GHRP.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '100–300 mcg pre-sleep',
    slug: 'cjc-1295-no-dac',
  },
  {
    name: 'Ipamorelin',
    category: 'GH / Anti-aging',
    desc: 'Selective ghrelin mimetic. Cleanest GH pulse with minimal cortisol, prolactin, or appetite stimulation. The benchmark GHRP for stacking with CJC-1295.',
    research: 'moderate',
    routes: ['SubQ'],
    commonDose: '100–300 mcg pre-sleep',
    slug: 'ipamorelin',
  },
  {
    name: 'Tesamorelin',
    category: 'GH / Anti-aging',
    desc: 'FDA-approved GHRH analog. Clinically proven visceral fat reduction and GH secretion. More potent than CJC-1295 for metabolic effects.',
    research: 'robust',
    routes: ['SubQ'],
    commonDose: '1–2 mg/day',
    slug: 'tesamorelin',
  },
  {
    name: 'Epithalon',
    category: 'GH / Anti-aging',
    desc: 'Tetrapeptide that activates telomerase, extending telomere length. Regulates melatonin and circadian rhythm. Anti-aging flagship compound.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '5–10 mg/day, 10–20 day cycle',
    slug: 'epithalon',
  },
  // Fat Loss
  {
    name: 'AOD-9604',
    category: 'Fat Loss',
    desc: 'GH fragment 176–191. Promotes lipolysis via fat cell beta-3 receptors without elevating IGF-1 or affecting blood sugar. Best taken fasted.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '300 mcg/day, fasted AM',
    slug: 'aod-9604',
  },
  {
    name: '5-Amino-1MQ',
    category: 'Fat Loss',
    desc: 'NNMT (nicotinamide N-methyltransferase) inhibitor. Elevates NAD+, activates SIRT1, and induces adipocyte browning. Oral bioavailability.',
    research: 'limited',
    routes: ['Oral'],
    commonDose: '50–100 mg/day',
    slug: '5-amino-1mq',
  },
  {
    name: 'MOTS-C',
    category: 'Fat Loss',
    desc: 'Mitochondrial-derived peptide from the 12S rRNA gene. Enhances insulin sensitivity, fatty acid oxidation, and exercise capacity. Called an "exercise mimetic."',
    research: 'limited',
    routes: ['SubQ', 'IM'],
    commonDose: '5–10 mg/week',
    slug: 'mots-c',
  },
  // Cognitive
  {
    name: 'Semax',
    category: 'Cognitive',
    desc: 'ACTH 4–7 analog developed in Russia. Potently upregulates BDNF and NGF, enhancing focus, memory, and neuroprotection. Intranasal delivery.',
    research: 'moderate',
    routes: ['Nasal'],
    commonDose: '200–600 mcg/nostril',
    slug: 'semax',
  },
  {
    name: 'Selank',
    category: 'Cognitive',
    desc: 'Synthetic heptapeptide analog of tuftsin. Anxiolytic without sedation, nootropic via IL-6 modulation. Often stacked with Semax for cognitive + mood.',
    research: 'moderate',
    routes: ['Nasal'],
    commonDose: '250–1000 mcg/nostril',
    slug: 'selank',
  },
  // Sexual Health
  {
    name: 'PT-141 (Bremelanotide)',
    category: 'Sexual Health',
    desc: 'FDA-approved melanocortin agonist. Acts centrally on the hypothalamus to drive libido and sexual arousal in both men and women. PRN dosing.',
    research: 'robust',
    routes: ['SubQ'],
    commonDose: '0.5–2 mg as needed',
    slug: 'pt-141',
  },
  {
    name: 'Kisspeptin-10',
    category: 'Sexual Health',
    desc: 'Endogenous neuropeptide that drives GnRH → LH → testosterone axis. Supports natural testosterone production and libido.',
    research: 'limited',
    routes: ['SubQ'],
    commonDose: '0.1–1 nmol/kg',
    slug: 'kisspeptin-10',
  },
  // Immune
  {
    name: 'Thymosin Alpha-1',
    category: 'Immune',
    desc: 'FDA-approved in 35+ countries. Thymic peptide that enhances T-cell function, antiviral immunity, and dendritic cell maturation. Approved for hepatitis and cancer adjunct.',
    research: 'robust',
    routes: ['SubQ'],
    commonDose: '0.5–1.6 mg, 2–3x/week',
    slug: 'thymosin-alpha-1',
  },
  // Gut Health
  {
    name: 'KPV',
    category: 'Gut Health',
    desc: 'C-terminal fragment of α-MSH. Potent anti-inflammatory in the gut via NF-κB inhibition. Used for IBD, colitis, and intestinal permeability.',
    research: 'limited',
    routes: ['SubQ', 'Oral'],
    commonDose: '250–500 mcg/day',
    slug: 'kpv',
  },
]

const CATEGORIES = ['All', 'Recovery', 'GH / Anti-aging', 'Fat Loss', 'Cognitive', 'Sexual Health', 'Immune', 'Gut Health']

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
        </div>
        <a
          href="https://aminoclub.com?ref=NICK1898"
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
        Product links search AminoClub.com for each peptide. Always verify product availability and certificate of analysis before purchasing. These statements have not been evaluated by the FDA. Research peptides are for laboratory research purposes only.
      </p>
    </div>
  )
}

function ProductCard({ product }) {
  const level = RESEARCH_COLORS[product.research] || RESEARCH_COLORS.anecdotal
  const label = RESEARCH_LABELS[product.research] || 'ANECDOTAL'
  const searchUrl = `https://aminoclub.com/search?type=product&q=${encodeURIComponent(product.name)}&ref=NICK1898`

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
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        style={shopButtonStyle}
      >
        Shop {product.name} on AminoClub.com ↗
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
  transition: 'background 0.2s',
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
  transition: 'border-color 0.2s',
}

const cardTopStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
}

const cardNameStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '15px',
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
