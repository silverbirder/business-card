import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  repos: RecentActivityData["repos"];
};

export const LatestRepos = ({ repos }: Props) => {
  return (
    <>
      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.body.fontSize,
          fontWeight: TYPOGRAPHY.body.fontWeight,
          marginBottom: SPACING["2xl"],
        }}
      >
        Latest Repositories
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.md,
          marginBottom: SPACING["3xl"],
        }}
      >
        {repos.slice(0, 3).map((repo, index) => (
          <Flex
            key={index}
            style={{
              flexDirection: "column",
              background: GITHUB_COLORS.background.tertiary,
              padding: SPACING.lg,
              borderRadius: RADIUS.sm,
            }}
          >
            <Flex
              style={{
                color: GITHUB_COLORS.accent.blue,
                fontSize: TYPOGRAPHY.bodySmall.fontSize,
                fontWeight: TYPOGRAPHY.label.fontWeight,
                marginBottom: SPACING.xs,
              }}
            >
              {repo.name.length > 18
                ? repo.name.substring(0, 18) + "..."
                : repo.name}
            </Flex>
            <Flex
              style={{
                color: GITHUB_COLORS.text.muted,
                fontSize: TYPOGRAPHY.caption.fontSize,
                fontWeight: TYPOGRAPHY.caption.fontWeight,
                marginBottom: SPACING.sm,
              }}
            >
              {repo.description && repo.description.length > 25
                ? repo.description.substring(0, 25) + "..."
                : (repo.description ?? "No description")}
            </Flex>
            <Flex
              style={{
                justifyContent: "space-between",
              }}
            >
              <span
                style={{
                  color: GITHUB_COLORS.text.muted,
                  fontSize: TYPOGRAPHY.caption.fontSize,
                  fontWeight: TYPOGRAPHY.caption.fontWeight,
                }}
              >
                {repo.language ?? "N/A"}
              </span>
              <span
                style={{
                  color: GITHUB_COLORS.accent.orange,
                  fontSize: TYPOGRAPHY.caption.fontSize,
                  fontWeight: TYPOGRAPHY.caption.fontWeight,
                }}
              >
                ⭐ {repo.stargazers_count ?? 0}
              </span>
            </Flex>
          </Flex>
        ))}
      </Flex>
    </>
  );
};
