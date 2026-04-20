import express from "express";
import { createCheckoutSession } from "./gi-billing/stripe";

export function attachBilling(app: express.Express) {
  app.post("/billing/checkout", async (req, res) => {
    const { user_id, tier } = req.body;

    try {
      const url = await createCheckoutSession(user_id, tier);
      res.json({ url });
    } catch (err) {
      res.status(500).json({ error: "Billing error" });
    }
  });
}

