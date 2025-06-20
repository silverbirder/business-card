import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "./flex";

type Props = {
  receivedPublicEventsCount: number;
};

export const PublicEvents = ({ receivedPublicEventsCount }: Props) => {
  if (receivedPublicEventsCount <= 0) {
    return null;
  }

  return (
    <>
      <Flex
        style={{
          color: GITHUB_COLORS.text.primary,
          fontSize: TYPOGRAPHY.bodySmall.fontSize,
          fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
          marginTop: SPACING["3xl"],
          marginBottom: SPACING.lg,
        }}
      >
        Recent Public Events ({receivedPublicEventsCount})
      </Flex>
      <Flex
        style={{
          background: GITHUB_COLORS.background.tertiary,
          padding: `${SPACING.md} ${SPACING.lg}`,
          borderRadius: RADIUS.sm,
          justifyContent: "center",
        }}
      >
        <span
          style={{
            color: GITHUB_COLORS.text.muted,
            fontSize: TYPOGRAPHY.caption.fontSize,
            fontWeight: TYPOGRAPHY.caption.fontWeight,
          }}
        >
          📡 Monitoring activity
        </span>
      </Flex>
    </>
  );
};
