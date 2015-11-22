# html code style for articles

## Article metadata

- each article starts with YAML front matter block which specifies articles metadata
- all properties are mandatory

```yaml
---
title: Title of the article
description: Short description of article
publication_date: 2015-07-02 13:37:00
last_update: 2015-05-28 19:20:00
visible: 1
---
```

## Headings

```html
<h2>Heading</h2>
<h3>Sub-heading</h3>
```

## Formatting

```html
<em>italics text</em>
<strong>bold text</strong>
<mark>marked text</mark>
```

## Code

### Inline

```html
<code>inline code</code>
```

### Multiline

```html
<pre><code>
	function name() {
		// code
	}
</code></pre>
```

## Typography
- always use bad typography for maximum clarity (eg use `--` instead of `&ndash;` or `–`)
- [typogr.js](https://github.com/ekalinin/typogr.js) plugin is used to fix these errors

| use   | converted into |
| ----- | ---------------|
| `...` | `…`            |
| `'`   | `‘` or `’`     |
| `"`   | `“` or `”`     |
| `--`  | `–`            |
| `---` | `—`            |

## Quoting

- use `—` before authors name (`&mdash;`)

```html
<blockquote>
	<p>Citation text</p>
	<footer>&mdash; <a href="https://hurtak.cz"><cite>Petr Huřťák</cite></a></footer>
</blockquote>
```

## Images

- always use `./` at the beginning of the relative urls
- always include alt attribute

```html
<img src="./images/test.png" alt="alt text">
```
