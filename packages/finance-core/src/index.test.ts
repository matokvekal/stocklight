import { describe, expect, it } from "vitest";
import { percentChange } from "./index";

describe("percentChange", () => {
  it("computes a gain and a loss", () => {
    expect(percentChange(100, 110)).toBeCloseTo(10);
    expect(percentChange(200, 150)).toBeCloseTo(-25);
  });

  it("returns null when the starting value is zero", () => {
    expect(percentChange(0, 5)).toBeNull();
  });
});
