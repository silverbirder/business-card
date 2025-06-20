import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";

interface RecentActivityData {
  recentCommits: number;
  recentPRs: number;
  recentIssues: number;
  eventTypeStats: Record<string, number>;
  dayOfWeekStats: Record<string, number>;
  monthlyActivity: Record<string, number>;
  repos: RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"];
  packagesCount: number;
  packageEcosystems: Record<string, number>;
  starred: Array<
    RestEndpointMethodTypes["activity"]["listReposStarredByUser"]["response"]["data"][number]
  >;
  receivedPublicEventsCount: number;
}

interface RecentActivityProps {
  userData: RecentActivityData;
}

export function RecentActivity({ userData }: RecentActivityProps) {
  return (
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
          const repo = "repo" in starredItem ? starredItem.repo : starredItem;
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
  );
}
