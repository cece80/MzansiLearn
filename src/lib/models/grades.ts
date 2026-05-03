// src/lib/models/grades.ts
// Grading models (edX PersistentCourseGrade/SubsectionGrade-inspired)
// Closes #19

import { CourseKey, UsageKey, serializeCourseKey, serializeUsageKey } from "./keys";

/**
 * BlockRecord captures the grading state of a single block.
 * Equivalent to edX BlockRecord namedtuple.
 */
export interface BlockRecord {
  /** The block this record refers to */
  usageKey: UsageKey;
  /** Weight of this block in grading (0-1) */
  weight: number;
  /** Maximum possible raw score */
  rawPossible: number;
  /** Whether this block is graded */
  graded: boolean;
}

/**
 * SubsectionGrade tracks grades for a subsection (sequential block).
 * Equivalent to edX SubsectionGrade.
 */
export interface SubsectionGrade {
  /** Subsection usage key */
  usageKey: UsageKey;
  /** Display name of the subsection */
  displayName: string;
  /** Assignment type (e.g., "Homework", "Exam") */
  assignmentType: string;
  /** Whether this subsection is graded */
  graded: boolean;
  /** Earned score (raw) */
  earnedGraded: number;
  /** Possible score (raw) */
  possibleGraded: number;
  /** Earned score (all, including ungraded) */
  earnedAll: number;
  /** Possible score (all) */
  possibleAll: number;
  /** Individual block records */
  blockRecords: BlockRecord[];
  /** First attempted timestamp */
  firstAttempted: string | null;
}

/**
 * CourseGrade represents the overall grade for a course.
 * Equivalent to edX PersistentCourseGrade.
 */
export interface CourseGrade {
  /** User profile ID */
  userId: string;
  /** Course this grade is for */
  courseKey: CourseKey;
  /** Serialized course key */
  courseId: string;
  /** Overall percentage (0-100) */
  percentGrade: number;
  /** Letter grade (A, B, C, D, F) */
  letterGrade: string | null;
  /** Whether the student has passed */
  passed: boolean;
  /** Subsection grades */
  subsectionGrades: SubsectionGrade[];
  /** Per-assignment-type weighted grades */
  assignmentTypeGrades: AssignmentTypeGrade[];
  /** Last modified timestamp */
  modifiedAt: string;
  /** First earned timestamp */
  firstEarnedAt: string | null;
}

export interface AssignmentTypeGrade {
  assignmentType: string;
  weight: number;
  earnedGraded: number;
  possibleGraded: number;
  /** Weighted percentage contribution */
  weightedPercentage: number;
}

/**
 * ProblemScore records a single problem attempt.
 */
export interface ProblemScore {
  /** Problem usage key */
  usageKey: UsageKey;
  /** User profile ID */
  userId: string;
  /** Raw score earned */
  rawEarned: number;
  /** Raw score possible */
  rawPossible: number;
  /** Weight for this problem */
  weight: number;
  /** Whether this was graded */
  graded: boolean;
  /** Attempt number */
  attemptNumber: number;
  /** When the answer was submitted */
  submittedAt: string;
  /** Whether the answer was correct */
  correct: boolean;
}

/**
 * GradingPolicy defines how grades are calculated.
 */
export interface GradingPolicy {
  /** Assignment types with weights */
  assignmentTypes: GradingAssignmentType[];
  /** Cutoffs for letter grades */
  gradeCutoffs: GradeCutoff[];
  /** Minimum passing percentage (0-100) */
  passingGrade: number;
}

export interface GradingAssignmentType {
  name: string;
  /** Weight as fraction (0-1), all weights must sum to 1 */
  weight: number;
  /** Minimum number of this type required */
  minCount: number;
  /** Number of lowest scores to drop */
  dropCount: number;
}

export interface GradeCutoff {
  letter: string;
  /** Minimum percentage for this letter grade */
  minPercentage: number;
}

/** Default grading policy for CAPS subjects */
export const DEFAULT_GRADING_POLICY: GradingPolicy = {
  assignmentTypes: [
    { name: "Homework", weight: 0.15, minCount: 0, dropCount: 0 },
    { name: "Quiz", weight: 0.25, minCount: 0, dropCount: 0 },
    { name: "Test", weight: 0.30, minCount: 0, dropCount: 0 },
    { name: "Exam", weight: 0.30, minCount: 0, dropCount: 0 },
  ],
  gradeCutoffs: [
    { letter: "A", minPercentage: 80 },
    { letter: "B", minPercentage: 70 },
    { letter: "C", minPercentage: 60 },
    { letter: "D", minPercentage: 50 },
    { letter: "E", minPercentage: 40 },
    { letter: "F", minPercentage: 30 },
    { letter: "FF", minPercentage: 0 },
  ],
  passingGrade: 30,
};

/** Get letter grade from percentage */
export function getLetterGrade(
  percentage: number,
  policy: GradingPolicy = DEFAULT_GRADING_POLICY
): string {
  const sorted = [...policy.gradeCutoffs].sort(
    (a, b) => b.minPercentage - a.minPercentage
  );
  for (const cutoff of sorted) {
    if (percentage >= cutoff.minPercentage) return cutoff.letter;
  }
  return "FF";
}

/** Check if a percentage is passing */
export function isPassing(
  percentage: number,
  policy: GradingPolicy = DEFAULT_GRADING_POLICY
): boolean {
  return percentage >= policy.passingGrade;
}
