import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
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
    <Flex
      style={{
        flexDirection: "column",
        background: GITHUB_COLORS.background.secondary,
        borderRadius: RADIUS.xl,
        padding: SPACING["4xl"],
        minWidth: "220px",
      }}
    >
      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.h4.fontSize,
          fontWeight: TYPOGRAPHY.h4.fontWeight,
          marginBottom: SPACING["3xl"],
        }}
      >
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
