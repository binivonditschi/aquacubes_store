export const systemSpecs: Record<string, { power: string; footprint: string; bestFor: string }> = {
  standard: { power: "50W", footprint: "Countertop, 60 × 40cm", bestFor: "First-time growers" },
  pro: { power: "100W", footprint: "Tabletop, 120 × 60cm", bestFor: "Serious home growers" },
  enterprise: { power: "250W", footprint: "Floor-standing, ~2 × 1m", bestFor: "Restaurants, schools, farms" },
};

export const systemIncludes = [
  "Tank and closed-loop filtration unit",
  "Water quality and temperature sensors",
  "Grow tray with LED grow lights",
  "Mobile app for remote monitoring",
  "Setup guide and starter feed",
];
