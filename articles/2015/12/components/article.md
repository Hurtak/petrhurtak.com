---
title: Components
description: Collection of UI components used on this page
publication_date: 2015-12-01 13:37
last_update: 2015-05-28 19:22
visible: true
---



## General

- use 2 space indentation

## Article metadata
- each article starts with YAML front matter block which specifies articles metadata
- all properties are mandatory
- dates are in UTC, seconds are omitted
- when article is created `last_update` is set to the same val `publication_date`
- only updated `last_update` field after big changes to the article
- articles on the main page are sorted by the `last_update`

### Code
```yaml
---
title: Title of the article
description: Short description of article
publication_date: 2015-07-02 13:37
last_update: 2015-05-28 19:20
visible: true
---
```



## Headings

- use markdown
- headings have automatically added id's for easier sharing
- add 3 newlines before each `<h2>` heading

### Code
```markdown
## Heading
paragraph

### Sub-heading
paragraph
```

### Compiles to
```html
<h2 id="heading">Heading</h2>
<p>paragraph</p>
<h3 id="sub-heading">Sub-heading</h3>
<p>paragraph</p>
```

### How it looks like
## Heading
paragraph

### Sub-heading
paragraph



## Formatting

### Code
```markdown
_italics text_
__bold text__
~striked text~
<mark>marked text</mark>
```

### How it looks like
- _italics text_
- __bold text__
- ~~striked text~~
- <mark>marked text</mark>



## Images

- when linking to article images use relative paths with `./` at the start of the url
- these relative url are then transformed into absolute paths `images/test.png` → `/static/articles/../images/test.png`
- always specify `alt`, `width` and `height` attributes

### Code
```html
<!-- just image -->
<img src="./images/test.png" alt="image alt text" width="100" height="100">

<!-- image with caption -->
<figure>
  <img src="./images/test.png" alt="image alt text">
  <figcaption>Image caption</figcaption>
</figure>
```

### Compiles to
```html
<!-- just image -->
<img src="/static/articles/2015/12/components/images/test.png" alt="image alt text" width="100" height="100">

<!-- image with caption -->
<figure>
  <img src="/static/articles/2015/12/components/images/test.png" alt="image alt text">
  <figcaption>Image caption</figcaption>
</figure>
```

### How it looks like
<!-- just image -->
<img src="./images/test.png" alt="image alt text" width="100" height="100">

<!-- image with caption -->
<figure>
  <img src="./images/test.png" alt="image alt text">
  <figcaption>Image caption</figcaption>
</figure>



## Lists

- start list items with lower case letter
- do not end list items with dot, use comma or parentheses

### Code
```markdown
<!-- unordered list -->
- first item
- second item
  - nested item
    - deeply nested item
    - deeply nested item
- third item

<!-- ordered list -->
1. first item
2. second item
    1. nested item
        1. deeply nested item
        2. deeply nested item
3. third item
```

### How it looks like
<!-- unordered list -->
- first item
- second item
  - nested item
    - deeply nested item
    - deeply nested item
- third item

<!-- ordered list -->
1. first item
2. second item
    1. nested item
        1. deeply nested item
        2. deeply nested item
3. third item



## Code blocks

- in multiline code blocks always specify what language it is written in
- do not use abbreviations when specifying language, use `javascript` instead of `js`
- code blocks are syntax highlighted
- omit semicolons in JavaScript language

### Code

````markdown
<!-- inline code -->
Some text, `<strong>hello</strong>`

<!-- multiline code -->
```javascript
function foo (bar) {
    return bar * 2
}
```
````

### Compiles to
```html
<!-- inline code -->
<p>Some text, <code>&lt;strong&gt;hello&lt;/strong&gt;</code></p>
<!-- multiline code -->
<pre><code class="language-javascript"><span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params">bar</span>) </span>{
    <span class="hljs-keyword">return</span> bar * <span class="hljs-number">2</span>
}
</code></pre>
```

### How it looks like
<!-- inline code -->
Some text, `<strong>hello</strong>`

<!-- multiline code -->
```javascript
function foo (bar) {
    return bar * 2
}
```



## Tables

<ul>
  <li>start headings and cell text with lower case letter</li>
  <li>if there is heading row, wrap it in <xmp><thead></xmp> and regular rows in <xmp><tbody></xmp></li>
  <li>in <xmp>thead</xmp> use <xmp>th</xmp> instead of <xmp>td</xmp></li>
  <li>if there is not heading row, do not wrap rows in <xmp><tbody></xmp></li>
</ul>

### Code

<pre><xmp data-lang="html">
<table>
  <thead>
    <tr>
      <th>heading</th>
      <th>heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell text</td>
      <td>Cell text</td>
    </tr>
  </tbody>
</table>
</xmp></pre>

### How it looks like

<table>
  <thead>
    <tr>
      <th>heading</th>
      <th>heading</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Cell text</td>
      <td>Cell text</td>
    </tr>
  </tbody>
</table>



## Quotes

### Code

<pre><xmp data-lang="html">
  <blockquote>
    <p>Citation text</p>
    <footer>
      &mdash; <a href="https://hurtak.cz"><cite>Petr Huřťák</cite></a></footer>
  </blockquote>
</xmp></pre>

### How it looks like

<blockquote>
  <p>Citation text</p>
  <footer>&mdash; <a href="https://hurtak.cz"><cite>Petr Huřťák</cite></a></footer>
</blockquote>



## Typography

<table>
  <thead>
    <tr>
      <th>wrong</th>
      <th>correct</th>
      <th>HTML</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>"a 'quoted' text"</td>
      <td>“a ‘quoted’ text”</td>
      <td><xmp data-lang="html">&lsquo;</xmp> <xmp data-lang="html">&rsquo;</xmp> <xmp data-lang="html">&ldquo;</xmp> <xmp data-lang="html">&rdquo;</xmp></td>
    </tr>
    <tr>
      <td>...</td>
      <td>…</td>
      <td><xmp data-lang="html">&hellip;</xmp></td>
    </tr>
    <tr>
      <td>--, ---</td>
      <td>–, —</td>
      <td><xmp data-lang="html">&ndash;</xmp> <xmp data-lang="html">&mdash;</xmp></td>
    </tr>
    <tr>
      <td>a -> b</td>
      <td>a → b</td>
      <td><xmp data-lang="html">&rarr;</xmp></td>
    </tr>
    <tr>
      <td>2 - 1</td>
      <td>2 − 4</td>
      <td><xmp data-lang="html">&minus;</xmp></td>
    </tr>
    <tr>
      <td>2 x 4</td>
      <td>2 × 4</td>
      <td><xmp data-lang="html">&times;</xmp></td>
    </tr>
    <tr>
      <td>+-</td>
      <td>±</td>
      <td><xmp data-lang="html">&pm;</xmp></td>
    </tr>
    <tr>
      <td>1/2, 1/4, 3/4</td>
      <td>½, ¼, ¾</td>
      <td><xmp data-lang="html">&half;</xmp> <xmp data-lang="html">&frac14;</xmp> <xmp data-lang="html">&frac34;</xmp></td>
    </tr>
    <tr>
      <td>(c) (C)</td>
      <td>©</td>
      <td><xmp data-lang="html">&copy;</xmp></td>
    </tr>
    <tr>
      <td>(tm) (TM)</td>
      <td>™</td>
      <td><xmp data-lang="html">&trade;</xmp></td>
    </tr>
    <tr>
      <td>(r) (R)</td>
      <td>®</td>
      <td><xmp data-lang="html">&reg;</xmp></td>
    </tr>
  </tbody>
</table>

<a href="./snippets/example.html">Live code example snippet</a>
