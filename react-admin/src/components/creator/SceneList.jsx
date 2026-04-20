import React, { useEffect, useState } from "react";

export default function SceneList({ project, onSelect }) {
  const [scenes, setScenes] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/projects/${project.id}/scenes`)
      .then(r => r.json())
      .then(setScenes);
  }, [project]);

  function createScene() {
    const name = prompt("Scene name:");
    if (!name) return;

    fetch(`http://localhost:3000/projects/${project.id}/scene`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name })
    })
      .then(r => r.json())
      .then(s => setScenes(prev => [...prev, s]));
  }

  function aiScene() {
    const promptText = prompt("Describe the scene you want to generate:");
    if (!promptText) return;

    fetch("http://localhost:3000/ai/scene", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: project.user_id,
        project_id: project.id,
        prompt: promptText
      })
    })
      .then(r => r.json())
      .then(out => alert(out.output));
  }

  return (
    <div className="scene-list">
      <h3>Scenes</h3>

      {scenes.map(s => (
        <button key={s.id} onClick={() => onSelect(s)}>
          {s.name}
        </button>
      ))}

      <div style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
        <button onClick={createScene}>+ New Scene</button>
        <button onClick={aiScene}>+ AI Scene</button>
      </div>
    </div>
  );
}
