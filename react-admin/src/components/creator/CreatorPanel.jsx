import React, { useState } from "react";
import ProjectList from "./ProjectList";
import SceneList from "./SceneList";
import Timeline from "./Timeline";
import AssetManager from "./AssetManager";
import ScriptEditor from "./ScriptEditor";

export default function CreatorPanel() {
  const [project, setProject] = useState(null);
  const [scene, setScene] = useState(null);
  const [view, setView] = useState("scenes");

  if (!project) {
    return <ProjectList onSelect={setProject} />;
  }

  return (
    <div className="creator-panel">
      <div className="creator-header">
        <h2>{project.name}</h2>

        <div className="creator-tabs">
          <button onClick={() => setView("scenes")}>Scenes</button>
          <button onClick={() => setView("timeline")}>Timeline</button>
          <button onClick={() => setView("assets")}>Assets</button>
          <button onClick={() => setView("script")}>Script</button>
        </div>
      </div>

      <div className="creator-body">
        {view === "scenes" && (
          <SceneList project={project} onSelect={setScene} />
        )}

        {view === "timeline" && (
          <Timeline project={project} />
        )}

        {view === "assets" && (
          <AssetManager project={project} />
        )}

        {view === "script" && (
          <ScriptEditor project={project} scene={scene} />
        )}
      </div>
    </div>
  );
}
