import React from "react";
import {
  ArticleWrapper,
  H1,
  H2,
  List,
  Li,
  Link,
  P,
  Table,
  Tr,
  Tc,
  Code
} from "../../../components/article.js";

export default class Article extends React.Component {
  static metadata = {
    title: "Shebang",

    description: `
      Under Unix-like operating systems you can either run scripts by specifying
      the interpreter along with the path or you can run them as programs and
      have the interpreter specified in the shebang on the first line of the
      script.
    `,

    url: "shebang",

    datePublication: "2017-04-28 10:00:00",
    dateLastUpdate: "2017-04-28 10:00:00",

    id: "eb4b3f6abee9c723d9ab91391039a356"
  };

  render() {
    return (
      <ArticleWrapper>
        <P>
          Under Unix-like operating systems you can either run scripts by
          specifying the interpreter along with the path `python test.py`, or
          you can run them as programs `./test.py`, and have the interpreter
          specified in the shebang on the first line of the script.
        </P>

        <H1>Syntax</H1>

        <Code multiline language="bash">{`
          #! interpreter [optional-arg]

          the script content run by the specified interpreter
        `}</Code>

        <List>
          <Li>
            The interpreter must be a valid pathname for an executable.
            Therefore something like `#!python` will not work because `python`
            is not a path name. Use full path like `#!/usr/bin/env python`.
          </Li>
          <Li>
            The interpreted usually takes only one argument, so you cannot do
            something like `#!/usr/bin/env node --harmony`.
          </Li>
        </List>

        <H2>Example</H2>

        <Code multiline language="bash">{`
          #!/usr/bin/env bash
          echo "Hello"
        `}</Code>

        <video width="626" height="274" controls autoPlay loop>
          <source src="./videos/shebang.mp4" type="video/mp4" />
        </video>

        <H2>usr/bin/env</H2>

        <P>
          Env is an executable in Unix-like operating systems that, among other
          things, is often used by shell scripts to launch the correct
          interpreter. Env is located at <Code>/usr/bin/env</Code>.
        </P>

        <P>
          It is recommended to use <Code>#!/usr/bin/env</Code> instead of the
          absolute path like <Code>#!/usr/bin/python</Code>. Although{" "}
          <Code>#!/usr/bin/python</Code> will work on a default Ubuntu system,
          it is good practice to use <Code>#!/usr/bin/env python</Code> instead.
        </P>

        <P>
          Same thing can be said about shells, you should use{" "}
          <Code>#!/usr/bin/env bash</Code> instead of <Code>#!/bin/bash</Code>{" "}
          for portability reasons. Different *nixes put the bash in various
          places, and using <Code>/usr/bin/env</Code> is a workaround to run the
          first bash found on the PATH.
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
      </ArticleWrapper>
    );
  }
}
