import request from "supertest";
import { describe, expect, it } from "vitest";
import { createApp } from "./app.ts";

describe("GET /api/stocks/:symbol", () => {
  it("returns the stock for a known symbol, case-insensitively", async () => {
    const res = await request(createApp()).get("/api/stocks/aapl");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({
      data: { symbol: "AAPL", name: "Apple Inc.", previousClose: 228.52, lastPrice: 231.4, pe: 34.5 },
    });
  });

  it("returns 404 NOT_FOUND for an unknown symbol", async () => {
    const res = await request(createApp()).get("/api/stocks/xyz");
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ error: { code: "NOT_FOUND", message: "Unknown symbol: XYZ" } });
  });
});

describe("GET /api/health", () => {
  it("returns ok", async () => {
    const res = await request(createApp()).get("/api/health");
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: "ok", service: "nasdaq-swipe-api" });
  });
});
