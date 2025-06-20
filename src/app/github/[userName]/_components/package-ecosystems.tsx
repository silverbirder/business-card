import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  packagesCount: RecentActivityData["packagesCount"];
  packageEcosystems: RecentActivityData["packageEcosystems"];
};

export const PackageEcosystems = ({
  packagesCount,
  packageEcosystems,
}: Props) => {
  if (packagesCount <= 0) {
    return null;
  }

  return (
    <>
      <Flex tw="text-white text-sm font-normal mb-3">Package Ecosystems</Flex>
      <Flex tw="flex-col mb-4">
        {Object.entries(packageEcosystems)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([ecosystem, count], index) => (
            <Flex
              key={index}
              tw="justify-between bg-gray-900 px-2 py-1 rounded-sm mb-1"
            >
              <span tw="text-gray-400 text-xs font-normal">📦 {ecosystem}</span>
              <span tw="text-yellow-500 text-xs font-medium">{count}</span>
            </Flex>
          ))}
      </Flex>
    </>
  );
};
