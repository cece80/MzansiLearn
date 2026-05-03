// src/lib/models/keys.ts
// CourseKey + UsageKey data model (edX-inspired identifiers)
// Closes #13

/**
 * CourseKey uniquely identifies a course offering.
 * Format: "course-v1:{org}+{course}+{run}"
 * Example: "course-v1:DBE+MAT+2025" (Dept of Basic Education, Mathematics, 2025)
 */
export interface CourseKey {
  readonly org: string;
  readonly course: string;
  readonly run: string;
}

/**
 * BlockType represents the type of content block.
 */
export type BlockType =
  | "course"
  | "chapter"
  | "sequential"
  | "vertical"
  | "problem"
  | "html"
  | "video"
  | "discussion";

/**
 * UsageKey uniquely identifies a specific block within a course.
 * Format: "block-v1:{org}+{course}+{run}+type@{blockType}+block@{blockId}"
 */
export interface UsageKey {
  readonly courseKey: CourseKey;
  readonly blockType: BlockType;
  readonly blockId: string;
}

// ── Serialization helpers ──────────────────────────────────

export function serializeCourseKey(key: CourseKey): string {
  return `course-v1:${key.org}+${key.course}+${key.run}`;
}

export function parseCourseKey(raw: string): CourseKey {
  const match = raw.match(/^course-v1:([^+]+)\+([^+]+)\+(.+)$/);
  if (!match) throw new Error(`Invalid CourseKey: ${raw}`);
  return { org: match[1], course: match[2], run: match[3] };
}

export function serializeUsageKey(key: UsageKey): string {
  const ck = serializeCourseKey(key.courseKey);
  const prefix = ck.replace("course-v1:", "block-v1:");
  return `${prefix}+type@${key.blockType}+block@${key.blockId}`;
}

export function parseUsageKey(raw: string): UsageKey {
  const match = raw.match(
    /^block-v1:([^+]+)\+([^+]+)\+([^+]+)\+type@([^+]+)\+block@(.+)$/
  );
  if (!match) throw new Error(`Invalid UsageKey: ${raw}`);
  return {
    courseKey: { org: match[1], course: match[2], run: match[3] },
    blockType: match[4] as BlockType,
    blockId: match[5],
  };
}

export function createUsageKey(
  courseKey: CourseKey,
  blockType: BlockType,
  blockId: string
): UsageKey {
  return { courseKey, blockType, blockId };
}

/**
 * Check if two CourseKeys are equal.
 */
export function courseKeysEqual(a: CourseKey, b: CourseKey): boolean {
  return a.org === b.org && a.course === b.course && a.run === b.run;
}

/**
 * Check if two UsageKeys are equal.
 */
export function usageKeysEqual(a: UsageKey, b: UsageKey): boolean {
  return (
    courseKeysEqual(a.courseKey, b.courseKey) &&
    a.blockType === b.blockType &&
    a.blockId === b.blockId
  );
}
