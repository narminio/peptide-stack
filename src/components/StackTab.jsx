import { useState, useEffect } from 'react'

const emptyPeptide = (timing) => ({ name: '', dose: '', route: 'subcutaneous injectable', timing })

export default function StackTab({ onStackSaved }) {
  const [morning, setMorning] = useState([])
  const [night, setNight] = useState([])
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetch('/api/stack')
      .then(r => r.json())
      .then(data => {
        setMorning(data.morningStack || [])
        setNight(data.nightStack || [])
      })
      .catch(err => setError(err.message))
  }, [])

  function updatePeptide(list, setList, index, field, value) {
    const updated = list.map((p, i) => i === index ? { ...p, [field]: value } : p)
    setList(updated)
  }

  function removePeptide(list, setList, index) {
    setList(list.filter((_, i) => i !== index))
  }

  async function handleSave() {
    setSaving(true)
    setError(null)
    setSuccess(false)
    try {
      const res = await fetch('/api/stack', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ morningStack: morning, nightStack: night }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body.error || `Server error: ${res.status}`)
      }
      const analysisData = await res.json()
      setSuccess(true)
      onStackSaved(analysisData)
    } catch (err) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fade-in" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>
      <Section
        title="Morning Stack"
        peptides={morning}
        onUpdate={(i, f, v) => updatePeptide(morning, setMorning, i, f, v)}
        onRemove={(i) => removePeptide(morning, setMorning, i)}
        onAdd={() => setMorning([...morning, emptyPeptide('morning')])}
      />
      <Section
        title="Night Stack"
        peptides={night}
        onUpdate={(i, f, v) => updatePeptide(night, setNight, i, f, v)}
        onRemove={(i) => removePeptide(night, setNight, i)}
        onAdd={() => setNight([...night, emptyPeptide('night')])}
        showTiming
      />

      {error && (
        <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
      )}
      {success && (
        <p style={{ color: '#4ade80', fontSize: '13px', marginBottom: '16px' }}>
          Stack saved & re-analyzed successfully.
        </p>
      )}

      <button
        onClick={handleSave}
        disabled={saving}
        style={saveButtonStyle(saving)}
      >
        {saving ? 'Saving & Analyzing...' : 'Save & Re-analyze'}
      </button>
    </div>
  )
}

function Section({ title, peptides, onUpdate, onRemove, onAdd, showTiming }) {
  return (
    <div style={{ marginBottom: '32px' }}>
      <h3 style={sectionHeadStyle}>{title}</h3>
      {peptides.length === 0 && (
        <p style={{ color: '#475569', fontSize: '13px', marginBottom: '12px' }}>No peptides.</p>
      )}
      {peptides.map((p, i) => (
        <div key={i} style={rowStyle}>
          <input
            placeholder="Name"
            value={p.name}
            onChange={e => onUpdate(i, 'name', e.target.value)}
            style={{ ...inputStyle, flex: '2' }}
          />
          <input
            placeholder="Dose"
            value={p.dose}
            onChange={e => onUpdate(i, 'dose', e.target.value)}
            style={{ ...inputStyle, flex: '2' }}
          />
          <input
            placeholder="Route"
            value={p.route}
            onChange={e => onUpdate(i, 'route', e.target.value)}
            style={{ ...inputStyle, flex: '2' }}
          />
          {showTiming && (
            <input
              placeholder="Timing (e.g. 2hr post-meal)"
              value={p.timing || ''}
              onChange={e => onUpdate(i, 'timing', e.target.value)}
              style={{ ...inputStyle, flex: '2' }}
            />
          )}
          <button onClick={() => onRemove(i)} style={deleteButtonStyle}>✕</button>
        </div>
      ))}
      <button onClick={onAdd} style={addButtonStyle}>+ Add peptide</button>
    </div>
  )
}

const sectionHeadStyle = {
  fontFamily: "'Space Grotesk', sans-serif",
  fontSize: '15px',
  fontWeight: 600,
  color: '#94a3b8',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  marginBottom: '12px',
}

const rowStyle = {
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
  marginBottom: '8px',
  flexWrap: 'wrap',
}

const inputStyle = {
  background: '#0f0f1a',
  border: '1px solid #1e1e35',
  borderRadius: '6px',
  color: '#e2e8f0',
  fontFamily: "'IBM Plex Mono', monospace",
  fontSize: '13px',
  padding: '8px 10px',
  minWidth: '120px',
  outline: 'none',
}

const deleteButtonStyle = {
  background: 'transparent',
  border: '1px solid #3f3f5a',
  borderRadius: '6px',
  color: '#f87171',
  cursor: 'pointer',
  fontSize: '13px',
  padding: '7px 10px',
  fontFamily: "'IBM Plex Mono', monospace",
  transition: 'border-color 0.15s',
  flexShrink: 0,
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
  marginTop: '4px',
  transition: 'border-color 0.15s',
}

const saveButtonStyle = (disabled) => ({
  background: disabled ? '#3f3f5a' : '#7c3aed',
  border: 'none',
  borderRadius: '6px',
  color: '#e2e8f0',
  cursor: disabled ? 'not-allowed' : 'pointer',
  fontSize: '14px',
  fontFamily: "'Space Grotesk', sans-serif",
  fontWeight: 600,
  padding: '12px 28px',
  letterSpacing: '0.02em',
  transition: 'background 0.2s',
})
