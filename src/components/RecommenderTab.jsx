import { useState } from 'react'

const GOALS = [
  { id: 'fat-loss',      label: 'Fat Loss',             desc: 'Visceral fat reduction, body recomp' },
  { id: 'recovery',      label: 'Muscle Recovery',       desc: 'Faster repair, reduced DOMS' },
  { id: 'cognitive',     label: 'Cognitive Enhancement', desc: 'Focus, BDNF, neuroprotection' },
  { id: 'gh',            label: 'GH Optimization',       desc: 'Pulsatile GH, anti-aging, sleep quality' },
  { id: 'injury',        label: 'Injury Healing',        desc: 'Tendon, ligament, joint repair' },
  { id: 'sleep',         label: 'Sleep Quality',         desc: 'GH pulse, deep sleep, recovery' },
  { id: 'libido',        label: 'Libido / Sexual Health',desc: 'Melanocortin, GnRH axis' },
  { id: 'gut',           label: 'Gut Health',            desc: 'Gut lining, IBD, permeability' },
  { id: 'metabolic',     label: 'Metabolic Health',      desc: 'Insulin sensitivity, mitochondria' },
  { id: 'immune',        label: 'Immune Support',        desc: 'Thymosin, immune modulation' },
]

const RESEARCH_COLORS = {
  robust:    { bg: '#14532d', color: '#4ade80', label: 'ROBUST' },
  moderate:  { bg: '#1e3a5f', color: '#60a5fa', label: 'MODERATE' },
  limited:   { bg: '#3b2200', color: '#fb923c', label: 'LIMITED' },
  anecdotal: { bg: '#2d1f3d', color: '#c084fc', label: 'ANECDOTAL' },
}

const ROUTE_ABBR = {
  subcutaneous: 'SubQ',
  intramuscular: 'IM',
  intranasal: 'Nasal',
  oral: 'Oral',
}

