
"use client";
import { ChatKit } from "@openai/chatkit-react";

export default function ARRAS2Widget() {
  return (
    <div style={{ padding: "20px", width: "100%", height: "100%" }}>
      <h1>Widget ARRAS2</h1>

      <ChatKit
        workflowId="wf_6922d9ef1a08819083e1a26cd49b9f2906ec4efc02abcf15"
        version="1"
        fileUploads={true}
        style={{ width: "100%", height: "600px" }}
      />
    </div>
  );
}
