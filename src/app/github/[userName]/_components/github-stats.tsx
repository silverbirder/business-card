import { Flex } from "./flex";
import { StatsCard } from "./stats-card";
import type { GitHubStatsData } from "@/types/github";

type Props = {
  userData: GitHubStatsData;
};

export const GitHubStats = ({ userData }: Props) => {
  return (
    <Flex tw="flex-col bg-gray-800 rounded-xl px-5 py-5 flex-1">
      <Flex tw="text-white text-base font-semibold mb-4">GitHub Stats</Flex>
      <Flex tw="flex-col">
        <StatsCard
          label="Repositories"
          value={userData.publicRepos}
          color="#58a6ff"
        />
        <StatsCard
          label="Followers"
          value={userData.followers}
          color="#f85149"
        />
        <StatsCard
          label="Following"
          value={userData.following}
          color="#56d364"
        />
        <StatsCard
          label="Total Stars"
          value={userData.totalStars}
          color="#ffa657"
          icon="⭐"
        />
        <StatsCard
          label="Total Forks"
          value={userData.totalForks}
          color="#d2a8ff"
          icon="🍴"
        />
        <StatsCard
          label="Gists"
          value={userData.totalGists}
          color="#58a6ff"
          icon="📝"
        />
        <StatsCard
          label="Starred"
          value={userData.starredCount}
          color="#f1c40f"
          icon="⭐"
        />
        <StatsCard
          label="Watching"
          value={userData.subscriptionsCount}
          color="#3498db"
          icon="👁️"
        />
        <StatsCard
          label="SSH Keys"
          value={userData.publicKeysCount}
          color="#9b59b6"
          icon="🔑"
        />
        <StatsCard
          label="GPG Keys"
          value={userData.gpgKeysCount}
          color="#e67e22"
          icon="🛡️"
        />
        <StatsCard
          label="SSH Signing Keys"
          value={userData.sshSigningKeysCount}
          color="#9b59b6"
          icon="🔐"
        />
        <StatsCard
          label="Packages"
          value={userData.packagesCount}
          color="#f39c12"
          icon="📦"
        />
        <StatsCard
          label="Following/Followers"
          value={userData.followerToFollowingRatio.toFixed(1)}
          color="#e74c3c"
          icon="📊"
        />
        {userData.createdAt && (
          <StatsCard
            label="Member Since"
            value={new Date(userData.createdAt).getFullYear()}
            color="#2ecc71"
          />
        )}
      </Flex>
    </Flex>
  );
};
