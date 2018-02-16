import React from "react";
import {
  Paragraph,
  List,
  ListItem,
  Link,
  Bold,
  Heading1,
  Heading2,
  Code,
  Table,
  TableRow,
  TableCell
} from "../../../components/article.js";

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

  static links = {
    vim:
      "https://insights.stackoverflow.com/survey/2017#technology-most-popular-developer-environments-by-occupation"
  };

  render() {
    return (
      <React.Fragment>
        <Paragraph>
          Vim is a text editor. It is in the{" "}
          <Link href={Article.links.vim}>
            top 5 of the most popular text editors
          </Link>. Some of its advantages are:
        </Paragraph>
        <List>
          <ListItem>
            <Bold>Runs inside terminal</Bold>, so it is easy to use on remote
            servers with ssh.
          </ListItem>
          <ListItem>
            <Bold>Widely available</Bold> on Linux distributions. If you ssh
            somewhere, Vim is the probably the most likely terminal text editor
            to be installed.
          </ListItem>
        </List>
        <Paragraph>
          This article focuses on Vim basics and the use case where you are in a
          terminal in the ssh session and want to quickly edit/explore files
          within the terminal.
        </Paragraph>

        <Heading1>Install</Heading1>
        <Code language="bash" multiline>{`sudo apt-get install vim`}</Code>

        <Heading1>Open file in Vim</Heading1>
        <Code language="bash" multiline>{`vim filepath`}</Code>

        <Heading1>Basic usage</Heading1>
        <Paragraph>
          Unlike more traditional text editors, where if you start typing the
          letters will be inserted at the place of your cursor, Vim works little
          differently. <Bold>In Vim you have modes and commands</Bold>, the
          default mode is for text navigation or manipulation, and letters on
          your keyboard are shortcuts for things like cut, paste, mode change or
          save file. So if you want to select text, you enter{" "}
          <Code>Visual</Code> mode, if you want to insert text, you enter{" "}
          <Code>Insert</Code> mode and so on.
        </Paragraph>

        <Heading2>Modes & Commands</Heading2>
        <Table
          heading={
            <TableRow>
              <TableCell>Mode name</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          }
        >
          <TableRow>
            <TableCell>Normal</TableCell>
            <TableCell>
              <Code>Esc</Code>
            </TableCell>
            <TableCell>
              For navigation and manipulation of text. The default mode. You can
              usually get back to this mode with <Code>Esc</Code>.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Insert</TableCell>
            <TableCell>
              <Code>Insert</Code> or <Code>i</Code>
            </TableCell>
            <TableCell>For inserting text.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Visual</TableCell>
            <TableCell>
              <Code>v</Code>
            </TableCell>
            <TableCell>Text selections.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Visual Line</TableCell>
            <TableCell>
              <Code>V</Code>
            </TableCell>
            <TableCell>Selection of whole lines.</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Command</TableCell>
            <TableCell>
              <Code>:</Code>
            </TableCell>
            <TableCell>
              For entering commands like search, save file or exit Vim.
            </TableCell>
          </TableRow>
        </Table>

        <Heading2>Normal mode</Heading2>

        <Table
          heading={
            <TableRow>
              <TableCell>Command</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Abbreviation</TableCell>
            </TableRow>
          }
        >
          <TableRow>
            <TableCell>Undo</TableCell>
            <TableCell>
              <Code>u</Code>
            </TableCell>
            <TableCell>
              <Bold>u</Bold>ndo
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Redo</TableCell>
            <TableCell>
              <Code>Ctrl</Code> + <Code>r</Code>
            </TableCell>
            <TableCell>
              <Bold>r</Bold>edo
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cut (delete) line</TableCell>
            <TableCell>
              <Code>d</Code> and <Code>d</Code>
            </TableCell>
            <TableCell>
              <Bold>d</Bold>elete
            </TableCell>
          </TableRow>
        </Table>

        <Heading2>Visual mode</Heading2>

        <Table
          heading={
            <TableRow>
              <TableCell>Command</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Abbreviation</TableCell>
            </TableRow>
          }
        >
          <TableRow>
            <TableCell>Copy</TableCell>
            <TableCell>
              <Code>y</Code>
            </TableCell>
            <TableCell>
              <Bold>y</Bold>ank
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Paste</TableCell>
            <TableCell>
              <Code>p</Code>
            </TableCell>
            <TableCell>
              <Bold>p</Bold>aste
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Cut (delete) selection</TableCell>
            <TableCell>
              <Code>d</Code>
            </TableCell>
            <TableCell>
              <Bold>d</Bold>elete
            </TableCell>
          </TableRow>
        </Table>

        <Heading2>Command mode</Heading2>

        <Table
          heading={
            <TableRow>
              <TableCell>Command</TableCell>
              <TableCell>Key</TableCell>
              <TableCell>Abbreviation</TableCell>
            </TableRow>
          }
        >
          <TableRow>
            <TableCell>Save file </TableCell>
            <TableCell>
              <Code>w</Code>
            </TableCell>
            <TableCell>
              <Bold>w</Bold>rite
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Quit Vim </TableCell>
            <TableCell>
              <Code>q</Code>
            </TableCell>
            <TableCell>
              <Bold>q</Bold>uit
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Force quit Vim (drop unsaved changes)</TableCell>
            <TableCell>
              <Code>q!</Code>
            </TableCell>
            <TableCell>
              <Bold>q</Bold>uit
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Save file and quit Vim </TableCell>
            <TableCell>
              <Code>wq</Code>
            </TableCell>
            <TableCell>
              <Bold>w</Bold>rite + <Bold>q</Bold>uit
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Search </TableCell>
            <TableCell>
              <Code>/searched term</Code>
            </TableCell>
            <TableCell> </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Search &ndash; next item </TableCell>
            <TableCell>
              <Code>n</Code>
            </TableCell>
            <TableCell>
              <Bold>n</Bold>ext
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Search &ndash; previous item </TableCell>
            <TableCell>
              <Code>N</Code>
            </TableCell>
            <TableCell> </TableCell>
          </TableRow>
        </Table>
      </React.Fragment>
    );
  }
}
