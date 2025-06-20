import type { ReactNode, CSSProperties } from "react";

interface FlexProps {
  children: ReactNode;
  style?: CSSProperties;
}

export function Flex({ children, style = {} }: FlexProps) {
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
}
