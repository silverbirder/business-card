import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  dayOfWeekStats: RecentActivityData["dayOfWeekStats"];
};

export const ActiveDays = ({ dayOfWeekStats }: Props) => {
  return (
    <>
      <Flex tw="text-white text-sm font-normal mb-3">Active Days (Weekly)</Flex>
      <Flex tw="flex-col mb-4">
        {Object.entries(dayOfWeekStats)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([day, count], index) => (
            <Flex
              key={index}
              tw="justify-between bg-gray-900 px-2 py-1 rounded-sm mb-1"
            >
              <span tw="text-gray-400 text-xs font-normal">
                {day.substring(0, 3)}
              </span>
              <span tw="text-green-400 text-xs font-medium">{count}</span>
            </Flex>
          ))}
      </Flex>
    </>
  );
};
