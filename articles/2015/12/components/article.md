---
title: Components
description: Collection of UI components used on this page
publication_date: 2015-12-01 13:37:00
last_update: 2015-05-28 19:22:57
visible: 1
---

## General

- use 4 space indentation

## Headings

- h1 heading is generated automatically based on the article title

**markdown**

```markdown
## Sub heading
### Smaller heading
```

**compiles to**

```markdown
<h2>Sub heading</h2>
<h3>Smaller heading</h3>
```

**how it looks like**

## Sub heading
### Smaller heading

## Paragraphs

- start sentences with capital letter
- end sentences with dot.

**markdown**

```markdown
Paragraph of text.
```

**compiles to**

```html
<p>Paragraph of text.</p>
```

**how it looks like**

Paragraph of text.

## Bold, Italic, Striked & Marked text

- for bold and italic text always use `*` instead of `_`

**markdown**

```markdown
regular text
**bold text**
*italic text*
~~striked text~~
==marked text==
```

**compiles to**

```html
<ul>
    <li>regular text</li>
    <li><strong>bold text</strong></li>
    <li><em>italic text</em></li>
    <li><s>striked text</s></li>
    <li><mark>marked text</mark></li>
</ul>
```

**how it looks like**

- regular text
- **bold text**
- *italic text*
-  ~~striked text~~
- ==marked text==

## Images

- when linking to article images use relative paths without `./` at the start of the url
- these relative url are then transformed into absolute paths `images/test.png` → `/static/articles/../images/test.png`

**markdown**

```markdown
![image with relative url](images/test.png)
![image abslute url](http://satyr.io/200x300)
```

**compiles to**

```html
<img src="http://satyr.io/200x300" alt="image alt">
<img src="/static/articles/2015/12/components/images/test.png" alt="image alt">
```

**how it looks like**

![image with relative url](http://satyr.io/200x300)
![image abslute url](images/test.png)

## Lists

- start list items with lower case letter
- do not end list items with dot

**markdown**

```markdown
- first item
- second item
    - nested item
        - deeply nested item
        - deeply nested item
- third item

1. first item
2. second item
    1. nested item
        1. deeply nested item
        2. deeply nested item
3. third item
```

**compiles to**

```html
<ul>
    <li>first item</li>
    <li>second item
        <ul>
            <li>nested item
                <ul>
                    <li>deeply nested item</li>
                    <li>deeply nested item</li>
                </ul>
            </li>
        </ul>
    </li>
    </li>third item</li>
</ul>

<ol>
    <li>first item</li>
    <li>second item
        <ol>
            <li>nested item
                <ol>
                    <li>deeply nested item</li>
                    <li>deeply nested item</li>
                </ol>
            </li>
        </ol>
    </li>
    </li>third item</li>
</ol>
```

**how it looks like**

- first item
- second item
    - nested item
        - deeply nested item
        - deeply nested item
- third item

1. first item
2. second item
    1. nested item
        1. deeply nested item
        2. deeply nested item
3. third item

## Code

- always write what language is code snippet written in
- do not use abbreviations, use `javascript` instead of `js`
- omit semicolons in javascript language
- use 4 space indentation

**markdown**

````markdown
```javascript
function foo (bar) {
    return bar * 2
}
```
````

**compiles to**

```html
<pre>
    <code class="language-javascript hljs">
        <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params">bar</span>) </span>{
            <span class="hljs-keyword">return</span> bar * <span class="hljs-number">2</span>
        }
    </code>
</pre>
```

**how it looks like**

```javascript
function foo (bar) {
    return bar * 2
}
```

// ## Tables

// - always "adw" what language is code snippet written in
// - do not use abbreviations, use `javascript` instead of `js`
// - omit semicolons in javascript language
// - use 4 space indentation

// **markdown**

// ````markdown
// ```javascript
// function foo (bar) {
//     return bar * 2
// }
// ```
// ````

// **compiles to**

// ```html
// <pre>
//     <code class="language-javascript hljs">
//         <span class="hljs-function"><span class="hljs-keyword">function</span> <span class="hljs-title">foo</span> (<span class="hljs-params">bar</span>) </span>{
//             <span class="hljs-keyword">return</span> bar * <span class="hljs-number">2</span>
//         }
//     </code>
// </pre>
// ```

// **how it looks like**

// ```javascript
// function foo (bar) {
//     return bar * 2
// }
// ```

## Typography

| Wrong           | Correct          | HTML                                    |
| --------------- | ---------------  | --------------------------------------  |
| "quoted 'text'" | “quoted ‘text’”  | `&lsquo;` `&rsquo;` `&ldquo;` `&rdquo;` |
| (c) (C)         | ©                | `&copy;`                                |
| (tm) (TM)       | ™                | `&trade;`                               |
| (r) (R)         | ®                | `&reg;`                                 |
| +-              | ±                | `&pm;`                                  |
| ...             | …                | `&hellip;`                              |
| --, ---         | –, —             | `&ndash;`, `&mdash;`                    |
| 1/2, 1/4, 3/4   | ½, ¼, ¾          | `&half;`, `&frac14;`, `&frac34;`        |
| 2 x 4           | 2 &times; 4      | `&times;`                               |
| 2 - 1           | 2 &minus; 4      | `&minus;`                               |
| a -> b          | a → b            | `&rarr;`                               |
