import express from "express";
import multer from "multer";
import { saveFile, getFile, listFiles } from "./gi-storage/storage";

const upload = multer();

export function attachStorage(app: express.Express) {
  // Upload file
  app.post("/storage/upload", upload.single("file"), (req, res) => {
    const { user_id, project } = req.body;
    const file = req.file;

    if (!file) return res.status(400).json({ error: "No file uploaded" });

    const saved = saveFile(
      user_id,
      file.buffer,
      file.originalname,
      file.mimetype,
      project
    );

    res.json(saved);
  });

  // Download file
  app.get("/storage/file/:id", (req, res) => {
    const file = getFile(req.params.id);
    if (!file) return res.status(404).json({ error: "File not found" });

    res.setHeader("Content-Type", file.mime);
    res.sendFile(file.path);
  });

  // List files
  app.get("/storage/list/:user_id", (req, res) => {
    const { project } = req.query;
    const files = listFiles(req.params.user_id, project as string);
    res.json(files);
  });
}

