import React from "react";
import * as A from "../../../components/article.js";

export default class Article extends React.Component {
  static metadata = {
    title: "Vim basics",

    description: `
      This article focuses on Vim basics and the use case where you are in a
      terminal in the ssh session and want to quickly edit/explore files within
      the terminal.
    `,

    url: "vim",

    datePublication: "2017-12-17 17:00:00",
    dateLastUpdate: "2017-12-17 17:00:00",

    id: "e2fd547986a4527970cc6be38f38d430"
  };

  render() {
    return (
      <React.Fragment>
        <A.Paragraph>
          Vim is a text editor. It is in the [top 5 of the most popular text
          editors][vim]. Some of its advantages are:
        </A.Paragraph>
        <A.List>
          <A.ListItem>
            <A.Bold>Runs inside terminal</A.Bold>, so it is easy to use on
            remote servers with ssh.
          </A.ListItem>
          <A.ListItem>
            <A.Bold>Widely available</A.Bold> on Linux distributions. If you ssh
            somewhere, Vim is the probably the most likely terminal text editor
            to be installed.
          </A.ListItem>
        </A.List>
        <A.Paragraph>
          This article focuses on Vim basics and the use case where you are in a
          terminal in the ssh session and want to quickly edit/explore files
          within the terminal.
        </A.Paragraph>

        <A.Heading1>Install</A.Heading1>
        <A.Code language="bash" multiline>{`sudo apt-get install vim`}</A.Code>

        <A.Heading1>Open file in Vim</A.Heading1>
        <A.Code language="bash" multiline>{`vim filepath`}</A.Code>

        <A.Heading1>Basic usage</A.Heading1>
        <A.Paragraph>
          Unlike more traditional text editors, where if you start typing the
          letters will be inserted at the place of your cursor, Vim works little
          differently. <A.Bold>In Vim you have modes and commands</A.Bold>, the
          default mode is for text navigation or manipulation, and letters on
          your keyboard are shortcuts for things like cut, paste, mode change or
          save file. So if you want to select text, you enter{" "}
          <A.Code>Visual</A.Code> mode, if you want to insert text, you enter{" "}
          <A.Code>Insert</A.Code> mode and so on.
        </A.Paragraph>

        <A.Heading2>Modes & Commands</A.Heading2>

        <A.Table
          heading={
            <A.TableRow>
              <A.TableCell>Mode name</A.TableCell>
              <A.TableCell>Key</A.TableCell>
              <A.TableCell>Description</A.TableCell>
            </A.TableRow>
          }
        >
          <A.TableRow>
            <A.TableCell>Normal</A.TableCell>
            <A.TableCell>
              <A.Code>Esc</A.Code>
            </A.TableCell>
            <A.TableCell>
              For navigation and manipulation of text. The default mode. You can
              usually get back to this mode with <A.Code>Esc</A.Code>.
            </A.TableCell>
          </A.TableRow>
          <A.TableRow>
            <A.TableCell>Insert</A.TableCell>
            <A.TableCell>
              <A.Code>Insert</A.Code> or <A.Code>i</A.Code>
            </A.TableCell>
            <A.TableCell>For inserting text.</A.TableCell>
          </A.TableRow>
          <A.TableRow>
            <A.TableCell>Visual</A.TableCell>
            <A.TableCell>
              <A.Code>v</A.Code>
            </A.TableCell>
            <A.TableCell>Text selections.</A.TableCell>
          </A.TableRow>
          <A.TableRow>
            <A.TableCell>Visual Line</A.TableCell>
            <A.TableCell>
              <A.Code>V</A.Code>
            </A.TableCell>
            <A.TableCell>Selection of whole lines.</A.TableCell>
          </A.TableRow>
          <A.TableRow>
            <A.TableCell>Command</A.TableCell>
            <A.TableCell>
              <A.Code>:</A.Code>
            </A.TableCell>
            <A.TableCell>
              For entering commands like search, save file or exit Vim.
            </A.TableCell>
          </A.TableRow>
        </A.Table>
      </React.Fragment>
    );
  }
}

/*




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
