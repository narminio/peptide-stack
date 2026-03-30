import { useState, useEffect } from 'react'

// sprayUl: atomizer delivers 0.1mL (100μL) per actuation — standard for nasal spray bottles
// startSprays / maxSprays: dose range expressed as WHOLE spray counts only — mcg derives from concentration
const NASAL_PRESETS = [
  {
    name: 'Semax',
    sprayUl: 100,          // 0.1mL per spray
    startSprays: 1,        // starting dose: 1 spray
    maxSprays: 3,          // max dose: 3 sprays
    frequency: '1–2x daily',
    timing: 'Morning, or morning + afternoon',
    notes: 'BDNF upregulation, cognitive enhancement, neuroprotection. Start at 1 spray and titrate up by 1 spray every few days as tolerated.',
    color: '#7c3aed',
    vialOptions: [
      { label: '5mg vial',             vialMg: 5,  bacMl: 2.5, note: 'Standard 5/5 split — 2,000 mcg/mL' },
      { label: '10mg vial · standard', vialMg: 10, bacMl: 5,   note: '10mg + 5mL → same 2,000 mcg/mL, 2× more total sprays' },
      { label: '10mg vial · high-dose',vialMg: 10, bacMl: 2.5, note: '10mg + 2.5mL → 4,000 mcg/mL, double dose per spray' },
    ],
  },
  {
    name: 'Selank',
    sprayUl: 100,          // 0.1mL per spray
    startSprays: 1,        // starting dose: 1 spray
    maxSprays: 2,          // max dose: 2 sprays
    frequency: '2–3x daily',
    timing: 'Morning, afternoon, and/or pre-stress event',
    notes: 'Anxiolytic, nootropic. No sedation. Safe for daily use. Can stack with Semax — use same atomizer sequentially or separate bottles.',
    color: '#0ea5e9',
    vialOptions: [
      { label: '5mg vial',             vialMg: 5,  bacMl: 2.5, note: 'Standard 5/5 split — 2,000 mcg/mL' },
      { label: '10mg vial · standard', vialMg: 10, bacMl: 5,   note: '10mg + 5mL → same 2,000 mcg/mL, 2× more total sprays' },
      { label: '10mg vial · high-dose',vialMg: 10, bacMl: 2.5, note: '10mg + 2.5mL → 4,000 mcg/mL, double dose per spray' },
    ],
  },
]

// Common peptide presets: [name, typical vial mg, typical dose mg]
const PRESETS = [
  { name: 'BPC-157',          vialMg: '5',  doseMg: '0.5'  },
  { name: 'TB-500',           vialMg: '5',  doseMg: '2.5'  },
  { name: 'GHK-Cu',           vialMg: '5',  doseMg: '1'    },
  { name: 'CJC-1295 no DAC',  vialMg: '2',  doseMg: '0.15' },
  { name: 'Ipamorelin',       vialMg: '2',  doseMg: '0.15' },
  { name: 'MOTS-C',           vialMg: '5',  doseMg: '5'    },
  { name: 'Tesamorelin',      vialMg: '2',  doseMg: '1'    },
  { name: 'AOD-9604',         vialMg: '5',  doseMg: '0.3'  },
  { name: 'PT-141',           vialMg: '10', doseMg: '1'    },
  { name: 'Epithalon',        vialMg: '10', doseMg: '10'   },
  { name: 'Thymosin Alpha-1', vialMg: '1.5',doseMg: '1.5'  },
  { name: 'Selank',           vialMg: '5',  doseMg: 'nasal' },
  { name: 'Semax',            vialMg: '5',  doseMg: 'nasal' },
]

function calcRow(vialMg, bacMl, doseMg) {
  const vial = parseFloat(vialMg)
  const bac  = parseFloat(bacMl)
  const dose = parseFloat(doseMg)
  if (!vial || !bac || !dose || vial <= 0 || bac <= 0 || dose <= 0) return null
  const concMgMl = vial / bac
  const drawMl   = dose / concMgMl
  const units    = drawMl * 100
  return {
    concMgMl:    concMgMl.toFixed(3),
    concMcgMl:   (concMgMl * 1000).toFixed(0),
    drawMl:      drawMl.toFixed(3),
    drawUl:      (drawMl * 1000).toFixed(1),
    units:       units.toFixed(1),
  }
}

const defaultRow = (name = '', vialMg = '', doseMg = '') => ({
  name, vialMg, bacMl: '2', doseMg,
})

