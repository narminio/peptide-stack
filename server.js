import 'dotenv/config'
import express from 'express'
import { readFileSync, writeFileSync, existsSync } from 'fs'
import { fileURLToPath } from 'url'
import { dirname, join } from 'path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
app.use(express.json())

function loadStack() {
  const raw = readFileSync(join(__dirname, 'stack.config.js'), 'utf-8')
  const profileMatch  = raw.match(/export const userProfile\s*=\s*(\{[\s\S]*?\});/)
  const morningMatch  = raw.match(/export const morningStack\s*=\s*(\[[\s\S]*?\]);/)
  const nightMatch    = raw.match(/export const nightStack\s*=\s*(\[[\s\S]*?\]);/)
  const questionMatch = raw.match(/export const analysisQuestion\s*=\s*"([\s\S]*?)";/)
  // eslint-disable-next-line no-new-func
  const parse = str => Function(`"use strict"; return (${str})`)()
  return {
    userProfile:      profileMatch  ? parse(profileMatch[1])  : {},
    morningStack:     morningMatch  ? parse(morningMatch[1])  : [],
    nightStack:       nightMatch    ? parse(nightMatch[1])    : [],
    analysisQuestion: questionMatch ? questionMatch[1] : '',
  }
}

async function callAnthropic(system, messages, max_tokens = 4000) {
  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens,
      system,
      messages,
    }),
  })
  if (!response.ok) {
    const err = await response.text()
    throw new Error(`Anthropic API error: ${response.status} — ${err}`)
  }
  const result = await response.json()
  return result.content[0].text.trim()
}

