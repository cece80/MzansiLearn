// src/lib/models/content-format.ts
// OLX-inspired JSON content format specification
// Closes #16

import { BlockType } from "./keys";

/**
 * MzansiLearn uses JSON instead of edX OLX XML for content.
 * This provides the same hierarchical structure but is easier
 * to work with in TypeScript and can be stored in IndexedDB.
 */

// ── Base block definition ──────────────────────────────────

export interface BaseBlock {
  /** Unique block identifier */
  id: string;
  /** Block type (course, chapter, sequential, vertical, problem, html, video) */
  type: BlockType;
  /** Display name shown to learners */
  displayName: string;
  /** ISO date string of last modification */
  updatedAt: string;
  /** Whether this block is graded */
  graded?: boolean;
  /** Weight for grading (0-1) */
  weight?: number;
}

// ── Content blocks (leaf nodes) ────────────────────────────

export interface HtmlBlock extends BaseBlock {
  type: "html";
  /** Markdown content (rendered client-side) */
  content: string;
  /** Optional worked examples */
  workedExamples?: WorkedExample[];
}

export interface WorkedExample {
  title: string;
  /** Step-by-step solution in markdown */
  steps: string[];
}

export interface ProblemBlock extends BaseBlock {
  type: "problem";
  /** Problem specification */
  problem: ProblemSpec;
}

export interface ProblemSpec {
  /** Question text (markdown) */
  questionText: string;
  /** Problem type */
  problemType: "multiplechoice" | "numericalinput" | "textinput";
  /** Choices for MCQ */
  choices?: Choice[];
  /** Correct answer for numerical/text input */
  correctAnswer?: string;
  /** Tolerance for numerical answers */
  tolerance?: number;
  /** Explanation shown after answering */
  explanation?: string;
  /** Hint text */
  hints?: string[];
  /** Maximum attempts (0 = unlimited) */
  maxAttempts: number;
  /** Points for this problem */
  maxScore: number;
}

export interface Choice {
  id: string;
  text: string;
  correct: boolean;
  feedback?: string;
}

export interface VideoBlock extends BaseBlock {
  type: "video";
  /** Video source URL (YouTube, local) */
  videoUrl: string;
  /** Optional transcript in markdown */
  transcript?: string;
  /** Duration in seconds */
  durationSeconds?: number;
}

// ── Container blocks (have children) ───────────────────────

export interface VerticalBlock extends BaseBlock {
  type: "vertical";
  /** Ordered list of content block IDs */
  children: string[];
}

export interface SequentialBlock extends BaseBlock {
  type: "sequential";
  /** Ordered list of vertical block IDs */
  children: string[];
}

export interface ChapterBlock extends BaseBlock {
  type: "chapter";
  /** Ordered list of sequential block IDs */
  children: string[];
}

export interface CourseBlock extends BaseBlock {
  type: "course";
  /** Course metadata */
  org: string;
  courseId: string;
  run: string;
  /** Ordered list of chapter block IDs */
  children: string[];
  /** Grading policy */
  gradingPolicy?: GradingPolicy;
}

export interface GradingPolicy {
  /** Assignment types with weights */
  assignmentTypes: AssignmentType[];
  /** Minimum passing grade (0-1) */
  passingGrade: number;
}

export interface AssignmentType {
  name: string;
  weight: number;
  minCount: number;
  dropCount: number;
}

// ── Union type for all blocks ──────────────────────────────

export type ContentBlock =
  | CourseBlock
  | ChapterBlock
  | SequentialBlock
  | VerticalBlock
  | HtmlBlock
  | ProblemBlock
  | VideoBlock;

// ── Course package format ──────────────────────────────────

export interface CoursePackage {
  /** Package format version */
  formatVersion: "1.0";
  /** Course metadata */
  courseKey: string;
  /** All blocks indexed by ID */
  blocks: Record<string, ContentBlock>;
  /** Root block ID (the course block) */
  rootBlockId: string;
  /** Package creation date */
  exportedAt: string;
  /** Content hash for sync verification */
  contentHash: string;
}
