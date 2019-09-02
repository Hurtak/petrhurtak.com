// TODO: this should not be needed because we hawe typings??

declare module "highlight.js/lib/highlight.js" {
  export function registerLanguage(lang: string, module: any): any;
  export function highlight(lang: string, code: string): { value: string };
}

declare module "highlight.js/lib/languages/javascript" {
  const x: any;
  export default x;
}
declare module "highlight.js/lib/languages/typescript" {
  const x: any;
  export default x;
}
declare module "highlight.js/lib/languages/makefile" {
  const x: any;
  export default x;
}
declare module "highlight.js/lib/languages/elm" {
  const x: any;
  export default x;
}
declare module "highlight.js/lib/languages/json" {
  const x: any;
  export default x;
}
declare module "highlight.js/lib/languages/yaml" {
  const x: any;
  export default x;
}
declare module "highlight.js/lib/languages/css" {
  const x: any;
  export default x;
}
declare module "highlight.js/lib/languages/xml" {
  const x: any;
  export default x;
}
declare module "highlight.js/lib/languages/bash" {
  const x: any;
  export default x;
}
