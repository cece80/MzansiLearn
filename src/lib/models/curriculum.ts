// src/lib/models/curriculum.ts
// CAPS curriculum data model + seed content
// Closes #2

/**
 * South African CAPS (Curriculum and Assessment Policy Statement)
 * data model for MzansiLearn.
 */

export type Grade = 8 | 9 | 10 | 11 | 12;
export type Term = 1 | 2 | 3 | 4;

export interface Subject {
  id: string;
  name: string;
  code: string;
  description: string;
  /** Grades this subject is available for */
  grades: Grade[];
  /** Subject icon (emoji or path) */
  icon: string;
  /** Color theme for the subject */
  color: string;
}

export interface Topic {
  id: string;
  subjectId: string;
  grade: Grade;
  term: Term;
  name: string;
  description: string;
  /** Order within the term */
  order: number;
  /** Estimated hours to complete */
  estimatedHours: number;
  /** Content block IDs for this topic */
  contentBlockIds: string[];
}

export interface CurriculumStructure {
  subjects: Subject[];
  topics: Topic[];
}

// ── Seed data: CAPS subjects ───────────────────────────────

export const CAPS_SUBJECTS: Subject[] = [
  {
    id: "mathematics",
    name: "Mathematics",
    code: "MAT",
    description: "Number, algebra, functions, geometry, trigonometry, statistics and probability.",
    grades: [8, 9, 10, 11, 12],
    icon: "calculator",
    color: "#3b82f6",
  },
  {
    id: "physical-sciences",
    name: "Physical Sciences",
    code: "PHY",
    description: "Physics and Chemistry: mechanics, waves, electricity, chemical reactions.",
    grades: [10, 11, 12],
    icon: "atom",
    color: "#8b5cf6",
  },
  {
    id: "life-sciences",
    name: "Life Sciences",
    code: "LIF",
    description: "Biology: molecules, cells, organs, ecosystems, biodiversity and evolution.",
    grades: [10, 11, 12],
    icon: "dna",
    color: "#22c55e",
  },
  {
    id: "english-hl",
    name: "English Home Language",
    code: "EHL",
    description: "Reading, writing, comprehension, language structures and literature.",
    grades: [8, 9, 10, 11, 12],
    icon: "book-open",
    color: "#f59e0b",
  },
  {
    id: "natural-sciences",
    name: "Natural Sciences",
    code: "NSC",
    description: "Life and Living, Matter and Materials, Energy and Change, Planet Earth and Beyond.",
    grades: [8, 9],
    icon: "microscope",
    color: "#06b6d4",
  },
  {
    id: "math-literacy",
    name: "Mathematical Literacy",
    code: "MLC",
    description: "Practical mathematical skills for everyday life and the workplace.",
    grades: [10, 11, 12],
    icon: "pie-chart",
    color: "#ec4899",
  },
  {
    id: "accounting",
    name: "Accounting",
    code: "ACC",
    description: "Financial accounting, managerial accounting, managing resources.",
    grades: [10, 11, 12],
    icon: "landmark",
    color: "#14b8a6",
  },
  {
    id: "geography",
    name: "Geography",
    code: "GEO",
    description: "Physical and human geography, map skills, climate and geomorphology.",
    grades: [10, 11, 12],
    icon: "globe",
    color: "#f97316",
  },
  {
    id: "history",
    name: "History",
    code: "HIS",
    description: "South African and world history, source analysis, essay writing.",
    grades: [10, 11, 12],
    icon: "scroll",
    color: "#a855f7",
  },
];

// ── Seed data: Mathematics Grade 10 Term 1 topics ──────────

export const SEED_TOPICS: Topic[] = [
  {
    id: "mat-g10-t1-01",
    subjectId: "mathematics",
    grade: 10,
    term: 1,
    name: "Algebraic Expressions",
    description: "Simplify, factorise and expand algebraic expressions. Products, factors, grouping.",
    order: 1,
    estimatedHours: 8,
    contentBlockIds: [],
  },
  {
    id: "mat-g10-t1-02",
    subjectId: "mathematics",
    grade: 10,
    term: 1,
    name: "Exponents",
    description: "Laws of exponents. Simplify expressions with rational exponents.",
    order: 2,
    estimatedHours: 6,
    contentBlockIds: [],
  },
  {
    id: "mat-g10-t1-03",
    subjectId: "mathematics",
    grade: 10,
    term: 1,
    name: "Number Patterns",
    description: "Identify and extend numeric patterns. Linear sequences and general term.",
    order: 3,
    estimatedHours: 4,
    contentBlockIds: [],
  },
  {
    id: "mat-g10-t1-04",
    subjectId: "mathematics",
    grade: 10,
    term: 1,
    name: "Equations and Inequalities",
    description: "Solve linear, quadratic, simultaneous equations and linear inequalities.",
    order: 4,
    estimatedHours: 10,
    contentBlockIds: [],
  },
  {
    id: "mat-g10-t1-05",
    subjectId: "mathematics",
    grade: 10,
    term: 1,
    name: "Trigonometry",
    description: "Trig ratios, special angles, solving right-angled triangles.",
    order: 5,
    estimatedHours: 8,
    contentBlockIds: [],
  },
];

// ── Helper functions ───────────────────────────────────────

export function getSubjectById(id: string): Subject | undefined {
  return CAPS_SUBJECTS.find((s) => s.id === id);
}

export function getSubjectsForGrade(grade: Grade): Subject[] {
  return CAPS_SUBJECTS.filter((s) => s.grades.includes(grade));
}

export function getTopicsForSubjectGradeTerm(
  subjectId: string,
  grade: Grade,
  term: Term
): Topic[] {
  return SEED_TOPICS.filter(
    (t) => t.subjectId === subjectId && t.grade === grade && t.term === term
  ).sort((a, b) => a.order - b.order);
}
