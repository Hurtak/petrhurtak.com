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

## Bold & Italic text

- for bold and italic text always use `*` instead of `_`

**markdown**

```markdown
Regular text
**bold text**
*italic text*
~~striked text~~
```

**compiles to**

```html
Regular text
<strong>bold text</strong>
<em>italic text</em>
<s>striked text</s>
```

**how it looks like**

- Regular text,
- **bold text**,
- *italic text*,
-  ~~striked text~~

## Images

- relative images

**markdown**

- when linking to article images use relative paths without `./` at the start of the url
- these relative url are then transformed into absolute paths `images/test.png` -> `/static/articles/../images/test.png`

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

```javascript
function isDirectoryNameCorrect (metadataDate, directoryName) {
    const publicationDate = new Date(metadataDate)
    const publicationYear = publicationDate.getFullYear()
    const publicationMonth = publicationDate.getMonth() + 1

    const [directoryYear, directoryMonth] = getDirectoryDate(directoryName)

    if (publicationYear !== directoryYear || publicationMonth !== directoryMonth) {
        console.error(`publication_date in article.md yaml header is different from year or month directory ${ directoryName }`)
        return false
    }

    return true
}
```

