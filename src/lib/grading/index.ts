// src/lib/grading/index.ts
// Closes #14

export {
  CourseGradeFactory,
  DEFAULT_GRADING_POLICY,
  recordScoreAndRegrade,
  getStoredGrade,
  getAllGradesForUser,
  formatCAPSLevel,
} from "./grading-engine";
