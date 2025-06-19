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

async function fetchUserGists(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: gists } = await octokit.rest.gists.listForUser({
      username: userName,
      per_page: 10,
    });
    return gists;
  } catch (error) {
    console.error("Error fetching user gists:", error);
    return [];
  }
}

async function fetchUserOrganizations(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: orgs } = await octokit.rest.orgs.listForUser({
      username: userName,
      per_page: 10,
    });
    return orgs;
  } catch (error) {
    console.error("Error fetching user organizations:", error);
    return [];
  }
}

async function fetchUserEvents(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: events } =
      await octokit.rest.activity.listPublicEventsForUser({
        username: userName,
        per_page: 30,
      });
    return events;
  } catch (error) {
    console.error("Error fetching user events:", error);
    return [];
  }
}

async function fetchUserFollowing(userName: string) {
  try {
    const octokit = createOctokit();
    const { data: following } = await octokit.rest.users.listFollowingForUser({
      username: userName,
      per_page: 1,
    });
    return following.length;
  } catch (error) {
    console.error("Error fetching user following:", error);
    return 0;
  }
}

async function fetchUserStats(userName: string) {
  try {
    const [repos, gists, orgs, events] = await Promise.all([
      fetchUserRepos(userName),
      fetchUserGists(userName),
      fetchUserOrganizations(userName),
      fetchUserEvents(userName),
    ]);

    const languageStats: Record<string, number> = {};
    let totalStars = 0;
    let totalForks = 0;

    for (const repo of repos) {
      if (repo.language) {
        languageStats[repo.language] = (languageStats[repo.language] ?? 0) + 1;
      }
      totalStars += repo.stargazers_count ?? 0;
      totalForks += repo.forks_count ?? 0;
    }

    const topLanguages = Object.entries(languageStats)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3);

    // Recent activity analysis
    const recentCommits = events.filter(
      (event) =>
        event.type === "PushEvent" &&
        event.created_at &&
        new Date(event.created_at).getTime() >
          Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).length;

    const recentPRs = events.filter(
      (event) =>
        event.type === "PullRequestEvent" &&
        event.created_at &&
        new Date(event.created_at).getTime() >
          Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).length;

    const recentIssues = events.filter(
      (event) =>
        event.type === "IssuesEvent" &&
        event.created_at &&
        new Date(event.created_at).getTime() >
          Date.now() - 30 * 24 * 60 * 60 * 1000,
    ).length;

    return {
      totalStars,
      totalForks,
      topLanguages,
      repoCount: repos.length,
      repos,
      gists,
      organizations: orgs,
      recentCommits,
      recentPRs,
      recentIssues,
      totalGists: gists.length,
      totalOrganizations: orgs.length,
    };
  } catch (error) {
    console.error("Error fetching user stats:", error);
    return {
      totalStars: 0,
      totalForks: 0,
      topLanguages: [],
      repoCount: 0,
      repos: [],
      gists: [],
      organizations: [],
      recentCommits: 0,
      recentPRs: 0,
      recentIssues: 0,
      totalGists: 0,
      totalOrganizations: 0,
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

  const [userStats, following] = await Promise.all([
    fetchUserStats(userName),
    fetchUserFollowing(userName),
  ]);

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
    following,
    totalStars: userStats.totalStars,
    totalForks: userStats.totalForks,
    topLanguages: userStats.topLanguages,
    repos: userStats.repos,
    gists: userStats.gists,
    organizations: userStats.organizations,
    recentCommits: userStats.recentCommits,
    recentPRs: userStats.recentPRs,
    recentIssues: userStats.recentIssues,
    totalGists: userStats.totalGists,
    totalOrganizations: userStats.totalOrganizations,
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
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              background: "#21262d",
              margin: "15px",
              marginBottom: "8px",
              borderRadius: "12px",
              padding: "20px",
              alignItems: "center",
            }}
          >
            <img
              src={userData.avatar}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: "50%",
                marginRight: "20px",
              }}
              alt="User Avatar"
            />
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  color: "#f0f6fc",
                  fontSize: "28px",
                  fontWeight: "bold",
                }}
              >
                {userData.name}
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#7d8590",
                  fontSize: "16px",
                  marginBottom: "8px",
                }}
              >
                @{userData.username}
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#e6edf3",
                  fontSize: "14px",
                  marginBottom: "8px",
                }}
              >
                {userData.bio}
              </div>
              <div style={{ display: "flex", gap: "20px" }}>
                {userData.location && (
                  <div
                    style={{
                      display: "flex",
                      color: "#7d8590",
                      fontSize: "12px",
                      alignItems: "center",
                    }}
                  >
                    📍 {userData.location}
                  </div>
                )}
                {userData.company && (
                  <div
                    style={{
                      display: "flex",
                      color: "#7d8590",
                      fontSize: "12px",
                      alignItems: "center",
                    }}
                  >
                    🏢 {userData.company}
                  </div>
                )}
              </div>
            </div>
            {userData.organizations.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    color: "#f0f6fc",
                    fontSize: "12px",
                    marginBottom: "8px",
                  }}
                >
                  Organizations
                </div>
                <div style={{ display: "flex", gap: "4px" }}>
                  {userData.organizations.slice(0, 3).map((org, index) => (
                    <img
                      key={index}
                      src={org.avatar_url}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: "4px",
                      }}
                      alt={org.login}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
          <div
            style={{
              display: "flex",
              margin: "0 15px 15px 15px",
              gap: "15px",
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#21262d",
                borderRadius: "12px",
                padding: "20px",
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
                GitHub Stats
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "12px" }}>
                    Repositories
                  </span>
                  <span
                    style={{
                      color: "#58a6ff",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.publicRepos}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "12px" }}>
                    Followers
                  </span>
                  <span
                    style={{
                      color: "#f85149",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.followers}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "12px" }}>
                    Following
                  </span>
                  <span
                    style={{
                      color: "#56d364",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.following}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "12px" }}>
                    Total Stars
                  </span>
                  <span
                    style={{
                      color: "#ffa657",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    ⭐ {userData.totalStars}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "12px" }}>
                    Total Forks
                  </span>
                  <span
                    style={{
                      color: "#d2a8ff",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    🍴 {userData.totalForks}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "8px 12px",
                    borderRadius: "6px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "12px" }}>
                    Gists
                  </span>
                  <span
                    style={{
                      color: "#58a6ff",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    📝 {userData.totalGists}
                  </span>
                </div>
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: "#21262d",
                borderRadius: "12px",
                padding: "20px",
                flex: 1,
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
                Top Languages
              </div>
              <div style={{ display: "flex", marginBottom: "20px" }}>
                {userData.topLanguages.length > 0 ? (
                  generateLanguageChart(userData.topLanguages, 250)
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
                  fontSize: "16px",
                  fontWeight: "bold",
                  marginBottom: "15px",
                }}
              >
                Repository Activity
              </div>
              {userData.repos.length > 0 ? (
                generateActivityChart(userData.repos, 250, 80)
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
                background: "#21262d",
                borderRadius: "12px",
                padding: "20px",
                minWidth: "220px",
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
                Recent Activity (30d)
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "8px",
                  marginBottom: "20px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "6px 10px",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "11px" }}>
                    💻 Commits
                  </span>
                  <span
                    style={{
                      color: "#56d364",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.recentCommits}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "6px 10px",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "11px" }}>
                    🔄 Pull Requests
                  </span>
                  <span
                    style={{
                      color: "#58a6ff",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.recentPRs}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: "#161b22",
                    padding: "6px 10px",
                    borderRadius: "4px",
                  }}
                >
                  <span style={{ color: "#7d8590", fontSize: "11px" }}>
                    🐛 Issues
                  </span>
                  <span
                    style={{
                      color: "#f85149",
                      fontSize: "11px",
                      fontWeight: "bold",
                    }}
                  >
                    {userData.recentIssues}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  color: "#f0f6fc",
                  fontSize: "14px",
                  fontWeight: "bold",
                  marginBottom: "10px",
                }}
              >
                Latest Repositories
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "6px",
                }}
              >
                {userData.repos.slice(0, 4).map((repo, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      background: "#161b22",
                      padding: "8px",
                      borderRadius: "4px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        color: "#58a6ff",
                        fontSize: "10px",
                        fontWeight: "bold",
                        marginBottom: "2px",
                      }}
                    >
                      {repo.name.length > 20
                        ? repo.name.substring(0, 20) + "..."
                        : repo.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        color: "#7d8590",
                        fontSize: "8px",
                        marginBottom: "4px",
                      }}
                    >
                      {repo.description && repo.description.length > 30
                        ? repo.description.substring(0, 30) + "..."
                        : (repo.description ?? "No description")}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span style={{ color: "#7d8590", fontSize: "8px" }}>
                        {repo.language ?? "N/A"}
                      </span>
                      <span style={{ color: "#ffa657", fontSize: "8px" }}>
                        ⭐ {repo.stargazers_count ?? 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 700,
      },
    );
  } catch (error) {
    console.error("Error generating image:", error);
    return new Response("Error generating image", { status: 500 });
  }
}
