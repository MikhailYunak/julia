import { z } from 'zod';

/**
 * The two kinds of account the platform knows about. Everything
 * permission- and impersonation-related keys off this distinction.
 */
export const userTypeSchema = z.enum(['manager', 'partner']);

export type UserType = z.infer<typeof userTypeSchema>;
