import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";

interface LanguageChartProps {
  languages: [string, number][];
  width?: number;
}

export function LanguageChart({ languages, width = 180 }: LanguageChartProps) {
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
    <Flex style={{ flexDirection: "column" }}>
      <svg
        width={width}
        height={barHeight}
        style={{ marginBottom: SPACING["2xl"] }}
      >
        {bars}
      </svg>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.md,
        }}
      >
        {languages.slice(0, 3).map(([language, count], index) => {
          const percentage = Math.round((count / total) * 100);
          return (
            <Flex
              key={language}
              style={{
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
                color: GITHUB_COLORS.text.muted,
              }}
            >
              <Flex style={{ alignItems: "center" }}>
                <div
                  style={{
                    width: "8px",
                    height: "8px",
                    backgroundColor: colors[index % colors.length],
                    borderRadius: RADIUS.full,
                    marginRight: SPACING.md,
                  }}
                />
                <Flex
                  style={{
                  }}
                >
                  {language}
                </Flex>
              </Flex>
              <Flex
                style={{
                  color: GITHUB_COLORS.text.secondary,
                  fontSize: TYPOGRAPHY.caption.fontSize,
                  fontWeight: TYPOGRAPHY.caption.fontWeight,
                }}
              >
                {percentage}%
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </Flex>
  );
}