export default function DosingTab({ recommendation }) {
  const [rows, setRows] = useState([defaultRow()])

  // Pre-populate from recommendation if provided
  useEffect(() => {
    if (recommendation?.stack?.length > 0) {
      const injectables = recommendation.stack.filter(p =>
        ['subcutaneous', 'intramuscular'].includes(p.route)
      )
      if (injectables.length > 0) {
        setRows(injectables.map(p => {
          const preset = PRESETS.find(pr => pr.name.toLowerCase() === p.name.toLowerCase())
          return defaultRow(p.name, preset?.vialMg || '', preset?.doseMg || '')
        }))
        return
      }
    }
    // Fall back to stack config
    fetch('/api/stack')
      .then(r => r.json())
      .then(data => {
        const all = [...(data.morningStack || []), ...(data.nightStack || [])]
          .filter(p => /injectable/i.test(p.route))
        if (all.length > 0) {
          setRows(all.map(p => {
            const m = p.dose?.match(/([\d.]+)\s*mg/)
            return defaultRow(p.name, '', m ? m[1] : '')
          }))
        }
      })
      .catch(() => {})
  }, [recommendation])

  function updateRow(i, field, value) {
    setRows(rows.map((r, idx) => idx === i ? { ...r, [field]: value } : r))
  }

  function applyPreset(i, preset) {
    if (preset.doseMg === 'nasal') return
    setRows(rows.map((r, idx) =>
      idx === i ? { ...r, name: preset.name, vialMg: preset.vialMg, doseMg: preset.doseMg } : r
    ))
  }

  function removeRow(i) {
    setRows(rows.filter((_, idx) => idx !== i))
  }

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <p style={hintStyle}>
        Calculate draw volume for U-100 insulin syringes (1 mL = 100 units).
        Use the preset button to auto-fill common peptide parameters.
      </p>

      {recommendation?.stack?.length > 0 && (
        <div style={infoBannerStyle}>
          Loaded from your current recommendation — injectable peptides only.
          Intranasal peptides (Semax, Selank) don't require reconstitution math.
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {[
                'Peptide', 'Vial (mg)', 'BAC Water (mL)',
                'Dose (mg)', 'Conc (mcg/mL)', 'Draw (mL)', 'Units (U-100)', ''
              ].map(h => <th key={h} style={thStyle}>{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const result = calcRow(row.vialMg, row.bacMl, row.doseMg)
              const presetMatch = PRESETS.find(p =>
                p.name.toLowerCase() === row.name.toLowerCase()
              )
              return (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <input
                        placeholder="Peptide name"
                        value={row.name}
                        onChange={e => updateRow(i, 'name', e.target.value)}
                        style={inputStyle}
                      />
                      <select
                        onChange={e => {
                          const p = PRESETS[parseInt(e.target.value)]
                          if (p) applyPreset(i, p)
                          e.target.value = ''
                        }}
                        style={{ ...inputStyle, fontSize: '11px', color: '#94a3b8' }}
                        defaultValue=""
                      >
                        <option value="" disabled>preset...</option>
                        {PRESETS.filter(p => p.doseMg !== 'nasal').map((p, pi) => (
                          <option key={pi} value={pi}>{p.name}</option>
                        ))}
                      </select>
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number" min="0" step="0.1"
                      placeholder="5"
                      value={row.vialMg}
                      onChange={e => updateRow(i, 'vialMg', e.target.value)}
                      style={{ ...inputStyle, width: '70px' }}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number" min="0" step="0.1"
                      placeholder="2"
                      value={row.bacMl}
                      onChange={e => updateRow(i, 'bacMl', e.target.value)}
                      style={{ ...inputStyle, width: '70px' }}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number" min="0" step="0.001"
                      placeholder="0.5"
                      value={row.doseMg}
                      onChange={e => updateRow(i, 'doseMg', e.target.value)}
                      style={{ ...inputStyle, width: '80px' }}
                    />
                  </td>
                  <td style={{ ...tdStyle, ...resultCellStyle }}>
                    {result ? (
                      <span>
                        <span style={{ color: '#0f172a' }}>{result.concMcgMl}</span>
                        <span style={{ color: '#94a3b8', fontSize: '10px' }}> mcg/mL</span>
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ ...tdStyle, ...resultCellStyle }}>
                    {result ? (
                      <span>
                        <span style={{ color: '#0f172a' }}>{result.drawMl}</span>
                        <span style={{ color: '#94a3b8', fontSize: '10px' }}> mL</span>
                        <span style={{ color: '#94a3b8', fontSize: '10px', display: 'block' }}>
                          ({result.drawUl} μL)
                        </span>
                      </span>
                    ) : '—'}
                  </td>
                  <td style={{ ...tdStyle, ...resultCellStyle }}>
                    {result ? (
                      <span style={{ color: '#a78bfa', fontWeight: 600 }}>
                        {result.units} <span style={{ color: '#94a3b8', fontWeight: 400, fontSize: '10px' }}>U</span>
                      </span>
                    ) : '—'}
                  </td>
                  <td style={tdStyle}>
                    <button onClick={() => removeRow(i)} style={deleteButtonStyle}>✕</button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <button onClick={() => setRows([...rows, defaultRow()])} style={addButtonStyle}>
        + Add peptide
      </button>

      <div style={legendStyle}>
        <div style={legendItemStyle}>
          <span style={{ color: '#a78bfa' }}>■</span> Units column = tick marks on a U-100 (100 IU/mL) insulin syringe
        </div>
        <div style={legendItemStyle}>
          <span style={{ color: '#94a3b8' }}>■</span> Standard BAC water: 2 mL per vial gives clean concentration math
        </div>
      </div>

      <div style={conversionBoxStyle}>
        <span style={conversionTitleStyle}>Quick Reference</span>
        <div style={conversionGridStyle}>
          <ConversionRow label="1 mg" value="1,000 mcg" />
          <ConversionRow label="0.01 mL" value="10 μL = 1 unit (U-100)" />
          <ConversionRow label="0.1 mL" value="100 μL = 10 units (U-100)" />
          <ConversionRow label="1 mL" value="1,000 μL = 100 units (U-100)" />
        </div>
      </div>

      {/* Intranasal section */}
      <div style={nasalSectionStyle}>
        <h3 style={nasalTitleStyle}>Intranasal Dosing — Semax &amp; Selank</h3>
        <p style={nasalSubStyle}>
          Intranasal peptides don't use a syringe draw volume — they're administered via nasal spray bottle.
          Use the vial size buttons on each card to match what you bought. A standard nasal pump delivers{' '}
          <strong>0.1mL per spray</strong>. The most common setup (5mg + 2.5mL or 10mg + 5mL) gives{' '}
          <strong>200mcg per spray</strong>.
        </p>
        <div style={nasalGridStyle}>
          {NASAL_PRESETS.map(p => <NasalCard key={p.name} preset={p} />)}
        </div>
      </div>
    </div>
  )
}

function ConversionRow({ label, value }) {
  return (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'space-between', padding: '4px 0', borderBottom: '1px solid #e2e8f0' }}>
      <span style={{ color: '#64748b', fontSize: '12px' }}>{label}</span>
      <span style={{ color: '#0f172a', fontSize: '12px' }}>{value}</span>
    </div>
  )
}

const hintStyle = {
  color: '#64748b',
  fontSize: '13px',
  marginBottom: '16px',
  lineHeight: 1.6,
  fontFamily: "'IBM Plex Mono', monospace",
}

const infoBannerStyle = {
  background: '#f5f3ff',
  border: '1px solid #ede9fe',
  borderRadius: '6px',
  color: '#7c3aed',
  fontSize: '12px',
  padding: '10px 14px',
  marginBottom: '16px',
  lineHeight: 1.5,
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
  marginBottom: '12px',
}

const thStyle = {
  textAlign: 'left',
  padding: '8px 10px',
  color: '#64748b',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  borderBottom: '1px solid #e2e8f0',
  whiteSpace: 'nowrap',
  background: '#ffffff',
}

const tdStyle = {
  padding: '8px 8px',
  verticalAlign: 'middle',
}

const inputStyle = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '5px',
  color: '#0f172a',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  padding: '6px 8px',
  width: '150px',
  outline: 'none',
}

const resultCellStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  verticalAlign: 'middle',
}

const deleteButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#475569',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '4px 6px',
}

