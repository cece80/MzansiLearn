// src/lib/db/database.ts
// IndexedDB storage layer using Dexie.js
// Closes #7

import Dexie, { type EntityTable } from "dexie";
import type { ContentBlock, CoursePackage } from "../models/content-format";
import type { UserProfile } from "../auth/auth-provider";
import type { ProblemScore, CourseGrade } from "../models/grades";

/**
 * LessonProgress tracks per-block completion.
 */
export interface LessonProgress {
  id: string;
  userId: string;
  blockId: string;
  courseId: string;
  completed: boolean;
  completedAt: string | null;
  lastAccessedAt: string;
  timeSpentSeconds: number;
}

/**
 * DownloadedPack tracks offline content pack status.
 */
export interface DownloadedPack {
  id: string;
  courseId: string;
  subjectId: string;
  grade: number;
  term: number;
  downloadedAt: string;
  sizeBytes: number;
  version: string;
  contentHash: string;
}

/**
 * SyncEvent is a queued event for background sync.
 */
export interface SyncEvent {
  id: string;
  type: "progress" | "score" | "profile" | "grade";
  payload: Record<string, unknown>;
  createdAt: string;
  synced: boolean;
  syncedAt: string | null;
  retryCount: number;
}

/**
 * MzansiLearn IndexedDB database using Dexie.js.
 */
export class MzansiDB extends Dexie {
  profiles!: EntityTable<UserProfile, "id">;
  blocks!: EntityTable<ContentBlock & { courseId: string }, "id">;
  packages!: EntityTable<DownloadedPack, "id">;
  progress!: EntityTable<LessonProgress, "id">;
  scores!: EntityTable<ProblemScore & { id: string }, "id">;
  grades!: EntityTable<CourseGrade & { id: string }, "id">;
  syncQueue!: EntityTable<SyncEvent, "id">;

  constructor() {
    super("mzansilearn");

    this.version(1).stores({
      profiles: "id, displayName, grade, lastActiveAt",
      blocks: "id, type, courseId, [courseId+type]",
      packages: "id, courseId, [subjectId+grade+term]",
      progress: "id, userId, blockId, courseId, [userId+courseId], [userId+blockId]",
      scores: "id, userId, [userId+usageKey]",
      grades: "id, userId, courseId, [userId+courseId]",
      syncQueue: "id, type, synced, createdAt",
    });
  }
}

/** Singleton database instance */
export const db = new MzansiDB();

// ── Helper functions ───────────────────────────────────────

/**
 * Save or update a user profile.
 */
export async function saveProfile(profile: UserProfile): Promise<void> {
  await db.profiles.put(profile);
}

/**
 * Get all profiles.
 */
export async function getAllProfiles(): Promise<UserProfile[]> {
  return db.profiles.orderBy("lastActiveAt").reverse().toArray();
}

/**
 * Get a profile by ID.
 */
export async function getProfile(id: string): Promise<UserProfile | undefined> {
  return db.profiles.get(id);
}

/**
 * Delete a profile and all associated data.
 */
export async function deleteProfile(id: string): Promise<void> {
  await db.transaction("rw", [db.profiles, db.progress, db.scores, db.grades], async () => {
    await db.profiles.delete(id);
    await db.progress.where("userId").equals(id).delete();
    await db.scores.where("userId").equals(id).delete();
    await db.grades.where("userId").equals(id).delete();
  });
}

/**
 * Store a course package (all blocks).
 */
export async function storeCoursePackage(pkg: CoursePackage): Promise<void> {
  const blocks = Object.entries(pkg.blocks).map(([id, block]) => ({
    ...block,
    id,
    courseId: pkg.courseKey,
  }));
  await db.blocks.bulkPut(blocks);
}

/**
 * Get all blocks for a course.
 */
export async function getCourseBlocks(courseId: string): Promise<ContentBlock[]> {
  return db.blocks.where("courseId").equals(courseId).toArray();
}

/**
 * Get lesson progress for a user in a course.
 */
export async function getUserProgress(
  userId: string,
  courseId: string
): Promise<LessonProgress[]> {
  return db.progress.where("[userId+courseId]").equals([userId, courseId]).toArray();
}

/**
 * Update lesson progress.
 */
export async function updateProgress(progress: LessonProgress): Promise<void> {
  await db.progress.put(progress);
}

/**
 * Queue a sync event.
 */
export async function queueSyncEvent(event: Omit<SyncEvent, "id" | "synced" | "syncedAt" | "retryCount">): Promise<void> {
  const { v4: uuidv4 } = await import("uuid");
  await db.syncQueue.add({
    ...event,
    id: uuidv4(),
    synced: false,
    syncedAt: null,
    retryCount: 0,
  });
}

/**
 * Get pending sync events.
 */
export async function getPendingSyncEvents(): Promise<SyncEvent[]> {
  return db.syncQueue.where("synced").equals(0).sortBy("createdAt");
}

/**
 * Mark sync events as synced.
 */
export async function markSynced(eventIds: string[]): Promise<void> {
  const now = new Date().toISOString();
  await db.syncQueue
    .where("id")
    .anyOf(eventIds)
    .modify({ synced: true, syncedAt: now });
}
