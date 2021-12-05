import React from "react";

import { Code, H1, Italic, Li, Link, List, P, Table, Tc, Tr } from "../../src/components/article";

export const Article = () => (
  <>
    <P>
      The easiest way to install and switch between different versions of <Italic>Node.js</Italic> is with{" "}
      <Link href="https://brew.sh/">Homebrew</Link> package manager.
    </P>

    <H1>Search and install versions</H1>

    <Table
      heading={
        <Tr>
          <Tc>Action</Tc>
          <Tc>Command</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>Currently active version</Tc>
        <Tc>
          <Code language="bash">node --version</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Search available and installed versions</Tc>
        <Tc>
          <Code language="bash">brew search node</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Install latest version</Tc>
        <Tc>
          <Code language="bash">brew install node</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Install older version</Tc>
        <Tc>
          <Code language="bash">brew install node@12</Code>
        </Tc>
      </Tr>
    </Table>

    <H1>Change version</H1>

    <Table
      heading={
        <Tr>
          <Tc>Action</Tc>
          <Tc>Command</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>Unlink latest version</Tc>
        <Tc>
          <Code language="bash">brew unlink node</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Unlink older version</Tc>
        <Tc>
          <Code language="bash">brew unlink node@12</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Link latest version</Tc>
        <Tc>
          <Code language="bash">brew link node && brew postinstall node</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Link older version</Tc>
        <Tc>
          <Code language="bash">brew link --overwrite node@12</Code>
        </Tc>
      </Tr>
    </Table>

    <H1>Alternatives</H1>

    <List>
      <Li>
        <Link>https://github.com/nvm-sh/nvm</Link>
      </Li>
      <Li>
        <Link>https://github.com/tj/n</Link>
      </Li>
    </List>
  </>
);
