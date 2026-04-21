import { Router } from "express";

const router = Router();

router.get("/health", (req, res) => {
  res.json({
    ok: true,
    uptime: process.uptime(),
    timestamp: Date.now(),
    message: "System health check OK"
  });
});

router.get("/version", (req, res) => {
  res.json({
    ok: true,
    version: "1.0.0",
    api: "G.I. Backend API"
  });
});

export default router;

