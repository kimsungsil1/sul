import { ImageResponse } from "@vercel/og";
import { NextRequest } from "next/server";

export const runtime = "edge";

export function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const year = searchParams.get("year") ?? "Birth Year";
  const bottle = searchParams.get("bottle") ?? "Top pick";

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #f8fafc 0%, #ede9fe 100%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            width: "80%",
            borderRadius: 24,
            background: "white",
            padding: 48,
            boxShadow: "0 20px 60px rgba(15, 23, 42, 0.15)",
          }}
        >
          <div style={{ fontSize: 20, color: "#7c3aed", fontWeight: 700 }}>Birth-Year Picks</div>
          <div style={{ fontSize: 48, fontWeight: 700, color: "#0f172a", marginTop: 12 }}>{year}</div>
          <div style={{ fontSize: 24, color: "#475569", marginTop: 12 }}>{bottle}</div>
          <div style={{ fontSize: 16, color: "#94a3b8", marginTop: 24 }}>Exact matches + curated alternatives</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
