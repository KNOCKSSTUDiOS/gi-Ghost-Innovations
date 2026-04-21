import { Router } from "express";

const router = Router();

router.get("/status", (req, res) => {
  res.json({ ok: true, message: "G.I. API Route Online" });
});

export default router;

