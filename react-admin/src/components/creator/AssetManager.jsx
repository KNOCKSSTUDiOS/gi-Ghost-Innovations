import React, { useEffect, useState } from "react";

export default function AssetManager({ project }) {
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/storage/list/${project.user_id}?project=${project.id}`)
      .then(r => r.json())
      .then(setFiles);
  }, [project]);

  return (
    <div className="asset-manager">
      <h3>Assets</h3>
      {files.map(f => (
        <div key={f.id} className="asset-item">
          <span>{f.filename}</span>
        </div>
      ))}
    </div>
  );
}

