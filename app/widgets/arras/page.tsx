"use client";

import { useEffect } from "react";
import { ChatKit } from "@openai/chatkit";

export default function ArrasWidget() {
  useEffect(() => {
    const widget = new ChatKit({
      workflowId: process.env.NEXT_PUBLIC_ARRAS_WORKFLOW_ID!,
      version: process.env.NEXT_PUBLIC_ARRAS_WORKFLOW_VERSION!,
      container: "#widget-container",
      fileUploads: true,
    });

    return () => widget.destroy();
  }, []);

  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        padding: "20px",
        background: "white",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
      }}
    >
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
