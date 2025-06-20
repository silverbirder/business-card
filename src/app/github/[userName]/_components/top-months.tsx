import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  monthlyActivity: RecentActivityData["monthlyActivity"];
};

export const TopMonths = ({ monthlyActivity }: Props) => {
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
        Top Active Months
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.sm,
          marginBottom: SPACING["3xl"],
        }}
      >
        {Object.entries(monthlyActivity)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([month, count], index) => (
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
                {month}
              </span>
              <span
                style={{
                  color: GITHUB_COLORS.accent.orange,
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
