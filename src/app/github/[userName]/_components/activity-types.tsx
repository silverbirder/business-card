import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  eventTypeStats: RecentActivityData["eventTypeStats"];
};

export const ActivityTypes = ({ eventTypeStats }: Props) => {
  return (
    <>
      <Flex tw="text-white text-sm font-normal mb-3">
        Activity Types (Recent)
      </Flex>
      <Flex tw="flex-col mb-4">
        {Object.entries(eventTypeStats)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 5)
          .map(([eventType, count], index) => (
            <Flex
              key={index}
              tw="justify-between bg-gray-900 px-2 py-1 rounded-sm mb-1"
            >
              <span tw="text-gray-400 text-xs font-normal">
                {eventType.replace("Event", "")}
              </span>
              <span tw="text-blue-400 text-xs font-medium">{count}</span>
            </Flex>
          ))}
      </Flex>
    </>
  );
};
