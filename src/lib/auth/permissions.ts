// src/lib/auth/permissions.ts
// Permission system — role-based access (edX CourseAccessRole-inspired)
// Closes #23

/**
 * Roles in MzansiLearn (inspired by edX CourseAccessRole).
 */
export type Role = "learner" | "tutor" | "teacher" | "admin";

/**
 * Permission defines a specific action that can be performed.
 */
export type Permission =
  | "view_content"
  | "submit_answers"
  | "view_grades"
  | "view_all_grades"
  | "edit_content"
  | "manage_users"
  | "manage_courses"
  | "download_content"
  | "export_data"
  | "view_analytics";

/**
 * Role-permission mapping.
 */
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  learner: [
    "view_content",
    "submit_answers",
    "view_grades",
    "download_content",
  ],
  tutor: [
    "view_content",
    "submit_answers",
    "view_grades",
    "view_all_grades",
    "download_content",
    "view_analytics",
  ],
  teacher: [
    "view_content",
    "submit_answers",
    "view_grades",
    "view_all_grades",
    "edit_content",
    "download_content",
    "export_data",
    "view_analytics",
  ],
  admin: [
    "view_content",
    "submit_answers",
    "view_grades",
    "view_all_grades",
    "edit_content",
    "manage_users",
    "manage_courses",
    "download_content",
    "export_data",
    "view_analytics",
  ],
};

/**
 * CourseRole assigns a role to a user for a specific course.
 */
export interface CourseRole {
  userId: string;
  courseId: string;
  role: Role;
  grantedAt: string;
  grantedBy: string | null;
}

/**
 * Check if a role has a specific permission.
 */
export function hasPermission(role: Role, permission: Permission): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

/**
 * Get all permissions for a role.
 */
export function getPermissions(role: Role): Permission[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

/**
 * Check access for a user action.
 * In offline mode, we use the locally stored role.
 */
export function checkAccess(
  userRole: Role,
  requiredPermission: Permission
): { allowed: boolean; reason: string } {
  if (hasPermission(userRole, requiredPermission)) {
    return { allowed: true, reason: "Access granted." };
  }
  return {
    allowed: false,
    reason: `Your role (${userRole}) does not have the "${requiredPermission}" permission.`,
  };
}

/**
 * Get the display name for a role.
 */
export function getRoleDisplayName(role: Role): string {
  const names: Record<Role, string> = {
    learner: "Learner",
    tutor: "Tutor",
    teacher: "Teacher",
    admin: "Administrator",
  };
  return names[role];
}

/**
 * Check if role A is higher than role B.
 */
export function isHigherRole(a: Role, b: Role): boolean {
  const hierarchy: Role[] = ["learner", "tutor", "teacher", "admin"];
  return hierarchy.indexOf(a) > hierarchy.indexOf(b);
}
