// src/lib/auth/auth-provider.ts
// Authentication system — JWT + offline profiles (edX-inspired)
// Closes #11

import { v4 as uuidv4 } from "uuid";

/**
 * UserProfile represents a local offline user profile.
 * Stored in IndexedDB, no server required.
 */
export interface UserProfile {
  id: string;
  displayName: string;
  pin: string;
  avatar: string;
  grade: number;
  createdAt: string;
  lastActiveAt: string;
  /** Optional cloud account ID for sync */
  cloudAccountId: string | null;
  /** JWT token from cloud sync (if linked) */
  cloudToken: string | null;
  /** Token expiry */
  cloudTokenExpiry: string | null;
  /** Settings */
  settings: UserSettings;
}

export interface UserSettings {
  theme: "dark" | "light" | "system";
  fontSize: "small" | "medium" | "large";
  notifications: boolean;
  autoDownload: boolean;
  dataUsage: "wifi-only" | "any";
}

export const DEFAULT_SETTINGS: UserSettings = {
  theme: "dark",
  fontSize: "medium",
  notifications: true,
  autoDownload: false,
  dataUsage: "wifi-only",
};

/**
 * AuthState represents the current authentication state.
 */
export interface AuthState {
  /** Whether auth is initialized */
  initialized: boolean;
  /** Currently active profile */
  currentProfile: UserProfile | null;
  /** All profiles on this device */
  profiles: UserProfile[];
  /** Whether cloud sync is active */
  cloudSyncActive: boolean;
}

export const INITIAL_AUTH_STATE: AuthState = {
  initialized: false,
  currentProfile: null,
  profiles: [],
  cloudSyncActive: false,
};

/**
 * Create a new local profile.
 */
export function createProfile(
  displayName: string,
  pin: string,
  grade: number,
  avatar: string = "default"
): UserProfile {
  const now = new Date().toISOString();
  return {
    id: uuidv4(),
    displayName,
    pin,
    avatar,
    grade,
    createdAt: now,
    lastActiveAt: now,
    cloudAccountId: null,
    cloudToken: null,
    cloudTokenExpiry: null,
    settings: { ...DEFAULT_SETTINGS },
  };
}

/**
 * Validate a PIN for a profile.
 */
export function validatePin(profile: UserProfile, pin: string): boolean {
  return profile.pin === pin;
}

/**
 * Update last active timestamp.
 */
export function touchProfile(profile: UserProfile): UserProfile {
  return { ...profile, lastActiveAt: new Date().toISOString() };
}

/**
 * Simple hash for PIN storage (not cryptographically secure,
 * but sufficient for offline local profile switching).
 */
export function hashPin(pin: string): string {
  // Simple hash - not for security, just for obscuring stored PIN
  let hash = 0;
  for (let i = 0; i < pin.length; i++) {
    const char = pin.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return Math.abs(hash).toString(36);
}
