import React from "react";
import { Paragraph, List, ListItem } from "../../../components/article.js";

export default class Article extends React.Component {
  static metadata = {
    title: "Vim basics",

    description:
      "This article focuses on Vim basics and the use case where you are in a terminal in the ssh session and want to quickly edit/explore files within the terminal.",

    url: "vim",

    datePublication: "2017-12-17 17:00:00",
    dateLastUpdate: "2017-12-17 17:00:00",

    id: "e2fd547986a4527970cc6be38f38d430"
  };

  render() {
    return (
      <React.Fragment>
        <Paragraph>
          Vim is a text editor. It is in the [top 5 of the most popular text
          editors][vim]. Some of its advantages are:
        </Paragraph>
        <List numbered>
          <ListItem>
            **Runs inside terminal**, so it is easy to use on remote servers
            with ssh.
          </ListItem>
          <ListItem>
            **Widely available** on Linux distributions. If you ssh somewhere,
            Vim is the probably the most likely terminal text editor to be
            installed.
          </ListItem>
        </List>
      </React.Fragment>
    );
  }
}

/*
```

This article focuses on Vim basics and the use case where you are in a terminal in the ssh session and want to quickly edit/explore files within the terminal.

## Install

```bash
sudo apt-get install vim
```

## Open file in Vim

```bash
vim filepath
```

## Basic usage

Unlike more traditional text editors, where if you start typing the letters will be inserted at the place of your cursor, Vim works little differently. **In Vim you have modes and commands**, the default mode is for text navigation or manipulation, and letters on your keyboard are shortcuts for things like cut, paste, mode change or save file. So if you want to select text, you enter `Visual` mode, if you want to insert text, you enter `Insert` mode and so on.

### Modes & Commands

| Mode name   | Key             | Description                                                                                                  |
| ----------- | --------------- | ------------------------------------------------------------------------------------------------------------ |
| Normal      | `Esc`           | For navigation and manipulation of text. The default mode. You can usually get back to this mode with `Esc`. |
| Insert      | `Insert` or `i` | For inserting text.                                                                                          |
| Visual      | `v`             | Text selections.                                                                                             |
| Visual Line | `V`             | Selection of whole lines.                                                                                    |
| Command     | `:`             | For entering commands like search, save file or exit Vim.                                                    |

### Normal mode

| Command           | Key          | Abbreviation |
| ----------------- | ------------ | ------------ |
| Undo              | `u`          | **u**ndo     |
| Redo              | `Ctrl` + `R` | **r**edo     |
| Cut (delete) line | `d` and `d`  | **d**elete   |

### Visual mode

| Command                | Key | Abbreviation |
| ---------------------- | --- | ------------ |
| Copy                   | `y` | **y**ank     |
| Paste                  | `p` | **p**aste    |
| Cut (delete) selection | `d` | **d**elete   |

### Command mode

| Command                               | Key              | Abbreviation         |
| ------------------------------------- | ---------------- | -------------------- |
| Save file                             | `w`              | **w**rite            |
| Quit Vim                              | `q`              | **q**uit             |
| Force quit Vim (drop unsaved changes) | `q!`             | **q**uit             |
| Save file and quit Vim                | `wq`             | **w**rite + **q**uit |
| Search                                | `/searched term` |                      |
| Search &ndash; next item              | `n`              | **n**ext             |
| Search &ndash; previous item          | `N`              |                      |

[vim]: https://insights.stackoverflow.com/survey/2017#technology-most-popular-developer-environments-by-occupation
```
*/
