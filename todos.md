## TODOs

- add error boundary to the app and articles
- share design between Code and Diagram
- convert 2017 articles
- videos require + eslint disable

## Old TODOs

- typography
  - line-height of paragraphs is too small
  - font-size of paragraphs is too small
  - code examples have different font-size -> unify
- rewrite twitter threads into separate articles?
- domain driven design article
- responsive layout for mobile
  - maybe allow mobile autozoomout of website?
- inspiration
  - https://ruanmartinelli.com/
  - https://evanjconrad.com/
  - https://mxstbr.com/
  - https://alexmeub.com/
- nicer font

## Old TODOs

- sections
  - projects, list of all projects of what i did
  - opensource, list of all opensource of what i did
  - apperances - talks, articles, etc
- convert remaining articles
- go through components and replace usage of raw components with cstom components
- colors
  - make sure only colors from component library are used
- resolve todos in code
- http://www.vzhurudolu.cz/prirucka/checklist

## Old TODOs

- make favicon black and white
- tests in VSCode are evalueated as non strict mode for tests
- remove \_legacy folders
- test
  - article metadata match the article folder name
  - article metadata date is not in the future
  - article metadata data is in correct format
- convert all articles?
- seo.jsx convert
  - https://www.rarous.net/weblog/2019/01/28/generovani-twitter-card-obrazku.html
- https://github.com/evenchange4/svgr.macro ?
- Insecure link urls: http://hurtak.disqus.com
- click on all links and determine if they do not return 404
- frontend checklist
- add sitemap
  - http://jecas.cz/sitemap
- prev/next article links inside article
- terminal recording
  - https://github.com/marionebl/svg-term-cli
- hover & active styles
  - test whole web only with keyboard
- compile articles
  - replace `"` with correct quotes
  - `you're` -> `you’re`
- headings should have links to the hashes
- add css lint?
- animated demos (videos) - https://news.ycombinator.com/item?id=12789862
- General
  - write README.md
  - consider taking a look at some HTML elements and putting them in components article and using them
    - dl (dt dd)
    - date
    - hr, something like medium?
    - kbd
    - q (quotes: none; or have our own quotes with ::after and ::before, if we would have our own quotes, add note into typography chapter of components article)
    - abbr (http://www.w3schools.com/bootstrap/tryit.asp?filename=trybs_txt_abbr&stacked=h)
    - small
    - itemprop attribute
  - link to github/twitter
- Articles
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
  - add article footer with
    - similar articles and next article
- make projects section
  - TOMATOTIM
  - PHPAUTOCOLOR
  - work stuff?
    - obrazky.cz
    - videa.seznam.cz
    - admin proxy?
- http://jecas.cz/toc
- jecas.cz/seo-rychle
- Prechod mezi strankama
  - http://uimovement.com/ui/1127/product-page/
