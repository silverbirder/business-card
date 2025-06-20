import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  tw?: string;
};

export const Flex = ({ children, tw }: Props) => {
  return <div tw={`flex ${tw ?? ""}`}>{children}</div>;
};
