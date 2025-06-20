import type { GitHubRepository } from "@/types/github";
import type { BarData } from "@/lib/chart-utils";

export type { BarData } from "@/lib/chart-utils";

export type ActivityChartData = {
  activities: number[];
  bars: BarData[];
  maxActivity: number;
};

export type UseActivityChartProps = {
  repos: GitHubRepository[];
  width?: number;
  height?: number;
};

/**
 * アクティビティレベルに基づいて色を取得
 */
const getActivityColor = (level: number): string => {
  if (level === 0) return "#161b22";     // none
  if (level <= 3) return "#0e4429";     // low
  if (level <= 6) return "#006d32";     // medium
  if (level <= 8) return "#26a641";     // high
  return "#39d353";                     // highest
};

/**
 * リポジトリから月次のアクティビティデータを計算
 */
const calculateActivities = (repos: GitHubRepository[], months: number): number[] => {
  const activities = Array.from({ length: months }, (_, i) => {
    const recentRepos = repos.filter((repo) => {
      const updatedAt = repo.updated_at ? new Date(repo.updated_at) : null;
      const monthsAgo = new Date();
      monthsAgo.setMonth(monthsAgo.getMonth() - i);
      return updatedAt ? updatedAt > monthsAgo : false;
    });
    return Math.min(recentRepos.length * 2, 10);
  }).reverse();

  return activities;
};

/**
 * アクティビティチャートのデータを生成するカスタムフック
 */
export const useActivityChart = ({
  repos,
  width = 180,
  height = 60,
}: UseActivityChartProps): ActivityChartData => {
  const months = 12;
  const barWidth = (width - (months - 1) * 2) / months;
  const maxHeight = height - 20;

  const activities = calculateActivities(repos, months);
  const maxActivity = Math.max(...activities, 1);

  const bars: BarData[] = activities.map((activity, index) => {
    const barHeight = (activity / maxActivity) * maxHeight;
    const x = index * (barWidth + 2);
    const y = height - barHeight - 10;

    return {
      key: index,
      x,
      y,
      width: barWidth,
      height: barHeight,
      color: getActivityColor(activity),
      rx: 2,
      ry: 2,
    };
  });

  return {
    activities,
    bars,
    maxActivity,
  };
};
