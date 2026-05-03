// src/lib/blocks/problem-block.ts
// Problem/Quiz block (edX capa_block.py-inspired)
// Closes #18

import { ProblemBlock, ProblemSpec, Choice } from "../models/content-format";
import { ProblemScore } from "../models/grades";
import { UsageKey } from "../models/keys";
import { v4 as uuidv4 } from "uuid";

/**
 * ProblemState tracks the current state of a problem attempt.
 */
export interface ProblemState {
  /** Problem block ID */
  blockId: string;
  /** Current answer (string for text/number, choice ID for MCQ) */
  currentAnswer: string | null;
  /** Whether the answer has been submitted */
  submitted: boolean;
  /** Whether the answer was correct (after submit) */
  correct: boolean | null;
  /** Score earned (after submit) */
  scoreEarned: number;
  /** Maximum possible score */
  scorePossible: number;
  /** Number of attempts used */
  attempts: number;
  /** Whether hints have been shown */
  hintsShown: number;
  /** Feedback text to display */
  feedback: string | null;
  /** Whether the problem is locked (max attempts reached) */
  locked: boolean;
}

/**
 * Creates initial state for a problem.
 */
export function createInitialProblemState(problem: ProblemSpec, blockId: string): ProblemState {
  return {
    blockId,
    currentAnswer: null,
    submitted: false,
    correct: null,
    scoreEarned: 0,
    scorePossible: problem.maxScore,
    attempts: 0,
    hintsShown: 0,
    feedback: null,
    locked: false,
  };
}

/**
 * Check an answer against the problem specification.
 */
export function checkAnswer(
  problem: ProblemSpec,
  answer: string
): { correct: boolean; feedback: string | null } {
  switch (problem.problemType) {
    case "multiplechoice":
      return checkMultipleChoice(problem, answer);
    case "numericalinput":
      return checkNumericalInput(problem, answer);
    case "textinput":
      return checkTextInput(problem, answer);
    default:
      return { correct: false, feedback: "Unknown problem type." };
  }
}

function checkMultipleChoice(
  problem: ProblemSpec,
  answerId: string
): { correct: boolean; feedback: string | null } {
  const choice = problem.choices?.find((c) => c.id === answerId);
  if (!choice) return { correct: false, feedback: "Invalid choice." };
  return {
    correct: choice.correct,
    feedback: choice.feedback ?? (choice.correct ? "Correct!" : "Incorrect. Try again."),
  };
}

function checkNumericalInput(
  problem: ProblemSpec,
  answer: string
): { correct: boolean; feedback: string | null } {
  const parsed = parseFloat(answer);
  if (isNaN(parsed)) return { correct: false, feedback: "Please enter a valid number." };
  const correct = parseFloat(problem.correctAnswer ?? "0");
  const tolerance = problem.tolerance ?? 0;
  const isCorrect = Math.abs(parsed - correct) <= tolerance;
  return {
    correct: isCorrect,
    feedback: isCorrect
      ? "Correct!"
      : `Incorrect. The correct answer is ${problem.correctAnswer}.`,
  };
}

function checkTextInput(
  problem: ProblemSpec,
  answer: string
): { correct: boolean; feedback: string | null } {
  const correct = (problem.correctAnswer ?? "").toLowerCase().trim();
  const isCorrect = answer.toLowerCase().trim() === correct;
  return {
    correct: isCorrect,
    feedback: isCorrect
      ? "Correct!"
      : `Incorrect. The correct answer is "${problem.correctAnswer}".`,
  };
}

/**
 * Submit an answer for a problem, updating the state.
 */
export function submitAnswer(
  state: ProblemState,
  problem: ProblemSpec,
  answer: string
): ProblemState {
  if (state.locked) return state;

  const { correct, feedback } = checkAnswer(problem, answer);
  const newAttempts = state.attempts + 1;
  const locked = problem.maxAttempts > 0 && newAttempts >= problem.maxAttempts;
  const scoreEarned = correct ? problem.maxScore : 0;

  return {
    ...state,
    currentAnswer: answer,
    submitted: true,
    correct,
    scoreEarned,
    attempts: newAttempts,
    feedback,
    locked: locked || correct,
  };
}

/**
 * Get the next hint for a problem.
 */
export function getNextHint(
  state: ProblemState,
  problem: ProblemSpec
): { hint: string | null; newState: ProblemState } {
  const hints = problem.hints ?? [];
  if (state.hintsShown >= hints.length) {
    return { hint: null, newState: state };
  }
  return {
    hint: hints[state.hintsShown],
    newState: { ...state, hintsShown: state.hintsShown + 1 },
  };
}

/**
 * Reset a problem state for retry (if allowed).
 */
export function resetProblem(state: ProblemState, problem: ProblemSpec): ProblemState {
  if (state.locked && state.correct) return state; // Can't reset a correct answer
  return {
    ...state,
    currentAnswer: null,
    submitted: false,
    correct: null,
    scoreEarned: 0,
    feedback: null,
    // Keep attempts count and hints shown
  };
}

/**
 * Create a ProblemScore record from the current state.
 */
export function toProblemScore(
  state: ProblemState,
  usageKey: UsageKey,
  userId: string,
  weight: number,
  graded: boolean
): ProblemScore {
  return {
    usageKey,
    userId,
    rawEarned: state.scoreEarned,
    rawPossible: state.scorePossible,
    weight,
    graded,
    attemptNumber: state.attempts,
    submittedAt: new Date().toISOString(),
    correct: state.correct ?? false,
  };
}
