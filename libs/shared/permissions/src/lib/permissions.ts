/**
 * All permissions in the system, as `resource:action` strings. Roles are
 * built by assigning a subset of these; the CASL ability factory (added in
 * Stage 1 alongside auth) turns a user's assigned permissions into runtime
 * checks shared by the API and both cabinets.
 */
export const PERMISSIONS = [
  'offers:read',
  'offers:write',
  'partners:read',
  'partners:approve',
  'partners:impersonate',
  'payouts:approve',
  'stats:read',
  'roles:manage',
  'audit:read',
] as const;

export type Permission = (typeof PERMISSIONS)[number];
