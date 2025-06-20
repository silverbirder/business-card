import { Flex } from "./flex";
import { ActivityStats } from "./activity-stats";
import { ActivityTypes } from "./activity-types";
import { ActiveDays } from "./active-days";
import { TopMonths } from "./top-months";
import { LatestRepos } from "./latest-repos";
import { PackageEcosystems } from "./package-ecosystems";
import { StarredRepos } from "./starred-repos";
import { PublicEvents } from "./public-events";
import type { RecentActivityData } from "@/types/github";

type Props = {
  userData: RecentActivityData;
};

export const RecentActivity = ({ userData }: Props) => {
  return (
    <Flex tw="flex-col bg-gray-800 rounded-xl p-5 min-w-[220px]">
      <Flex tw="text-white text-base font-semibold mb-4">
        Recent Activity (30d)
      </Flex>
      <ActivityStats userData={userData} />
      <ActivityTypes eventTypeStats={userData.eventTypeStats} />
      <ActiveDays dayOfWeekStats={userData.dayOfWeekStats} />
      <TopMonths monthlyActivity={userData.monthlyActivity} />
      <LatestRepos repos={userData.repos} />
      <PackageEcosystems
        packagesCount={userData.packagesCount}
        packageEcosystems={userData.packageEcosystems}
      />
      <StarredRepos starred={userData.starred} />
      <PublicEvents
        receivedPublicEventsCount={userData.receivedPublicEventsCount}
      />
    </Flex>
  );
};
