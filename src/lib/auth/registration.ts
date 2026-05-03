// src/lib/auth/registration.ts
// User registration flow — offline-first signup
// Closes #20

import { UserProfile, createProfile, DEFAULT_SETTINGS } from "./auth-provider";

/**
 * Registration form data.
 */
export interface RegistrationData {
  displayName: string;
  grade: number;
  pin: string;
  confirmPin: string;
  avatar: string;
}

/**
 * Validation errors for registration.
 */
export interface RegistrationErrors {
  displayName?: string;
  grade?: string;
  pin?: string;
  confirmPin?: string;
}

/**
 * Avatar options for profile creation.
 */
export const AVATAR_OPTIONS = [
  { id: "lion", label: "Lion", emoji: "\u{1F981}" },
  { id: "elephant", label: "Elephant", emoji: "\u{1F418}" },
  { id: "eagle", label: "Eagle", emoji: "\u{1F985}" },
  { id: "springbok", label: "Springbok", emoji: "\u{1F98C}" },
  { id: "rhino", label: "Rhino", emoji: "\u{1F98F}" },
  { id: "dolphin", label: "Dolphin", emoji: "\u{1F42C}" },
  { id: "penguin", label: "Penguin", emoji: "\u{1F427}" },
  { id: "star", label: "Star", emoji: "\u{2B50}" },
];

/**
 * Validate registration data.
 */
export function validateRegistration(data: RegistrationData): RegistrationErrors {
  const errors: RegistrationErrors = {};

  if (!data.displayName || data.displayName.trim().length < 2) {
    errors.displayName = "Name must be at least 2 characters.";
  }
  if (data.displayName && data.displayName.length > 50) {
    errors.displayName = "Name must be less than 50 characters.";
  }

  if (!data.grade || data.grade < 8 || data.grade > 12) {
    errors.grade = "Please select a grade (8-12).";
  }

  if (!data.pin || data.pin.length < 4) {
    errors.pin = "PIN must be at least 4 digits.";
  }
  if (data.pin && data.pin.length > 6) {
    errors.pin = "PIN must be 6 digits or less.";
  }
  if (data.pin && !/^\d+$/.test(data.pin)) {
    errors.pin = "PIN must contain only numbers.";
  }

  if (data.pin !== data.confirmPin) {
    errors.confirmPin = "PINs do not match.";
  }

  return errors;
}

/**
 * Check if validation passed (no errors).
 */
export function isValid(errors: RegistrationErrors): boolean {
  return Object.keys(errors).length === 0;
}

/**
 * Complete registration and create profile.
 */
export function completeRegistration(data: RegistrationData): UserProfile {
  return createProfile(
    data.displayName.trim(),
    data.pin,
    data.grade,
    data.avatar || "star"
  );
}

/**
 * Grade options for the selector.
 */
export const GRADE_OPTIONS = [
  { value: 8, label: "Grade 8" },
  { value: 9, label: "Grade 9" },
  { value: 10, label: "Grade 10" },
  { value: 11, label: "Grade 11" },
  { value: 12, label: "Grade 12" },
];
