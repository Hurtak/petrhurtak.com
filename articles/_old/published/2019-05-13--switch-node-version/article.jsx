import React from "react";
import { P, H1, List, Li, Link, Italic, Table, Tr, Tc, Code } from "../../components";

export default () => (
  <>
    <P>
      The easiest way to install and switch between different versions of <Italic>Node.js</Italic> is with{" "}
      <Link href="https://brew.sh/">Homebrew</Link> package manager.
    </P>

    <Table
      heading={
        <Tr>
          <Tc>Action</Tc>
          <Tc>Command</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>Current Node version</Tc>
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
        <Tc>Install specific version</Tc>
        <Tc>
          <Code language="bash">brew install node@8</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Unlink latest Node version</Tc>
        <Tc>
          <Code language="bash">brew unlink node</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Unlink older Node version</Tc>
        <Tc>
          <Code language="bash">brew unlink node@8</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Link older version</Tc>
        <Tc>
          <Code language="bash">brew link node@8 --force --overwrite</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Link latest version</Tc>
        <Tc>
          <Code language="bash">brew link node</Code>
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
