import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  starred: RecentActivityData["starred"];
};

export const StarredRepos = ({ starred }: Props) => {
  return (
    <>
      <Flex tw="text-white text-sm font-normal mb-3">Recently Starred</Flex>
      <Flex tw="flex-col">
        {starred.slice(0, 2).map((starredItem, index) => {
          const repo = "repo" in starredItem ? starredItem.repo : starredItem;
          return (
            <Flex key={index} tw="flex-col bg-gray-900 p-2 rounded mb-2">
              <Flex tw="text-yellow-400 text-xs font-medium mb-0.5">
                {repo.name.length > 18
                  ? repo.name.substring(0, 18) + "..."
                  : repo.name}
              </Flex>
              <Flex tw="text-gray-400 text-xs font-normal mb-0.5">
                {repo.description && repo.description.length > 25
                  ? repo.description.substring(0, 25) + "..."
                  : (repo.description ?? "No description")}
              </Flex>
              <Flex tw="justify-between">
                <span tw="text-gray-400 text-xs font-normal">
                  {repo.language ?? "N/A"}
                </span>
                <span tw="text-orange-400 text-xs font-normal">
                  ⭐ {repo.stargazers_count ?? 0}
                </span>
              </Flex>
            </Flex>
          );
        })}
      </Flex>
    </>
  );
};
