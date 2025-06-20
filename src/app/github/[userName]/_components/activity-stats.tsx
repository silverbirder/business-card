import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  userData: Pick<RecentActivityData, "recentCommits" | "recentPRs" | "recentIssues">;
};

export const ActivityStats = ({ userData }: Props) => {
  return (
    <Flex
      style={{
        flexDirection: "column",
        gap: SPACING.lg,
        marginBottom: SPACING["4xl"],
      }}
    >
      <Flex
        style={{
          justifyContent: "space-between",
          background: GITHUB_COLORS.background.tertiary,
          padding: `${SPACING.md} ${SPACING.xl}`,
          borderRadius: RADIUS.sm,
        }}
      >
        <Flex
          style={{
            color: GITHUB_COLORS.text.muted,
            fontSize: TYPOGRAPHY.caption.fontSize,
            fontWeight: TYPOGRAPHY.caption.fontWeight,
          }}
        >
          💻 Commits
        </Flex>
        <Flex
          style={{
            color: GITHUB_COLORS.accent.green,
            fontSize: TYPOGRAPHY.caption.fontSize,
            fontWeight: TYPOGRAPHY.label.fontWeight,
          }}
        >
          {userData.recentCommits}
        </Flex>
      </Flex>
      <Flex
        style={{
          justifyContent: "space-between",
          background: GITHUB_COLORS.background.tertiary,
          padding: `${SPACING.md} ${SPACING.xl}`,
          borderRadius: RADIUS.sm,
        }}
      >
        <Flex
          style={{
            color: GITHUB_COLORS.text.muted,
            fontSize: TYPOGRAPHY.caption.fontSize,
            fontWeight: TYPOGRAPHY.caption.fontWeight,
          }}
        >
          🔄 Pull Requests
        </Flex>
        <Flex
          style={{
            color: GITHUB_COLORS.accent.blue,
            fontSize: TYPOGRAPHY.caption.fontSize,
            fontWeight: TYPOGRAPHY.label.fontWeight,
          }}
        >
          {userData.recentPRs}
        </Flex>
      </Flex>
      <Flex
        style={{
          justifyContent: "space-between",
          background: GITHUB_COLORS.background.tertiary,
          padding: `${SPACING.md} ${SPACING.xl}`,
          borderRadius: RADIUS.sm,
        }}
      >
        <span
          style={{
            color: GITHUB_COLORS.text.muted,
            fontSize: TYPOGRAPHY.caption.fontSize,
            fontWeight: TYPOGRAPHY.caption.fontWeight,
          }}
        >
          🐛 Issues
        </span>
        <span
          style={{
            color: GITHUB_COLORS.accent.red,
            fontSize: TYPOGRAPHY.caption.fontSize,
            fontWeight: TYPOGRAPHY.label.fontWeight,
          }}
        >
          {userData.recentIssues}
        </span>
      </Flex>
    </Flex>
  );
};
