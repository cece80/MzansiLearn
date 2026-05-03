// src/lib/auth/cloud-sync.ts
// Cloud account linking — optional JWT sync (edX OAuth-inspired)
// Closes #22

import { UserProfile } from "./auth-provider";

/**
 * Cloud sync status for a profile.
 */
export type SyncStatus = "disconnected" | "connecting" | "connected" | "syncing" | "error";

/**
 * Cloud sync state.
 */
export interface CloudSyncState {
  status: SyncStatus;
  lastSyncAt: string | null;
  pendingChanges: number;
  error: string | null;
}

export const INITIAL_SYNC_STATE: CloudSyncState = {
  status: "disconnected",
  lastSyncAt: null,
  pendingChanges: 0,
  error: null,
};

/**
 * Cloud account info (returned from server after linking).
 */
export interface CloudAccount {
  id: string;
  email: string;
  displayName: string;
  provider: "google" | "email";
  linkedAt: string;
}

/**
 * JWT payload structure for MzansiLearn cloud tokens.
 */
export interface MzansiJwtPayload {
  sub: string; // User ID
  email: string;
  name: string;
  role: string;
  iat: number; // Issued at
  exp: number; // Expiry
}

/**
 * Check if a JWT token is expired.
 */
export function isTokenExpired(expiryDate: string | null): boolean {
  if (!expiryDate) return true;
  return new Date(expiryDate).getTime() < Date.now();
}

/**
 * Link a cloud account to a local profile.
 */
export function linkCloudAccount(
  profile: UserProfile,
  cloudAccountId: string,
  token: string,
  tokenExpiry: string
): UserProfile {
  return {
    ...profile,
    cloudAccountId,
    cloudToken: token,
    cloudTokenExpiry: tokenExpiry,
  };
}

/**
 * Unlink cloud account from a profile.
 */
export function unlinkCloudAccount(profile: UserProfile): UserProfile {
  return {
    ...profile,
    cloudAccountId: null,
    cloudToken: null,
    cloudTokenExpiry: null,
  };
}

/**
 * Check if a profile has an active cloud link.
 */
export function isCloudLinked(profile: UserProfile): boolean {
  return (
    profile.cloudAccountId !== null &&
    profile.cloudToken !== null &&
    !isTokenExpired(profile.cloudTokenExpiry)
  );
}

/**
 * Data that gets synced to the cloud.
 */
export interface SyncPayload {
  userId: string;
  profileData: {
    displayName: string;
    grade: number;
    avatar: string;
  };
  progressData: {
    courseId: string;
    completedBlocks: string[];
    scores: Record<string, number>;
    lastAccessedAt: string;
  }[];
  timestamp: string;
}

/**
 * Create a sync payload from profile and progress data.
 */
export function createSyncPayload(
  profile: UserProfile,
  progressEntries: SyncPayload["progressData"]
): SyncPayload {
  return {
    userId: profile.id,
    profileData: {
      displayName: profile.displayName,
      grade: profile.grade,
      avatar: profile.avatar,
    },
    progressData: progressEntries,
    timestamp: new Date().toISOString(),
  };
}
