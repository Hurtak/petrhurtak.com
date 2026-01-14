/// <reference types="vite/client" />

declare const __BUILD_TIME__: number;
declare const __COMMIT_HASH__: string;

declare module "*.mp4" {
  const src: string;
  export default src;
}
