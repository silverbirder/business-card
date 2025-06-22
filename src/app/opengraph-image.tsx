import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "名刺生成";
const description = "GitHubプロフィールから簡単に名刺を生成できるWebアプリです";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const primaryColor = "#111827";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          border: `12px solid ${primaryColor}`,
        }}
      >
        <div
          style={{
            fontSize: 120,
            marginBottom: 40,
          }}
        >
          📇
        </div>
        <div
          style={{
            color: primaryColor,
            fontSize: 72,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 20,
          }}
        >
          {alt}
        </div>
        <div
          style={{
            color: primaryColor,
            fontSize: 36,
            textAlign: "center",
            maxWidth: "80%",
          }}
        >
          {description}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
