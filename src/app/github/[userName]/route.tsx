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

async function fetchUserRepos(
  userName: string,
): Promise<
  RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"]
> {
  try {
    const octokit = createOctokit();
    const { data: repos } = await octokit.rest.repos.listForUser({
      username: userName,
      sort: "updated",
      per_page: 10,
    });
    return repos;
  } catch (error) {
    console.error("Error fetching user repos:", error);
    return [];
  }
}

async function fetchUserStats(userName: string) {
  try {
    const repos = await fetchUserRepos(userName);
    const languageStats: Record<string, number> = {};
    let totalStars = 0;

    for (const repo of repos) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] ?? 0) + 1;
      }
      totalStars += repo.stargazers_count ?? 0;
    }

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    return {
      totalStars,
      topLanguages,
      repoCount: repos.length,
      repos,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      totalStars: 0,
      topLanguages: [],
      repoCount: 0,
      repos: [],
    };
  }
}

function generateLanguageChart(languages: [string, number][], width = 180) {
  if (languages.length === 0) {
    return null;
  }

  const total = languages.reduce((sum, [, count]) => sum + count, 0);
  const colors = ["#58a6ff", "#f85149", "#56d364", "#d2a8ff", "#ffa657"];

  let currentX = 0;
  const barWidth = width;
  const barHeight = 8;

  const bars = languages.map(([language, count], index) => {
    const percentage = count / total;
    const segmentWidth = barWidth * percentage;
    const color = colors[index % colors.length];

    const bar = (
      <rect
        key={language}
        x={currentX}
        y={0}
        width={segmentWidth}
        height={barHeight}
        fill={color}
        rx={index === 0 ? 4 : index === languages.length - 1 ? 4 : 0}
        ry={index === 0 ? 4 : index === languages.length - 1 ? 4 : 0}
      />
    );

    currentX += segmentWidth;
    return bar;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <svg width={width} height={barHeight} style={{ marginBottom: "12px" }}>
        {bars}
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {languages.slice(0, 3).map(([language, count], index) => {
          const percentage = Math.round((count / total) * 100);
          return (
            <div
              key={language}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "10px",
                color: "#7d8590",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: colors[index % colors.length],
                    borderRadius: "50%",
                    marginRight: "6px",
                  }}
                />
                <span>{language}</span>
              </div>
              <span style={{ color: "#e6edf3", fontSize: "9px" }}>
                {percentage}%
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function generateActivityChart(
  repos: RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"],
  width = 180,
  height = 60,
) {
  if (repos.length === 0) {
    return null;
  }

  const months = 12;
  const barWidth = (width - (months - 1) * 2) / months;
  const maxHeight = height - 20;

  const activities = Array.from({ length: months }, (_, i) => {
    const recentRepos = repos.filter((repo) => {
      const updatedAt = repo.updated_at ? new Date(repo.updated_at) : null;
      const monthsAgo = new Date();
      monthsAgo.setMonth(monthsAgo.getMonth() - i);
      return updatedAt ? updatedAt > monthsAgo : false;
    });
    return Math.min(recentRepos.length * 2, 10);
  }).reverse();

  const maxActivity = Math.max(...activities, 1);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          color: "#7d8590",
          fontSize: "10px",
          marginBottom: "8px",
        }}
      >
        Activity (12 months)
      </div>
      <svg width={width} height={height}>
        {activities.map((activity, index) => {
          const barHeight = (activity / maxActivity) * maxHeight;
          const x = index * (barWidth + 2);
          const y = height - barHeight - 10;

          const getColor = (level: number) => {
            if (level === 0) return "#161b22";
            if (level <= 3) return "#0e4429";
            if (level <= 6) return "#006d32";
            if (level <= 8) return "#26a641";
            return "#39d353";
          };

          return (
            <rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill={getColor(activity)}
              rx={2}
              ry={2}
            />
          );
        })}
      </svg>
    </div>
  );
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

  const userStats = await fetchUserStats(userName);

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
    totalStars: userStats.totalStars,
    topLanguages: userStats.topLanguages,
    repos: userStats.repos,
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
                {userData.bio ?? "GitHub Developer"}
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
                  📍 {userData.location ?? "Worldwide"}
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
                padding: "30px 20px",
                background: "#161b22",
                minWidth: "220px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: "#f0f6fc",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                Top Languages
              </div>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                {userData.topLanguages.length > 0 ? (
                  generateLanguageChart(userData.topLanguages)
                ) : (
                  <div
                    style={{
                      display: "flex",
                      color: "#7d8590",
                      fontSize: "12px",
                    }}
                  >
                    No language data
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#f0f6fc",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "12px",
                }}
              >
                Repository Activity
              </div>
              {userData.repos.length > 0 ? (
                generateActivityChart(userData.repos)
              ) : (
                <div
                  style={{
                    display: "flex",
                    color: "#7d8590",
                    fontSize: "12px",
                  }}
                >
                  No activity data
                </div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                padding: "30px",
                background: "#0d1117",
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
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#21262d",
                    padding: "10px",
                    borderRadius: "6px",
                    alignItems: "center",
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
                    flexDirection: "column",
                    background: "#21262d",
                    padding: "10px",
                    borderRadius: "6px",
                    alignItems: "center",
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
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    background: "#21262d",
                    padding: "10px",
                    borderRadius: "6px",
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      color: "#56d364",
                      fontSize: "18px",
                      fontWeight: "bold",
                    }}
                  >
                    ⭐ {userData.totalStars}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      color: "#7d8590",
                      fontSize: "10px",
                    }}
                  >
                    Total Stars
                  </div>
                </div>
              </div>
            </div>
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
