import { ReactNode } from "react";

export const List = ({ numbered = false, children }: { numbered?: boolean; children: ReactNode }) => {
  const Tag = numbered ? "ol" : "ul";
  return <Tag>{children}</Tag>;
};

export const Li = ({ children }: { children: ReactNode }) => {
  return <li>{children}</li>;
};
