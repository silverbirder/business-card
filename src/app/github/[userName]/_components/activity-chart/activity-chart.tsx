import { GITHUB_COLORS, SPACING, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "../flex";
import type { GitHubRepository } from "@/types/github";
import { useActivityChart } from "./use-activity-chart";

type Props = {
  repos: GitHubRepository[];
  width?: number;
  height?: number;
};

export const ActivityChart = ({ repos, width = 180, height = 60 }: Props) => {
  if (repos.length === 0) {
    return null;
  }

  const { bars } = useActivityChart({ repos, width, height });

  return (
    <Flex style={{ flexDirection: "column" }}>
      <Flex
        style={{
          color: GITHUB_COLORS.text.muted,
          fontSize: TYPOGRAPHY.bodySmall.fontSize,
          fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
          marginBottom: SPACING.lg,
        }}
      >
        Activity (12 months)
      </Flex>
      <svg width={width} height={height}>
        {bars.map((bar) => (
          <rect
            key={bar.key}
            x={bar.x}
            y={bar.y}
            width={bar.width}
            height={bar.height}
            fill={bar.color}
            rx={bar.rx}
            ry={bar.ry}
          />
        ))}
      </svg>
    </Flex>
  );
};
