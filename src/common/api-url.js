import config from "next/config";

const apiUrl = (() => {
  const { publicRuntimeConfig } = config();

  const inBrowser = typeof window !== "undefined";

  return inBrowser
    ? `${window.location.origin}${publicRuntimeConfig.apiPath}`
    : `${publicRuntimeConfig.origin}${publicRuntimeConfig.apiPath}`;
})();

export default apiUrl;
