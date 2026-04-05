// TypeScript with moduleResolution "bundler" does not treat side-effect CSS imports
// from packages as typed modules unless we declare them. This currently covers:
// normalize.css, prismjs/themes/prism.css, and
// react-lite-youtube-embed/dist/LiteYouTubeEmbed.css.
declare module "*.css" {}
