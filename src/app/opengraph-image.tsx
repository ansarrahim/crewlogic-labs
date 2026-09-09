import { ImageResponse } from "next/og";
import { SITE } from "@/lib/data";

export const alt = "CrewLogic Labs — AI Automation & Consulting for Small Businesses.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#f5f4f0",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(10,122,68,0.14), transparent 45%), radial-gradient(circle at 85% 15%, rgba(69,60,196,0.12), transparent 40%)",
          padding: "80px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            marginBottom: 40,
          }}
        >
          <div
            style={{
              display: "flex",
              width: 72,
              height: 72,
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 16,
              border: "2px solid rgba(10,122,68,0.4)",
              backgroundColor: "rgba(10,122,68,0.1)",
              color: "#0a7a44",
              fontSize: 32,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#1a1712" }}>
            {SITE.name}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            color: "#1a1712",
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          AI Automation &amp; Consulting
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: 1000,
            color: "#0a7a44",
          }}
        >
          for Small Businesses.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 26,
            color: "#5c5644",
          }}
        >
          Real n8n Automations · Custom Engineering · Islamabad, Pakistan
        </div>
      </div>
    ),
    { ...size }
  );
}
