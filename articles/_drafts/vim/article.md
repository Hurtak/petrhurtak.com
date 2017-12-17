#adw

Vim is [one of the most popular text editor][vim] and one of his advantages is that it runs inside terminal and it is widely avaliable on Linux distributions, you will find hin either preinstalled or you can install him with one command. So if you are using SSH to connect to some servers once in a while, Vim might come in handy for some quick file edits or file exploration like search and replace. So this article focuses completly on this usecase, by default I use other editor and use sshfs (mention sshfs-box) to connect remote directories, but for some quick edits Vim is useful and you should know some basics.

## Install

```bash
sudo apt-get install vim
```

## Open file in Vim

```bash
vim filepath
```

## Basic usage

Unlike more traditional text editors where if you start typing the letters will be inserted at the place of the cursor, Vim works little differently. In Vim you have modes and the default one is for text navigation and manipulation and letters on your keyboard are shortcuts for things like cut, paste, mode change, save file. So if you want to select text, you enter `Visual` mode, if you want to insert text, you enter `Insert` mode and so on.

### Modes & Commands

| Mode name   | Description     | How to get there                                                                                                     |
| ----------- | --------------- | -------------------------------------------------------------------------------------------------------------------- |
| Normal      | `Esc`           | For navigation and manipulation of text. This is the default mode. You can usually get back to this mode with `Esc`. |
| Insert      | `Insert` or `i` | For inserting new text.                                                                                              |
| Visual      | `v`             | Text selections.                                                                                                     |
| Visual Line | `V`             | Selection of whole lines.                                                                                            |
| Command     | `:`             | For entering commands like searching, save file or exit Vim.                                                         |

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

### Normal mode

| Command           | Key          | Shortening | Mode   | Description |
| ----------------- | ------------ | ---------- | ------ | ----------- |
| Undo              | `u`          | undo       | Normal |             |
| Redo              | `Ctrl` + `R` | undo       | Normal |             |
| Cut (delete) line | `d` and `d`  | delete     | Normal |             |

### Visual mode

| Command                | Key | Shortening | Mode   | Description |
| ---------------------- | --- | ---------- | ------ | ----------- |
| Copy                   | `y` | yank       | Visual |             |
| Paste                  | `p` | paste      | Visual |             |
| Cut (delete) selection | `d` | delete     | Visual |             |

[vim]: https://insights.stackoverflow.com/survey/2017#technology-most-popular-developer-environments-by-occupation
