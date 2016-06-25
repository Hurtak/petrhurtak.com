# TODO

## NEXT RELEASE
- finish css design
- buy domains
- put this damn thing on the internet
- add comments
- add google analytics

## FUTURE RELEASES
- General
  - write README.md
  - license for articles and license for app
  - sitemap
  - finetune humans.txt
  - run blog through
    - css & html validator
    - use some tool to detect unused styles
  - consider unification of quotes (html ", js ')
  - consider unification of coding style across technologies (camelCase JS, underscore_case MySQL, dash-case CSS)
  - take a look at ponyfoo.com for performance ideas
  - revisit package.json
  - tags to articles
  - projects page
  - about page
  - link to github/twitter

- Articles
  - make upload script exit properly
  - add checks in upload script so it checks if
    - url's are unique
    - id's are unique
    - directory month/year fits the publication date directories
  - flatten directory structure, just use years directories
  - add article footer with
    - share on twitter & facebook
    - edit this article on github
      - or maybe what could be really cool would be if there was live edit and anyone could submit edit
    - similar articles & next article
  - refactor upload script, put id into articles so we have truly unique identificator?
  - precompile highlight js syntax highlight on the server or use web workers on the client https://highlightjs.org/usage/
  - replace @see links in code with my own articles

- Backend
  - https
  - fork processes to number of processors http://shapeshed.com/uncaught-exceptions-in-node/
  - log unhandle exceptions & uncaight promises into file http://shapeshed.com/uncaught-exceptions-in-node/
  - node_modules folder only in debug mode?
  - merge article and debugArticle routes so they reuse most of the logic
  - change /debug route to route configurable in deb config
  - node turn on 'use srict' by default?
  - prereload headers
  - redirect from /article/ to /article (301?)
  - is the date column properly set in mysql database? also is the database timezone correctly set?
  - 404
    - log 404s
    - reccomend some content based on searched query
    - fix common typos?
    - http://jecas.cz/oprava-url
  - 500
    - add error handler to display 500 pages
    - add .catch on promises inside router to display 500?

- Frontend
  - minify scripts & css (debug mode in production still with unminified files)
  - minify article images
  - add favicon
  - pass paths as variable into templates?
  - load highlightjs css styles asynchronously
  - revisit rss feed items
  - sticky footer
  - add compilation process for static files
  - consider loading images with javascript with <noscript> fallback?
  - fine tune "published x days ago"
  - start using mixins css http://zeke.sikelianos.com/css-from-the-future/
  - consider adding critical css
  - sprites for images/icons
  - provide rss1, rss2 and atom feeds

## NICE TO HAVE
- cron job to detect 404 links
- cron job to automatically git fetch changes & update new articles
- switch to templating engine which supports streaming
- own comment system?
- evaluate switch from express to alternatives (koa, hapi)
  - once async/await hits node consider switching to koa2
  - https://github.com/llambda/koa-boiler (http2, caching...)
- serve static files from nginx

## LONG TERM
- once standard supports ES6 + Async/Await:
  - remove "standard" from package.json
  - remove "babel-eslint" dependency
- once we have object spread operator replace Object.assign in addCommonData function in routes.js
