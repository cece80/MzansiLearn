// src/lib/data/caps-topics.ts
// Full CAPS curriculum term-by-term topics for Grade 8-12
// Closes #24

import { Topic, Grade, Term } from "../models/curriculum";

/**
 * Complete CAPS-aligned topic data.
 * Source: Department of Basic Education CAPS documents.
 * https://www.education.gov.za/Curriculum/CurriculumAssessmentPolicyStatements(CAPS).aspx
 */
export const CAPS_TOPICS: Topic[] = [
  // ═══════════════════════════════════════════════════════
  // MATHEMATICS - Grade 10
  // ═══════════════════════════════════════════════════════
  { id: "mat-10-1-1", subjectId: "mathematics", grade: 10, term: 1, name: "Algebraic Expressions", description: "Simplification, factorisation of trinomials, grouping, sum/difference of cubes.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-10-1-2", subjectId: "mathematics", grade: 10, term: 1, name: "Exponents", description: "Rational exponents, exponential equations, scientific notation.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-10-1-3", subjectId: "mathematics", grade: 10, term: 1, name: "Number Patterns", description: "Linear sequences, general term, pattern recognition.", order: 3, estimatedHours: 4, contentBlockIds: [] },
  { id: "mat-10-1-4", subjectId: "mathematics", grade: 10, term: 1, name: "Equations and Inequalities", description: "Linear, quadratic, simultaneous equations. Linear inequalities.", order: 4, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-10-2-1", subjectId: "mathematics", grade: 10, term: 2, name: "Trigonometry", description: "Trig ratios, special angles, reduction formulae, trig equations.", order: 1, estimatedHours: 10, contentBlockIds: [] },
  { id: "mat-10-2-2", subjectId: "mathematics", grade: 10, term: 2, name: "Functions: Linear & Quadratic", description: "Domain, range, intercepts, turning points, sketching.", order: 2, estimatedHours: 10, contentBlockIds: [] },
  { id: "mat-10-2-3", subjectId: "mathematics", grade: 10, term: 2, name: "Functions: Hyperbola & Exponential", description: "Asymptotes, domain/range, transformations.", order: 3, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-10-3-1", subjectId: "mathematics", grade: 10, term: 3, name: "Analytical Geometry", description: "Distance, midpoint, gradient, collinearity.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-10-3-2", subjectId: "mathematics", grade: 10, term: 3, name: "Finance and Growth", description: "Simple and compound interest, depreciation.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-10-3-3", subjectId: "mathematics", grade: 10, term: 3, name: "Statistics", description: "Measures of central tendency, dispersion, grouped/ungrouped data, ogives.", order: 3, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-10-4-1", subjectId: "mathematics", grade: 10, term: 4, name: "Probability", description: "Theoretical probability, Venn diagrams, mutually exclusive/complementary events.", order: 1, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-10-4-2", subjectId: "mathematics", grade: 10, term: 4, name: "Euclidean Geometry", description: "Lines, angles, triangles, quadrilaterals, circle geometry intro.", order: 2, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-10-4-3", subjectId: "mathematics", grade: 10, term: 4, name: "Measurement", description: "Volume and surface area of prisms, pyramids, cylinders, cones, spheres.", order: 3, estimatedHours: 6, contentBlockIds: [] },

  // ═══════════════════════════════════════════════════════
  // MATHEMATICS - Grade 11
  // ═══════════════════════════════════════════════════════
  { id: "mat-11-1-1", subjectId: "mathematics", grade: 11, term: 1, name: "Exponents and Surds", description: "Simplification with surds, rationalising denominators.", order: 1, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-11-1-2", subjectId: "mathematics", grade: 11, term: 1, name: "Equations and Inequalities", description: "Quadratic equations/inequalities, nature of roots, simultaneous equations.", order: 2, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-11-1-3", subjectId: "mathematics", grade: 11, term: 1, name: "Number Patterns", description: "Quadratic sequences, second differences.", order: 3, estimatedHours: 4, contentBlockIds: [] },
  { id: "mat-11-2-1", subjectId: "mathematics", grade: 11, term: 2, name: "Functions", description: "Parabola, hyperbola, exponential, average gradient.", order: 1, estimatedHours: 10, contentBlockIds: [] },
  { id: "mat-11-2-2", subjectId: "mathematics", grade: 11, term: 2, name: "Trigonometry", description: "Compound angles, double angles, solving trig equations.", order: 2, estimatedHours: 12, contentBlockIds: [] },
  { id: "mat-11-3-1", subjectId: "mathematics", grade: 11, term: 3, name: "Analytical Geometry", description: "Equation of a circle, tangent to a circle.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-11-3-2", subjectId: "mathematics", grade: 11, term: 3, name: "Euclidean Geometry", description: "Circle theorems, cyclic quadrilaterals, tangent-chord angles.", order: 2, estimatedHours: 10, contentBlockIds: [] },
  { id: "mat-11-3-3", subjectId: "mathematics", grade: 11, term: 3, name: "Trigonometry: 2D and 3D", description: "Sine and cosine rules, area rule, 3D problems.", order: 3, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-11-4-1", subjectId: "mathematics", grade: 11, term: 4, name: "Finance, Growth and Decay", description: "Future/present value annuities, loan repayments.", order: 1, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-11-4-2", subjectId: "mathematics", grade: 11, term: 4, name: "Probability", description: "Dependent/independent events, tree diagrams, contingency tables.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-11-4-3", subjectId: "mathematics", grade: 11, term: 4, name: "Statistics", description: "Histograms, frequency polygons, ogives, variance, standard deviation.", order: 3, estimatedHours: 6, contentBlockIds: [] },

  // ═══════════════════════════════════════════════════════
  // MATHEMATICS - Grade 12
  // ═══════════════════════════════════════════════════════
  { id: "mat-12-1-1", subjectId: "mathematics", grade: 12, term: 1, name: "Number Patterns: Sequences & Series", description: "Arithmetic and geometric sequences, sigma notation, convergence.", order: 1, estimatedHours: 10, contentBlockIds: [] },
  { id: "mat-12-1-2", subjectId: "mathematics", grade: 12, term: 1, name: "Functions & Inverse Functions", description: "Inverses of linear, quadratic, exponential. Logarithms.", order: 2, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-12-1-3", subjectId: "mathematics", grade: 12, term: 1, name: "Finance, Growth and Decay", description: "Annuities, sinking funds, loan calculations.", order: 3, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-12-2-1", subjectId: "mathematics", grade: 12, term: 2, name: "Trigonometry", description: "Compound/double angles, identities, general solution.", order: 1, estimatedHours: 10, contentBlockIds: [] },
  { id: "mat-12-2-2", subjectId: "mathematics", grade: 12, term: 2, name: "Differential Calculus", description: "Limits, first principles, rules of differentiation, curve sketching, optimisation.", order: 2, estimatedHours: 14, contentBlockIds: [] },
  { id: "mat-12-3-1", subjectId: "mathematics", grade: 12, term: 3, name: "Analytical Geometry", description: "Circles, tangents, perpendicular lines.", order: 1, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-12-3-2", subjectId: "mathematics", grade: 12, term: 3, name: "Euclidean Geometry", description: "Proportionality, similarity, Pythagorean theorem proofs.", order: 2, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-12-4-1", subjectId: "mathematics", grade: 12, term: 4, name: "Statistics", description: "Regression, correlation, normal distribution curve.", order: 1, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-12-4-2", subjectId: "mathematics", grade: 12, term: 4, name: "Counting and Probability", description: "Fundamental counting principle, factorial, permutations.", order: 2, estimatedHours: 6, contentBlockIds: [] },

  // ═══════════════════════════════════════════════════════
  // PHYSICAL SCIENCES - Grade 10
  // ═══════════════════════════════════════════════════════
  { id: "phy-10-1-1", subjectId: "physical-sciences", grade: 10, term: 1, name: "Mechanics: Vectors & Scalars", description: "Vector addition, resultant, components.", order: 1, estimatedHours: 4, contentBlockIds: [] },
  { id: "phy-10-1-2", subjectId: "physical-sciences", grade: 10, term: 1, name: "Mechanics: Motion in 1D", description: "Position, displacement, velocity, acceleration, equations of motion.", order: 2, estimatedHours: 8, contentBlockIds: [] },
  { id: "phy-10-2-1", subjectId: "physical-sciences", grade: 10, term: 2, name: "Mechanics: Forces", description: "Newton's Laws, friction, free-body diagrams.", order: 1, estimatedHours: 10, contentBlockIds: [] },
  { id: "phy-10-2-2", subjectId: "physical-sciences", grade: 10, term: 2, name: "Waves: Transverse & Longitudinal", description: "Properties, superposition, standing waves.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "phy-10-3-1", subjectId: "physical-sciences", grade: 10, term: 3, name: "Chemistry: Atomic Structure", description: "Atomic models, electron configuration, periodic table.", order: 1, estimatedHours: 6, contentBlockIds: [] },
  { id: "phy-10-3-2", subjectId: "physical-sciences", grade: 10, term: 3, name: "Chemistry: Chemical Bonding", description: "Ionic, covalent, metallic bonds. Lewis structures.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "phy-10-4-1", subjectId: "physical-sciences", grade: 10, term: 4, name: "Chemistry: Reactions", description: "Types of reactions, balancing equations, stoichiometry.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "phy-10-4-2", subjectId: "physical-sciences", grade: 10, term: 4, name: "Electricity: Electric Circuits", description: "Current, voltage, resistance, Ohm's law, series/parallel.", order: 2, estimatedHours: 8, contentBlockIds: [] },

  // ═══════════════════════════════════════════════════════
  // LIFE SCIENCES - Grade 10
  // ═══════════════════════════════════════════════════════
  { id: "lif-10-1-1", subjectId: "life-sciences", grade: 10, term: 1, name: "Chemistry of Life", description: "Organic molecules, enzymes, cellular respiration.", order: 1, estimatedHours: 10, contentBlockIds: [] },
  { id: "lif-10-1-2", subjectId: "life-sciences", grade: 10, term: 1, name: "Cell Division: Mitosis", description: "Phases of mitosis, cell cycle, cancer.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "lif-10-2-1", subjectId: "life-sciences", grade: 10, term: 2, name: "Plant and Animal Tissues", description: "Types of tissue, functions, microscopy.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "lif-10-2-2", subjectId: "life-sciences", grade: 10, term: 2, name: "Support Systems", description: "Skeletal system, muscles, movement.", order: 2, estimatedHours: 8, contentBlockIds: [] },
  { id: "lif-10-3-1", subjectId: "life-sciences", grade: 10, term: 3, name: "Biodiversity and Classification", description: "Five kingdoms, classification systems, binomial nomenclature.", order: 1, estimatedHours: 10, contentBlockIds: [] },
  { id: "lif-10-4-1", subjectId: "life-sciences", grade: 10, term: 4, name: "Biosphere to Ecosystems", description: "Energy flow, food webs, nutrient cycles, biomes of SA.", order: 1, estimatedHours: 10, contentBlockIds: [] },

  // ═══════════════════════════════════════════════════════
  // ENGLISH HOME LANGUAGE - Grade 10
  // ═══════════════════════════════════════════════════════
  { id: "ehl-10-1-1", subjectId: "english-hl", grade: 10, term: 1, name: "Reading & Comprehension", description: "Summarising, inferring, vocabulary in context.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "ehl-10-1-2", subjectId: "english-hl", grade: 10, term: 1, name: "Language Structures", description: "Parts of speech, sentence types, active/passive voice.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "ehl-10-2-1", subjectId: "english-hl", grade: 10, term: 2, name: "Literature: Novel Study", description: "Character analysis, themes, narrative techniques.", order: 1, estimatedHours: 10, contentBlockIds: [] },
  { id: "ehl-10-2-2", subjectId: "english-hl", grade: 10, term: 2, name: "Creative Writing", description: "Narrative, descriptive, reflective essays.", order: 2, estimatedHours: 8, contentBlockIds: [] },
  { id: "ehl-10-3-1", subjectId: "english-hl", grade: 10, term: 3, name: "Literature: Poetry", description: "Figures of speech, tone, mood, poetic devices.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "ehl-10-3-2", subjectId: "english-hl", grade: 10, term: 3, name: "Transactional Writing", description: "Formal/informal letters, reports, reviews.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "ehl-10-4-1", subjectId: "english-hl", grade: 10, term: 4, name: "Literature: Drama", description: "Dramatic irony, conflict, stage directions.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "ehl-10-4-2", subjectId: "english-hl", grade: 10, term: 4, name: "Visual Literacy", description: "Cartoons, advertisements, posters analysis.", order: 2, estimatedHours: 4, contentBlockIds: [] },

  // ═══════════════════════════════════════════════════════
  // NATURAL SCIENCES - Grade 8
  // ═══════════════════════════════════════════════════════
  { id: "nsc-8-1-1", subjectId: "natural-sciences", grade: 8, term: 1, name: "Atoms", description: "Particle model, elements, compounds, mixtures.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "nsc-8-1-2", subjectId: "natural-sciences", grade: 8, term: 1, name: "Reactions & Changes of Matter", description: "Physical and chemical changes, conservation of mass.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "nsc-8-2-1", subjectId: "natural-sciences", grade: 8, term: 2, name: "Visible Light", description: "Reflection, refraction, filters, the eye.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "nsc-8-3-1", subjectId: "natural-sciences", grade: 8, term: 3, name: "Energy and Electricity", description: "Energy transfer, circuits, series/parallel, safety.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "nsc-8-3-2", subjectId: "natural-sciences", grade: 8, term: 3, name: "Photosynthesis & Respiration", description: "Photosynthesis equation, respiration, gas exchange.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "nsc-8-4-1", subjectId: "natural-sciences", grade: 8, term: 4, name: "Reproduction in Animals", description: "Sexual reproduction, fertilisation, development.", order: 1, estimatedHours: 6, contentBlockIds: [] },
  { id: "nsc-8-4-2", subjectId: "natural-sciences", grade: 8, term: 4, name: "The Solar System", description: "Planets, gravity, seasons, moon phases.", order: 2, estimatedHours: 6, contentBlockIds: [] },

  // ═══════════════════════════════════════════════════════
  // MATHEMATICS - Grade 8
  // ═══════════════════════════════════════════════════════
  { id: "mat-8-1-1", subjectId: "mathematics", grade: 8, term: 1, name: "Whole Numbers", description: "Properties of numbers, LCM, HCF, prime factorisation.", order: 1, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-8-1-2", subjectId: "mathematics", grade: 8, term: 1, name: "Integers", description: "Operations with integers, order of operations.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-8-1-3", subjectId: "mathematics", grade: 8, term: 1, name: "Exponents", description: "Laws of exponents, scientific notation.", order: 3, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-8-2-1", subjectId: "mathematics", grade: 8, term: 2, name: "Algebraic Expressions", description: "Like terms, distributive property, simplification.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-8-2-2", subjectId: "mathematics", grade: 8, term: 2, name: "Algebraic Equations", description: "Solving linear equations, word problems.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-8-3-1", subjectId: "mathematics", grade: 8, term: 3, name: "Geometry of 2D Shapes", description: "Properties of triangles, quadrilaterals, constructions.", order: 1, estimatedHours: 8, contentBlockIds: [] },
  { id: "mat-8-3-2", subjectId: "mathematics", grade: 8, term: 3, name: "Geometry of Straight Lines", description: "Angles on parallel lines, angle relationships.", order: 2, estimatedHours: 6, contentBlockIds: [] },
  { id: "mat-8-4-1", subjectId: "mathematics", grade: 8, term: 4, name: "Common Fractions", description: "Operations, mixed numbers, problem solving.", order: 1, estimatedHours: 4, contentBlockIds: [] },
  { id: "mat-8-4-2", subjectId: "mathematics", grade: 8, term: 4, name: "Data Handling", description: "Collecting, organising, summarising data. Mean, median, mode.", order: 2, estimatedHours: 6, contentBlockIds: [] },
];

/**
 * Get topics for a specific subject, grade, and term.
 */
export function getTopics(subjectId: string, grade: number, term?: number): Topic[] {
  return CAPS_TOPICS.filter(
    (t) => t.subjectId === subjectId && t.grade === grade && (term === undefined || t.term === term)
  ).sort((a, b) => a.term - b.term || a.order - b.order);
}

/**
 * Get all topics for a grade across all subjects.
 */
export function getTopicsByGrade(grade: number): Topic[] {
  return CAPS_TOPICS.filter((t) => t.grade === grade).sort(
    (a, b) => a.subjectId.localeCompare(b.subjectId) || a.term - b.term || a.order - b.order
  );
}

/**
 * Count total estimated hours for a subject+grade combination.
 */
export function getTotalHours(subjectId: string, grade: number): number {
  return getTopics(subjectId, grade).reduce((sum, t) => sum + t.estimatedHours, 0);
}
