/** Phase 1 stub — expand with cross-service helpers as needed. */
export function assertNonEmpty(value: string, label: string): string {
  if (!value?.trim()) {
    throw new Error(`${label} must be a non-empty string`);
  }
  return value;
}
