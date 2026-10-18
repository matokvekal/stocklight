import { describe, expect, it } from "vitest";
import { describePe, formatSignedPercent, percentChange } from "./index";

describe("percentChange", () => {
  it("computes a gain and a loss", () => {
    expect(percentChange(100, 110)).toBeCloseTo(10);
    expect(percentChange(200, 150)).toBeCloseTo(-25);
  });

  it("returns null when the starting value is zero", () => {
    expect(percentChange(0, 5)).toBeNull();
  });
});

describe("formatSignedPercent", () => {
  it("adds a plus sign to gains and a minus sign to losses", () => {
    expect(formatSignedPercent(1.2636)).toBe("+1.26%");
    expect(formatSignedPercent(-5)).toBe("-5.00%");
  });

  it("shows no sign for a change that rounds to zero", () => {
    expect(formatSignedPercent(0)).toBe("0.00%");
    expect(formatSignedPercent(-0.001)).toBe("0.00%");
  });
});

describe("describePe", () => {
  it("says a lower P/E is cheaper than the market", () => {
    expect(describePe(12, 20)).toContain("cheaper than the market average of 20");
  });

  it("says a P/E within 10% of the market is roughly average", () => {
    expect(describePe(20, 20)).toContain("roughly in line");
    expect(describePe(22, 20)).toContain("roughly in line");
    expect(describePe(18, 20)).toContain("roughly in line");
  });

  it("says a higher P/E is more expensive than the market", () => {
    expect(describePe(34.5, 20)).toContain("more expensive than the market average of 20");
  });

  it("says there are no earnings for a zero or negative P/E", () => {
    expect(describePe(0, 20)).toContain("no earnings");
    expect(describePe(-5, 20)).toContain("no earnings");
    expect(describePe(-5, 20)).not.toContain("cheap");
  });
});
