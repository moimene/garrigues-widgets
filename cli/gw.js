#!/usr/bin/env node

/**
 * Garrigues Widgets CLI — Versión Estable ChatKit v1
 * ---------------------------------------------------
 * ✓ Genera carpetas en minúsculas
 * ✓ Genera page.tsx compatible con ChatKit v1
 * ✓ Inserta el workflow ID en la llamada API
 * ✓ Crea widget.json
 * ✓ Código limpio, compilación garantizada
 */

import fs from "fs";
import path from "path";
import readline from "readline";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function ask(q) {
  return new Promise((resolve) => {
    rl.question(q, (a) => resolve(a.trim()));
  });
}

(async () => {
  console.log("\n🧩 Garrigues Widgets — Generador Definitivo\n");

  const rawName = await ask("✔ Nombre del widget (ej: arras3): ");
  const name = rawName.toLowerCase().replace(/\s+/g, "-");

  const workflowId = await ask("✔ Workflow ID: ");

  const baseDir = "app/widgets";
  const folder = path.join(baseDir, name);
  const pageFile = path.join(folder, "page.tsx");
  const metaFile = path.join(folder, "widget.json");

  // Crear carpeta
  fs.mkdirSync(folder, { recursive: true });

  // Crear page.tsx
  const component = `
"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";

export default function Widget${name.replace(/[^a-zA-Z0-9]/g, "")}() {
  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        const res = await fetch("/api/chatkit-session", {
          method: "POST",
          body: JSON.stringify({ model: "${workflowId}" })
        });
        const data = await res.json();
        return data.client_secret;
      }
    }
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden"
      }}
    >
      <ChatKit control={control} />
    </div>
  );
}
`;

  fs.writeFileSync(pageFile, component);

  // Crear metadata
  const meta = {
    name,
    workflow: workflowId,
    created: new Date().toISOString(),
  };

  fs.writeFileSync(metaFile, JSON.stringify(meta, null, 2));

  console.log(`
🎉 Widget creado correctamente

📁 Carpeta: ${folder}
📄 page.tsx creado
🧾 widget.json creado

Ahora puedes desplegar con:
  git add .
  git commit -m "Widget ${name} añadido"
  git push

`);
  rl.close();
})();
