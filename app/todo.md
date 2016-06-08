# TODO

## BEFORE RELEASE
- fix date in articles and index
- rss fix date
- rss wrong headers?
- make logo as H1?
- fix upload script
- finish css design
- pass paths as variable into templates?
- merge article and debugArticle routes so they reuse most of the logic

- license for articles and license for app
- write README.md
- fill package.json
- run blog through
  - css & html validator
  - use some tool to detect unused styles

## AFTER RELEASE
- prereload headers
- sticky footer
- replace @see links in code with my own articles
- start using mixins css http://zeke.sikelianos.com/css-from-the-future/
- add compilation process for static files
- instead of date display "published x days ago", like on Instagram
- intelligent 404 page
  - log 404
  - reccomend some content based on searched query

## NICE TO HAVE
- cron job to detect 404 links
- switch to templating engine which supports streaming
- evaluate switch from express to alternatives (koa, hapi)
  - once async/await hits node consider switching to koa2
  - https://github.com/llambda/koa-boiler (http2, caching...)
- serve static files from nginx
