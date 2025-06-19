/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userName: string }> },
) {
  const { userName } = await params;

  const userData = {
    name: "Tetsuo Nagahama",
    username: userName,
    bio: "Full Stack Engineer",
    company: "Tech Company",
    location: "Tokyo, Japan",
    email: "example@example.com",
    website: "https://example.com",
    avatar: "https://github.com/github.png",
  };

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#1a1a1a",
            fontFamily: "Inter, sans-serif",
            color: "white",
            padding: "40px",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: "30px",
            }}
          >
            <img
              src={userData.avatar}
              alt="Avatar"
              width={80}
              height={80}
              style={{
                borderRadius: "50%",
                marginRight: "20px",
              }}
            />
            <div style={{ display: "flex", flexDirection: "column" }}>
              <h1
                style={{
                  fontSize: "36px",
                  fontWeight: "bold",
                  margin: "0",
                  marginBottom: "5px",
                }}
              >
                {userData.name}
              </h1>
              <p
                style={{
                  fontSize: "20px",
                  margin: "0",
                  color: "#888",
                }}
              >
                @{userData.username}
              </p>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              textAlign: "center",
              marginBottom: "30px",
            }}
          >
            <p
              style={{
                fontSize: "24px",
                margin: "0",
                marginBottom: "10px",
                fontWeight: "500",
              }}
            >
              {userData.bio}
            </p>
            <p
              style={{
                fontSize: "18px",
                margin: "0",
                color: "#ccc",
              }}
            >
              {userData.company} • {userData.location}
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "16px",
                color: "#60A5FA",
              }}
            >
              📧 {userData.email}
            </div>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                fontSize: "16px",
                color: "#60A5FA",
              }}
            >
              🌐 {userData.website}
            </div>
          </div>
          <div
            style={{
              position: "absolute",
              bottom: "20px",
              fontSize: "14px",
              color: "#666",
            }}
          >
            Generated from GitHub Profile
          </div>
        </div>
      ),
      {
        width: 910,
        height: 550,
      },
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}
