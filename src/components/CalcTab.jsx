import { useState, useEffect } from 'react'

function calcRow(vialMg, bacMl, doseMg) {
  const vial = parseFloat(vialMg)
  const bac  = parseFloat(bacMl)
  const dose = parseFloat(doseMg)
  if (!vial || !bac || !dose || vial <= 0 || bac <= 0 || dose <= 0) return null
  const concMgMl    = vial / bac
  const drawMl      = dose / concMgMl
  const units       = drawMl * 100          // U-100 insulin syringe: 1ml = 100 units
  return {
    concMgMl: concMgMl.toFixed(3),
    drawMl:   drawMl.toFixed(3),
    units:    units.toFixed(1),
  }
}

const defaultRow = (name = '', dose = '') => ({
  name, vialMg: '', bacMl: '2', doseMg: dose,
})

// Strip the ramping text to get just the first numeric dose value for prepopulation
function parseFirstDose(doseStr) {
  const m = doseStr.match(/([\d.]+)\s*mg/)
  return m ? m[1] : ''
}

export default function CalcTab() {
  const [rows, setRows] = useState([defaultRow()])

  useEffect(() => {
    fetch('/api/stack')
      .then(r => r.json())
      .then(data => {
        const all = [
          ...(data.morningStack || []),
          ...(data.nightStack   || []),
        ].filter(p => /injectable/i.test(p.route))  // only injectables need reconstitution

        if (all.length > 0) {
          setRows(all.map(p => defaultRow(p.name, parseFirstDose(p.dose))))
        }
      })
      .catch(() => {})  // silently fall back to empty row
  }, [])

  function updateRow(index, field, value) {
    setRows(rows.map((r, i) => i === index ? { ...r, [field]: value } : r))
  }

  function removeRow(index) {
    setRows(rows.filter((_, i) => i !== index))
  }

  return (
    <div className="fade-in" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <p style={hintStyle}>
        Enter vial size, BAC water volume, and desired dose per injection.
        Volume is calculated for a U-100 insulin syringe (1 ml = 100 units).
      </p>

      <div style={{ overflowX: 'auto' }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              {['Peptide', 'Vial (mg)', 'BAC Water (ml)', 'Dose (mg)', 'Conc (mg/ml)', 'Draw (ml)', 'Units (U-100)', ''].map(h => (
                <th key={h} style={thStyle}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => {
              const result = calcRow(row.vialMg, row.bacMl, row.doseMg)
              return (
                <tr key={i}>
                  <td style={tdStyle}>
                    <input
                      placeholder="e.g. BPC-157"
                      value={row.name}
                      onChange={e => updateRow(i, 'name', e.target.value)}
                      style={inputStyle}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number" min="0" step="0.1"
                      placeholder="e.g. 5"
                      value={row.vialMg}
                      onChange={e => updateRow(i, 'vialMg', e.target.value)}
                      style={{ ...inputStyle, width: '80px' }}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number" min="0" step="0.1"
                      placeholder="e.g. 2"
                      value={row.bacMl}
                      onChange={e => updateRow(i, 'bacMl', e.target.value)}
                      style={{ ...inputStyle, width: '80px' }}
                    />
                  </td>
                  <td style={tdStyle}>
                    <input
                      type="number" min="0" step="0.001"
                      placeholder="e.g. 0.5"
                      value={row.doseMg}
                      onChange={e => updateRow(i, 'doseMg', e.target.value)}
                      style={{ ...inputStyle, width: '90px' }}
                    />
                  </td>
                  <td style={{ ...tdStyle, ...resultCellStyle }}>
                    {result ? result.concMgMl : '—'}
                  </td>
                  <td style={{ ...tdStyle, ...resultCellStyle }}>
                    {result ? result.drawMl : '—'}
                  </td>
                  <td style={{ ...tdStyle, ...resultCellStyle, color: result ? '#a78bfa' : '#475569' }}>
                    {result ? result.units : '—'}
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

      <button
        onClick={() => setRows([...rows, defaultRow()])}
        style={addButtonStyle}
      >
        + Add row
      </button>

      <div style={legendStyle}>
        <span style={{ color: '#a78bfa' }}>■</span> Units column = units to draw on a U-100 syringe
      </div>
    </div>
  )
}

const hintStyle = {
  color: '#64748b',
  fontSize: '13px',
  marginBottom: '20px',
  lineHeight: '1.6',
}

const tableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '13px',
}

const thStyle = {
  textAlign: 'left',
  padding: '8px 10px',
  color: '#475569',
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '12px',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  borderBottom: '1px solid #1e1e35',
  whiteSpace: 'nowrap',
}

const tdStyle = {
  padding: '6px 8px',
  borderBottom: '1px solid #12121e',
  verticalAlign: 'middle',
}

const inputStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '5px',
  color: '#e2e8f0',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  padding: '6px 8px',
  width: '140px',
  outline: 'none',
}

const resultCellStyle = {
  color: '#e2e8f0',
  fontWeight: 500,
  fontFamily: "'IBM Plex Mono', monospace",
}

const deleteButtonStyle = {
  background: 'transparent',
  border: 'none',
  color: '#475569',
  cursor: 'pointer',
  fontSize: '14px',
  padding: '4px 6px',
  transition: 'color 0.15s',
}

const addButtonStyle = {
  background: 'transparent',
  border: '1px dashed #3f3f5a',
  borderRadius: '6px',
  color: '#7c3aed',
  cursor: 'pointer',
  fontSize: '13px',
  padding: '8px 16px',
  fontFamily: "'IBM Plex Mono', monospace",
  marginTop: '12px',
  transition: 'border-color 0.15s',
}

const legendStyle = {
  marginTop: '20px',
  fontSize: '12px',
  color: '#475569',
  fontFamily: "'IBM Plex Mono', monospace",
}
