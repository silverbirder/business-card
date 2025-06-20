import { Flex } from "../flex";
import type { GitHubRepository } from "@/types/github";
import { useActivityChart } from "./activity-chart.hook";

type Props = {
  repos: GitHubRepository[];
  width?: number;
  height?: number;
};

export const ActivityChart = ({ repos, width = 180, height = 60 }: Props) => {
  const { bars } = useActivityChart({ repos, width, height });
  if (repos.length === 0) {
    return null;
  }

  return (
    <Flex tw="flex-col">
      <Flex tw="text-gray-400 text-sm font-normal mb-2">
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
