import { GiScript } from "./schema";

const scripts: GiScript[] = [];

export function saveScript(project_id: string, scene_id: string, text: string) {
  let existing = scripts.find(s => s.scene_id === scene_id);

  if (existing) {
    existing.text = text;
    existing.updated = Date.now();
    return existing;
  }

  const s: GiScript = {
    id: "script-" + Math.random().toString(36).substring(2, 10),
    project_id,
    scene_id,
    text,
    updated: Date.now()
  };

  scripts.push(s);
  return s;
}

export function getScript(scene_id: string) {
  return scripts.find(s => s.scene_id === scene_id) || { text: "" };
}

