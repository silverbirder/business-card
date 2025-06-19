/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";
import { Octokit } from "octokit";
import { env } from "@/env";
import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";

export const runtime = "edge";

function createOctokit() {
  return new Octokit({
    auth: env.GITHUB_TOKEN,
  });
}

async function fetchGitHubUser(
  userName: string,
): Promise<
  RestEndpointMethodTypes["users"]["getByUsername"]["response"]["data"] | null
> {
  try {
    const octokit = createOctokit();
    const { data: user } = await octokit.rest.users.getByUsername({
      username: userName,
    });
    return user;
  } catch (error) {
    console.error("Error fetching GitHub user:", error);
    return null;
  }
}

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userName: string }> },
) {
  const { userName } = await params;
  const gitHubUser = await fetchGitHubUser(userName);
  if (!gitHubUser) {
    return new Response("User not found", { status: 404 });
  }

  const userData = {
    name: gitHubUser.name ?? gitHubUser.login,
    username: gitHubUser.login,
    bio: gitHubUser.bio ?? "GitHub Developer",
    company: gitHubUser.company ?? "",
    location: gitHubUser.location ?? "",
    email: gitHubUser.email ?? "",
    website: gitHubUser.blog ?? `https://github.com/${gitHubUser.login}`,
    avatar: gitHubUser.avatar_url,
    publicRepos: gitHubUser.public_repos,
    followers: gitHubUser.followers,
  };

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            background: "#0d1117",
            fontFamily: "Inter",
          }}
        >
          <div
            style={{
              display: "flex",
              width: "100%",
              background: "#21262d",
              margin: "20px",
              borderRadius: "12px",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  marginBottom: "20px",
                }}
              >
                <img
                  src={userData.avatar}
                  style={{
                    width: "60px",
                    height: "60px",
                    borderRadius: "50%",
                    marginRight: "15px",
                  }}
                  alt="User Avatar"
                />
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <div
                    style={{
                      display: "flex",
                      color: "#f0f6fc",
                      fontSize: "24px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      color: "#7d8590",
                      fontSize: "14px",
                    }}
                  >
                    @{userData.username}
                  </div>
                </div>
              </div>
              <div
                style={{
                  color: "#e6edf3",
                  fontSize: "14px",
                  marginBottom: "20px",
                }}
              >
                {userData.bio || "GitHub Developer"}
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    color: "#7d8590",
                    fontSize: "12px",
                    marginBottom: "5px",
                  }}
                >
                  📍 {userData.location || "Worldwide"}
                </div>
                <div
                  style={{
                    display: "flex",
                    color: "#58a6ff",
                    fontSize: "12px",
                  }}
                >
                  🌐 github.com/{userData.username}
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
                background: "#161b22",
                borderRadius: "0 12px 12px 0",
                minWidth: "200px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#f0f6fc",
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                Stats
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    background: "#0d1117",
                    padding: "10px",
                    borderRadius: "6px",
                    marginBottom: "10px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      color: "#58a6ff",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.publicRepos}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      color: "#7d8590",
                      fontSize: "10px",
                    }}
                  >
                    Repositories
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    background: "#0d1117",
                    padding: "10px",
                    borderRadius: "6px",
                    textAlign: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      color: "#f85149",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.followers}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      color: "#7d8590",
                      fontSize: "10px",
                    }}
                  >
                    Followers
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 400,
      },
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}
