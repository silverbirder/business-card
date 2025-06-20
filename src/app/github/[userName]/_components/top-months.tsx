import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  monthlyActivity: RecentActivityData["monthlyActivity"];
};

export const TopMonths = ({ monthlyActivity }: Props) => {
  return (
    <>
      <Flex tw="text-white text-sm font-normal mb-3">Top Active Months</Flex>
      <Flex tw="flex-col mb-4">
        {Object.entries(monthlyActivity)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([month, count], index) => (
            <Flex
              key={index}
              tw="justify-between bg-gray-900 px-2 py-1 rounded-sm mb-1"
            >
              <span tw="text-gray-400 text-xs font-normal">{month}</span>
              <span tw="text-orange-400 text-xs font-medium">{count}</span>
            </Flex>
          ))}
      </Flex>
    </>
  );
};
