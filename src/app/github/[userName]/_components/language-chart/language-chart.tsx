import { Flex } from "../flex";
import { useLanguageChart } from "./language-chart.hook";

type Props = {
  languages: [string, number][];
  width?: number;
};

export const LanguageChart = ({ languages, width = 180 }: Props) => {
  const { segments, languages: languageData } = useLanguageChart({
    languages,
    width,
  });
  if (languages.length === 0) {
    return null;
  }

  const barHeight = 8;

  return (
    <Flex tw="flex-col">
      <Flex tw="mb-3">
        <svg width={width} height={barHeight}>
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
      </Flex>
      <Flex tw="flex-col">
        {languageData.map((lang) => (
          <Flex
            key={lang.language}
            tw="items-center justify-between text-sm font-normal text-gray-400 mb-2"
          >
            <Flex tw="items-center">
              <Flex tw="w-2 h-2 rounded-full mr-2" />
              <Flex>{lang.language}</Flex>
            </Flex>
            <Flex tw="text-gray-300 text-xs font-normal">
              {lang.percentage}%
            </Flex>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};
