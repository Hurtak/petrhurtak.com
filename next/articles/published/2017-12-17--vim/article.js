import React from "react";
import * as a from "../../../components/article.js";

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
      <a.ArticleWrapper>
        <a.P>
          Vim is a text editor. It is in the{" "}
          <a.Link href="https://insights.stackoverflow.com/survey/2017#technology-most-popular-developer-environments-by-occupation">
            top 5 of the most popular text editors
          </a.Link>. Some of its advantages are:
        </a.P>
        <a.List>
          <a.Li>
            <a.Bold>Runs inside terminal</a.Bold>, so it is easy to use on
            remote servers with ssh.
          </a.Li>
          <a.Li>
            <a.Bold>Widely available</a.Bold> on Linux distributions. If you ssh
            somewhere, Vim is the probably the most likely terminal text editor
            to be installed.
          </a.Li>
        </a.List>
        <a.P>
          This article focuses on Vim basics and the use case where you are in a
          terminal in the ssh session and want to quickly edit/explore files
          within the terminal.
        </a.P>

        <a.H1>Install</a.H1>
        <a.Code language="bash" multiline>{`sudo apt-get install vim`}</a.Code>

        <a.H1>Open file in Vim</a.H1>
        <a.Code language="bash" multiline>{`vim filepath`}</a.Code>

        <a.H1>Basic usage</a.H1>
        <a.P>
          Unlike more traditional text editors, where if you start typing the
          letters will be inserted at the place of your cursor, Vim works little
          differently. <a.Bold>In Vim you have modes and commands</a.Bold>, the
          default mode is for text navigation or manipulation, and letters on
          your keyboard are shortcuts for things like cut, paste, mode change or
          save file. So if you want to select text, you enter{" "}
          <a.Code>Visual</a.Code> mode, if you want to insert text, you enter{" "}
          <a.Code>Insert</a.Code> mode and so on.
        </a.P>

        <a.H2>Modes & Commands</a.H2>
        <a.Table
          heading={
            <a.Tr>
              <a.Tc>Mode name</a.Tc>
              <a.Tc>Key</a.Tc>
              <a.Tc>Description</a.Tc>
            </a.Tr>
          }
        >
          <a.Tr>
            <a.Tc>Normal</a.Tc>
            <a.Tc>
              <a.Code>Esc</a.Code>
            </a.Tc>
            <a.Tc>
              For navigation and manipulation of text. The default mode. You can
              usually get back to this mode with <a.Code>Esc</a.Code>.
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Insert</a.Tc>
            <a.Tc>
              <a.Code>Insert</a.Code> or <a.Code>i</a.Code>
            </a.Tc>
            <a.Tc>For inserting text.</a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Visual</a.Tc>
            <a.Tc>
              <a.Code>v</a.Code>
            </a.Tc>
            <a.Tc>Text selections.</a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Visual Line</a.Tc>
            <a.Tc>
              <a.Code>V</a.Code>
            </a.Tc>
            <a.Tc>Selection of whole lines.</a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Command</a.Tc>
            <a.Tc>
              <a.Code>:</a.Code>
            </a.Tc>
            <a.Tc>
              For entering commands like search, save file or exit Vim.
            </a.Tc>
          </a.Tr>
        </a.Table>

        <a.H2>Normal mode</a.H2>

        <a.Table
          heading={
            <a.Tr>
              <a.Tc>Command</a.Tc>
              <a.Tc>Key</a.Tc>
              <a.Tc>Abbreviation</a.Tc>
            </a.Tr>
          }
        >
          <a.Tr>
            <a.Tc>Undo</a.Tc>
            <a.Tc>
              <a.Code>u</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>u</a.Bold>ndo
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Redo</a.Tc>
            <a.Tc>
              <a.Code>Ctrl</a.Code> + <a.Code>r</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>r</a.Bold>edo
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Cut (delete) line</a.Tc>
            <a.Tc>
              <a.Code>d</a.Code> and <a.Code>d</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>d</a.Bold>elete
            </a.Tc>
          </a.Tr>
        </a.Table>

        <a.H2>Visual mode</a.H2>

        <a.Table
          heading={
            <a.Tr>
              <a.Tc>Command</a.Tc>
              <a.Tc>Key</a.Tc>
              <a.Tc>Abbreviation</a.Tc>
            </a.Tr>
          }
        >
          <a.Tr>
            <a.Tc>Copy</a.Tc>
            <a.Tc>
              <a.Code>y</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>y</a.Bold>ank
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Paste</a.Tc>
            <a.Tc>
              <a.Code>p</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>p</a.Bold>aste
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Cut (delete) selection</a.Tc>
            <a.Tc>
              <a.Code>d</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>d</a.Bold>elete
            </a.Tc>
          </a.Tr>
        </a.Table>

        <a.H2>Command mode</a.H2>

        <a.Table
          heading={
            <a.Tr>
              <a.Tc>Command</a.Tc>
              <a.Tc>Key</a.Tc>
              <a.Tc>Abbreviation</a.Tc>
            </a.Tr>
          }
        >
          <a.Tr>
            <a.Tc>Save file</a.Tc>
            <a.Tc>
              <a.Code>w</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>w</a.Bold>rite
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Quit Vim</a.Tc>
            <a.Tc>
              <a.Code>q</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>q</a.Bold>uit
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Force quit Vim (drop unsaved changes)</a.Tc>
            <a.Tc>
              <a.Code>q!</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>q</a.Bold>uit
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Save file and quit Vim</a.Tc>
            <a.Tc>
              <a.Code>wq</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>w</a.Bold>rite + <a.Bold>q</a.Bold>uit
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Search</a.Tc>
            <a.Tc>
              <a.Code>/searched term</a.Code>
            </a.Tc>
            <a.Tc />
          </a.Tr>
          <a.Tr>
            <a.Tc>Search &ndash; next item</a.Tc>
            <a.Tc>
              <a.Code>n</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Bold>n</a.Bold>ext
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>Search &ndash; previous item</a.Tc>
            <a.Tc>
              <a.Code>N</a.Code>
            </a.Tc>
            <a.Tc />
          </a.Tr>
        </a.Table>
      </a.ArticleWrapper>
    );
  }
}
