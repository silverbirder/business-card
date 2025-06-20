import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { StatsCard } from "./stats-card";
import { Flex } from "./flex";

interface GitHubStatsData {
  publicRepos: number;
  followers: number;
  following: number;
  totalStars: number;
  totalForks: number;
  totalGists: number;
  starredCount: number;
  subscriptionsCount: number;
  publicKeysCount: number;
  gpgKeysCount: number;
  sshSigningKeysCount: number;
  packagesCount: number;
  followerToFollowingRatio: number;
  createdAt?: string | null;
}

interface GitHubStatsProps {
  userData: GitHubStatsData;
}

export function GitHubStats({ userData }: GitHubStatsProps) {
  return (
    <Flex
      style={{
        flexDirection: "column",
        background: GITHUB_COLORS.background.secondary,
        borderRadius: RADIUS.xl,
        padding: SPACING["4xl"],
        flex: 1,
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
        GitHub Stats
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.lg,
        }}
      >
        <StatsCard
          label="Repositories"
          value={userData.publicRepos}
          color={GITHUB_COLORS.accent.blue}
        />
        <StatsCard
          label="Followers"
          value={userData.followers}
          color={GITHUB_COLORS.accent.red}
        />
        <StatsCard
          label="Following"
          value={userData.following}
          color={GITHUB_COLORS.accent.green}
        />
        <StatsCard
          label="Total Stars"
          value={userData.totalStars}
          color={GITHUB_COLORS.accent.orange}
          icon="⭐"
        />
        <StatsCard
          label="Total Forks"
          value={userData.totalForks}
          color={GITHUB_COLORS.accent.purple}
          icon="🍴"
        />
        <StatsCard
          label="Gists"
          value={userData.totalGists}
          color={GITHUB_COLORS.accent.blue}
          icon="📝"
        />
        <StatsCard
          label="Starred"
          value={userData.starredCount}
          color={GITHUB_COLORS.accent.yellow}
          icon="⭐"
        />
        <StatsCard
          label="Watching"
          value={userData.subscriptionsCount}
          color={GITHUB_COLORS.accent.lightBlue}
          icon="👁️"
        />
        <StatsCard
          label="SSH Keys"
          value={userData.publicKeysCount}
          color={GITHUB_COLORS.accent.darkPurple}
          icon="🔑"
        />
        <StatsCard
          label="GPG Keys"
          value={userData.gpgKeysCount}
          color={GITHUB_COLORS.accent.darkOrange}
          icon="🛡️"
        />
        <StatsCard
          label="SSH Signing Keys"
          value={userData.sshSigningKeysCount}
          color={GITHUB_COLORS.accent.darkPurple}
          icon="🔐"
        />
        <StatsCard
          label="Packages"
          value={userData.packagesCount}
          color={GITHUB_COLORS.accent.darkYellow}
          icon="📦"
        />
        <StatsCard
          label="Following/Followers"
          value={userData.followerToFollowingRatio.toFixed(1)}
          color={GITHUB_COLORS.accent.darkRed}
          icon="📊"
        />
        {userData.createdAt && (
          <StatsCard
            label="Member Since"
            value={new Date(userData.createdAt).getFullYear()}
            color={GITHUB_COLORS.accent.darkGreen}
          />
        )}
      </Flex>
    </Flex>
  );
}
