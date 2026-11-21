/**
 * Server-side visibility control for Tech Stack Certifications.
 *
 * Rules:
 * - Local development (`NODE_ENV === "development"`): Certifications visible by default.
 * - Production builds (`NODE_ENV === "production"`): Certifications hidden by default.
 * - Explicit override: `SHOW_STACK_CERTIFICATIONS === "true"` enables them anywhere.
 */
export function shouldShowStackCertifications(): boolean {
  if (process.env.SHOW_STACK_CERTIFICATIONS === "true") {
    return true
  }
  if (process.env.SHOW_STACK_CERTIFICATIONS === "false") {
    return false
  }
  return process.env.NODE_ENV === "development"
}
