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

/** Reference market-average price-to-earnings ratio used for the sample stocks. */
export const MARKET_PE = 20;

/** Formats a number with at most one decimal, dropping a trailing ".0" (20 -> "20", 34.5 -> "34.5"). */
function formatPeNumber(value: number): string {
  return String(Number(value.toFixed(1)));
}

/**
 * One calm, factual sentence comparing a P/E ratio with the market's.
 * "Roughly average" means within ±10% of `marketPe`. A P/E of zero or below means no earnings.
 */
export function describePe(pe: number, marketPe: number): string {
  if (!(pe > 0)) {
    return "This company has no earnings over the past year, so a P/E ratio does not apply.";
  }
  const market = formatPeNumber(marketPe);
  const own = formatPeNumber(pe);
  if (pe > marketPe * 1.1) {
    return `At ${own}, this stock is more expensive than the market average of ${market}: investors pay more for each dollar of earnings.`;
  }
  if (pe < marketPe * 0.9) {
    return `At ${own}, this stock is cheaper than the market average of ${market}: investors pay less for each dollar of earnings.`;
  }
  return `At ${own}, this stock is priced roughly in line with the market average of ${market}.`;
}
