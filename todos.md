# TODO

## TODO

- svg as react components?
- drafts
- rss
- convert design
- convert articles
- route based codesplitting
  - https://reactjs.org/docs/code-splitting.html
- sitemap
- robots.txt?
- prev/next article links inside article
  - or perhaps another articles from the same tag
- responsive images
  - https://www.gatsbyjs.org/docs/working-with-images/
- netlify deploy
- bugs
  - menu hover - change icon to white
- revisit
  - revisit robots.txt
  - revisit manifest.json
- check generated html, if tags are ok
- frontend checklist
- cleanup package.json and package-lock.json
- deploy
- future
  - mdx? https://github.com/jamesknelson/create-react-app-mdx
  - get rid of lodash? importing just one function is 20kb (of of 70kb of full lodash)

## Changing the date format

This starter uses Gatsby's built-in date formatter in the GraphQL queries. If you want to change the date format you see on the index page or other overviews have a look at the GraphQL query. It contains the line:

```graphql
date(formatString: "DD.MM.YYYY")
```

## Rewrite TODOS

- /xxx/ breaks server
- humans.txt
- convert remaining articles
- deploy
  - link to real www.hurtak.cc
  - run tests before dev & prod deployment script

## Later

- articles writing
  - make drafts work again
  - live reload when new article appears
- update to next6
- cleaup dir structure
- Go through TODOS
- load comments when visible, or on demand with button?
- RSS feed, use some package to make sure encoding is ok??
- inspiration
  - https://ryanclark.me/
- tell now to use scripts/production instead of npm scripts
- jest silent when test passes
- article proptypes validation
  - listitem must be inside List component
- @zeit/next-bundle-analyzer
- https://www.npmjs.com/package/@pwa/next-workbox-webpack-plugin
- cleanup articles css, there are some importants and other stuff
- Check that Google Analytics works
- https://asciinema.org/ & https://github.com/marionebl/svg-term-cli
- Style overscroll area
- Rewmap description in RSS
  - Switch to https://github.com/jpmonette/feed
- Change layout to menu on the left
  - http://vojtechruzicka.com/
- Incorporate tests
  - metadata validation
  - https://github.com/wooorm/alex
  - something that checks grammar (maybe Grammarly has some API?)
- hover & active styles
  - test whole web only with kehboard

## Latest

- compile articles
  - replace `"` with correct quotes
  - `you're` -> `you’re`
- Today (as date) is not capitalized in articles list

## Older

- can i use links
- skip deploy task from periodic builds
- write first article
  - http://i.imgur.com/A6gQxoM.jpg
- videos are jumping around when we refresh the page?
- articles on main page ale filtered with UTC, dates displayed are without UTC.
- when displaying '2 days ago' dates - round dates to latest midnight
- headings should have links to the hashes
- insert <link preload> on all links in the page?
- lazy load disqus
  - https://css-tricks.com/lazy-loading-disqus-comments/
  - maybe detect hardware and if we are on mobile, only lazyload then
- add less, and maybe try sass
- update rss, package.json descriptions
- consider moving metadata.title to the article itself?
- finish CSS design

  - add cool efect to buttons like in https://www.keithcirkel.co.uk/
  - inspiration:
    - new
      - https://tomdale.net/
      - https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-2-reflect/
      - https://www.robinwieruch.de/mobx-react/
      - https://www.bramstein.com/writing/web-font-loading-patterns.html
    - old
      - http://alves.im/blog/before-dive-into-react.html
      - http://blog.rstankov.com/
      - http://maketea.co.uk/2016/09/28/css-grid-layout-is-a-step-change.html
      - http://oops.re/
      - http://phoboslab.org/log
      - http://prolost.com/
      - http://usabilitypost.com/
      - https://99designs.com.au/tech-blog/blog/2015/10/26/aws-vault/
      - https://automattic.com/
      - https://www.briangilham.com/articles/
      - https://www.keithcirkel.co.uk/metaprogramming-in-es6-part-2-reflect/

