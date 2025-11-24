#!/usr/bin/env node

/**
 * Garrigues Widgets CLI v2
 * Ultra Potente – Plug & Play
 */

const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer").default;
const colors = require("picocolors");

// ROOT DEL PROYECTO
const ROOT = process.cwd();
const WIDGETS_DIR = path.join(ROOT, "app", "widgets");

//
// ============================
//  HELP MENU
// ============================
//
function showHelp() {
  console.log(`
${colors.bold("Garrigues Widgets CLI")}
${colors.green("Comandos disponibles:")}

  gw create               → Crear un widget desde plantilla interactiva
  gw list                 → Listar widgets instalados
  gw remove <name>        → Eliminar widget
  gw help                 → Mostrar ayuda

Ejemplos:
  gw create
  gw remove arras
  gw list
  `);
}

//
// ============================
//  LIST WIDGETS
// ============================
//
function listWidgets() {
  if (!fs.existsSync(WIDGETS_DIR)) {
    console.log(colors.red("No existe app/widgets aún."));
    return;
  }
  const widgets = fs.readdirSync(WIDGETS_DIR);

  if (widgets.length === 0) {
    console.log(colors.yellow("No hay widgets creados."));
    return;
  }

  console.log(colors.green("Widgets instalados:\n"));
  widgets.forEach((w) => console.log("  • " + w));
}

//
// ============================
//  REMOVE WIDGET
// ============================
//
function removeWidget(name) {
  const widgetPath = path.join(WIDGETS_DIR, name);

  if (!fs.existsSync(widgetPath)) {
    console.log(colors.red(`❌ No existe el widget "${name}"`));
    return;
  }

  fs.rmSync(widgetPath, { recursive: true, force: true });
  console.log(colors.green(`✔ Widget "${name}" eliminado correctamente.`));
}

//
// ============================
//  CREATE WIDGET
// ============================
//
async function createWidget() {
  console.log(colors.bold("\n🧩 Creador de Widgets Garrigues\n"));

  const answers = await inquirer.prompt([
    {
      name: "name",
      message: "Nombre del widget:",
      validate: (v) => v.length > 1 || "Debe tener al menos 2 caracteres",
    },
    {
      name: "workflowId",
      message: "Workflow ID:",
      validate: (v) => v.startsWith("wf_") || "Debe empezar por wf_",
    },
    {
      name: "version",
      message: "Versión:",
      default: "1",
    },
    {
      type: "list",
      name: "template",
      message: "Tipo de widget:",
      choices: [
        "arras",
        "alquiler",
        "poderes",
        "firma",
        "genérico",
      ],
    },
  ]);

  const { name, workflowId, version, template } = answers;

  // Crear carpeta del widget
  const widgetDir = path.join(WIDGETS_DIR, name);
  fs.mkdirSync(widgetDir, { recursive: true });

  // ============================
  //  TEMPLATE DE PAGE.TSX
  // ============================
  const pageContent = `
"use client";
import { ChatKit } from "@openai/chatkit-react";

export default function ${capitalize(name)}Widget() {
  return (
    <div style={{ padding: "20px", width: "100%", height: "100%" }}>
      <h1>Widget ${capitalize(name)}</h1>

      <ChatKit
        workflowId="${workflowId}"
        version="${version}"
        fileUploads={true}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
}
`;

  fs.writeFileSync(path.join(widgetDir, "page.tsx"), pageContent);

  // ============================
  //  METADATA JSON
  // ============================
  const meta = {
    name,
    workflowId,
    version,
    template,
    createdAt: new Date().toISOString(),
  };

  fs.writeFileSync(
    path.join(widgetDir, "widget.json"),
    JSON.stringify(meta, null, 2)
  );

  // ============================
  //  AUTOREGISTRO EN app/page.tsx
  // ============================
  autoRegister(name);

  console.log(colors.green(`\n✔ Widget creado correctamente`));
  console.log(colors.bold(`\nCarpeta:`), `app/widgets/${name}`);
  console.log(colors.bold(`page.tsx creado`));
  console.log(colors.bold(`widget.json generado\n`));

  console.log(colors.cyan(`
Ahora puedes desplegar con:
  git add .
  git commit -m "Widget ${name} añadido"
  git push
  `));
}

//
// ============================
//  AUTO-REGISTRO EN app/page.tsx
// ============================
//
function autoRegister(name) {
  const indexPath = path.join(ROOT, "app", "page.tsx");

  if (!fs.existsSync(indexPath)) {
    console.log(colors.red("No existe app/page.tsx, no puedo autoregistrar."));
    return;
  }

  let content = fs.readFileSync(indexPath, "utf8");

  // Añadir enlace si no existe
  if (!content.includes(`/widgets/${name}`)) {
    const marker = "</ul>";
    const newItem = `\n<li><a href="/widgets/${name}">Widget ${capitalize(
      name
    )}</a></li>`;
    content = content.replace(marker, `${newItem}\n${marker}`);
  }

  fs.writeFileSync(indexPath, content);
}

//
// ============================
//  UTIL
// ============================
//
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

//
// ============================
//  ROUTER CLI
// ============================
//
const [, , cmd, ...rest] = process.argv;

switch (cmd) {
  case "create":
    createWidget();
    break;
  case "list":
    listWidgets();
    break;
  case "remove":
    removeWidget(rest[0]);
    break;
  default:
    showHelp();
}
