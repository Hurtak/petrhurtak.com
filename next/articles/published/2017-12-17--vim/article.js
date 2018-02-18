import React from "react";
import {
  H1,
  H2,
  P,
  Bold,
  Link,
  Code,
  List,
  Li,
  Table,
  Tr,
  Tc
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

  render() {
    return (
      <React.Fragment>
        <P>
          Vim is a text editor. It is in the{" "}
          <Link href="https://insights.stackoverflow.com/survey/2017#technology-most-popular-developer-environments-by-occupation">
            top 5 of the most popular text editors
          </Link>. Some of its advantages are:
        </P>
        <List>
          <Li>
            <Bold>Runs inside terminal</Bold>, so it is easy to use on remote
            servers with ssh.
          </Li>
          <Li>
            <Bold>Widely available</Bold> on Linux distributions. If you ssh
            somewhere, Vim is the probably the most likely terminal text editor
            to be installed.
          </Li>
        </List>
        <P>
          This article focuses on Vim basics and the use case where you are in a
          terminal in the ssh session and want to quickly edit/explore files
          within the terminal.
        </P>

        <H1>Install</H1>
        <Code language="bash" multiline>{`sudo apt-get install vim`}</Code>

        <H1>Open file in Vim</H1>
        <Code language="bash" multiline>{`vim filepath`}</Code>

        <H1>Basic usage</H1>
        <P>
          Unlike more traditional text editors, where if you start typing the
          letters will be inserted at the place of your cursor, Vim works little
          differently. <Bold>In Vim you have modes and commands</Bold>, the
          default mode is for text navigation or manipulation, and letters on
          your keyboard are shortcuts for things like cut, paste, mode change or
          save file. So if you want to select text, you enter{" "}
          <Code>Visual</Code> mode, if you want to insert text, you enter{" "}
          <Code>Insert</Code> mode and so on.
        </P>

        <H2>Modes & Commands</H2>
        <Table
          heading={
            <Tr>
              <Tc>Mode name</Tc>
              <Tc>Key</Tc>
              <Tc>Description</Tc>
            </Tr>
          }
        >
          <Tr>
            <Tc>Normal</Tc>
            <Tc>
              <Code>Esc</Code>
            </Tc>
            <Tc>
              For navigation and manipulation of text. The default mode. You can
              usually get back to this mode with <Code>Esc</Code>.
            </Tc>
          </Tr>
          <Tr>
            <Tc>Insert</Tc>
            <Tc>
              <Code>Insert</Code> or <Code>i</Code>
            </Tc>
            <Tc>For inserting text.</Tc>
          </Tr>
          <Tr>
            <Tc>Visual</Tc>
            <Tc>
              <Code>v</Code>
            </Tc>
            <Tc>Text selections.</Tc>
          </Tr>
          <Tr>
            <Tc>Visual Line</Tc>
            <Tc>
              <Code>V</Code>
            </Tc>
            <Tc>Selection of whole lines.</Tc>
          </Tr>
          <Tr>
            <Tc>Command</Tc>
            <Tc>
              <Code>:</Code>
            </Tc>
            <Tc>For entering commands like search, save file or exit Vim.</Tc>
          </Tr>
        </Table>

        <H2>Normal mode</H2>

        <Table
          heading={
            <Tr>
              <Tc>Command</Tc>
              <Tc>Key</Tc>
              <Tc>Abbreviation</Tc>
            </Tr>
          }
        >
          <Tr>
            <Tc>Undo</Tc>
            <Tc>
              <Code>u</Code>
            </Tc>
            <Tc>
              <Bold>u</Bold>ndo
            </Tc>
          </Tr>
          <Tr>
            <Tc>Redo</Tc>
            <Tc>
              <Code>Ctrl</Code> + <Code>r</Code>
            </Tc>
            <Tc>
              <Bold>r</Bold>edo
            </Tc>
          </Tr>
          <Tr>
            <Tc>Cut (delete) line</Tc>
            <Tc>
              <Code>d</Code> and <Code>d</Code>
            </Tc>
            <Tc>
              <Bold>d</Bold>elete
            </Tc>
          </Tr>
        </Table>

        <H2>Visual mode</H2>

        <Table
          heading={
            <Tr>
              <Tc>Command</Tc>
              <Tc>Key</Tc>
              <Tc>Abbreviation</Tc>
            </Tr>
          }
        >
          <Tr>
            <Tc>Copy</Tc>
            <Tc>
              <Code>y</Code>
            </Tc>
            <Tc>
              <Bold>y</Bold>ank
            </Tc>
          </Tr>
          <Tr>
            <Tc>Paste</Tc>
            <Tc>
              <Code>p</Code>
            </Tc>
            <Tc>
              <Bold>p</Bold>aste
            </Tc>
          </Tr>
          <Tr>
            <Tc>Cut (delete) selection</Tc>
            <Tc>
              <Code>d</Code>
            </Tc>
            <Tc>
              <Bold>d</Bold>elete
            </Tc>
          </Tr>
        </Table>

        <H2>Command mode</H2>

        <Table
          heading={
            <Tr>
              <Tc>Command</Tc>
              <Tc>Key</Tc>
              <Tc>Abbreviation</Tc>
            </Tr>
          }
        >
          <Tr>
            <Tc>Save file</Tc>
            <Tc>
              <Code>w</Code>
            </Tc>
            <Tc>
              <Bold>w</Bold>rite
            </Tc>
          </Tr>
          <Tr>
            <Tc>Quit Vim</Tc>
            <Tc>
              <Code>q</Code>
            </Tc>
            <Tc>
              <Bold>q</Bold>uit
            </Tc>
          </Tr>
          <Tr>
            <Tc>Force quit Vim (drop unsaved changes)</Tc>
            <Tc>
              <Code>q!</Code>
            </Tc>
            <Tc>
              <Bold>q</Bold>uit
            </Tc>
          </Tr>
          <Tr>
            <Tc>Save file and quit Vim</Tc>
            <Tc>
              <Code>wq</Code>
            </Tc>
            <Tc>
              <Bold>w</Bold>rite + <Bold>q</Bold>uit
            </Tc>
          </Tr>
          <Tr>
            <Tc>Search</Tc>
            <Tc>
              <Code>/searched term</Code>
            </Tc>
            <Tc />
          </Tr>
          <Tr>
            <Tc>Search &ndash; next item</Tc>
            <Tc>
              <Code>n</Code>
            </Tc>
            <Tc>
              <Bold>n</Bold>ext
            </Tc>
          </Tr>
          <Tr>
            <Tc>Search &ndash; previous item</Tc>
            <Tc>
              <Code>N</Code>
            </Tc>
            <Tc />
          </Tr>
        </Table>
      </React.Fragment>
    );
  }
}
