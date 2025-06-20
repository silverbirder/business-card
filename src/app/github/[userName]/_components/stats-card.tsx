import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";

interface StatsCardProps {
  label: string;
  value: string | number;
  color: string;
  icon?: string;
}

export function StatsCard({ label, value, color, icon }: StatsCardProps) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        background: GITHUB_COLORS.background.tertiary,
        padding: `${SPACING.lg} ${SPACING["2xl"]}`,
        borderRadius: RADIUS.md,
      }}
    >
      <span
        style={{
          color: GITHUB_COLORS.text.muted,
          fontSize: TYPOGRAPHY.bodySmall.fontSize,
          fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
        }}
      >
        {label}
      </span>
      <span
        style={{
          color,
          fontSize: TYPOGRAPHY.bodySmall.fontSize,
          fontWeight: TYPOGRAPHY.label.fontWeight,
        }}
      >
        {icon && `${icon} `}{value}
      </span>
    </div>
  );
}
