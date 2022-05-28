import { ReactNode } from "react";

export const CenterContent = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div>{children}</div>

      <style jsx>{`
        div {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
      `}</style>
    </>
  );
};
