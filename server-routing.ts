import express from "express";
import { addRoute, listRoutes } from "./gi-routing/store";

export function attachRouting(app: express.Express) {
  app.post("/routing/rule", (req, res) => {
    const rule = addRoute({
      ...req.body,
      id: "route-" + Math.random().toString(36).substring(2, 10),
      created: Date.now()
    });

    res.json(rule);
  });

  app.get("/routing/rules", (req, res) => {
    res.json(listRoutes());
  });
}