// ── POST /api/recommend — goal-based stack recommender
app.post('/api/recommend', async (req, res) => {
  try {
    const { goals = [], profile = {}, notes = '' } = req.body

    const systemPrompt = `You are an expert peptide research specialist with deep knowledge of research peptides, their mechanisms, dosing protocols, reconstitution, and stack optimization.

Research level definitions:
- "robust": Multiple human RCTs, well-established pharmacology
- "moderate": Human case reports + solid animal data, some clinical use
- "limited": Primarily animal data, sparse human evidence
- "anecdotal": Community reports only, theoretical mechanisms

Peptide knowledge base:
- BPC-157: Synthetic pentadecapeptide. Tissue repair, gut healing, angiogenesis, tendon/ligament healing. 250-500mcg/day SubQ or IM. Half-life ~4hr. Research: moderate.
- TB-500 (Thymosin Beta-4 frag 17-23): Actin-sequestering peptide. Tissue repair, angiogenesis, anti-inflammatory. Loading: 2-5mg/week IM. Maintenance: 2mg biweekly. Research: limited.
- GHK-Cu: Copper tripeptide. Collagen synthesis, wound healing, anti-inflammatory, BDNF upregulation. 1-2mg/day SubQ. Research: limited.
- CJC-1295 no DAC: GHRH analog. Amplifies GH pulses. 100-300mcg SubQ pre-sleep (2hr post-meal). Half-life ~30min. Pair with GHRP. Research: limited.
- Ipamorelin: Selective ghrelin mimetic/GHRP. Clean GH pulse, minimal cortisol/prolactin. 100-300mcg SubQ pre-sleep. Pair with CJC-1295. Research: moderate.
- MOTS-C: Mitochondrial-derived peptide. Insulin sensitivity, fatty acid oxidation, exercise mimetic. 5-10mg/week IM. Research: limited.
- Semax: ACTH 4-7 analog. BDNF upregulation, cognitive enhancement, neuroprotection. 200-600mcg intranasal. Research: moderate.
- Selank: Synthetic enkephalin analog. Anxiolytic, nootropic, reduces anxiety without sedation. 250-3000mcg intranasal. Research: moderate.
- Tesamorelin: GHRH analog, FDA-approved. Visceral fat reduction, GH stimulation. 1-2mg/day SubQ. Research: robust.
- AOD-9604: GH fragment 176-191. Lipolysis without IGF-1 elevation. 300mcg/day SubQ, fasted. Research: limited.
- 5-Amino-1MQ: NNMT inhibitor. Fat loss via NAD+ pathway. 50-100mg oral. Research: limited (mostly animal).
- Retatrutide: Triple agonist (GLP-1/GIP/glucagon receptor). Most powerful fat loss peptide in clinical trials — outperforms semaglutide and tirzepatide. 0.5-12mg/week SubQ (titrated). Significant muscle preservation vs other GLP-1s. Research: moderate (Phase 2 trials, not yet FDA approved). Addresses fat loss, appetite, and metabolic health simultaneously.
- PT-141 (Bremelanotide): Melanocortin agonist, FDA-approved. Sexual function, libido. 0.5-2mg SubQ PRN. Research: robust.
- Epithalon: Tetrapeptide. Telomere regulation, anti-aging, melatonin. 5-10mg/day for 10-20 day cycles. Research: limited.
- KPV: Anti-inflammatory tripeptide. Gut healing, IBD, skin. 250-500mcg SubQ or oral. Research: limited.
- Thymosin Alpha-1: Immune modulator. Immune enhancement, antiviral. 0.5-1.6mg SubQ 2-3x/week. Research: robust.
- DSIP: Sleep regulation, cortisol reduction. 100-300mcg SubQ pre-sleep. Research: limited.
- Kisspeptin-10: GnRH stimulator. LH/FSH/testosterone boost, libido. 0.1-1nmol/kg SubQ. Research: limited.

Goals-to-peptides mapping:
- Fat Loss: Retatrutide (first choice for aggressive fat loss), Tesamorelin, AOD-9604, MOTS-C, 5-Amino-1MQ
- Muscle Building: CJC-1295 no DAC + Ipamorelin (GH pulse), BPC-157 (repair), TB-500 (recovery), GHK-Cu (collagen/recomp), Tesamorelin
- Cognitive Enhancement: Semax, Selank, Dihexa
- Injury Healing: BPC-157, TB-500, GHK-Cu
- Sleep Quality: CJC-1295+Ipamorelin (pre-sleep), DSIP
- Libido / Sexual Health: PT-141, Kisspeptin-10
- Gut Health: BPC-157, KPV
- Metabolic Health: MOTS-C, AOD-9604, Tesamorelin, Retatrutide
- Immune Support: Thymosin Alpha-1
- Anti-Aging / Longevity: Epithalon, GHK-Cu, Thymosin Alpha-1, CJC-1295+Ipamorelin

Stack design principles:
1. Recommend 2-5 peptides — do not overcomplicate
2. Leverage synergies (BPC-157 + TB-500 for repair; CJC-1295 + Ipamorelin for GH)
3. Respect half-lives and optimal timing windows
4. Standard GH peptide cycle: 12 weeks on / 4 weeks off
5. Be honest about evidence quality — do not overstate efficacy
6. Flag any contraindications with the user's stated conditions
7. For Fat Loss goal always consider Retatrutide as a primary option and explain its triple agonist advantage

Return ONLY raw JSON (no markdown, no backticks, no explanation). Start with { end with }.`

    const userPrompt = `User Goals: ${goals.join(', ') || 'General wellness'}
User Profile: ${JSON.stringify(profile)}
Additional Notes: ${notes || 'None'}

Return JSON matching this exact schema:
{
  "stackRationale": "string — overall rationale for this stack",
  "stack": [
    {
      "name": "string",
      "mechanism": "string — brief mechanism of action",
      "dose": "string — e.g. 500mcg",
      "frequency": "string — e.g. daily, 3x/week",
      "route": "subcutaneous|intramuscular|intranasal|oral",
      "timing": "string — e.g. morning fasted, pre-sleep 2hr post-meal",
      "rationale": "string — why this peptide for these specific goals",
      "researchLevel": "robust|moderate|limited|anecdotal",
      "cycleLength": "string — e.g. 12 weeks on / 4 weeks off",
      "sideEffects": ["string"]
    }
  ],
  "synergies": [
    { "peptides": ["string", "string"], "effect": "string" }
  ],
  "warnings": ["string"],
  "cycleProtocol": "string — overall cycle structure",
  "weeklySchedule": {
    "monday":    [{ "peptide": "string", "dose": "string", "route": "string", "timing": "string" }],
    "tuesday":   [{ "peptide": "string", "dose": "string", "route": "string", "timing": "string" }],
    "wednesday": [{ "peptide": "string", "dose": "string", "route": "string", "timing": "string" }],
    "thursday":  [{ "peptide": "string", "dose": "string", "route": "string", "timing": "string" }],
    "friday":    [{ "peptide": "string", "dose": "string", "route": "string", "timing": "string" }],
    "saturday":  [{ "peptide": "string", "dose": "string", "route": "string", "timing": "string" }],
    "sunday":    [{ "peptide": "string", "dose": "string", "route": "string", "timing": "string" }]
  }
}`

    const text = await callAnthropic(systemPrompt, [{ role: 'user', content: userPrompt }], 5000)
    let parsed
    try { parsed = JSON.parse(text) }
    catch { return res.status(500).json({ error: 'Failed to parse model response as JSON', raw: text }) }
    res.json(parsed)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── GET /api/stack — return current stack config
app.get('/api/stack', (req, res) => {
  try {
    res.json(loadStack())
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ── POST /api/stack — save updated stack config
app.post('/api/stack', async (req, res) => {
  try {
    const { morningStack, nightStack } = req.body
    if (!Array.isArray(morningStack) || !Array.isArray(nightStack)) {
      return res.status(400).json({ error: 'morningStack and nightStack must be arrays' })
    }
    const current = loadStack()
    const newContent = `export const userProfile = ${JSON.stringify(current.userProfile, null, 2)};

export const morningStack = ${JSON.stringify(morningStack, null, 2)};

export const nightStack = ${JSON.stringify(nightStack, null, 2)};

export const analysisQuestion = "${current.analysisQuestion}";
`
    writeFileSync(join(__dirname, 'stack.config.js'), newContent, 'utf-8')
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Serve Vite build in production
const distPath = join(__dirname, 'dist')
if (existsSync(distPath)) {
  app.use(express.static(distPath))
  app.get('*', (req, res) => {
    res.sendFile(join(distPath, 'index.html'))
  })
}

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
