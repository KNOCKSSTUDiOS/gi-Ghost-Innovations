import { Router } from "express";

const router = Router();

router.get("/templates", (req, res) => {
  res.json({
    ok: true,
    templates: [],
    message: "Creator templates placeholder"
  });
});

router.post("/generate", (req, res) => {
  const { prompt } = req.body;
  res.json({
    ok: true,
    output: `Generated content for: ${prompt}`,
    message: "Creator generation placeholder"
  });
});

export default router;

