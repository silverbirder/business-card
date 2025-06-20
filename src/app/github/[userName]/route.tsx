/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";
import { type NextRequest } from "next/server";
import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import {
  fetchGitHubUser,
  fetchUserStats,
  fetchUserFollowing,
} from "@/lib/github";
import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";

export const runtime = "edge";

function generateLanguageChart(languages: [string, number][], width = 180) {
  if (languages.length === 0) {
    return null;
  }

  const total = languages.reduce((sum, [, count]) => sum + count, 0);
  const colors = GITHUB_COLORS.languageChart;

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
      <svg
        width={width}
        height={barHeight}
        style={{ marginBottom: SPACING["2xl"] }}
      >
        {bars}
      </svg>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: SPACING.md,
        }}
      >
        {languages.slice(0, 3).map(([language, count], index) => {
          const percentage = Math.round((count / total) * 100);
          return (
            <div
              key={language}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                color: GITHUB_COLORS.text.muted,
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: colors[index % colors.length],
                    borderRadius: RADIUS.full,
                    marginRight: SPACING.md,
                  }}
                />
                <span>{language}</span>
              </div>
              <span
                style={{
                  color: GITHUB_COLORS.text.secondary,
                  fontSize: TYPOGRAPHY.caption.fontSize,
                  fontWeight: TYPOGRAPHY.caption.fontWeight,
                }}
              >
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
          color: GITHUB_COLORS.text.muted,
          fontSize: TYPOGRAPHY.bodySmall.fontSize,
          fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
          marginBottom: SPACING.lg,
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
            if (level === 0) return GITHUB_COLORS.activity.none;
            if (level <= 3) return GITHUB_COLORS.activity.low;
            if (level <= 6) return GITHUB_COLORS.activity.medium;
            if (level <= 8) return GITHUB_COLORS.activity.high;
            return GITHUB_COLORS.activity.highest;
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
    starred: userStats.starred,
    starredCount: userStats.starredCount,
    starredLanguageStats: userStats.starredLanguageStats,
    subscriptions: userStats.subscriptions,
    subscriptionsCount: userStats.subscriptionsCount,
    receivedEvents: userStats.receivedEvents,
    publicKeys: userStats.publicKeys,
    publicKeysCount: userStats.publicKeysCount,
    gpgKeys: userStats.gpgKeys,
    gpgKeysCount: userStats.gpgKeysCount,
    socialAccounts: userStats.socialAccounts,
    yearlyCommits: userStats.yearlyCommits,
    eventTypeStats: userStats.eventTypeStats,
    followersData: userStats.followers,
    followersCount: userStats.followersCount,
    receivedPublicEvents: userStats.receivedPublicEvents,
    receivedPublicEventsCount: userStats.receivedPublicEventsCount,
    sshSigningKeys: userStats.sshSigningKeys,
    sshSigningKeysCount: userStats.sshSigningKeysCount,
    packages: userStats.packages,
    packagesCount: userStats.packagesCount,
    followingCount: userStats.followingCount,
    followerToFollowingRatio: userStats.followerToFollowingRatio,
    dayOfWeekStats: userStats.dayOfWeekStats,
    monthlyActivity: userStats.monthlyActivity,
    packageEcosystems: userStats.packageEcosystems,
    createdAt: gitHubUser.created_at,
    updatedAt: gitHubUser.updated_at,
    type: gitHubUser.type,
    siteAdmin: gitHubUser.site_admin,
    publicGists: gitHubUser.public_gists,
    hireable: gitHubUser.hireable,
    twitterUsername: gitHubUser.twitter_username,
    gravatarId: gitHubUser.gravatar_id,
  };

  try {
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            background: GITHUB_COLORS.background.primary,
            fontFamily: "Inter",
            flexDirection: "column",
          }}
        >
          <div
            style={{
              display: "flex",
              background: GITHUB_COLORS.background.secondary,
              margin: SPACING["3xl"],
              marginBottom: SPACING.lg,
              borderRadius: RADIUS.xl,
              padding: SPACING["4xl"],
              alignItems: "center",
            }}
          >
            <img
              src={userData.avatar}
              style={{
                width: "80px",
                height: "80px",
                borderRadius: RADIUS.full,
                marginRight: SPACING["4xl"],
              }}
              alt="User Avatar"
            />
            <div style={{ display: "flex", flexDirection: "column", flex: 1 }}>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.h1.fontSize,
                  fontWeight: TYPOGRAPHY.h1.fontWeight,
                }}
              >
                {userData.name}
              </div>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.muted,
                  fontSize: TYPOGRAPHY.h4.fontSize,
                  fontWeight: TYPOGRAPHY.h4.fontWeight,
                  marginBottom: SPACING.lg,
                }}
              >
                @{userData.username}
              </div>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.secondary,
                  fontSize: TYPOGRAPHY.body.fontSize,
                  fontWeight: TYPOGRAPHY.body.fontWeight,
                  marginBottom: SPACING.lg,
                }}
              >
                {userData.bio}
              </div>
              <div style={{ display: "flex", gap: SPACING["4xl"] }}>
                {userData.location && (
                  <div
                    style={{
                      display: "flex",
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
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
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                      alignItems: "center",
                    }}
                  >
                    🏢 {userData.company}
                  </div>
                )}
                {userData.twitterUsername && (
                  <div
                    style={{
                      display: "flex",
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                      alignItems: "center",
                    }}
                  >
                    🐦 @{userData.twitterUsername}
                  </div>
                )}
                {userData.hireable && (
                  <div
                    style={{
                      display: "flex",
                      color: GITHUB_COLORS.accent.green,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                      alignItems: "center",
                    }}
                  >
                    💼 Available for hire
                  </div>
                )}
              </div>
              {userData.socialAccounts &&
                userData.socialAccounts.length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      marginTop: SPACING.lg,
                      gap: SPACING.xl,
                    }}
                  >
                    {userData.socialAccounts
                      .slice(0, 3)
                      .map((account, index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            color: GITHUB_COLORS.accent.blue,
                            fontSize: TYPOGRAPHY.bodySmall.fontSize,
                            fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                            alignItems: "center",
                          }}
                        >
                          🔗 {account.provider}
                        </div>
                      ))}
                  </div>
                )}
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
                    color: GITHUB_COLORS.text.primary,
                    fontSize: TYPOGRAPHY.bodySmall.fontSize,
                    fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    marginBottom: SPACING.lg,
                  }}
                >
                  Organizations
                </div>
                <div style={{ display: "flex", gap: SPACING.sm }}>
                  {userData.organizations.slice(0, 3).map((org, index) => (
                    <img
                      key={index}
                      src={org.avatar_url}
                      style={{
                        width: "24px",
                        height: "24px",
                        borderRadius: RADIUS.sm,
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
              margin: `0 ${SPACING["3xl"]} ${SPACING["3xl"]} ${SPACING["3xl"]}`,
              gap: SPACING["3xl"],
              flex: 1,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: GITHUB_COLORS.background.secondary,
                borderRadius: RADIUS.xl,
                padding: SPACING["4xl"],
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.h4.fontSize,
                  fontWeight: TYPOGRAPHY.h4.fontWeight,
                  marginBottom: SPACING["3xl"],
                }}
              >
                GitHub Stats
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.lg,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Repositories
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.blue,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {userData.publicRepos}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Followers
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.red,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {userData.followers}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Following
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.green,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {userData.following}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Total Stars
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.orange,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    ⭐ {userData.totalStars}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Total Forks
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.purple,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    🍴 {userData.totalForks}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Gists
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.blue,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    📝 {userData.totalGists}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Starred
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.yellow,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    ⭐ {userData.starredCount}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Watching
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.lightBlue,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    👁️ {userData.subscriptionsCount}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    SSH Keys
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.darkPurple,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    🔑 {userData.publicKeysCount}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    GPG Keys
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.darkOrange,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    🛡️ {userData.gpgKeysCount}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    SSH Signing Keys
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.darkPurple,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    🔐 {userData.sshSigningKeysCount}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Packages
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.darkYellow,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    📦 {userData.packagesCount}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Following/Followers
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.darkRed,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    📊 {userData.followerToFollowingRatio.toFixed(1)}
                  </span>
                </div>
                {userData.createdAt && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: GITHUB_COLORS.background.tertiary,
                      padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                      borderRadius: RADIUS.md,
                    }}
                  >
                    <span
                      style={{
                        color: GITHUB_COLORS.text.muted,
                        fontSize: TYPOGRAPHY.bodySmall.fontSize,
                        fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                      }}
                    >
                      Member Since
                    </span>
                    <span
                      style={{
                        color: GITHUB_COLORS.accent.darkGreen,
                        fontSize: TYPOGRAPHY.bodySmall.fontSize,
                        fontWeight: TYPOGRAPHY.label.fontWeight,
                      }}
                    >
                      {new Date(userData.createdAt).getFullYear()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                background: GITHUB_COLORS.background.secondary,
                borderRadius: RADIUS.xl,
                padding: SPACING["4xl"],
                flex: 1,
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.h4.fontSize,
                  fontWeight: TYPOGRAPHY.h4.fontWeight,
                  marginBottom: SPACING["3xl"],
                }}
              >
                Top Languages
              </div>
              <div style={{ display: "flex", marginBottom: SPACING["4xl"] }}>
                {userData.topLanguages.length > 0 ? (
                  generateLanguageChart(userData.topLanguages, 250)
                ) : (
                  <div
                    style={{
                      display: "flex",
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    No language data
                  </div>
                )}
              </div>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.h4.fontSize,
                  fontWeight: TYPOGRAPHY.h4.fontWeight,
                  marginBottom: SPACING["3xl"],
                }}
              >
                Advanced Statistics
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.lg,
                  marginBottom: SPACING["4xl"],
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Follower-to-Following Ratio
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.blue,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {userData.followerToFollowingRatio.toFixed(2)}
                  </span>
                </div>
                {Object.keys(userData.packageEcosystems).length > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      background: GITHUB_COLORS.background.tertiary,
                      padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                      borderRadius: RADIUS.md,
                    }}
                  >
                    <span
                      style={{
                        color: GITHUB_COLORS.text.muted,
                        fontSize: TYPOGRAPHY.bodySmall.fontSize,
                        fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                      }}
                    >
                      Package Ecosystems
                    </span>
                    <span
                      style={{
                        color: GITHUB_COLORS.accent.darkYellow,
                        fontSize: TYPOGRAPHY.bodySmall.fontSize,
                        fontWeight: TYPOGRAPHY.label.fontWeight,
                      }}
                    >
                      {Object.keys(userData.packageEcosystems).length}
                    </span>
                  </div>
                )}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Most Active Day
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.green,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {Object.entries(userData.dayOfWeekStats).length > 0
                      ? (Object.entries(userData.dayOfWeekStats)
                          .sort(([, a], [, b]) => b - a)[0]?.[0]
                          ?.substring(0, 3) ?? "N/A")
                      : "N/A"}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.lg} ${SPACING["2xl"]}`,
                    borderRadius: RADIUS.md,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                    }}
                  >
                    Peak Activity Month
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.orange,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {Object.entries(userData.monthlyActivity).length > 0
                      ? (Object.entries(userData.monthlyActivity).sort(
                          ([, a], [, b]) => b - a,
                        )[0]?.[0] ?? "N/A")
                      : "N/A"}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.h4.fontSize,
                  fontWeight: TYPOGRAPHY.h4.fontWeight,
                  marginBottom: SPACING["3xl"],
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
                    color: GITHUB_COLORS.text.muted,
                    fontSize: TYPOGRAPHY.bodySmall.fontSize,
                    fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
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
                background: GITHUB_COLORS.background.secondary,
                borderRadius: RADIUS.xl,
                padding: SPACING["4xl"],
                minWidth: "220px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.h4.fontSize,
                  fontWeight: TYPOGRAPHY.h4.fontWeight,
                  marginBottom: SPACING["3xl"],
                }}
              >
                Recent Activity (30d)
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.lg,
                  marginBottom: SPACING["4xl"],
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.md} ${SPACING.xl}`,
                    borderRadius: RADIUS.sm,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.caption.fontSize,
                      fontWeight: TYPOGRAPHY.caption.fontWeight,
                    }}
                  >
                    💻 Commits
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.green,
                      fontSize: TYPOGRAPHY.caption.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {userData.recentCommits}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.md} ${SPACING.xl}`,
                    borderRadius: RADIUS.sm,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.caption.fontSize,
                      fontWeight: TYPOGRAPHY.caption.fontWeight,
                    }}
                  >
                    🔄 Pull Requests
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.blue,
                      fontSize: TYPOGRAPHY.caption.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {userData.recentPRs}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    background: GITHUB_COLORS.background.tertiary,
                    padding: `${SPACING.md} ${SPACING.xl}`,
                    borderRadius: RADIUS.sm,
                  }}
                >
                  <span
                    style={{
                      color: GITHUB_COLORS.text.muted,
                      fontSize: TYPOGRAPHY.caption.fontSize,
                      fontWeight: TYPOGRAPHY.caption.fontWeight,
                    }}
                  >
                    🐛 Issues
                  </span>
                  <span
                    style={{
                      color: GITHUB_COLORS.accent.red,
                      fontSize: TYPOGRAPHY.caption.fontSize,
                      fontWeight: TYPOGRAPHY.label.fontWeight,
                    }}
                  >
                    {userData.recentIssues}
                  </span>
                </div>
              </div>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.body.fontSize,
                  fontWeight: TYPOGRAPHY.body.fontWeight,
                  marginBottom: SPACING["2xl"],
                }}
              >
                Activity Types (Recent)
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.sm,
                  marginBottom: SPACING["3xl"],
                }}
              >
                {Object.entries(userData.eventTypeStats)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 5)
                  .map(([eventType, count], index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: GITHUB_COLORS.background.tertiary,
                        padding: `${SPACING.sm} ${SPACING.lg}`,
                        borderRadius: RADIUS.xs,
                      }}
                    >
                      <span
                        style={{
                          color: GITHUB_COLORS.text.muted,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.caption.fontWeight,
                        }}
                      >
                        {eventType.replace("Event", "")}
                      </span>
                      <span
                        style={{
                          color: GITHUB_COLORS.accent.blue,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.label.fontWeight,
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.body.fontSize,
                  fontWeight: TYPOGRAPHY.body.fontWeight,
                  marginBottom: SPACING["2xl"],
                }}
              >
                Active Days (Weekly)
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.sm,
                  marginBottom: SPACING["3xl"],
                }}
              >
                {Object.entries(userData.dayOfWeekStats)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 3)
                  .map(([day, count], index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: GITHUB_COLORS.background.tertiary,
                        padding: `${SPACING.sm} ${SPACING.lg}`,
                        borderRadius: RADIUS.xs,
                      }}
                    >
                      <span
                        style={{
                          color: GITHUB_COLORS.text.muted,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.caption.fontWeight,
                        }}
                      >
                        {day.substring(0, 3)}
                      </span>
                      <span
                        style={{
                          color: GITHUB_COLORS.accent.green,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.label.fontWeight,
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.body.fontSize,
                  fontWeight: TYPOGRAPHY.body.fontWeight,
                  marginBottom: SPACING["2xl"],
                }}
              >
                Top Active Months
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.sm,
                  marginBottom: SPACING["3xl"],
                }}
              >
                {Object.entries(userData.monthlyActivity)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 3)
                  .map(([month, count], index) => (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        background: GITHUB_COLORS.background.tertiary,
                        padding: `${SPACING.sm} ${SPACING.lg}`,
                        borderRadius: RADIUS.xs,
                      }}
                    >
                      <span
                        style={{
                          color: GITHUB_COLORS.text.muted,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.caption.fontWeight,
                        }}
                      >
                        {month}
                      </span>
                      <span
                        style={{
                          color: GITHUB_COLORS.accent.orange,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.label.fontWeight,
                        }}
                      >
                        {count}
                      </span>
                    </div>
                  ))}
              </div>
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.body.fontSize,
                  fontWeight: TYPOGRAPHY.body.fontWeight,
                  marginBottom: SPACING["2xl"],
                }}
              >
                Latest Repositories
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.md,
                  marginBottom: SPACING["3xl"],
                }}
              >
                {userData.repos.slice(0, 3).map((repo, index) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      background: GITHUB_COLORS.background.tertiary,
                      padding: SPACING.lg,
                      borderRadius: RADIUS.sm,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        color: GITHUB_COLORS.accent.blue,
                        fontSize: TYPOGRAPHY.bodySmall.fontSize,
                        fontWeight: TYPOGRAPHY.label.fontWeight,
                        marginBottom: SPACING.xs,
                      }}
                    >
                      {repo.name.length > 18
                        ? repo.name.substring(0, 18) + "..."
                        : repo.name}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        color: GITHUB_COLORS.text.muted,
                        fontSize: TYPOGRAPHY.caption.fontSize,
                        fontWeight: TYPOGRAPHY.caption.fontWeight,
                        marginBottom: SPACING.sm,
                      }}
                    >
                      {repo.description && repo.description.length > 25
                        ? repo.description.substring(0, 25) + "..."
                        : (repo.description ?? "No description")}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          color: GITHUB_COLORS.text.muted,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.caption.fontWeight,
                        }}
                      >
                        {repo.language ?? "N/A"}
                      </span>
                      <span
                        style={{
                          color: GITHUB_COLORS.accent.orange,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.caption.fontWeight,
                        }}
                      >
                        ⭐ {repo.stargazers_count ?? 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              {userData.packagesCount > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      color: GITHUB_COLORS.text.primary,
                      fontSize: TYPOGRAPHY.body.fontSize,
                      fontWeight: TYPOGRAPHY.body.fontWeight,
                      marginBottom: SPACING["2xl"],
                    }}
                  >
                    Package Ecosystems
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: SPACING.sm,
                      marginBottom: SPACING["3xl"],
                    }}
                  >
                    {Object.entries(userData.packageEcosystems)
                      .sort(([, a], [, b]) => b - a)
                      .slice(0, 3)
                      .map(([ecosystem, count], index) => (
                        <div
                          key={index}
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            background: GITHUB_COLORS.background.tertiary,
                            padding: `${SPACING.sm} ${SPACING.lg}`,
                            borderRadius: RADIUS.xs,
                          }}
                        >
                          <span
                            style={{
                              color: GITHUB_COLORS.text.muted,
                              fontSize: TYPOGRAPHY.caption.fontSize,
                              fontWeight: TYPOGRAPHY.caption.fontWeight,
                            }}
                          >
                            📦 {ecosystem}
                          </span>
                          <span
                            style={{
                              color: GITHUB_COLORS.accent.darkYellow,
                              fontSize: TYPOGRAPHY.caption.fontSize,
                              fontWeight: TYPOGRAPHY.label.fontWeight,
                            }}
                          >
                            {count}
                          </span>
                        </div>
                      ))}
                  </div>
                </>
              )}
              <div
                style={{
                  display: "flex",
                  color: GITHUB_COLORS.text.primary,
                  fontSize: TYPOGRAPHY.body.fontSize,
                  fontWeight: TYPOGRAPHY.body.fontWeight,
                  marginBottom: SPACING["2xl"],
                }}
              >
                Recently Starred
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: SPACING.md,
                }}
              >
                {userData.starred.slice(0, 2).map((starredItem, index) => {
                  const repo =
                    "repo" in starredItem ? starredItem.repo : starredItem;
                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        background: GITHUB_COLORS.background.tertiary,
                        padding: SPACING.md,
                        borderRadius: RADIUS.sm,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          color: GITHUB_COLORS.accent.yellow,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.label.fontWeight,
                          marginBottom: SPACING.xs,
                        }}
                      >
                        {repo.name.length > 18
                          ? repo.name.substring(0, 18) + "..."
                          : repo.name}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          color: GITHUB_COLORS.text.muted,
                          fontSize: TYPOGRAPHY.caption.fontSize,
                          fontWeight: TYPOGRAPHY.caption.fontWeight,
                          marginBottom: SPACING.xs,
                        }}
                      >
                        {repo.description && repo.description.length > 25
                          ? repo.description.substring(0, 25) + "..."
                          : (repo.description ?? "No description")}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span
                          style={{
                            color: GITHUB_COLORS.text.muted,
                            fontSize: TYPOGRAPHY.caption.fontSize,
                            fontWeight: TYPOGRAPHY.caption.fontWeight,
                          }}
                        >
                          {repo.language ?? "N/A"}
                        </span>
                        <span
                          style={{
                            color: GITHUB_COLORS.accent.orange,
                            fontSize: TYPOGRAPHY.caption.fontSize,
                            fontWeight: TYPOGRAPHY.caption.fontWeight,
                          }}
                        >
                          ⭐ {repo.stargazers_count ?? 0}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              {userData.receivedPublicEventsCount > 0 && (
                <>
                  <div
                    style={{
                      display: "flex",
                      color: GITHUB_COLORS.text.primary,
                      fontSize: TYPOGRAPHY.bodySmall.fontSize,
                      fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                      marginTop: SPACING["3xl"],
                      marginBottom: SPACING.lg,
                    }}
                  >
                    Recent Public Events ({userData.receivedPublicEventsCount})
                  </div>
                  <div
                    style={{
                      display: "flex",
                      background: GITHUB_COLORS.background.tertiary,
                      padding: `${SPACING.md} ${SPACING.lg}`,
                      borderRadius: RADIUS.sm,
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        color: GITHUB_COLORS.text.muted,
                        fontSize: TYPOGRAPHY.caption.fontSize,
                        fontWeight: TYPOGRAPHY.caption.fontWeight,
                      }}
                    >
                      📡 Monitoring activity
                    </span>
                  </div>
                </>
              )}
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
