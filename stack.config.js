export const userProfile = {
  sex: "male",
  trainingFrequency: "5+ days/week",
  trainingType: "lifting + cardio",
  metabolicIssues: false,
  conditions: ["ADHD"]
};

export const morningStack = [
  { name: "BPC-157", dose: "0.5mg week 1, ramping to 1mg weeks 2-4", route: "subcutaneous injectable" },
  { name: "TB-500", dose: "0.5mg week 1, ramping to 1mg weeks 2-4", route: "subcutaneous injectable" },
  { name: "GHK-Cu", dose: "2mg daily", route: "injectable" },
  { name: "Semax", dose: "200mcg per nostril", route: "intranasal" },
  { name: "Selank", dose: "200mcg per nostril", route: "intranasal" }
];

export const nightStack = [
  { name: "CJC-1295 (no DAC)", dose: "150mcg", route: "injectable", timing: "2hr post-meal" },
  { name: "Ipamorelin", dose: "150mcg", route: "injectable", timing: "2hr post-meal" }
];

export const analysisQuestion = "Should MOTS-C be added to this stack? If yes, provide specific dose, timing, and protocol. Flag synergies, conflicts, and risks. Cite research quality honestly — label each peptide as robust, moderate, limited, or anecdotal evidence.";
