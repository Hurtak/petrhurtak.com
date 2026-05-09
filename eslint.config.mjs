import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    files: ["**/*.{ts,tsx}", "**/*.js"],
    rules: {
      "@next/next/no-img-element": "off",
      "react/no-unescaped-entities": "off",
      "@typescript-eslint/no-require-imports": ["error", { allow: ["^\\./videos/.+\\.mp4$"] }],
      "@typescript-eslint/no-explicit-any": "error",
      "no-restricted-imports": ["error", { name: "next/link", message: "Use our own Link component" }],
    },
  },
  globalIgnores([".next/**", "dist/**", "out/**", "build/**", "_legacy/**", "next-env.d.ts"]),
]);
