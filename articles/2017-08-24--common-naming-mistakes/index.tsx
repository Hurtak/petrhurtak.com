import React from "react";

import { Code, Diagram, H1, H2, Li, Link, List, P, Quote } from "../components";

export const Article = () => (
  <>
    <P>
      A Little collection of technical expressions that I either confuse often or that I see often confused by other
      people.
    </P>

    <H1>Parameter vs. argument</H1>

    <Code language="js">{`
      function log(parameter) {
        console.log(parameter)
      }

      log('argument')
    `}</Code>

    <H2>Parameter</H2>
    <P>Variable in a function signature that is a placeholder for the actual value passed into the function.</P>

    <H2>Argument</H2>
    <P>The actual value passed into the function.</P>

    <H1>Function vs. method</H1>

    <Code language="js">{`
      function functionName(state) {
        return state + 1
      }

      class ClassName {
        constructor() {
          this.state = 0
        }

        methodName() {
          this.state += 1
        }
      }
    `}</Code>

    <H2>Function</H2>

    <List>
      <Li>Data is usually passed into the function explicitly.</Li>
    </List>

    <H2>Method</H2>

    <List>
      <Li>OOP paradigm.</Li>
      <Li>
        Methods are called on instance or object <Code>instance.methodName()</Code>.
      </Li>
      <Li>Usually, it operates on data that is contained within the instance of the class.</Li>
    </List>

    <H1>Serial vs. parallel</H1>

    <H2>Serial</H2>

    <Diagram>{`
      input ── A ── B ── C ── response
    `}</Diagram>

    <H2>Parallel</H2>

    <Diagram>{`
              ┌──── A ────┐
              │           │
      input ──┼──── B ────┼── response
              │           │
              └──── C ────┘
    `}</Diagram>

    <H1>URL vs. URI</H1>

    <P>
      URIs are identifiers, and that can mean name, location, or both. All URLs are URIs, but the opposite is not true.
      The part that makes something a URL is the inclusion of the <Quote>access mechanism</Quote>, or{" "}
      <Quote>network location</Quote>, such as <Code>https://</Code>, or <Code>mailto:</Code>.
    </P>

    <List>
      <Li>URI: when you're referring to a resource just by its name or some other fragment.</Li>
      <Li>URL: When you're giving both the name of a resource and the method of accessing it.</Li>
    </List>

    <H2>Examples</H2>

    <List>
      <Li>
        <Code>example.com</Code> URI.
      </Li>
      <Li>
        <Code>https://example.com</Code> URI and URL.
      </Li>
    </List>

    <H1>Links</H1>

    <List>
      <Li>
        <Link>https://danielmiessler.com/study/url-uri/</Link>
      </Li>
    </List>
  </>
);
