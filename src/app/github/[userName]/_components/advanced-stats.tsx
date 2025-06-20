import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { StatsCard } from "./stats-card";
import { LanguageChart } from "./language-chart";
import { ActivityChart } from "./activity-chart";

interface AdvancedStatsData {
  topLanguages: [string, number][];
  followerToFollowingRatio: number;
  packageEcosystems: Record<string, number>;
  dayOfWeekStats: Record<string, number>;
  monthlyActivity: Record<string, number>;
  repos: RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"];
}

interface AdvancedStatsProps {
  userData: AdvancedStatsData;
}

export function AdvancedStats({ userData }: AdvancedStatsProps) {
  return (
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
          <LanguageChart languages={userData.topLanguages} width={250} />
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
        <StatsCard
          label="Follower-to-Following Ratio"
          value={userData.followerToFollowingRatio.toFixed(2)}
          color={GITHUB_COLORS.accent.blue}
        />
        {Object.keys(userData.packageEcosystems).length > 0 && (
          <StatsCard
            label="Package Ecosystems"
            value={Object.keys(userData.packageEcosystems).length}
            color={GITHUB_COLORS.accent.darkYellow}
          />
        )}
        <StatsCard
          label="Most Active Day"
          value={
            Object.entries(userData.dayOfWeekStats).length > 0
              ? (Object.entries(userData.dayOfWeekStats)
                  .sort(([, a], [, b]) => b - a)[0]?.[0]
                  ?.substring(0, 3) ?? "N/A")
              : "N/A"
          }
          color={GITHUB_COLORS.accent.green}
        />
        <StatsCard
          label="Peak Activity Month"
          value={
            Object.entries(userData.monthlyActivity).length > 0
              ? (Object.entries(userData.monthlyActivity).sort(
                  ([, a], [, b]) => b - a,
                )[0]?.[0] ?? "N/A")
              : "N/A"
          }
          color={GITHUB_COLORS.accent.orange}
        />
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
        <ActivityChart repos={userData.repos} width={250} height={80} />
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
  );
}
