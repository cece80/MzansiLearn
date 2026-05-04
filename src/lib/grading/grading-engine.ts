// src/lib/grading/grading-engine.ts
// Offline grading engine (edX CourseGradeFactory-inspired)
// Closes #14

import {
  CourseGrade,
  SubsectionGrade,
  AssignmentTypeGrade,
  ProblemScore,
  GradingPolicy,
  BlockRecord,
} from "../models/grades";
import { CourseKey, serializeCourseKey } from "../models/keys";
import { db } from "../db/database";
import { v4 as uuidv4 } from "uuid";

export const DEFAULT_GRADING_POLICY: GradingPolicy = {
  assignmentTypes: [
    { type: "Homework", weight: 0.2, dropCount: 0, minCount: 1 },
    { type: "Quiz", weight: 0.3, dropCount: 0, minCount: 1 },
    { type: "Exam", weight: 0.5, dropCount: 0, minCount: 0 },
  ],
  passingGrade: 0.4,
  gradeRanges: [
    { letter: "7", minPercent: 80, description: "Outstanding" },
    { letter: "6", minPercent: 70, description: "Meritorious" },
    { letter: "5", minPercent: 60, description: "Substantial" },
    { letter: "4", minPercent: 50, description: "Adequate" },
    { letter: "3", minPercent: 40, description: "Moderate" },
    { letter: "2", minPercent: 30, description: "Elementary" },
    { letter: "1", minPercent: 0, description: "Not Achieved" },
  ],
};

export class CourseGradeFactory {
  private policy: GradingPolicy;

  constructor(policy: GradingPolicy = DEFAULT_GRADING_POLICY) {
    this.policy = policy;
  }

  async read(userId: string, courseKey: CourseKey): Promise<CourseGrade> {
    const courseId = serializeCourseKey(courseKey);
    const scores = await db.scores.where("userId").equals(userId).toArray();
    const subsectionGrades = this.buildSubsectionGrades(scores);
    const assignmentTypeGrades = this.calculateAssignmentTypeGrades(subsectionGrades);
    const percentGrade = this.calculateOverallPercent(assignmentTypeGrades);
    const letterGrade = this.getLetterGrade(percentGrade);
    const passed = percentGrade >= this.policy.passingGrade * 100;
    const now = new Date().toISOString();

    const grade: CourseGrade = {
      userId, courseKey, courseId,
      percentGrade: Math.round(percentGrade * 100) / 100,
      letterGrade, passed, subsectionGrades, assignmentTypeGrades,
      modifiedAt: now,
      firstEarnedAt: scores.length > 0
        ? scores.reduce((min, s) => (s.submittedAt < min ? s.submittedAt : min), scores[0].submittedAt)
        : null,
    };

    await this.persistGrade(grade);
    return grade;
  }

  private buildSubsectionGrades(scores: ProblemScore[]): SubsectionGrade[] {
    const byType = new Map<string, ProblemScore[]>();
    for (const score of scores) {
      const key = score.graded ? "graded" : "ungraded";
      const existing = byType.get(key) ?? [];
      existing.push(score);
      byType.set(key, existing);
    }

    const subsections: SubsectionGrade[] = [];
    for (const [key, groupScores] of byType) {
      const earnedGraded = groupScores.filter(s => s.graded).reduce((sum, s) => sum + s.rawEarned, 0);
      const possibleGraded = groupScores.filter(s => s.graded).reduce((sum, s) => sum + s.rawPossible, 0);
      const earnedAll = groupScores.reduce((sum, s) => sum + s.rawEarned, 0);
      const possibleAll = groupScores.reduce((sum, s) => sum + s.rawPossible, 0);
      const blockRecords: BlockRecord[] = groupScores.map(s => ({
        usageKey: s.usageKey, weight: s.weight, rawPossible: s.rawPossible, graded: s.graded,
      }));
      const firstAttempted = groupScores.length > 0
        ? groupScores.reduce((min, s) => (s.submittedAt < min ? s.submittedAt : min), groupScores[0].submittedAt)
        : null;

      subsections.push({
        usageKey: groupScores[0].usageKey,
        displayName: key === "graded" ? "Graded Problems" : "Practice Problems",
        assignmentType: key === "graded" ? "Quiz" : "Homework",
        graded: key === "graded",
        earnedGraded, possibleGraded, earnedAll, possibleAll, blockRecords, firstAttempted,
      });
    }
    return subsections;
  }

  private calculateAssignmentTypeGrades(subsections: SubsectionGrade[]): AssignmentTypeGrade[] {
    return this.policy.assignmentTypes.map(at => {
      const matching = subsections.filter(s => s.assignmentType === at.type && s.graded);
      let earned = 0, possible = 0;
      for (const sub of matching) { earned += sub.earnedGraded; possible += sub.possibleGraded; }
      const rawPercent = possible > 0 ? (earned / possible) * 100 : 0;
      return {
        assignmentType: at.type, weight: at.weight,
        earnedGraded: earned, possibleGraded: possible,
        weightedPercentage: Math.round(rawPercent * at.weight * 100) / 100,
      };
    });
  }

  private calculateOverallPercent(atGrades: AssignmentTypeGrade[]): number {
    return atGrades.reduce((sum, atg) => sum + atg.weightedPercentage, 0);
  }

  private getLetterGrade(percent: number): string | null {
    const ranges = [...this.policy.gradeRanges].sort((a, b) => b.minPercent - a.minPercent);
    for (const range of ranges) {
      if (percent >= range.minPercent) return range.letter;
    }
    return null;
  }

  private async persistGrade(grade: CourseGrade): Promise<void> {
    const existing = await db.grades.where("[userId+courseId]").equals([grade.userId, grade.courseId]).first();
    await db.grades.put({ ...grade, id: existing?.id ?? uuidv4() });
  }
}

export async function recordScoreAndRegrade(userId: string, score: ProblemScore, policy?: GradingPolicy): Promise<CourseGrade> {
  await db.scores.put({ ...score, id: uuidv4() });
  const factory = new CourseGradeFactory(policy);
  return factory.read(userId, score.usageKey.courseKey);
}

export async function getStoredGrade(userId: string, courseId: string): Promise<CourseGrade | undefined> {
  return db.grades.where("[userId+courseId]").equals([userId, courseId]).first() as Promise<CourseGrade | undefined>;
}

export async function getAllGradesForUser(userId: string): Promise<CourseGrade[]> {
  return db.grades.where("userId").equals(userId).toArray() as Promise<CourseGrade[]>;
}

export function formatCAPSLevel(percent: number, policy: GradingPolicy = DEFAULT_GRADING_POLICY): string {
  const ranges = [...policy.gradeRanges].sort((a, b) => b.minPercent - a.minPercent);
  for (const range of ranges) {
    if (percent >= range.minPercent) return "Level " + range.letter + " - " + range.description + " (" + Math.round(percent) + "%)";
  }
  return Math.round(percent) + "%";
}
