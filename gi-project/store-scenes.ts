import { GiScene } from "./schema";

const scenes: GiScene[] = [];

export function createScene(project_id: string, name: string, summary?: string) {
  const s: GiScene = {
    id: "scene-" + Math.random().toString(36).substring(2, 10),
    project_id,
    name,
    summary,
    created: Date.now()
  };
  scenes.push(s);
  return s;
}

export function listScenes(project_id: string) {
  return scenes.filter(s => s.project_id === project_id);
}

export function getScene(id: string) {
  return scenes.find(s => s.id === id);
}

