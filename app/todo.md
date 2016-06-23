# TODO

## BEFORE RELEASE
- finish css design
- fix images in debug mode
- syntax highlight
- comments
- run blog through
  - css & html validator
  - use some tool to detect unused styles

## AFTER RELEASE
- make upload script exit properly
- add checks in upload script so it checks if
  - url's are unique
  - id's are unique
  - directory month/year fits the publication date directories
- minify scripts & css (debug mode in production still with unminified files)
- minify article images
- refactor upload script, put id into articles so we have truly unique identificator?
- merge article and debugArticle routes so they reuse most of the logic
- pass paths as variable into templates?
- write README.md
- license for articles and license for app
- revisit rss feed items
- change /debug route to route configurable in deb config
- sitemap
- finetune humans.txt
- node turn on 'use srict' by default?
- consider unification of quotes (html ", js ')
- consider unification of coding style across technologies (camelCase JS, underscore_case MySQL, dash-case CSS)
- is the date column properly set in mysql database? also is the database timezone correctly set?
- prereload headers
- sticky footer
- replace @see links in code with my own articles
- start using mixins css http://zeke.sikelianos.com/css-from-the-future/
- add compilation process for static files
- instead of date display "published x days ago", like on Instagram
- consider loading images with javascript with <noscript> fallback?
- consider adding critical css
- take a look at ponyfoo.com for performance ideas
- revisit package.json
- intelligent 404 page
  - log 404
  - reccomend some content based on searched query

## NICE TO HAVE
- cron job to detect 404 links
- cron job to automatically git fetch changes & update new articles
- switch to templating engine which supports streaming
- evaluate switch from express to alternatives (koa, hapi)
  - once async/await hits node consider switching to koa2
  - https://github.com/llambda/koa-boiler (http2, caching...)
- serve static files from nginx

## LONG TERM
- once standard supports ES6 + Async/Await:
  - remove "standard" from package.json
  - remove "babel-eslint" dependency
