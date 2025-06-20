import { GITHUB_COLORS, SPACING, RADIUS, TYPOGRAPHY } from "@/lib/design-token";
import { Flex } from "../flex";
import { useLanguageChart } from "./use-language-chart";

type Props = {
  languages: [string, number][];
  width?: number;
};

export const LanguageChart = ({ languages, width = 180 }: Props) => {
  if (languages.length === 0) {
    return null;
  }

  const { segments, languages: languageData } = useLanguageChart({
    languages,
    width,
  });

  const barHeight = 8;

  return (
    <Flex style={{ flexDirection: "column" }}>
      <svg
        width={width}
        height={barHeight}
        style={{ marginBottom: SPACING["2xl"] }}
      >
        {segments.map((segment) => (
          <rect
            key={segment.key}
            x={segment.x}
            y={segment.y}
            width={segment.width}
            height={segment.height}
            fill={segment.color}
            rx={segment.rx}
            ry={segment.ry}
          />
        ))}
      </svg>
      <Flex
        style={{
          flexDirection: "column",
          gap: SPACING.md,
        }}
      >
        {languageData.map((lang) => (
          <Flex
            key={lang.language}
            style={{
              alignItems: "center",
              justifyContent: "space-between",
              fontSize: TYPOGRAPHY.bodySmall.fontSize,
              fontWeight: TYPOGRAPHY.bodySmall.fontWeight,
              color: GITHUB_COLORS.text.muted,
            }}
          >
            <Flex style={{ alignItems: "center" }}>
              <div
                style={{
                  width: "8px",
                  height: "8px",
                  backgroundColor: lang.color,
                  borderRadius: RADIUS.full,
                  marginRight: SPACING.md,
                }}
              />
              <Flex>{lang.language}</Flex>
            </Flex>
            <Flex
              style={{
                color: GITHUB_COLORS.text.secondary,
                fontSize: TYPOGRAPHY.caption.fontSize,
                fontWeight: TYPOGRAPHY.caption.fontWeight,
              }}
            >
              {lang.percentage}%
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
