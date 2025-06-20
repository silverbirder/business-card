import { Flex } from "./flex";

type Props = {
  label: string;
  value: string | number;
  color?: string;
  icon?: string;
};

export const StatsCard = ({ label, value, color, icon }: Props) => {
  const getColorClass = (color?: string) => {
    switch (color) {
      case "#58a6ff":
        return "text-blue-400";
      case "#f85149":
        return "text-red-400";
      case "#56d364":
        return "text-green-400";
      case "#ffa657":
        return "text-orange-400";
      case "#d2a8ff":
        return "text-purple-400";
      case "#f1c40f":
        return "text-yellow-400";
      case "#3498db":
        return "text-sky-400";
      case "#9b59b6":
        return "text-violet-400";
      case "#e67e22":
        return "text-amber-500";
      case "#f39c12":
        return "text-yellow-500";
      case "#e74c3c":
        return "text-red-500";
      case "#2ecc71":
        return "text-emerald-400";
      default:
        return "text-blue-400";
    }
  };

  return (
    <Flex tw="justify-between bg-gray-900 px-3 py-2 rounded mb-2">
      <Flex tw="text-gray-400 text-xs font-normal">{label}</Flex>
      <Flex tw={`text-xs font-medium ${getColorClass(color)}`}>
        {icon && `${icon} `}
        {value}
      </Flex>
    </Flex>
  );
};
