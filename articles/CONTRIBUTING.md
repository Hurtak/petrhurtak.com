# Markdown code style for articles

## Article metadata

- each article starts with YAML front matter block which specifies articles metadata
- all properties are mandatory

```YAML
---
title: Title of the article
description: Short description of article
publication_date: 2015-07-02 13:37:00
last_update: 2015-05-28 19:20:00
visible: 1
---
```

## Headings

```markdown
## Heading
### Sub-heading
```

## Formatting

```markdown
_italics text_
__bold text__
___bold and italics text___
==marked text==
~~crossed text~~
```

## Code

### Inline

` `inline code\\`` `

### Multiline

```markdown
```languagename
function functionName() {
    test();
}
```.
```

## Quoting

### Inline

- use regular quotes `'` and `"`, they will be automatically replaced with
typographically correct quotes (`“` , `”`, `‘` and `’`)

### Multiline

- use `—` before authors name (`&mdash;`)

```markdown
> "Quote text"
>
> — [Author name](http://adress.com)
```

## Images

### relative url

- always use `./` at the beggining of the relative urls

```markdown
![image alt text](./images/test.png)
```
![image alt text](./images/test.png)

### absolute url

- always include protocol
- if resource is avaliable on `https://` always use that of protocol relative `//`

```markdown
![image alt text](http://satyr.io/300x100/lightblue)
```
![image alt text](http://satyr.io/300x100/lightblue)
