export type ClassValue = string | false | null | undefined;

/**
 * Junta classes CSS ignorando valores falsy.
 */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
