import { useCallback, useEffect } from "react";
import reactGA from "react-ga4";

import { config } from "../config";

export const useGoogleAnalytics = ({ token }: { token: string }): { setCurrentPage: (path: string) => void } => {
  useEffect(() => {
    if (config.isDev) return;

    reactGA.initialize(token);
  }, [token]);

  const setCurrentPage = useCallback((path: string) => {
    if (config.isDev) return;

    reactGA.send({ hitType: "pageview", page: path });
  }, []);

  return {
    setCurrentPage,
  };
};
