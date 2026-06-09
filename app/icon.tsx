import { ImageResponse } from "next/og";

export const runtime = "edge";

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
          background: "#ffac81",
          borderRadius: "100%",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Soft animated-style drifting glow */}
        <div
          style={{
            position: "absolute",
            width: "120%",
            height: "120%",
            background:
              "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.35), transparent 40%), radial-gradient(circle at 70% 70%, rgba(255,140,80,0.45), transparent 50%)",
            filter: "blur(10px)",
          }}
        />

        {/* Inner pulse ring */}
        <div
          style={{
            position: "absolute",
            width: "60%",
            height: "60%",
            borderRadius: "50%",
            border: "1px solid rgba(255,255,255,0.35)",
            boxShadow: "0 0 20px rgba(255,255,255,0.25)",
          }}
        />

        {/* Letter */}
        <div
          style={{
            fontSize: 44,
            fontWeight: 700,
            color: "#1a1a1a",
            fontFamily: "system-ui",
            zIndex: 1,
            letterSpacing: "-2px",
          }}
        >
          M
        </div>
      </div>
    ),
    {
      width: 64,
      height: 64,
    }
  );
}