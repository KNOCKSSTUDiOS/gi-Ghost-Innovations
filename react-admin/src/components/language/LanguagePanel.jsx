import React, { useState } from "react";

export default function LanguagePanel() {
  const [input, setInput] = useState("");
  const [type, setType] = useState("summarize");
  const [output, setOutput] = useState("");

  function run() {
    fetch("http://localhost:3000/language/op", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user_id: "admin",
        type,
        input
      })
    })
      .then(r => r.json())
      .then(d => setOutput(d.output));
  }

  return (
    <div className="language-panel">
      <h2>G.I. Language Engine</h2>

      <select value={type} onChange={e => setType(e.target.value)}>
        <option value="summarize">Summarize</option>
        <option value="translate">Translate</option>
        <option value="rewrite">Rewrite</option>
        <option value="tone">Tone Shift</option>
        <option value="style">Style Transform</option>
      </select>

      <textarea
        placeholder="Enter text"
        value={input}
        onChange={e => setInput(e.target.value)}
        rows={6}
      />

      <button onClick={run}>Run</button>

      <h3>Output</h3>
      <pre>{output}</pre>
    </div>
  );
}

