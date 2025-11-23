"use client";

import { useEffect } from "react";

export default function ArrasWidget() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://cdn.openai.com/chatkit/chatkit.min.js";
    script.onload = () => {
      const chatkit = new (window as any).ChatKit({
        workflowId: process.env.NEXT_PUBLIC_ARRAS_WORKFLOW_ID!,
        version: process.env.NEXT_PUBLIC_ARRAS_WORKFLOW_VERSION!,
        container: "#widget-container",
        fileUploads: true,
      });
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh", padding: "20px" }}>
      <h1>Widget Arras</h1>
      <div
        id="widget-container"
        style={{
          width: "100%",
          height: "90%",
          border: "1px solid #ddd",
          borderRadius: "10px",
        }}
      />
    </div>
  );
}
