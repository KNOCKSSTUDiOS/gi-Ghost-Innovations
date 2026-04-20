import React, { useEffect, useState } from "react";

export default function RoutingEditor() {
  const [routes, setRoutes] = useState([]);
  const [form, setForm] = useState({
    name: "",
    match_action: "",
    match_user: "",
    match_project: "",
    model: "",
    fallback: ""
  });

  useEffect(() => {
    fetch("http://localhost:3000/routing/rules")
      .then(r => r.json())
      .then(setRoutes);
  }, []);

  function submit() {
    const payload = {
      ...form,
      fallback: form.fallback
        ? form.fallback.split(",").map(s => s.trim())
        : []
    };

    fetch("http://localhost:3000/routing/rule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(r => r.json())
      .then(r => setRoutes(prev => [...prev, r]));
  }

  return (
    <div className="routing-editor">
      <h2>Model Routing Editor</h2>

      <div className="routing-form">
        <input
          placeholder="Rule Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
        />

        <input
          placeholder="Match Action"
          value={form.match_action}
          onChange={e => setForm({ ...form, match_action: e.target.value })}
        />

        <input
          placeholder="Match User ID"
          value={form.match_user}
          onChange={e => setForm({ ...form, match_user: e.target.value })}
        />

        <input
          placeholder="Match Project ID"
          value={form.match_project}
          onChange={e => setForm({ ...form, match_project: e.target.value })}
        />

        <input
          placeholder="Model Name"
          value={form.model}
          onChange={e => setForm({ ...form, model: e.target.value })}
        />

        <input
          placeholder="Fallback Models (comma separated)"
          value={form.fallback}
          onChange={e => setForm({ ...form, fallback: e.target.value })}
        />

        <button onClick={submit}>Create Routing Rule</button>
      </div>

      <h3>Existing Routes</h3>
      <pre>{JSON.stringify(routes, null, 2)}</pre>
    </div>
  );
}

