import type { ReactNode, CSSProperties } from "react";

type Props = {
  children: ReactNode;
  style?: CSSProperties;
};

export const Flex = ({ children, style = {} }: Props) => {
  return (
    <div
      style={{
        display: "flex",
        ...style,
      }}
    >
      {children}
    </div>
  );
};
