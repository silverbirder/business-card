import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  userData: Pick<
    RecentActivityData,
    "recentCommits" | "recentPRs" | "recentIssues"
  >;
};

export const ActivityStats = ({ userData }: Props) => {
  return (
    <Flex tw="flex-col mb-5">
      <Flex tw="justify-between bg-gray-900 px-3 py-2 rounded mb-2">
        <span tw="text-gray-400 text-xs font-normal">💻 Commits</span>
        <span tw="text-green-400 text-xs font-medium">
          {userData.recentCommits}
        </span>
      </Flex>
      <Flex tw="justify-between bg-gray-900 px-3 py-2 rounded mb-2">
        <span tw="text-gray-400 text-xs font-normal">🔄 Pull Requests</span>
        <span tw="text-blue-400 text-xs font-medium">{userData.recentPRs}</span>
      </Flex>
      <Flex tw="justify-between bg-gray-900 px-3 py-2 rounded">
        <span tw="text-gray-400 text-xs font-normal">🐛 Issues</span>
        <span tw="text-red-400 text-xs font-medium">
          {userData.recentIssues}
        </span>
      </Flex>
    </Flex>
  );
};
