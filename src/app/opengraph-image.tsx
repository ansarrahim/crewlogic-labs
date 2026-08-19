import { ImageResponse } from "next/og";

export const alt = "CrewLogic Labs — Autonomous AI Engineering. Human Architectural Rigor.";
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
          backgroundColor: "#0d130f",
          backgroundImage:
            "radial-gradient(circle at 15% 20%, rgba(184,147,90,0.25), transparent 45%), radial-gradient(circle at 85% 15%, rgba(184,147,90,0.18), transparent 40%)",
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
              border: "2px solid rgba(184,147,90,0.4)",
              backgroundColor: "rgba(184,147,90,0.1)",
              color: "#b8935a",
              fontSize: 32,
              fontWeight: 700,
              fontFamily: "monospace",
            }}
          >
            {"</>"}
          </div>
          <div style={{ display: "flex", fontSize: 44, fontWeight: 700, color: "#e7dfc7" }}>
            CrewLogic Labs
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            color: "#e7dfc7",
            lineHeight: 1.2,
            maxWidth: 1000,
          }}
        >
          Autonomous AI Engineering.
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 52,
            fontWeight: 700,
            lineHeight: 1.2,
            maxWidth: 1000,
            color: "#b8935a",
          }}
        >
          Human Architectural Rigor.
        </div>

        <div
          style={{
            display: "flex",
            marginTop: 40,
            fontSize: 26,
            color: "#a89f86",
          }}
        >
          5 Live AI Agents · Web3 · Full-Stack · Islamabad, Pakistan
        </div>
      </div>
    ),
    { ...size }
  );
}
