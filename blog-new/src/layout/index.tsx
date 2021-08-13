export const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <style jsx>{`
        main {
          width: 100%;
          padding: 20px;
          box-sizing: border-box;
        }
      `}</style>
      <main>{children}</main>
    </>
  );
};