export default function RecommenderTab({ onRecommendation, recommendation, onViewSchedule }) {
  const [selectedGoals, setSelectedGoals] = useState([])
  const [profile, setProfile] = useState({ sex: '', weight: '', trainingFreq: '', conditions: '' })
  const [notes, setNotes] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showProfile, setShowProfile] = useState(false)

  function toggleGoal(id) {
    setSelectedGoals(prev =>
      prev.includes(id) ? prev.filter(g => g !== id) : [...prev, id]
    )
  }

  async function handleSubmit() {
    if (selectedGoals.length === 0) {
      setError('Select at least one goal.')
      return
    }
    setLoading(true)
    setError(null)
    try {
      const goalLabels = selectedGoals.map(id => GOALS.find(g => g.id === id)?.label).filter(Boolean)
      const res = await fetch('/api/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ goals: goalLabels, profile, notes }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Server error: ${res.status}`)
      }
      const data = await res.json()
      onRecommendation(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      {/* Goal selector */}
      <Section title="Select Your Goals">
        <div style={goalGridStyle}>
          {GOALS.map(goal => {
            const active = selectedGoals.includes(goal.id)
            return (
              <button
                key={goal.id}
                onClick={() => toggleGoal(goal.id)}
                style={goalButtonStyle(active)}
              >
                <span style={goalLabelStyle}>{goal.label}</span>
                <span style={goalDescStyle}>{goal.desc}</span>
              </button>
            )
          })}
        </div>
      </Section>

      {/* Optional profile */}
      <Section title={
        <button onClick={() => setShowProfile(p => !p)} style={toggleHeaderStyle}>
          Profile (optional) <span style={{ fontSize: '10px' }}>{showProfile ? '▲' : '▼'}</span>
        </button>
      }>
        {showProfile && (
          <div style={profileGridStyle}>
            <LabeledInput label="Sex" placeholder="male / female">
              <select
                value={profile.sex}
                onChange={e => setProfile(p => ({ ...p, sex: e.target.value }))}
                style={selectStyle}
              >
                <option value="">—</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </LabeledInput>
            <LabeledInput label="Weight">
              <input
                placeholder="e.g. 185 lbs"
                value={profile.weight}
                onChange={e => setProfile(p => ({ ...p, weight: e.target.value }))}
                style={inputStyle}
              />
            </LabeledInput>
            <LabeledInput label="Training Frequency">
              <input
                placeholder="e.g. 5x/week lifting"
                value={profile.trainingFreq}
                onChange={e => setProfile(p => ({ ...p, trainingFreq: e.target.value }))}
                style={inputStyle}
              />
            </LabeledInput>
            <LabeledInput label="Conditions / Medications">
              <input
                placeholder="e.g. ADHD, diabetes, none"
                value={profile.conditions}
                onChange={e => setProfile(p => ({ ...p, conditions: e.target.value }))}
                style={inputStyle}
              />
            </LabeledInput>
          </div>
        )}
      </Section>

      {/* Notes */}
      <Section title="Additional Notes (optional)">
        <textarea
          placeholder="e.g. Currently running BPC-157, prioritize injectables only, budget-conscious..."
          value={notes}
          onChange={e => setNotes(e.target.value)}
          style={textareaStyle}
          rows={3}
        />
      </Section>

      {error && <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>{error}</p>}

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={submitButtonStyle(loading)}
      >
        {loading ? (
          <span style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={spinnerStyle} /> Building your stack...
          </span>
        ) : 'Generate Stack Recommendation →'}
      </button>

      {/* Results */}
      {recommendation && !loading && (
        <div style={{ marginTop: '40px' }} className="fade-in">
          <div style={resultHeaderStyle}>
            <h2 style={resultTitleStyle}>Your Recommended Stack</h2>
            <button onClick={onViewSchedule} style={scheduleButtonStyle}>
              View Weekly Schedule →
            </button>
          </div>

          {/* Rationale */}
          <div style={rationaleBoxStyle}>
            <span style={sectionLabelStyle}>STACK RATIONALE</span>
            <p style={bodyTextStyle}>{recommendation.stackRationale}</p>
          </div>

          {/* Peptide cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {recommendation.stack?.map((peptide, i) => (
              <PeptideCard key={i} peptide={peptide} />
            ))}
          </div>

          {/* Synergies */}
          {recommendation.synergies?.length > 0 && (
            <InfoBox title="Synergies">
              {recommendation.synergies.map((s, i) => (
                <div key={i} style={synergyRowStyle}>
                  <span style={synergyPillsStyle}>
                    {s.peptides.join(' + ')}
                  </span>
                  <span style={bodyTextStyle}>{s.effect}</span>
                </div>
              ))}
            </InfoBox>
          )}

          {/* Warnings */}
          {recommendation.warnings?.length > 0 && (
            <InfoBox title="Warnings & Considerations" accent="#f87171">
              {recommendation.warnings.map((w, i) => (
                <p key={i} style={{ ...bodyTextStyle, color: '#fca5a5', marginBottom: '6px' }}>
                  ⚠ {w}
                </p>
              ))}
            </InfoBox>
          )}

          {/* Cycle protocol */}
          {recommendation.cycleProtocol && (
            <InfoBox title="Cycle Protocol">
              <p style={bodyTextStyle}>{recommendation.cycleProtocol}</p>
            </InfoBox>
          )}
        </div>
      )}
    </div>
  )
}

function PeptideCard({ peptide }) {
  const [expanded, setExpanded] = useState(false)
  const level = RESEARCH_COLORS[peptide.researchLevel] || RESEARCH_COLORS.anecdotal
  const route = ROUTE_ABBR[peptide.route] || peptide.route

  return (
    <div style={cardStyle}>
      <div style={cardHeaderStyle} onClick={() => setExpanded(e => !e)}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
          <span style={peptideNameStyle}>{peptide.name}</span>
          <span style={badgeStyle(level)}>{level.label}</span>
          <span style={routeBadgeStyle}>{route}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0 }}>
          <span style={doseStyle}>{peptide.dose} · {peptide.frequency}</span>
          <span style={{ color: '#475569', fontSize: '12px' }}>{expanded ? '▲' : '▼'}</span>
        </div>
      </div>

      {expanded && (
        <div style={cardBodyStyle} className="fade-in">
          <p style={{ ...bodyTextStyle, marginBottom: '12px' }}><strong style={{ color: '#94a3b8' }}>Mechanism:</strong> {peptide.mechanism}</p>
          <p style={{ ...bodyTextStyle, marginBottom: '12px' }}><strong style={{ color: '#94a3b8' }}>Timing:</strong> {peptide.timing}</p>
          <p style={{ ...bodyTextStyle, marginBottom: '12px' }}><strong style={{ color: '#94a3b8' }}>Why this stack:</strong> {peptide.rationale}</p>
          <p style={{ ...bodyTextStyle, marginBottom: peptide.sideEffects?.length ? '12px' : '0' }}><strong style={{ color: '#94a3b8' }}>Cycle:</strong> {peptide.cycleLength}</p>
          {peptide.sideEffects?.length > 0 && (
            <div>
              <strong style={{ color: '#94a3b8', fontSize: '12px' }}>Side effects: </strong>
              <span style={{ ...bodyTextStyle, color: '#94a3b8' }}>{peptide.sideEffects.join(', ')}</span>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function Section({ title, children }) {
  return (
    <div style={sectionStyle}>
      {typeof title === 'string'
        ? <h3 style={sectionTitleStyle}>{title}</h3>
        : title
      }
      {children}
    </div>
  )
}

function InfoBox({ title, accent = '#7c3aed', children }) {
  return (
    <div style={{ ...infoBoxStyle, borderLeft: `3px solid ${accent}`, marginBottom: '12px' }}>
      <span style={{ ...sectionLabelStyle, marginBottom: '10px', display: 'block' }}>{title.toUpperCase()}</span>
      {children}
    </div>
  )
}

function LabeledInput({ label, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <label style={{ color: '#475569', fontSize: '11px', letterSpacing: '0.08em' }}>{label.toUpperCase()}</label>
      {children}
    </div>
  )
}

// ── Styles ──────────────────────────────────────────────────────────────────

const goalGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
  gap: '8px',
}

const goalButtonStyle = (active) => ({
  background: active ? '#1e1040' : '#0f0f1a',
  border: `1px solid ${active ? '#7c3aed' : '#1e1e35'}`,
  borderRadius: '8px',
  color: active ? '#c4b5fd' : '#64748b',
  cursor: 'pointer',
  padding: '12px 14px',
  textAlign: 'left',
  transition: 'all 0.15s',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
})

const goalLabelStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '13px',
  fontWeight: 600,
  color: 'inherit',
}

const goalDescStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#475569',
  lineHeight: 1.4,
}

const profileGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '16px',
}

const inputStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '6px',
  color: '#e2e8f0',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  padding: '8px 10px',
  width: '100%',
  outline: 'none',
}

