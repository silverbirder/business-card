/**
 * チャート関連の共通ユーティリティ
 */

export type ChartDimensions = {
  width: number;
  height: number;
};

export type BarData = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  key: string | number;
  rx?: number;
  ry?: number;
};

export type SegmentData = {
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  key: string;
  rx?: number;
  ry?: number;
};

/**
 * パーセンテージを計算する
 */
export const calculatePercentage = (value: number, total: number): number => {
  return Math.round((value / total) * 100);
};

/**
 * 配列の最大値を取得（最小値を保証）
 */
export const getMaxValue = (values: number[], minValue = 1): number => {
  return Math.max(...values, minValue);
};
