---
title: Components
description: Collection of UI components used on this page
publication_date: 2015-12-01 13:37:00
last_update: 2015-05-28 19:22:57
visible: 1
---

## Headings

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

**markdown**

```markdown
Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
```

**compiles to**

```html
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
```

**how it looks like**

Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

## Bold & Italic text

**markdown**

```markdown
Regular text, **bold text**, *italic text*.
```

**compiles to**

```html
Regular text, <strong>bold text</strong>, <em>italic text</em>.
```

**how it looks like**

Regular text, **bold text**, *italic text*.


## Images

**markdown**

```markdown
![image alt](http://satyr.io/200x300)

![image alt 2](images/test.png)
```

**compiles to**

```html
<img src="http://satyr.io/200x300" alt="image alt">
TODO
```

**how it looks like**

![image alt](http://satyr.io/200x300)

![image alt 2](images/test.png)


## Lists

```markdown
- first item
- second item
  - nested item
  - nested item
- third item

1. first item
2. second item
  1. nested item
  2. nested item
3. third item
```

- first item
- second item
  - nested item
  - nested item
  - nested item
- third item

1. first item
2. second item
  1. nested item
  2. nested item
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

