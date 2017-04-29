## General

- use 4 space indentation

## Article metadata

- all properties are mandatory
- dates are in UTC, seconds are omitted
- when article is created `last_update` is set to the same val `publication_date`
- only updated `last_update` field after big changes to the article
- articles on the main page are sorted by the `last_update`

### Code

```yaml
title: Components

description:
  Collection of UI components used on this page

url: componetns

datePublication: 2016-10-10 10:00:00
dateLastUpdate: 2016-10-10 10:00:00

published: true

snippetsConfig:
  example2:
    inlineSnippet: true
```



## Links

### Code

```markdown
Some text with [link](https://example.com) in it.
```

### Compiles to

```html
<p>Some text with <a href="https://example.com">link</a> in it.</p>
```

### How it looks like

Some text with [link](https://example.com) in it.



## Headings

- use markdown
- headings have automatically added id's for easier sharing
- add 3 newlines before each `##` heading

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

- when linking to article images use relative paths
- put all images into the `images` directory placed in the same folder as `article.md`
- always specify `alt`, `width` and `height` attributes

### Code

```html
<!-- just image -->
<img src="images/test.png" alt="image alt text" width="100" height="100">

<!-- image with caption -->
<figure>
    <img src="images/test.png" alt="image alt text">
    <figcaption>Image caption</figcaption>
</figure>
```

### How it looks like

<!-- just image -->
<img src="images/test.png" alt="image alt text" width="100" height="100">

<!-- image with caption -->
<figure>
    <img src="images/test.png" alt="image alt text">
    <figcaption>Image caption</figcaption>
</figure>



## Lists

### Code

```markdown
<!-- un-ordered list -->
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

<!-- un-ordered list -->
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



## Video

- default width: `698`
- default height: `256`
- attributes: `controls autoplay loop`
- recorded with `Vokoscreen`
    - frames: `30`
    - format: `mkv`
    - videocodec: `libx264`

### Code

```html
<video width="698" width="256" controls autoplay loop>
  <source src="./videos/video.mp4" type="video/mp4">
</video>
```

### How it looks like

<video width="698" width="256" controls autoplay loop>
  <source src="./videos/video.mp4" type="video/mp4">
</video>



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

### Code

```markdown
| Default align       | Left aligned        | Centered            | Right aligned       |
| ------------------- |:------------------- |:-------------------:| -------------------:|
| cell text text text | cell text text text | cell text text text | cell text text text |
```

### How it looks like

| Default align       | Left aligned        | Centered            | Right aligned       |
| ------------------- |:------------------- |:-------------------:| -------------------:|
| cell text text text | cell text text text | cell text text text | cell text text text |



## Quotes

### Code

```html
<blockquote>
    <p>Citation text</p>
    <footer>
        &mdash; <a href="https://www.hurtak.cc"><cite>Petr Huřťák</cite></a>
    </footer>
</blockquote>
```

### How it looks like

<blockquote>
    <p>Citation text</p>
    <footer>
        &mdash; <a href="https://www.hurtak.cc"><cite>Petr Huřťák</cite></a>
    </footer>
</blockquote>



## Typography

| wrong             | correct           | HTML                                    |
| ----------------- | ----------------- | --------------------------------------- |
| "a 'quoted' text" | “a ‘quoted’ text” | `&lsquo;` `&rsquo;` `&ldquo;` `&rdquo;` |
| ...               | …                 | `&hellip;`                              |
| --, ---           | –, —              | `&ndash;` `&mdash;`                     |
| a -> b            | a → b             | `&rarr;`                                |
| 2 - 1             | 2 − 4             | `&minus;`                               |
| 2 x 4             | 2 × 4             | `&times;`                               |
| +-                | ±                 | `&pm;`                                  |
| 1/2, 1/4, 3/4     | ½, ¼, ¾           | `&half;` `&frac14;` `&frac34;`          |
| (c) (C)           | ©                 | `&copy;`                                |
| (tm) (TM)         | ™                 | `&trade;`                               |
| (r) (R)           | ®                 | `&reg;`                                 |



## Snippets

- snippets are pure `HTML` files
- they are stored in `./snippets` directory
- additional snippet configuration is done inside HTML comment located in snippet right bellow the doctype definition

### Snippet configuration

- `inlineSnippet`
    - `true` or `false` (default `false`)
    - when set to `true`, no snippet controls are displayed, only the content

### Code in article

```html
<!-- regular snippet -->
<a href="./snippets/example.html">
    Live code example snippet
</a>

<!-- inline snippet -->
<a href="./snippets/example2.html">
    Inline code example snippet
</a>

<!-- relative urls in snippets -->
<a href="./snippets/example3.html">
    Relative urls in snippets
</a>
```

### Code in snippet

```html
<!DOCTYPE html>
<!--
  inlineSnippet: true
-->
<html>
<head>
    <title>Snippet tite</title>
    <style>/* snippet styles */</style>
</head>
<body>
    <!-- snippet html -->
    <h1>Hello world</h1>
    <script>/* snippet scripts */</script>
</body>
</html>
```

### How it looks like

<!-- regular snippet -->
<a href="./snippets/example.html">
    Live code example snippet
</a>

<!-- inline snippet -->
<a href="./snippets/example2.html">
    Inline code example snippet
</a>

<!-- relative urls in snippets -->
<a href="./snippets/example3.html">
    Relative urls in snippets
</a>
