import * as React from "react";
import reactGA from "react-ga4";

export const useGoogleAnalytics = ({ token }: { token: string }): { setCurrentPage: (path: string) => void } => {
  React.useEffect(() => {
    reactGA.initialize(token);
  }, [token]);

  const setCurrentPage = React.useCallback((path: string) => {
    reactGA.send({ hitType: "pageview", page: path });
  }, []);

  return {
    setCurrentPage,
  };
};
