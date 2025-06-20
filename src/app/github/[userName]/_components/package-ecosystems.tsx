import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  packagesCount: RecentActivityData["packagesCount"];
  packageEcosystems: RecentActivityData["packageEcosystems"];
};

export const PackageEcosystems = ({ packagesCount, packageEcosystems }: Props) => {
  if (packagesCount <= 0) {
    return null;
  }

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
        Package Ecosystems
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.sm,
          marginBottom: SPACING["3xl"],
        }}
      >
        {Object.entries(packageEcosystems)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([ecosystem, count], index) => (
            <Flex
              key={index}
              style={{
                justifyContent: "space-between",
                background: GITHUB_COLORS.background.tertiary,
                padding: `${SPACING.sm} ${SPACING.lg}`,
                borderRadius: RADIUS.xs,
              }}
            >
              <span
                style={{
                  color: GITHUB_COLORS.text.muted,
                  fontSize: TYPOGRAPHY.caption.fontSize,
                  fontWeight: TYPOGRAPHY.caption.fontWeight,
                }}
              >
                📦 {ecosystem}
              </span>
              <span
                style={{
                  color: GITHUB_COLORS.accent.darkYellow,
                  fontSize: TYPOGRAPHY.caption.fontSize,
                  fontWeight: TYPOGRAPHY.label.fontWeight,
                }}
              >
                {count}
              </span>
            </Flex>
          ))}
      </Flex>
    </>
  );
};
