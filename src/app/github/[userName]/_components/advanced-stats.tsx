import { StatsCard } from "./stats-card";
import { LanguageChart } from "./language-chart";
import { ActivityChart } from "./activity-chart";
import { Flex } from "./flex";
import type { AdvancedStatsData } from "@/types/github";

type Props = {
  userData: AdvancedStatsData;
};

export const AdvancedStats = ({ userData }: Props) => {
  return (
    <Flex tw="flex-col bg-gray-800 rounded-xl p-5 flex-1">
      <Flex tw="text-white text-base font-semibold mb-4">Top Languages</Flex>
      <Flex tw="mb-5">
        {userData.topLanguages.length > 0 ? (
          <LanguageChart languages={userData.topLanguages} width={250} />
        ) : (
          <Flex tw="text-gray-400 text-sm">No language data</Flex>
        )}
      </Flex>
      <Flex tw="text-white text-base font-semibold mb-4">
        Advanced Statistics
      </Flex>
      <Flex tw="flex-col mb-5">
        <StatsCard
          label="Follower-to-Following Ratio"
          value={userData.followerToFollowingRatio.toFixed(2)}
          color="#58a6ff"
        />
        {Object.keys(userData.packageEcosystems).length > 0 && (
          <StatsCard
            label="Package Ecosystems"
            value={Object.keys(userData.packageEcosystems).length}
            color="#f39c12"
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
          color="#56d364"
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
          color="#ffa657"
        />
      </Flex>
      <Flex tw="text-white text-base font-semibold mb-4">
        Repository Activity
      </Flex>
      {userData.repos.length > 0 ? (
        <ActivityChart repos={userData.repos} width={250} height={80} />
      ) : (
        <Flex tw="text-gray-400 text-sm">No activity data</Flex>
      )}
    </Flex>
  );
};
