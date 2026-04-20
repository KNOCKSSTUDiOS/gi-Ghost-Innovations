import express from "express";
import { listSystemApps, enableApp, disableApp } from "./gi-os/kernel";
import { listStations, createStation, addTrack } from "./gi-os/radio";
import { listCourses, createCourse, addLesson } from "./gi-os/school";
import { listUpdates, pushUpdate } from "./gi-os/update";

export function attachOs(app: express.Express) {
  // System apps
  app.get("/os/apps", (req, res) => res.json(listSystemApps()));
  app.post("/os/apps/enable", (req, res) => res.json(enableApp(req.body.id)));
  app.post("/os/apps/disable", (req, res) => res.json(disableApp(req.body.id)));

  // Radio
  app.get("/os/radio", (req, res) => res.json(listStations()));
  app.post("/os/radio/create", (req, res) =>
    res.json(createStation(req.body.name, req.body.description))
  );
  app.post("/os/radio/track", (req, res) =>
    res.json(addTrack(req.body.station_id, req.body.track))
  );

  // School
  app.get("/os/school", (req, res) => res.json(listCourses()));
  app.post("/os/school/create", (req, res) =>
    res.json(createCourse(req.body.name))
  );
  app.post("/os/school/lesson", (req, res) =>
    res.json(addLesson(req.body.course_id, req.body.title, req.body.content))
  );

  // Updates
  app.get("/os/updates", (req, res) => res.json(listUpdates()));
  app.post("/os/updates/push", (req, res) =>
    res.json(pushUpdate(req.body.version, req.body.notes))
  );
}