const addButtonStyle = {
  background: '#ffffff',
  border: '1px dashed #e2e8f0',
  borderRadius: '6px',
  color: '#7c3aed',
  cursor: 'pointer',
  fontSize: '13px',
  padding: '8px 16px',
  fontFamily: "'IBM Plex Mono', monospace",
  marginTop: '4px',
}

const legendStyle = {
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  gap: '4px',
}

const legendItemStyle = {
  fontSize: '12px',
  color: '#64748b',
  fontFamily: "'IBM Plex Mono', monospace",
}

const conversionBoxStyle = {
  marginTop: '24px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '16px 20px',
  maxWidth: '360px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const conversionTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '12px',
  fontWeight: 600,
  color: '#0f172a',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  display: 'block',
  marginBottom: '12px',
}

const conversionGridStyle = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0',
}

// ── Intranasal components + styles ───────────────────────────────────────────

function NasalCard({ preset: p }) {
  const [optIdx, setOptIdx] = useState(0)
  const opt = p.vialOptions[optIdx]

  // All mcg values derived from concentration × whole spray counts only
  const concMcgMl   = (opt.vialMg * 1000) / opt.bacMl          // e.g. 2000 mcg/mL
  const mcgPerSpray = Math.round((concMcgMl * p.sprayUl) / 1000) // e.g. 200 mcg (0.1mL × 2000mcg/mL)
  const startMcg    = p.startSprays * mcgPerSpray
  const maxMcg      = p.maxSprays   * mcgPerSpray
  const totalSprays = Math.floor((opt.vialMg * 1000) / mcgPerSpray)

  return (
    <div style={nasalCardStyle(p.color)}>
      <div style={nasalCardHeaderStyle(p.color)}>
        <span style={nasalCardNameStyle}>{p.name}</span>
        <span style={nasalCardFreqStyle}>{p.frequency}</span>
      </div>

      {/* Vial size toggle */}
      <div style={nasalToggleRowStyle}>
        {p.vialOptions.map((o, i) => (
          <button key={i} onClick={() => setOptIdx(i)} style={nasalToggleBtnStyle(i === optIdx, p.color)}>
            {o.label}
          </button>
        ))}
      </div>
      <div style={nasalOptNoteStyle}>{opt.note}</div>

      <div style={nasalCardBodyStyle}>
        <div style={nasalStatRowStyle}>
          <NasalStat label="Reconstitution"    value={`${opt.vialMg}mg + ${opt.bacMl}mL BAC water`} color={p.color} />
          <NasalStat label="Concentration"     value={`${concMcgMl.toLocaleString()} mcg/mL`} color={p.color} />
          <NasalStat label="Per spray (0.1mL)" value={`${mcgPerSpray} mcg`} color={p.color} />
          <NasalStat label="Dose range"        value={`${p.startSprays}–${p.maxSprays} sprays (${startMcg}–${maxMcg} mcg)`} color={p.color} />
        </div>
        <div style={nasalTimingStyle}>
          <span style={{ color: '#94a3b8', fontSize: '10px', letterSpacing: '0.06em' }}>TIMING · </span>
          {p.timing}
        </div>
        <div style={nasalNotesStyle}>
          {p.notes}{' '}
          <strong style={{ color: p.color }}>{totalSprays} total sprays</strong> per vial at this setup.
        </div>
      </div>
    </div>
  )
}

