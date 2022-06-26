module.exports = {
  ci: {
    collect: {
      numberOfRuns: 1,
      maxAutodiscoverUrls: 50,
      staticDistDir: "dist",
    },
    assert: {
      preset: "lighthouse:no-pwa",
      assertions: {
        "legacy-javascript": "off", // next.js generates these
        "csp-xss": "off", // next.js generates these
        "uses-long-cache-ttl": "off", // we run lighthouse against static files, so there are no cache headers
      },
    },
  },
};
