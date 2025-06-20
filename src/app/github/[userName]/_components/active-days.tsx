import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";
import type { RecentActivityData } from "@/types/github";

type Props = {
  dayOfWeekStats: RecentActivityData["dayOfWeekStats"];
};

export const ActiveDays = ({ dayOfWeekStats }: Props) => {
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
        Active Days (Weekly)
      </Flex>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.sm,
          marginBottom: SPACING["3xl"],
        }}
      >
        {Object.entries(dayOfWeekStats)
          .sort(([, a], [, b]) => b - a)
          .slice(0, 3)
          .map(([day, count], index) => (
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
                {day.substring(0, 3)}
              </span>
              <span
                style={{
                  color: GITHUB_COLORS.accent.green,
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
