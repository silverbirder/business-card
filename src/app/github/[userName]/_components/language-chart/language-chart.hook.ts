import { GITHUB_COLORS } from "@/lib/design-token";
import type { SegmentData } from "@/lib/chart-utils";
import { calculatePercentage } from "@/lib/chart-utils";

export type { SegmentData } from "@/lib/chart-utils";

export type LanguageData = {
  language: string;
  count: number;
  percentage: number;
  color: string;
};

export type LanguageChartData = {
  total: number;
  segments: SegmentData[];
  languages: LanguageData[];
};

export type UseLanguageChartProps = {
  languages: [string, number][];
  width?: number;
};

/**
 * 言語バーのセグメントを生成
 */
const generateLanguageSegments = (
  languages: [string, number][],
  total: number,
  width: number,
  colors: readonly string[]
): SegmentData[] => {
  let currentX = 0;
  const barHeight = 8;

  return languages.map(([language, count], index) => {
    const percentage = count / total;
    const segmentWidth = width * percentage;
    const color = colors[index % colors.length]!;

    const segment: SegmentData = {
      key: language,
      x: currentX,
      y: 0,
      width: segmentWidth,
      height: barHeight,
      color,
      rx: index === 0 ? 4 : index === languages.length - 1 ? 4 : 0,
      ry: index === 0 ? 4 : index === languages.length - 1 ? 4 : 0,
    };

    currentX += segmentWidth;
    return segment;
  });
};

/**
 * 表示用の言語データを生成
 */
const generateLanguageData = (
  languages: [string, number][],
  total: number,
  colors: readonly string[]
): LanguageData[] => {
  return languages.slice(0, 3).map(([language, count], index) => ({
    language,
    count,
    percentage: calculatePercentage(count, total),
    color: colors[index % colors.length]!,
  }));
};

/**
 * 言語チャートのデータを生成するカスタムフック
 */
export const useLanguageChart = ({
  languages,
  width = 180,
}: UseLanguageChartProps): LanguageChartData => {
  const total = languages.reduce((sum, [, count]) => sum + count, 0);
  const colors = GITHUB_COLORS.languageChart;

  const segments = generateLanguageSegments(languages, total, width, colors);
  const languageData = generateLanguageData(languages, total, colors);

  return {
    total,
    segments,
    languages: languageData,
  };
};
