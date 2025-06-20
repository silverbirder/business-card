import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";

interface StatsCardProps {
  label: string;
  value: string | number;
  color: string;
  icon?: string;
}

export function StatsCard({ label, value, color, icon }: StatsCardProps) {
  return (
    <Flex
      style={{
        justifyContent: "space-between",
        background: GITHUB_COLORS.background.tertiary,
        padding: `${SPACING.lg} ${SPACING["2xl"]}`,
        borderRadius: RADIUS.md,
      }}
    >
      <Flex
        style={{
          color: GITHUB_COLORS.text.muted,
          fontSize: TYPOGRAPHY.bodySmall.fontSize,
          fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
        }}
      >
        {label}
      </Flex>
      <Flex
        style={{
          color,
          fontSize: TYPOGRAPHY.bodySmall.fontSize,
          fontWeight: TYPOGRAPHY.label.fontWeight,
        }}
      >
        {icon && `${icon} `}{value}
      </Flex>
    </Flex>
  );
}
