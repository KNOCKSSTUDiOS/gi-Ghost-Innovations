import express from "express";
import { addPolicy, listPolicies } from "./gi-guardian/store";

export function attachGuardian(app: express.Express) {
  app.post("/guardian/policy", (req, res) => {
    const policy = addPolicy({
      ...req.body,
      id: "pol-" + Math.random().toString(36).substring(2, 10),
      created: Date.now()
    });

    res.json(policy);
  });

  app.get("/guardian/policies", (req, res) => {
    res.json(listPolicies());
  });
}

