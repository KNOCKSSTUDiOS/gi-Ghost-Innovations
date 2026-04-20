import express from "express";
import { getSystemMetrics } from "./gi-metrics/system";
import { getPm2Metrics } from "./gi-metrics/pm2";
import { getTrafficMetrics } from "./gi-metrics/traffic";

export function attachMetrics(app: express.Express) {
  app.get("/metrics", async (req, res) => {
    const sys = getSystemMetrics();
    const pm2 = await getPm2Metrics();
    const traffic = getTrafficMetrics();

    res.json({
      system: sys,
      pm2,
      traffic
    });
  });
}

