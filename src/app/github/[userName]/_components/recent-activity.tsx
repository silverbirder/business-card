import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";

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
    <Flex
      style={{
        flexDirection: "column",
        background: GITHUB_COLORS.background.secondary,
        borderRadius: RADIUS.xl,
        padding: SPACING["4xl"],
        minWidth: "220px",
      }}
    >
      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.h4.fontSize,
          fontWeight: TYPOGRAPHY.h4.fontWeight,
          marginBottom: SPACING["3xl"],
        }}
      >
        Recent Activity (30d)
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.lg,
          marginBottom: SPACING["4xl"],
        }}
      >
        <Flex
          style={{
            justifyContent: "space-between",
            background: GITHUB_COLORS.background.tertiary,
            padding: `${SPACING.md} ${SPACING.xl}`,
            borderRadius: RADIUS.sm,
          }}
        >
          <Flex
            style={{
              color: GITHUB_COLORS.text.muted,
              fontSize: TYPOGRAPHY.caption.fontSize,
              fontWeight: TYPOGRAPHY.caption.fontWeight,
            }}
          >
            💻 Commits
          </Flex>
          <Flex
            style={{
              color: GITHUB_COLORS.accent.green,
              fontSize: TYPOGRAPHY.caption.fontSize,
              fontWeight: TYPOGRAPHY.label.fontWeight,
            }}
          >
            {userData.recentCommits}
          </Flex>
        </Flex>
        <Flex
          style={{
            justifyContent: "space-between",
            background: GITHUB_COLORS.background.tertiary,
            padding: `${SPACING.md} ${SPACING.xl}`,
            borderRadius: RADIUS.sm,
          }}
        >
          <Flex
            style={{
              color: GITHUB_COLORS.text.muted,
              fontSize: TYPOGRAPHY.caption.fontSize,
              fontWeight: TYPOGRAPHY.caption.fontWeight,
            }}
          >
            🔄 Pull Requests
          </Flex>
          <Flex
            style={{
              color: GITHUB_COLORS.accent.blue,
              fontSize: TYPOGRAPHY.caption.fontSize,
              fontWeight: TYPOGRAPHY.label.fontWeight,
            }}
          >
            {userData.recentPRs}
          </Flex>
        </Flex>
        <Flex
          style={{
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
        </Flex>
      </Flex>

      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.body.fontSize,
          fontWeight: TYPOGRAPHY.body.fontWeight,
          marginBottom: SPACING["2xl"],
        }}
      >
        Activity Types (Recent)
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.sm,
          marginBottom: SPACING["3xl"],
        }}
      >
        {Object.entries(userData.eventTypeStats)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([eventType, count], index) => (
            <Flex
              key={index}
              style={{
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
            </Flex>
          ))}
      </Flex>
      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.body.fontSize,
          fontWeight: TYPOGRAPHY.body.fontWeight,
          marginBottom: SPACING["2xl"],
        }}
      >
        Active Days (Weekly)
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.sm,
          marginBottom: SPACING["3xl"],
        }}
      >
        {Object.entries(userData.dayOfWeekStats)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([day, count], index) => (
            <Flex
              key={index}
              style={{
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
            </Flex>
          ))}
      </Flex>
      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.body.fontSize,
          fontWeight: TYPOGRAPHY.body.fontWeight,
          marginBottom: SPACING["2xl"],
        }}
      >
        Top Active Months
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.sm,
          marginBottom: SPACING["3xl"],
        }}
      >
        {Object.entries(userData.monthlyActivity)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([month, count], index) => (
            <Flex
              key={index}
              style={{
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
            </Flex>
          ))}
      </Flex>

      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.body.fontSize,
          fontWeight: TYPOGRAPHY.body.fontWeight,
          marginBottom: SPACING["2xl"],
        }}
      >
        Latest Repositories
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.md,
          marginBottom: SPACING["3xl"],
        }}
      >
        {userData.repos.slice(0, 3).map((repo, index) => (
          <Flex
            key={index}
            style={{
              flexDirection: "column",
              background: GITHUB_COLORS.background.tertiary,
              padding: SPACING.lg,
              borderRadius: RADIUS.sm,
            }}
          >
            <Flex
              style={{
                color: GITHUB_COLORS.accent.blue,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.label.fontWeight,
                marginBottom: SPACING.xs,
              }}
            >
              {repo.name.length > 18
                ? repo.name.substring(0, 18) + "..."
                : repo.name}
            </Flex>
            <Flex
              style={{
                color: GITHUB_COLORS.text.muted,
                fontSize: TYPOGRAPHY.caption.fontSize,
                fontWeight: TYPOGRAPHY.caption.fontWeight,
                marginBottom: SPACING.sm,
              }}
            >
              {repo.description && repo.description.length > 25
                ? repo.description.substring(0, 25) + "..."
                : (repo.description ?? "No description")}
            </Flex>
            <Flex
              style={{
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
            </Flex>
          </Flex>
        ))}
      </Flex>

      {userData.packagesCount > 0 && (
        <>
          <Flex
            style={{
              color: GITHUB_COLORS.text.primary,
              fontSize: TYPOGRAPHY.body.fontSize,
              fontWeight: TYPOGRAPHY.body.fontWeight,
              marginBottom: SPACING["2xl"],
            }}
          >
            Package Ecosystems
          </Flex>
          <Flex
            style={{
              flexDirection: "column",
              gap: SPACING.sm,
              marginBottom: SPACING["3xl"],
            }}
          >
            {Object.entries(userData.packageEcosystems)
              .sort(([, a], [, b]) => b - a)
              .slice(0, 3)
              .map(([ecosystem, count], index) => (
                <Flex
                  key={index}
                  style={{
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
                </Flex>
              ))}
          </Flex>
        </>
      )}

      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.body.fontSize,
          fontWeight: TYPOGRAPHY.body.fontWeight,
          marginBottom: SPACING["2xl"],
        }}
      >
        Recently Starred
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.md,
        }}
      >
        {userData.starred.slice(0, 2).map((starredItem, index) => {
          const repo = "repo" in starredItem ? starredItem.repo : starredItem;
          return (
            <Flex
              key={index}
              style={{
                flexDirection: "column",
                background: GITHUB_COLORS.background.tertiary,
                padding: SPACING.md,
                borderRadius: RADIUS.sm,
              }}
            >
              <Flex
                style={{
                  color: GITHUB_COLORS.accent.yellow,
                  fontSize: TYPOGRAPHY.caption.fontSize,
                  fontWeight: TYPOGRAPHY.label.fontWeight,
                  marginBottom: SPACING.xs,
                }}
              >
                {repo.name.length > 18
                  ? repo.name.substring(0, 18) + "..."
                  : repo.name}
              </Flex>
              <Flex
                style={{
                  color: GITHUB_COLORS.text.muted,
                  fontSize: TYPOGRAPHY.caption.fontSize,
                  fontWeight: TYPOGRAPHY.caption.fontWeight,
                  marginBottom: SPACING.xs,
                }}
              >
                {repo.description && repo.description.length > 25
                  ? repo.description.substring(0, 25) + "..."
                  : (repo.description ?? "No description")}
              </Flex>
              <Flex
                style={{
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
              </Flex>
            </Flex>
          );
        })}
      </Flex>

      {userData.receivedPublicEventsCount > 0 && (
        <>
          <Flex
            style={{
              color: GITHUB_COLORS.text.primary,
              fontSize: TYPOGRAPHY.bodySmall.fontSize,
              fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
              marginTop: SPACING["3xl"],
              marginBottom: SPACING.lg,
            }}
          >
            Recent Public Events ({userData.receivedPublicEventsCount})
          </Flex>
          <Flex
            style={{
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
          </Flex>
        </>
      )}
    </Flex>
  );
}