function NasalStat({ label, value, color }) {
  return (
    <div style={nasalStatStyle}>
      <span style={{ fontSize: '9px', color: '#94a3b8', letterSpacing: '0.08em', display: 'block', marginBottom: '2px' }}>{label.toUpperCase()}</span>
      <span style={{ fontSize: '12px', color: color, fontWeight: 600 }}>{value}</span>
    </div>
  )
}

const nasalSectionStyle = {
  marginTop: '36px',
  paddingTop: '28px',
  borderTop: '1px solid #e2e8f0',
}

const nasalTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '14px',
  fontWeight: 700,
  color: '#0f172a',
  letterSpacing: '0.04em',
  textTransform: 'uppercase',
  marginBottom: '8px',
}

const nasalSubStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#64748b',
  lineHeight: 1.7,
  marginBottom: '20px',
}

const nasalGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
  gap: '16px',
}

const nasalCardStyle = (color) => ({
  background: '#ffffff',
  border: `1px solid ${color}33`,
  borderRadius: '10px',
  overflow: 'hidden',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
})

const nasalCardHeaderStyle = (color) => ({
  background: `${color}12`,
  borderBottom: `1px solid ${color}22`,
  padding: '12px 16px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
})

const nasalCardNameStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '14px',
  fontWeight: 700,
  color: '#0f172a',
}

const nasalCardFreqStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#64748b',
}

const nasalToggleRowStyle = {
  display: 'flex',
  gap: '6px',
  padding: '10px 16px 4px',
  flexWrap: 'wrap',
}

const nasalToggleBtnStyle = (active, color) => ({
  background: active ? color : '#f1f5f9',
  border: `1px solid ${active ? color : '#e2e8f0'}`,
  borderRadius: '6px',
  color: active ? '#fff' : '#64748b',
  cursor: 'pointer',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '10px',
  fontWeight: active ? 600 : 400,
  padding: '4px 10px',
  transition: 'all 0.15s',
})

const nasalOptNoteStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '10px',
  color: '#94a3b8',
  padding: '0 16px 8px',
  borderBottom: '1px solid #f1f5f9',
}

const nasalCardBodyStyle = {
  padding: '14px 16px',
}

const nasalStatRowStyle = {
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: '12px',
  marginBottom: '12px',
}

const nasalStatStyle = {
  background: '#f8fafc',
  borderRadius: '6px',
  padding: '8px 10px',
}

const nasalTimingStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#475569',
  marginBottom: '10px',
  paddingBottom: '10px',
  borderBottom: '1px solid #f1f5f9',
}

const nasalNotesStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#64748b',
  lineHeight: 1.7,
}
