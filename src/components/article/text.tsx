import { ReactNode } from "react";

export const P = ({ children }: { children: ReactNode }) => {
  return <p>{children}</p>;
};

export const H1 = ({ children }: { children: string }) => {
  return <h2>{children}</h2>;
};

export const H2 = ({ children }: { children: string }) => {
  return <h3>{children}</h3>;
};

export const Italic = ({ children }: { children: string }) => {
  return <em>{children}</em>;
};

export const Strong = ({ children }: { children: ReactNode }) => {
  return <strong>{children}</strong>;
};
