import React, { useEffect, useState } from "react";

export default function Timeline({ project }) {
  const [timeline, setTimeline] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/projects/${project.id}/timeline`)
      .then(r => r.json())
      .then(setTimeline);
  }, [project]);

  return (
    <div className="timeline">
      <h3>Timeline</h3>
      {timeline.map((t, i) => (
        <div key={i} className="timeline-item">
          <strong>{t.time}</strong> — {t.event}
        </div>
      ))}
    </div>
  );
}

