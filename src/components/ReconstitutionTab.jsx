import { useState } from 'react'

const PEPTIDE_STABILITY = [
  { name: 'BPC-157',           storage: 'Fridge 2–8°C', life: '30–60 days reconstituted', freeze: 'Yes, lyophilized only' },
  { name: 'TB-500',            storage: 'Fridge 2–8°C', life: '30–60 days reconstituted', freeze: 'Yes, lyophilized only' },
  { name: 'GHK-Cu',            storage: 'Fridge 2–8°C', life: '30 days reconstituted',    freeze: 'Yes, lyophilized only' },
  { name: 'CJC-1295 no DAC',   storage: 'Fridge 2–8°C', life: '4–6 weeks reconstituted',  freeze: 'Yes, lyophilized only' },
  { name: 'Ipamorelin',        storage: 'Fridge 2–8°C', life: '4–6 weeks reconstituted',  freeze: 'Yes, lyophilized only' },
  { name: 'MOTS-C',            storage: 'Fridge 2–8°C', life: '30 days reconstituted',    freeze: 'Yes, lyophilized only' },
  { name: 'Tesamorelin',       storage: 'Fridge 2–8°C', life: '30 days reconstituted',    freeze: 'Yes, lyophilized only' },
  { name: 'AOD-9604',          storage: 'Fridge 2–8°C', life: '30–60 days reconstituted', freeze: 'Yes, lyophilized only' },
  { name: 'PT-141',            storage: 'Fridge 2–8°C', life: '30 days reconstituted',    freeze: 'Yes, lyophilized only' },
  { name: 'Epithalon',         storage: 'Fridge 2–8°C', life: '30 days reconstituted',    freeze: 'Yes, lyophilized only' },
  { name: 'Thymosin Alpha-1',  storage: 'Fridge 2–8°C', life: '4–6 weeks reconstituted',  freeze: 'Yes, lyophilized only' },
]

const STEPS = [
  {
    num: '01',
    title: 'Gather supplies',
    body: 'Lyophilized peptide vial · Bacteriostatic water (BAC water) · Alcohol swabs (70% isopropyl) · Insulin syringes (28–31g, 0.5mL or 1mL) · Sharps container',
  },
  {
    num: '02',
    title: 'Sanitize',
    body: 'Wipe the rubber stopper of both the peptide vial and BAC water vial with a fresh alcohol swab. Allow to air-dry for 10 seconds. Do not blow on or touch the stopper.',
  },
  {
    num: '03',
    title: 'Draw BAC water',
    body: 'Using a fresh insulin syringe, draw the calculated volume of BAC water (see calculator below). Pull the plunger back to the exact tick mark needed.',
  },
  {
    num: '04',
    title: 'Inject BAC water slowly',
    body: 'Insert the needle into the peptide vial at a slight angle. Aim the water stream at the inside glass wall — never squirt directly onto the lyophilized powder cake. Push the plunger slowly.',
  },
  {
    num: '05',
    title: 'Dissolve gently',
    body: 'Gently swirl the vial between your fingers in a circular motion. Never shake. Allow 1–2 minutes to fully dissolve. The solution should be clear and colorless (slight tint is acceptable for some peptides).',
  },
  {
    num: '06',
    title: 'Inspect',
    body: 'Hold the vial up to light. Discard if you see particulates, cloudiness, or color change (brown/yellow is a contamination flag for most peptides). A slight blue tint in GHK-Cu is normal.',
  },
  {
    num: '07',
    title: 'Label and store',
    body: 'Label the vial with the peptide name, concentration (e.g. 2mg/mL), and date reconstituted. Store upright in the fridge at 2–8°C. Keep away from light. Do not freeze reconstituted peptides.',
  },
]

