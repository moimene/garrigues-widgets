export default function Home() {
  return (
    <main
      style={{
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
      <h1>Centro de Widgets Garrigues</h1>
      <p>
        Desde aquí podrás acceder a cada widget, probarlos, y obtener el iframe
        para incrustarlos en cualquier web o producto.
      </p>

      <h2 style={{ marginTop: "30px" }}>Widgets disponibles</h2>
      <ul style={{ fontSize: "18px", lineHeight: "2" }}>
        <li>
          <a href="/widgets/arras">Widget Arras</a>
        </li>
      </ul>
    </main>
  );
}

