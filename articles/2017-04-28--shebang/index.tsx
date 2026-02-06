import { Code, H1, H2, Li, List, P, Table, Tc, Tr, Video } from "../components";

export const Article = () => (
  <>
    <P>
      Under Unix-like operating systems you can either run scripts by specifying the interpreter along with the path{" "}
      <Code>python test.py</Code>, or you can run them as programs <Code>./test.py</Code>, and have the interpreter
      specified in the shebang on the first line of the script.
    </P>

    <H1>Syntax</H1>

    <Code language="bash">{`
      #! interpreter [optional-arg]

      the script content run by the specified interpreter
    `}</Code>

    <List>
      <Li>
        The interpreter must be a valid pathname for an executable. Therefore something like <Code>#!python</Code> will
        not work because <Code>python</Code> is not a path name. Use full path like <Code>#!/usr/bin/env python</Code>.
      </Li>
      <Li>
        The interpreter usually takes only one argument, so you cannot do something like{" "}
        <Code>#!/usr/bin/env node --harmony</Code>.
      </Li>
    </List>

    <H2>Example</H2>

    <Code language="bash">{`
      #!/usr/bin/env bash
      echo "Hello"
    `}</Code>

    <Video
      width={598}
      height={274}
      src={
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
        require("./videos/shebang.mp4")
      }
    />

    <H2>/usr/bin/env</H2>

    <P>
      Env is an executable in Unix-like operating systems that, among other things, is often used by shell scripts to
      launch the correct interpreter. Env is located at <Code>/usr/bin/env</Code>.
    </P>

    <P>
      It is recommended to use <Code>#!/usr/bin/env</Code> instead of the absolute path like{" "}
      <Code>#!/usr/bin/python</Code>. Although <Code>#!/usr/bin/python</Code> will work on a default Ubuntu system, it
      is good practice to use <Code>#!/usr/bin/env python</Code> instead.
    </P>

    <P>
      Same thing can be said about shells, you should use <Code>#!/usr/bin/env bash</Code> instead of{" "}
      <Code>#!/bin/bash</Code> for portability reasons. Different *nixes put the bash in various places, and using{" "}
      <Code>/usr/bin/env</Code> is a workaround to run the first bash found on the PATH.
    </P>

    <H2>Common shebangs</H2>

    <Table
      heading={
        <Tr>
          <Tc>Interpreter</Tc>
          <Tc>Shebang</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>Bash</Tc>
        <Tc>
          <Code>#!/usr/bin/env bash</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Shell</Tc>
        <Tc>
          <Code>#!/usr/bin/env sh</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Python</Tc>
        <Tc>
          <Code>#!/usr/bin/env python</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>Node.js</Tc>
        <Tc>
          <Code>#!/usr/bin/env node</Code>
        </Tc>
      </Tr>
    </Table>
  </>
);