- add components/styles for keyboard shortcuts - in case we want to write them in the article
- add "updated 20/10/2015" - date of last update of the article
  - figure out where to put this date
    - in article
    - on main page?
    - what about rss?
- links to previous/next article?
- add `about` page with basic contact
  - twitter
  - email
  - hobby
  - current work
    - seznam
    - ui programmer
- add css lint?
- https://news.ycombinator.com/item?id=13733790
  - 1. find somebody who blogs and review articles to each other
  - 2. have a mailing list where i will just send preview of article to people that are interested
- fix css source maps
  - source map file does not have hash
  - update sourceMapURL so it points to the file with hash
  - make sourcemapped file paths correct
- handle images cache busting
  - https://blog.risingstack.com/automatic-cache-busting-for-your-css/
- animated demos (videos) - https://news.ycombinator.com/item?id=12789862
- update Twitter profile
- domains
  - buy hurtak.cc hurtak.io petrhurtak.com petrhurtak.cz hurtak.pe
- https://www.smashingmagazine.com/2016/08/using-a-static-site-generator-at-scale-lessons-learned/
- http://www.vzhurudolu.cz/prirucka/checklist
- consider transforming article so each element has it's own class?
  - p -> p.article\_\_p
  - what do we do about nested components?
  - what happens when we are in code/xmp element?
  - do we do this automatically based on tag name or by hand?
  - why would we do this? what is the benefit over plain CSS -> maybe that we don't have CSS specificity problems?
