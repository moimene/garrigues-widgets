"use client";

import { ChatKit, useChatKit } from "@openai/chatkit-react";

export default function WidgetArras3() {
  const { control } = useChatKit({
    api: {
      async getClientSecret() {
        const res = await fetch("/api/chatkit-session", {
          method: "POST",
          body: JSON.stringify({
            model: "wf_6922d9ef1a08819083e1a26cd49b9f2906ec4efc02abcf15"
          }),
        });
        const data = await res.json();
        return data.client_secret;
      },
    },
  });

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        margin: 0,
        padding: 0,
        overflow: "hidden",
      }}
    >
      <ChatKit control={control} />
    </div>
  );
}
