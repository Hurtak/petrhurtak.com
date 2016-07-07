
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

## Components

### Quotes

- use `---` before authors name which will be converted into `&mdash;`

```html
<blockquote>
	<p>Citation text</p>
	<footer>--- <a href="https://hurtak.cz"><cite>Petr Huřťák</cite></a></footer>
</blockquote>
```
