import { describe, expect, it } from "vitest";
import { formatSignedPercent, percentChange } from "./index";

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
