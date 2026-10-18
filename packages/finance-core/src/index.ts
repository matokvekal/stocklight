// Pure financial calculations. No React, no network, no database.
// Only a generic helper lives here for now; real analysis comes in later exercises.

/** Percentage change from `from` to `to`. Returns null when `from` is 0. */
export function percentChange(from: number, to: number): number | null {
  if (from === 0) return null;
  return ((to - from) / Math.abs(from)) * 100;
}
