## Title

Open file in vim

```bash
vim filepath
```

| Mode name   | Description     | How to get there                                                                                                                        |
| ----------- | --------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| Normal      | `Esc`           | For navigation and manipulation of text. This is the mode that vim will usually start in, which you can usually get back to with `Esc`. |
| Insert      | `Insert` or `i` | For inserting new text.                                                                                                                 |
| Visual      | `v`             | Text selections.                                                                                                                        |
| Visual Line | `V`             | Selection of whole lines.                                                                                                               |
| Command     | `:`             | For entering commands like for searching, saving or exiting vim.                                                                        |

### Command mode

| Command                      | Key              | Abbreviation |
| ---------------------------- | ---------------- | ------------ |
| Save file                    | `w`              | write        |
| Quit Vim                     | `q`              | quit         |
| Force quit Vim               | `q!`             | quit         |
| Save file and quit Vim       | `wq`             | write + quit |
| Search                       | `/searched term` |              |
| Search &ndash; next item     | `n`              | next         |
| Search &ndash; previous item | `N`              |              |

## TODO

| Command                | Key       | Shortening | Mode   | Description |
| ---------------------- | --------- | ---------- | ------ | ----------- |
| Delete (cut) line      | `d` + `d` | delete     | Normal |             |
| Delete (cut) selection | `d`       | delete     | Visual |             |
| Copy                   | `y`       | yank       | Visual |             |
| Delete (cut) selection | `d`       |            | Visual |             |

* save file
* exit
* force quit
* copy
* paste
* delete line
* selection
* search
* regex search
