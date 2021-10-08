import * as React from "react";
import reactGA from "react-ga";

export const useGoogleAnalytics = ({
  token,
  onRouterChange,
  onRouterChangeUnsubscribe,
}: {
  token: string;
  onRouterChange: (cb: (url: string) => void) => void;
  onRouterChangeUnsubscribe: (cb: (url: string) => void) => void;
}) => {
  React.useEffect(() => {
    reactGA.initialize(token);
  }, [token]);

  React.useEffect(() => {
    const handleRouteChange = (url: string) => {
      reactGA.pageview(url);
    };

    onRouterChange(handleRouteChange);
    return () => {
      onRouterChangeUnsubscribe(handleRouteChange);
    };
  }, [onRouterChange, onRouterChangeUnsubscribe]);
};
