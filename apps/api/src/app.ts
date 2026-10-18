import express from "express";
import { sampleStocks } from "./sampleStocks.ts";

export function createApp(): express.Express {
  const app = express();

  app.get("/api/health", (_req, res) => {
    res.json({ status: "ok", service: "nasdaq-swipe-api" });
  });

  app.get("/api/stocks/:symbol", (req, res) => {
    const symbol = req.params.symbol.toUpperCase();
    const stock = sampleStocks.find((s) => s.symbol === symbol);
    if (!stock) {
      res.status(404).json({ error: { code: "NOT_FOUND", message: `Unknown symbol: ${symbol}` } });
      return;
    }
    res.json({ data: stock });
  });

  return app;
}