export default function ReconstitutionTab() {
  const [vialMg, setVialMg]       = useState('')
  const [targetConc, setTargetConc] = useState('')
  const [bacMl, setBacMl]         = useState('')
  const [calcMode, setCalcMode]   = useState('byConc') // 'byConc' | 'byBac'

  // Mode 1: given vial size + target concentration → BAC water needed
  const calcBacFromConc = () => {
    const vial = parseFloat(vialMg)
    const conc = parseFloat(targetConc) // mcg/mL
    if (!vial || !conc || conc <= 0) return null
    const bacNeeded = (vial * 1000) / conc
    return bacNeeded.toFixed(2)
  }

  // Mode 2: given vial size + BAC water volume → resulting concentration
  const calcConcFromBac = () => {
    const vial = parseFloat(vialMg)
    const bac  = parseFloat(bacMl)
    if (!vial || !bac || bac <= 0) return null
    return {
      concMcgMl: ((vial * 1000) / bac).toFixed(0),
      concMgMl:  (vial / bac).toFixed(3),
    }
  }

  const bacResult  = calcMode === 'byConc' ? calcBacFromConc() : null
  const concResult = calcMode === 'byBac'  ? calcConcFromBac() : null

  return (
    <div style={{ fontFamily: "'IBM Plex Mono', monospace" }}>

      {/* Step-by-step guide */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={sectionTitleStyle}>Reconstitution Protocol</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {STEPS.map(step => (
            <div key={step.num} style={stepCardStyle}>
              <div style={stepNumStyle}>{step.num}</div>
              <div>
                <div style={stepTitleStyle}>{step.title}</div>
                <div style={stepBodyStyle}>{step.body}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Concentration calculator */}
      <div style={{ marginBottom: '36px' }}>
        <h2 style={sectionTitleStyle}>Concentration Calculator</h2>
        <div style={calcCardStyle}>
          {/* Mode toggle */}
          <div style={modeToggleStyle}>
            <button
              onClick={() => setCalcMode('byConc')}
              style={modeButtonStyle(calcMode === 'byConc')}
            >
              Target concentration → BAC water needed
            </button>
            <button
              onClick={() => setCalcMode('byBac')}
              style={modeButtonStyle(calcMode === 'byBac')}
            >
              BAC water added → resulting concentration
            </button>
          </div>

          <div style={calcRowStyle}>
            <CalcField
              label="Vial Size (mg)"
              value={vialMg}
              onChange={setVialMg}
              placeholder="e.g. 5"
            />
            {calcMode === 'byConc' ? (
              <CalcField
                label="Target Concentration (mcg/mL)"
                value={targetConc}
                onChange={setTargetConc}
                placeholder="e.g. 2000"
              />
            ) : (
              <CalcField
                label="BAC Water Added (mL)"
                value={bacMl}
                onChange={setBacMl}
                placeholder="e.g. 2"
              />
            )}
          </div>

          {calcMode === 'byConc' && bacResult && (
            <ResultBox>
              Add <ResultVal>{bacResult} mL</ResultVal> of BAC water to reconstitute at{' '}
              <ResultVal>{targetConc} mcg/mL</ResultVal> ({(parseFloat(targetConc)/1000).toFixed(3)} mg/mL)
            </ResultBox>
          )}

          {calcMode === 'byBac' && concResult && (
            <ResultBox>
              Concentration: <ResultVal>{concResult.concMcgMl} mcg/mL</ResultVal>{' '}
              ({concResult.concMgMl} mg/mL)
              <br />
              Then use the <strong style={{ color: '#7c3aed' }}>Dosing Calc</strong> tab to find your draw volume.
            </ResultBox>
          )}

          <div style={commonConcsStyle}>
            <span style={commonConcsLabelStyle}>Common concentrations:</span>
            <CommonConc vial={5} bac={2}   /> {/* 2500 mcg/mL */}
            <CommonConc vial={5} bac={2.5} /> {/* 2000 mcg/mL */}
            <CommonConc vial={5} bac={5}   /> {/* 1000 mcg/mL */}
            <CommonConc vial={2} bac={1}   /> {/* 2000 mcg/mL */}
            <CommonConc vial={2} bac={2}   /> {/* 1000 mcg/mL */}
          </div>
        </div>
      </div>

      {/* Storage table */}
      <div>
        <h2 style={sectionTitleStyle}>Stability & Storage Reference</h2>
        <div style={{ overflowX: 'auto' }}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {['Peptide', 'Storage', 'Reconstituted Shelf Life', 'Freeze (lyophilized)'].map(h => (
                  <th key={h} style={thStyle}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {PEPTIDE_STABILITY.map((p, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #e2e8f0' }}>
                  <td style={{ ...tdStyle, color: '#0f172a', fontWeight: 500 }}>{p.name}</td>
                  <td style={tdStyle}>{p.storage}</td>
                  <td style={tdStyle}>{p.life}</td>
                  <td style={{ ...tdStyle, color: '#4ade80' }}>{p.freeze}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div style={warningBoxStyle}>
          <strong style={{ color: '#fbbf24' }}>Key rules:</strong>
          <ul style={warningListStyle}>
            <li>Never freeze a reconstituted peptide — it destroys the protein structure.</li>
            <li>Lyophilized (powder) peptides can be stored at −20°C long-term before reconstitution.</li>
            <li>Discard immediately if solution turns cloudy, particulate, or discolored (except GHK-Cu blue tint).</li>
            <li>Always use bacteriostatic water (0.9% benzyl alcohol) — not sterile water, not saline.</li>
            <li>Use a new sterile syringe for every injection. Never re-use needles.</li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function CalcField({ label, value, onChange, placeholder }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1 }}>
      <label style={calcLabelStyle}>{label.toUpperCase()}</label>
      <input
        type="number"
        min="0"
        step="any"
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        style={calcInputStyle}
      />
    </div>
  )
}

function ResultBox({ children }) {
  return (
    <div style={resultBoxStyle}>{children}</div>
  )
}

function ResultVal({ children }) {
  return <span style={{ color: '#7c3aed', fontWeight: 600 }}>{children}</span>
}

function CommonConc({ vial, bac }) {
  const conc = ((vial * 1000) / bac).toFixed(0)
  return (
    <span style={commonConcItemStyle}>
      {vial}mg + {bac}mL = <span style={{ color: '#7c3aed' }}>{conc} mcg/mL</span>
    </span>
  )
}

const sectionTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '16px',
  fontWeight: 700,
  color: '#0f172a',
  marginBottom: '16px',
}

const stepCardStyle = {
  display: 'flex',
  gap: '16px',
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '8px',
  padding: '14px 18px',
  alignItems: 'flex-start',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const stepNumStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  color: '#7c3aed',
  fontWeight: 600,
  letterSpacing: '0.06em',
  flexShrink: 0,
  marginTop: '2px',
  minWidth: '24px',
}

const stepTitleStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '13px',
  fontWeight: 600,
  color: '#0f172a',
  marginBottom: '4px',
}

const stepBodyStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#64748b',
  lineHeight: 1.7,
}

const calcCardStyle = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '10px',
  padding: '20px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const modeToggleStyle = {
  display: 'flex',
  gap: '6px',
  marginBottom: '20px',
  flexWrap: 'wrap',
}

const modeButtonStyle = (active) => ({
  background: active ? '#f5f3ff' : '#ffffff',
  border: `1px solid ${active ? '#7c3aed' : '#e2e8f0'}`,
  borderRadius: '6px',
  color: active ? '#7c3aed' : '#64748b',
  cursor: 'pointer',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '11px',
  padding: '7px 12px',
  transition: 'all 0.15s',
  letterSpacing: '0.03em',
})

const calcRowStyle = {
  display: 'flex',
  gap: '16px',
  marginBottom: '16px',
  flexWrap: 'wrap',
}

const calcLabelStyle = {
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '10px',
  color: '#64748b',
  letterSpacing: '0.1em',
}

const calcInputStyle = {
  background: '#ffffff',
  border: '1px solid #e2e8f0',
  borderRadius: '6px',
  color: '#0f172a',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '14px',
  padding: '10px 12px',
  outline: 'none',
  width: '100%',
}

const resultBoxStyle = {
  background: '#f5f3ff',
  border: '1px solid #ede9fe',
  borderRadius: '6px',
  color: '#64748b',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  lineHeight: 1.7,
  padding: '12px 16px',
  marginBottom: '16px',
}

const commonConcsStyle = {
  display: 'flex',
  flexWrap: 'wrap',
  gap: '8px',
  alignItems: 'center',
  marginTop: '4px',
}

const commonConcsLabelStyle = {
  fontSize: '11px',
  color: '#475569',
  letterSpacing: '0.04em',
}

const commonConcItemStyle = {
  background: '#f8fafc',
  border: '1px solid #e2e8f0',
  borderRadius: '4px',
  color: '#64748b',
  fontSize: '11px',
  padding: '3px 8px',
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
  marginBottom: '16px',
}

const thStyle = {
  textAlign: 'left',
  padding: '8px 12px',
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
  padding: '10px 12px',
  color: '#64748b',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
}

const warningBoxStyle = {
  background: '#fffbeb',
  border: '1px solid #fde68a',
  borderRadius: '8px',
  padding: '16px 18px',
  marginTop: '4px',
}

const warningListStyle = {
  marginTop: '8px',
  paddingLeft: '18px',
  display: 'flex',
  flexDirection: 'column',
  gap: '6px',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '12px',
  color: '#92400e',
  lineHeight: 1.6,
}
