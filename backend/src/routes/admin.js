import { Router } from "express";

const router = Router();

router.get("/dashboard", (req, res) => {
  res.json({
    ok: true,
    message: "Admin dashboard placeholder"
  });
});

router.post("/broadcast", (req, res) => {
  const { message } = req.body;
  res.json({
    ok: true,
    broadcast: message,
    status: "Broadcast queued"
  });
});

export default router;

