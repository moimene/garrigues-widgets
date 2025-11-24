export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "system-ui, -apple-system, sans-serif",
      }}
    >
      <h1>Centro de Widgets Garrigues</h1>
      <p>Selecciona un widget:</p>

      <ul style={{ lineHeight: "2", fontSize: "20px" }}>
        <li>
          <a href="/widgets/arras">Widget Arras</a>
        </li>
      </ul>
    </main>
  );
}
