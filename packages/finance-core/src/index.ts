// Pure financial calculations. No React, no network, no database.
// Only a generic helper lives here for now; real analysis comes in later exercises.

/** Percentage change from `from` to `to`. Returns null when `from` is 0. */
export function percentChange(from: number, to: number): number | null {
  if (from === 0) return null;
  return ((to - from) / Math.abs(from)) * 100;
}

/** Formats a percentage with an explicit sign and two decimals, e.g. "+1.26%" or "-5.00%". */
export function formatSignedPercent(value: number): string {
  const rounded = value.toFixed(2);
  // A change that rounds to zero carries no sign (avoids "-0.00%").
  if (Number(rounded) === 0) return "0.00%";
  return `${value > 0 ? "+" : ""}${rounded}%`;
}
