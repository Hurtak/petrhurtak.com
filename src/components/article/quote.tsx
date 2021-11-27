export const Quote = ({ children }: { children: string }) => (
  <q>
    {children}

    <style jsx>{`
      q {
        quotes: "“" "”";
      }
    `}</style>
  </q>
);
