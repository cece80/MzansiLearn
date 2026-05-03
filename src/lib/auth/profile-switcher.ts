// src/lib/auth/profile-switcher.ts
// Profile switcher — multi-user device support
// Closes #21

import { UserProfile, validatePin, touchProfile } from "./auth-provider";

/**
 * ProfileSwitchResult represents the result of a profile switch attempt.
 */
export interface ProfileSwitchResult {
  success: boolean;
  profile: UserProfile | null;
  error: string | null;
}

/**
 * Switch to a different profile with PIN verification.
 */
export function switchProfile(
  profiles: UserProfile[],
  profileId: string,
  pin: string
): ProfileSwitchResult {
  const profile = profiles.find((p) => p.id === profileId);
  if (!profile) {
    return { success: false, profile: null, error: "Profile not found." };
  }

  if (!validatePin(profile, pin)) {
    return { success: false, profile: null, error: "Incorrect PIN." };
  }

  return {
    success: true,
    profile: touchProfile(profile),
    error: null,
  };
}

/**
 * Get profiles sorted by last active (most recent first).
 */
export function getSortedProfiles(profiles: UserProfile[]): UserProfile[] {
  return [...profiles].sort(
    (a, b) =>
      new Date(b.lastActiveAt).getTime() - new Date(a.lastActiveAt).getTime()
  );
}

/**
 * Delete a profile by ID.
 * Returns the remaining profiles.
 */
export function removeProfile(
  profiles: UserProfile[],
  profileId: string
): UserProfile[] {
  return profiles.filter((p) => p.id !== profileId);
}

/**
 * Update a profile's settings.
 */
export function updateProfileSettings(
  profile: UserProfile,
  settings: Partial<UserProfile["settings"]>
): UserProfile {
  return {
    ...profile,
    settings: { ...profile.settings, ...settings },
  };
}

/**
 * Update a profile's display info.
 */
export function updateProfileInfo(
  profile: UserProfile,
  updates: { displayName?: string; grade?: number; avatar?: string }
): UserProfile {
  return {
    ...profile,
    ...(updates.displayName && { displayName: updates.displayName }),
    ...(updates.grade && { grade: updates.grade }),
    ...(updates.avatar && { avatar: updates.avatar }),
  };
}

/**
 * Check if device has reached max profiles.
 */
export const MAX_PROFILES_PER_DEVICE = 5;

export function canAddProfile(profiles: UserProfile[]): boolean {
  return profiles.length < MAX_PROFILES_PER_DEVICE;
}
