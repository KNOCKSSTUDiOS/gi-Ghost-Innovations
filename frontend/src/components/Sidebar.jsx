export default function Sidebar() {
  return (
    <aside
      style={{
        width: 240,
        borderRight: "1px solid #ddd",
        padding: "20px 16px",
        height: "100vh",
        boxSizing: "border-box"
      }}
    >
      <nav>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          <li style={{ marginBottom: 12 }}>Dashboard</li>
          <li style={{ marginBottom: 12 }}>Creator Tools</li>
          <li style={{ marginBottom: 12 }}>System</li>
        </ul>
      </nav>
    </aside>
  );
}

