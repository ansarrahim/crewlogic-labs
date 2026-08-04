import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#020617",
          borderRadius: 7,
          border: "1px solid rgba(16,185,129,0.4)",
        }}
      >
        <span
          style={{
            display: "flex",
            fontSize: 15,
            fontWeight: 700,
            fontFamily: "monospace",
            color: "#34d399",
          }}
        >
          {"</>"}
        </span>
      </div>
    ),
    { ...size }
  );
}
