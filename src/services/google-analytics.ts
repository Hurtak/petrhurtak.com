import { useCallback, useEffect } from "react";
import reactGA from "react-ga4";

export const useGoogleAnalytics = ({ token }: { token: string }): { setCurrentPage: (path: string) => void } => {
  useEffect(() => {
    reactGA.initialize(token);
  }, [token]);

  const setCurrentPage = useCallback((path: string) => {
    reactGA.send({ hitType: "pageview", page: path });
  }, []);

  return {
    setCurrentPage,
  };
};
