<button
  onClick={() => {
    const prompt = prompt("What should the AI add to this script?");
    fetch("http://localhost:3000/ai/script", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: project.user_id,
        project_id: project.id,
        scene_id: scene.id,
        prompt
      })
    })
      .then(r => r.json())
      .then(out => setText(text + "\n\n" + out.output));
  }}
>
  + AI Expand Script
</button>