const selectStyle = {
  ...{
    background: '#0f0f1a',
    border: '1px solid #1e1e35',
    borderRadius: '6px',
    color: '#e2e8f0',
    fontFamily: "'IBM Plex Mono', monospace",
    fontSize: '13px',
    padding: '8px 10px',
    width: '100%',
    outline: 'none',
  }
}

const textareaStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '6px',
  color: '#e2e8f0',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  padding: '10px 12px',
  width: '100%',
  outline: 'none',
  resize: 'vertical',
  lineHeight: 1.6,
}

const submitButtonStyle = (loading) => ({
  background: loading ? '#3f3f5a' : '#7c3aed',
  border: 'none',
  borderRadius: '8px',
  color: '#fff',
  cursor: loading ? 'not-allowed' : 'pointer',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '14px',
  fontWeight: 600,
  padding: '14px 28px',
  letterSpacing: '0.02em',
  transition: 'background 0.2s',
  display: 'inline-flex',
  alignItems: 'center',
})

const spinnerStyle = {
  width: '14px',
  height: '14px',
  border: '2px solid rgba(255,255,255,0.3)',
  borderTop: '2px solid #fff',
  borderRadius: '50%',
  animation: 'spin 0.8s linear infinite',
  display: 'inline-block',
}

const sectionStyle = {
  marginBottom: '20px',
}

const sectionTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '13px',
  fontWeight: 600,
  color: '#64748b',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '12px',
}

const toggleHeaderStyle = {
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '13px',
  fontWeight: 600,
  color: '#64748b',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  padding: '0',
  marginBottom: '12px',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}

const resultHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '20px',
  flexWrap: 'wrap',
  gap: '12px',
}

const resultTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '18px',
  fontWeight: 700,
  color: '#f1f5f9',
}

const scheduleButtonStyle = {
  background: 'transparent',
  border: '1px solid #7c3aed',
  borderRadius: '6px',
  color: '#a78bfa',
  cursor: 'pointer',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  padding: '8px 14px',
  letterSpacing: '0.04em',
  transition: 'all 0.15s',
}

const rationaleBoxStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '10px',
  padding: '18px 20px',
  marginBottom: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}

const cardStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '10px',
  overflow: 'hidden',
}

const cardHeaderStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '14px 18px',
  cursor: 'pointer',
  gap: '12px',
  flexWrap: 'wrap',
}

const cardBodyStyle = {
  padding: '0 18px 16px',
  borderTop: '1px solid #1a1a2e',
  paddingTop: '14px',
}

const peptideNameStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '15px',
  fontWeight: 600,
  color: '#e2e8f0',
}

const badgeStyle = (level) => ({
  background: level.bg,
  color: level.color,
  borderRadius: '4px',
  fontSize: '10px',
  fontWeight: 600,
  letterSpacing: '0.08em',
  padding: '2px 7px',
  fontFamily: "'IBM Plex Mono', monospace",
})

const routeBadgeStyle = {
  background: '#1a1a2e',
  color: '#64748b',
  borderRadius: '4px',
  fontSize: '10px',
  letterSpacing: '0.06em',
  padding: '2px 7px',
  fontFamily: "'IBM Plex Mono', monospace",
}

const doseStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#a78bfa',
}

const infoBoxStyle = {
  background: '#0a0a14',
  border: '1px solid #1e1e35',
  borderRadius: '8px',
  padding: '16px 18px',
}

const synergyRowStyle = {
  display: 'flex',
  gap: '12px',
  alignItems: 'flex-start',
  marginBottom: '10px',
  flexWrap: 'wrap',
}

const synergyPillsStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#a78bfa',
  background: '#1e1040',
  borderRadius: '4px',
  padding: '2px 8px',
  whiteSpace: 'nowrap',
  flexShrink: 0,
}

const sectionLabelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '10px',
  color: '#475569',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
}

const bodyTextStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  color: '#94a3b8',
  lineHeight: 1.7,
}
