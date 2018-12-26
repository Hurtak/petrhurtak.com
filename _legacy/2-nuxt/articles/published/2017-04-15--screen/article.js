import React from "react";
import { ArticleWrapper, H1, H2, Link, List, Li, Video, P, Table, Tr, Tc, Code } from "../../../components/article.js";

export default class Article extends React.Component {
  static metadata = {
    title: "Screen",

    description: `
      The Screen is screen manager with terminal emulation. This program allows
      you to run a process in a terminal on the background, and later on connect
      back - along with other interesing stuff.
    `,

    url: "screen",

    datePublication: "2017-04-15 16:40:00",
    dateLastUpdate: "2017-04-15 16:40:00",

    id: "58dbd5cc3dfd718624cdad126c2d487d"
  };

  render() {
    return (
      <ArticleWrapper>
        <P>The Screen is screen manager with terminal emulation that allows you to:</P>

        <List>
          <Li>Run a process in a terminal on background, and later on connect back.</Li>
          <Li>Use multiple terminal windows from a single session.</Li>
          <Li>Reconnect to a terminal session from various locations.</Li>
        </List>

        <Video width={626} height={274} src="./videos/screen.mp4" />

        <H1>Instalation</H1>

        <Code multiline language="bash">{`
          sudo apt install screen
        `}</Code>

        <H1>Workflow</H1>

        <List>
          <Li>
            Start the Screen session with <Code>screen</Code> command.
          </Li>
          <Li>
            Exit the session as you would exit a regular shell, by typing <Code>exit</Code>.
          </Li>
          <Li>Or you can detach from the Screen session so later you can come back.</Li>
          <Li>Inside the Screen, you can create windows and switch between them.</Li>
        </List>

        <H1>Keyboard shortcuts</H1>

        <P>Once you are in a Screen session, you can control it through keyboard shortcuts.</P>

        <Table
          heading={
            <Tr>
              <Tc>Action</Tc>
              <Tc>Keyboard shortcut</Tc>
              <Tc>Command</Tc>
            </Tr>
          }
        >
          <Tr>
            <Tc>Disconnect from session</Tc>
            <Tc>
              <Code>ctrl+a d</Code>
            </Tc>
            <Tc />
          </Tr>
          <Tr>
            <Tc>Kill current session</Tc>
            <Tc>
              <Code>ctrl+a k</Code>
            </Tc>
            <Tc>
              <Code>exit</Code>
            </Tc>
          </Tr>
          <Tr>
            <Tc>New Screen window</Tc>
            <Tc>
              <Code>ctrl+a c</Code>
            </Tc>
            <Tc>
              <Code>screen</Code>
            </Tc>
          </Tr>
          <Tr>
            <Tc>List of Screen windows</Tc>
            <Tc>
              <Code>ctrl+a &quot;</Code>
            </Tc>
            <Tc />
          </Tr>
          <Tr>
            <Tc>Help</Tc>
            <Tc>
              <Code>ctrl+a ?</Code>
            </Tc>
            <Tc />
          </Tr>
        </Table>

        <H1>Commands</H1>

        <Table
          heading={
            <Tr>
              <Tc>Action</Tc>
              <Tc>Command</Tc>
            </Tr>
          }
        >
          <Tr>
            <Tc>New session</Tc>
            <Tc>
              <Code>screen</Code>
            </Tc>
          </Tr>
          <Tr>
            <Tc>New session with name</Tc>
            <Tc>
              <Code>screen -S name</Code>
            </Tc>
          </Tr>
          <Tr>
            <Tc>List of Screen sessions</Tc>
            <Tc>
              <Code>screen -ls</Code>
            </Tc>
          </Tr>
          <Tr>
            <Tc>Reattach to session</Tc>
            <Tc>
              <Code>screen -r [id or name]</Code>
            </Tc>
          </Tr>
          <Tr>
            <Tc>Reattach to session or create one if it does not exist</Tc>
            <Tc>
              <Code>screen -R [id or name]</Code>
            </Tc>
          </Tr>
          <Tr>
            <Tc>Kill session</Tc>
            <Tc>
              <Code>screen -S [id or name] -X quit</Code>
              <br />
              Or just connect to the screen with <Code>screen -r</Code> and then run <Code>exit</Code>
            </Tc>
          </Tr>
          <Tr>
            <Tc>Kill all sessions</Tc>
            <Tc>
              <Code>pkill screen</Code>
            </Tc>
          </Tr>
        </Table>

        <H1>Get screen session id and name</H1>

        <List>
          <Li>
            Take a look at the <Code>$STY</Code> environment variable (STY stands for <Code>Alternate socket name</Code>
            ).
          </Li>
          <Li>
            If you are running inside a Screen, <Code>$STY</Code> is set. Otherwise, it is empty.
          </Li>
        </List>

        <Code multiline language="bash">{`
          $ echo $STY
          10921.session-name
        `}</Code>

        <H1>Am I running in a screen?</H1>

        <H2>STY environment variable</H2>
        <Code multiline language="bash">{`
          $ echo $STY

          $ screen -S test
          $ echo $STY
          6825.test
        `}</Code>

        <H2>TERM environment variable</H2>
        <Code multiline language="bash">{`
          $ echo $TERM
          xterm-256color
          $ screen
          $ echo $TERM
          screen
        `}</Code>

        <H1>Conclusion</H1>
        <P>
          I use Screen mainly for running processes in the background &ndash; for the ease of coming back to them,
          seeing what they logged into the console, and terminating them. With the window management stuff, I am fine
          with just using regular tabs in my terminal. But if you ever needed something more powerful than that, you
          should consider either Screen or its more powerful competitor <Link href="https://tmux.github.io/">Tmux</Link>
          .
        </P>

        <H1>Links</H1>
        <List>
          <Li>
            <Link>https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/</Link>
          </Li>
          <Li>
            <Link>https://tmux.github.io/</Link>
          </Li>
        </List>
      </ArticleWrapper>
    );
  }
}