- benchmark tool, use wrk? also benchmark after each commit in travis?
- Synon.js for mocking api call a db functions?
- Selenium testing?
- take a look at error logging tools like sentry?
- https://blog.cloudflare.com/accelerating-node-js-applications-with-http-2-server-push/
- consider using https://github.com/VerbalExpressions/JSVerbalExpressions for regex
- https://hacks.mozilla.org/2016/08/using-feature-queries-in-css/ with this provide fallback to older browsers?
- fork to multiple processes (strong-supervisor, there is also Isaac Schluter's old cluster-master, naught, cluster2, pm2, etc.)
- robots.txt review - make article
- inspiration
  - http://blog.jenkster.com/
  - http://bramstein.com/writing/
  - http://feross.org/resume/
  - http://fvsch.com/articles/push-and-wait/
  - http://fvsch.com/code/svg-icons/how-to/
  - http://html5up.net/prologue
  - http://html5up.net/twenty
  - http://pebblecode.com/
  - http://perfectionkills.com/
  - http://shapeshed.com/writing-cross-platform-node/
  - http://tesarek.me
  - http://uimovement.com/ui/1922/menu-item-selection/
  - http://www.mgadams.com/2015/06/30/the-software-engineers-guide-to-negotiating-a-raise/
  - http://www.michaelvillar.com/
  - http://www.rouvre.com/fr/gallery/9/portraits/359
  - http://zellwk.com/blog/media-query-units/
  - http://zellwk.com/blog/why-vertical-rhythms/
  - https://99designs.com.au/tech-blog/blog/2015/10/26/aws-vault/
  - https://dockyard.com/blog/2015/10/14/best-practices-data-down-actions-up
  - https://nervous.io/clojure/clojurescript/aws/lambda/node/lein/2015/07/05/lambda/
  - https://shapeshed.com/the-future-of-jobs/
  - https://yobriefca.se/articles/
  - http://tympanus.net/Tutorials/FullscreenBookBlock/

## FUTURE RELEASES

- General

  - write README.md
  - sitemap
  - 301 redirects from uppercase urls? /arTicle -> /article
  - fine tune humans.txt
  - https://github.com/googlechrome/sw-precache
  - run blog through
    - CSS and HTML validator
    - use some tool to detect unused styles
  - consider unification of quotes (html ", js ')
  - consider unification of coding style across technologies (camelCase JS, underscore_case MySQL, dash-case CSS)
  - take a look at ponyfoo.com for performance ideas
  - performance testing
    - https://css-tricks.com/use-webpagetest-api/
  - revisit package.json
  - progressively enhanced tweet quotations
  - enable brotli compression
    - https://www.smashingmagazine.com/2016/10/next-generation-server-compression-with-brotli/
  - tags to articles
  - node 6.6.0 promises: Unhandled rejections now emit a process warning after the first tick, so maybe we don't need hard-rejection module anymore
  - consider using execa, shelljs, cash for scripts once async/await lands
  - projects page
  - use & write article about https://github.com/nolanlawson/optimize-js
  - consider taking a look at some HTML elements and putting them in components article and using them
    - dl (dt dd)
    - date
    - hr, something like medium?
    - kbd
    - q (quotes: none; or have our own quotes with ::after and ::before, if we would have our own quotes, add note into typography chapter of components article)
    - abbr (http://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_txt_abbr&stacked=h)
    - small
    - itemprop attribute
  - about page
  - add search with suggest box
  - add aria stuff and accessibility stuff, also add that accessibility menu when you press tab
  - link to github/twitter
  - investigate nginx and caddy https://caddyserver.com/
  - https://securityheaders.io/
    - also article about this
  - check if we are not using sync (readFileSync) functions anywhere
  - cron job to test
    - https://docs.travis-ci.com/user/cron-jobs/
    - automatically git fetch changes and update new articles
  - think of how to unify scripts between package.json, scripts/ and .travis.yml
  - think of a ways how to unify debug mode with production mode
  - check for TODOs in code and resolve them
  - also unify /rss and /about routes to have trailing slash?

- code snippet tool

  - add bigger snippets where we can display html & css & js next to each other (on bigger screen widths)
  - in config
    - have a way to disable some controls / hide some tabs that are not necessary
    - have a way to set height of snippet (probably in config?)
  - add variaous layers of validation, like that when snippets dir exists, there is at least on .html file in there
  - be able to resize
  - Source link doesent align with button - http://i.imgur.com/AIKK2K2.png (only in chrome)
  - highlight code with `<mark>`?
  - json schema for metadata.yaml validation?
  - have a way to display diffs
  - inspiration: https://jakearchibald.com/2016/svg-media-queries/
  - also have a way to put code in page for people just to play with, not to take a look how it was done? like lorem ipsum generator would be the type of snippet which would be just used instead of inspected how it was done. On the other hand, some CSS layout example would be useful to have easily available button to show what is the html / css, and also way to resize
  - have a way to display example fullscreen like kod.jecas.cz?
  - chapter about this into components
  - With each code live snippet have a warning if some feature is not supported in current browser
  - With snippets display what language they are from and maybe even version (with elm for example)
  - have unified way to display feature support
  - have borderless mode where we just display the content
  - parsing
    - have some more robust way how to parse -> split -> save -> reconnect snippet html
    - maybe have customizable doctype?
  - have certain properties customizable like here
    - http://codepen.io/thebabydino/pen/pbVdPx/
  - have a way to add http header to the document response
    - probably by adding some html comment in snippet html
      - add html comment (http://stackoverflow.com/questions/941100/can-comments-appear-before-the-doctype-declaration)
      - probably in yaml?
      - parse that and save into database
      - when serving this file add relevant headers
      - do not add any other extra headers like powered by and security headers added by helmet??
        - somebody could then display our content? maybe only add the one which disables displaying in iframe?
      - also keep the original headers comment in html so reader can easily see what headers were added?

- Debug

  - have a way to show unpublished articles to other people on secret url

- CI

  - https://percy.io/
  - consider switching to some other ci tool (https://github.com/integrations), seems like Travis is not supporting multiple tasks
  - read docs https://docs.travis-ci.com/user/languages/javascript-with-nodejs (notifications when it fails?)
  - have CI job which will run all article validity checks
  - check if article links are not 404
  - check if other page links are not 404
  - if all pages are html valid
  - npm outdated check
  - html validator all pages (https://github.com/zrrrzzt/html-validator)
  - https://www.npmjs.com/package/sloc-for-jenkins
  - move npm run lint in something like before_script?
  - https://github.com/stylelint/stylelint
  - have task that run periodically every hour?
    - https://github.com/RetireJS/retire.js
    - npm outdated?
    - https://github.com/nodesecurity/nsp
    - https://github.com/Snyk/snyk

- Articles

  - currently html of code blocks is parsed and we cannot get raw html? so `<h2>` will become `<h2></h2>`, maybe switch to jsdom?
  - add gradient overlay on code blocks that overflow to y
  - in parseArticle function have functions which checks article for correctness
    - check if paragraphs start with capital letter and end with dot
    - check of headings start with capital letter
    - check YAML header for correctness
    - check that all relative url's start with `./` (or do not start with)
    - maybe refactor this into separate module?
    - maybe when checking html, when we find error -> add console.log describing the error
  - post all articles to hacker news, reddit, twitter
    - provide links under article to hacker news and twitter discussion
      - http://i.imgur.com/XIfTwcz.png (from http://jlongster.com)
    - have these links saved in front matter
    - have cron job which determines number of comments on giver articles
    - display number of comments under
  - do not compile articles manually with script, compile them on the fly when requested
    - measure how long this takes
    - if it takes > 5ms, wrap the whole thing in caching function which will just save the result into file
  - add checks in upload script so it checks if
    - url's are unique
    - id's are unique
    - directory month/year fits the publication date directories
  - flatten directory structure, just use years directories
  - add rel="noopener" to links to other domains
    - https://jakearchibald.com/2016/performance-benefits-of-rel-noopener/
    - write article about this
  - refactor styles
  - add article footer with
    - share on twitter and facebook
    - edit this article on github
      - or maybe what could be really cool would be if there was live edit and anyone could submit edit
    - similar articles and next article
  - refactor upload script, put id into articles so we have truly unique identificator?
  - parse article function uses readFileSync, rewrite to use promises/cb
  - replace @see links in code with my own articles

- Backend

  - pretty 500 page, figure out how to do this in express
  - https://www.sitepoint.com/how-to-create-a-node-js-cluster-for-speeding-up-your-apps/
  - fork processes to number of processors http://shapeshed.com/uncaught-exceptions-in-node/
  - log unhandle exceptions and uncaught promises into file http://shapeshed.com/uncaught-exceptions-in-node/
  - tests
    - test routes
      - https://glebbahmutov.com/blog/how-to-correctly-unit-test-express-server/
    - test if favicons are present in final build
    - code coverage > 50%
    - synon.js to moc db/api calls?
    - selenium tests
      - with CI
      - periodically on distribution page
  - prereload headers
  - switch to https
    - https://jakdelatseo.cz/checklist-pro-prechod-z-http-na-https/
    - https://docs.google.com/spreadsheets/d/1XB26X_wFoBBlQEqecj7HB79hQ7DTLIPo97SS5irwsK8/edit#gid=1975121463
  - redirect from /article/ to /article (301?)
  - 404
    - log 404s
    - recommend some content based on searched query
    - fix common typos?
    - http://jecas.cz/oprava-url
  - 500
    - add error handler to display 500 pages
    - add .catch on promises inside router to display 500?
    - log all 500 into file, how to do this in express?

- Frontend
  - once JS modules work in Chrome
    - switch to that
    - refactor global namespace in base.njk and how data are feeded into the app
    - add support for sourcemaps
    - consider using babili instead of uglifyjs
  - highlight.js
    - locally host css file
    - only take css for languages that are really used
  - http://mozilla.github.io/nunjucks/templating.html#whitespace-control
  - minify scripts and css (debug mode in production still with unminified files)
  - minify article images
  - add favicon
  - pass paths as variable into templates?
  - load highlightjs css styles asynchronously
  - revisit rss feed items
  - add compilation process for static files
  - consider loading images with javascript with `<noscript>` fallback?
  - fine tune "published x days ago"
  - start using mixins css
    - http://zeke.sikelianos.com/css-from-the-future/
    - convert from typography variables to typography mixins
    - some resets mixins?
  - consider adding critical css
  - sprites for images/icons
  - provide rss1, rss2 and atom feeds
  - responsive images (srcset, image element), also generate these automatically
  - use sprites https://speakerdeck.com/bevacqua/high-performance-in-the-critical-path
  - have all relevant metatags, inspire with jecas.cz and ponyfoo.com
  - console easter egg, or perhaps something inside HTML? http://codepen.io/elijahmanor/pen/RPjeLz?editors=001
  - consider switching to async templating engine with streaing support (markojs by ebay, dustjs by linkedin)

## OTHER

- talk to customers, have email list but also you can talk to them by posting article where you ask them to write you something to comments section
  - Example ask them for interesting gulp plugins or what RSS feed they are subscribed to.
- Přidat možnost si subscribnout k updatům o nových článcích
- Zjistit, jak přidat do gmailu tlačítko see article a případně jaký věci tam můžu přidávat (a napsat o tomhle článek)
  - http://imgur.com/iz4wIcW
- images
  - responsive images
    - Srcset, Image element
    - https://developers.google.com/web/updates/2015/09/automating-resource-selection-with-client-hints?hl=en
    - also write article about this
  - use webp for iamges?
- page transition animations
  - http://codyhouse.co/demo/page-scroll-effects/parallax.html
- try these
  ```css
  body,
   img  {
    -webkit-user-drag: none;
  }
  body  {
    -webkit-animation-name: fontfix;
    -webkit-font-smoothing: antialiased;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
  ```
- logo inspiration
  - http://imgur.com/WWvA4MP
  - http://codepen.io/zadvorsky/pen/xVrMMO
  - make favicon
  - animate icon with sprite?
  - animate logo with this https://vimeo.com/185587462 ?
  - animate favicon
  - http://speckyboy.com/2015/11/09/subtly-animated-logos/
  - http://crystal-lang.org/
  - http://blog.wearecolony.com/a-year-without-jquery/
- https://uimovement.com/ui/2181/link-behavior/
- https://webmasters.googleblog.com/2011/09/pagination-with-relnext-and-relprev.html?m=1
- folder organization
  - https://doc.nette.org/en/2.3/quickstart/getting-started#toc-sandbox-s-content
  - Taky obrázky z článků by měly být we www složce nebo někde + je proháhět nějakym optimalizátorem a používat
- make projects section
  - TOMATOTIM
  - PHPAUTOCOLOR
  - work stuff?
    - obrazky.cz
    - videa.seznam.cz
    - admin proxy?
- http://uimovement.com/ui/440/challenge-accepted/
- https://blog.risingstack.com/node-js-security-checklist/
- https://www.joyent.com/node-js/production/debug
- chrome scrollbar styling?
  - http://www.maxiprani.cz/
- when somebody doesent have adblock, show warning :D
  - https://twitter.com/gcluley/status/704980787716866048
- http://jecas.cz/toc
- jecas.cz/seo-rychle
- http://practice.typekit.com/lesson/caring-about-opentype-features/
- add sitemap
  - http://jecas.cz/sitemap
- http://www.html5rocks.com/en/tutorials/appcache/beginner/
- http://www.html5rocks.com/en/tutorials/service-worker/introduction/
- search
  - http://uimovement.com/ui/1125/magazine-search/
- Prechod mezi strankama
  - http://uimovement.com/ui/1127/product-page/
- how to do gifs
  - http://wesbos.com/animated-gif-workflow/
- https://serviceworke.rs/
- initial animation
  - http://blog.izs.me/
- header shadow animation
  - http://flexbox.io/
- menu http://tympanus.net/codrops/2016/01/06/inspiration-for-line-menu-styles/
- výborná typografie https://automattic.com/
- http://formidable.com/blog/2016/05/24/announcing-spectacle-editor-a-work-in-progress/
- Share button
  - http://uimovement.com/ui/1398/share-hover/
- http://tomwoods.com/d/websitebookpdf.pdf
- https://github.com/hemanth/awesome-pwa/blob/master/README.md
- https://css-tricks.com/essential-meta-tags-social-media/
- https://www.zdrojak.cz/clanky/orientacni-body-wai-aria-pro-pristupnejsi-web/
- https://css-tricks.com/essential-meta-tags-social-media/
