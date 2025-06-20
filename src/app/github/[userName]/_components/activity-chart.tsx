import type { RestEndpointMethodTypes } from "@octokit/plugin-rest-endpoint-methods";
import { GITHUB_COLORS, SPACING, TYPOGRAPHY } from "@/lib/design-token";

interface ActivityChartProps {
  repos: RestEndpointMethodTypes["repos"]["listForUser"]["response"]["data"];
  width?: number;
  height?: number;
}

export function ActivityChart({ repos, width = 180, height = 60 }: ActivityChartProps) {
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

  const getColor = (level: number) => {
    if (level === 0) return GITHUB_COLORS.activity.none;
    if (level <= 3) return GITHUB_COLORS.activity.low;
    if (level <= 6) return GITHUB_COLORS.activity.medium;
    if (level <= 8) return GITHUB_COLORS.activity.high;
    return GITHUB_COLORS.activity.highest;
  };

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
