import { ImageResponse } from "next/og";
import { siteName } from "@/lib/meta";

export const runtime = "edge";

export const alt = siteName;

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

const avatarUrl =
  "https://avatars.githubusercontent.com/u/199640274?s=400&u=6d8ea65fa19a68b7f9b5eec1824187ba57b321a9&v=4";

function Avatar() {
  return (
    <div
      style={{
        display: "flex",
        position: "relative",
        padding: "4px",
        borderRadius: "9999px",
        border: "2px solid rgba(56,189,248,0.6)",
        backgroundColor: "rgba(56,189,248,0.1)",
        boxShadow: "0 0 30px rgba(56,189,248,0.25)",
        marginRight: "36px",
        flexShrink: 0,
      }}
    >
      <img
        src={avatarUrl}
        alt="duythaidev"
        width="112"
        height="112"
        style={{
          borderRadius: "9999px",
          objectFit: "cover",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "0px",
          right: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "30px",
          height: "30px",
          borderRadius: "9999px",
          backgroundColor: "#0284c7",
          border: "3px solid #0d111c",
          boxShadow: "0 0 10px rgba(56, 189, 248, 0.5)",
        }}
      >
        <svg
          width="15"
          height="15"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="3.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    </div>
  );
}

function ProfileContent() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1
        style={{
          fontSize: "66px",
          fontWeight: 900,
          color: "#fff",
          letterSpacing: "-2px",
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        duythaidev.
      </h1>

      <div
        style={{
          width: "260px",
          height: "4px",
          background: "linear-gradient(90deg,#38bdf8,#818cf8,transparent)",
          borderRadius: "2px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
      />

      <div
        style={{
          fontSize: "25px",
          fontWeight: 600,
          color: "#38bdf8",
        }}
      >
        Frontend Engineer &amp; Software Architecture
      </div>

      <div
        style={{
          fontSize: "18px",
          color: "#94a3b8",
          marginTop: "8px",
          maxWidth: "780px",
          lineHeight: 1.4,
        }}
      >
        Crafting modern frontend experiences with scalable architectures,
        high-performance interfaces, and elegant user interactions.
      </div>
    </div>
  );
}

export default async function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#09090b",
        position: "relative",
        padding: "40px",
        fontFamily:
          'system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,sans-serif',
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "-80px",
          left: "-60px",
          width: "450px",
          height: "450px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(56, 189, 248, 0.22) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          bottom: "-90px",
          right: "-60px",
          width: "520px",
          height: "520px",
          borderRadius: "9999px",
          background:
            "radial-gradient(circle, rgba(99, 102, 241, 0.24) 0%, transparent 70%)",
        }}
      />

      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          border: "1px solid rgba(255,255,255,0.12)",
          borderRadius: "24px",
          padding: "48px 56px",
          backgroundColor: "rgba(13,17,28,0.72)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,.7)",
          position: "relative",
        }}
      >
        <Avatar />

        <ProfileContent />
      </div>
    </div>,
    {
      ...size,
    },
  );
}
