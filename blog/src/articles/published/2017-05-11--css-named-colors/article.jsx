import React from "react";
import { H1, H2, Link, List, Li, P, Dash, Table, Tr, Tc, Code } from "../../components";
import colors from "./colors.ts";

export default () => (
  <>
    <P>
      In CSS there are multiple ways to specify colors, you can do it with hex definition{" "}
      <Code language="css">#f00</Code>, functional definition like <Code language="css">rgb(255, 0, 0)</Code> or{" "}
      <Code language="css">hsl(0, 100%, 50%)</Code>. Or in simpler cases, you can use keyword definitions like{" "}
      <Code language="css">red</Code>.
    </P>

    <H1>History</H1>

    <P>
      16 of CSS’s named colors came from HTML originally:
      <Color>white</Color>, <Color>aqua</Color>, <Color>fuchsia</Color>, <Color>red</Color>, <Color>lime</Color>,
      <Color>yellow</Color>, <Color>silver</Color>, <Color invert>gray</Color>, <Color invert>black</Color>,
      <Color invert>maroon</Color>, <Color invert>blue</Color>, <Color invert>navy</Color>, <Color invert>olive</Color>,
      <Color invert>purple</Color>, <Color invert>green</Color>, <Color invert>teal</Color>. Most of the rest came from
      one version of the <Link href="https://en.wikipedia.org/wiki/X11_color_names">X11 color system</Link>.
    </P>

    <H2>Latest addition</H2>

    <P>
      In 2014 <Link href="https://en.wikipedia.org/wiki/Eric_A._Meyer">Eric A. Meyer's</Link> daughter Rebecca died on
      her 6th birthday, less than a year after her diagnosis of a brain tumor. The hex color{" "}
      <Code language="css">#663399</Code> was named <Color invert>rebeccapurple</Color> and added to the CSS color list
      in her memory.
    </P>

    <H1>Duplicate colors</H1>

    <P>
      There are four duplicates between the named colors, and all of them are related to gray (English) <Dash /> grey
      (UK) spelling differences.
    </P>

    <P>
      The duplicates are: <Color>lightgray</Color> <Dash /> <Color>lightgrey</Color>, <Color>darkgray</Color> <Dash />{" "}
      <Color>darkgrey</Color>, <Color invert>gray</Color> <Dash /> <Color invert>grey</Color>,{" "}
      <Color invert>dimgray</Color> <Dash /> <Color invert>dimgrey</Color>.
    </P>

    <H1>Inconsistencies</H1>

    <List>
      <Li>
        <Color>darkgray</Color> <Code language="css">#a9a9a9</Code> is lighter than <Color invert>gray</Color>{" "}
        <Code language="css">#808080</Code>.
      </Li>
      <Li>light/dark variants of colors are not available with all basic colors:</Li>
    </List>

    <Table
      heading={
        <Tr>
          <Tc>Basic color</Tc>
          <Tc>Dark variant</Tc>
          <Tc>Light variant</Tc>
        </Tr>
      }
    >
      <Tr>
        <TcColored invert>blue</TcColored>
        <TcColored invert>darkblue</TcColored>
        <TcColored>lightblue</TcColored>
      </Tr>
      <Tr>
        <TcColored invert>green</TcColored>
        <TcColored invert>darkgreen</TcColored>
        <TcColored>lightgreen</TcColored>
      </Tr>
      <Tr>
        <TcColored invert>red</TcColored>
        <TcColored invert>darkred</TcColored>
        <Tc center>✖</Tc>
      </Tr>
      <Tr>
        <TcColored>orange</TcColored>
        <TcColored invert>darkorange</TcColored>
        <Tc center>✖</Tc>
      </Tr>
      <Tr>
        <TcColored>yellow</TcColored>
        <Tc center>✖</Tc>
        <TcColored>lightyellow</TcColored>
      </Tr>
      <Tr>
        <TcColored>pink</TcColored>
        <Tc center>✖</Tc>
        <TcColored>lightpink</TcColored>
      </Tr>
      <Tr>
        <TcColored invert>brown</TcColored>
        <Tc center>✖</Tc>
        <Tc center>✖</Tc>
      </Tr>
      <Tr>
        <TcColored invert>purple</TcColored>
        <Tc center>✖</Tc>
        <Tc center>✖</Tc>
      </Tr>
      <Tr>
        <TcColored>cyan</TcColored>
        <TcColored invert>darkcyan</TcColored>
        <TcColored>lightcyan</TcColored>
      </Tr>
      <Tr>
        <TcColored invert>gray</TcColored>
        <TcColored>darkgray</TcColored>
        <TcColored>lightgray</TcColored>
      </Tr>
    </Table>

    <H1>Are named colors useful?</H1>

    <P>There are several cases where named colors might be useful:</P>

    <List>
      <Li>
        <Code language="css">white</Code>/<Code language="css">black</Code> is more readable than{" "}
        <Code language="css">#fff</Code>/<Code language="css">#000</Code>.
      </Li>
      <Li>
        CSS minifiers optimize for filesize and in some cases named color is the shortest possible value. For example{" "}
        <Code language="css">red</Code> is shorter than <Code language="css">#f00</Code> or{" "}
        <Code language="css">rgb(255,0,0)</Code>.
      </Li>
      <Li>In example apps where the exact shade of color is not important.</Li>
    </List>

    <H1>Named colors list</H1>

    <P>
      Here is a list of all CSS named color grouped by basic color and then sorted by their lightness with the{" "}
      <Link href="http://alienryderflex.com/hsp.html">HSP Color Model</Link>. Currently, there are 147 named colors.
    </P>

    {colors.map(category => (
      <React.Fragmen key={category.title}>
        <H2>{category.title}</H2>
        <Table>
          {category.colors.map(([name, hex, rgb, invert]) => (
            <Tr key={name}>
              <TcColored invert={invert}>{name}</TcColored>
              <TcColored invert={invert}>{hex}</TcColored>
              <TcColored invert={invert}>{rgb}</TcColored>
            </Tr>
          ))}
        </Table>
      </React.Fragmen>
    ))}

    <H2>Links</H2>

    <List>
      <Li>
        <Link>https://www.youtube.com/watch?v=HmStJQzclHc</Link>
      </Li>
      <Li>
        <Link>https://developer.mozilla.org/en/docs/Web/CSS/color_value</Link>
      </Li>
      <Li>
        <Link>https://www.w3.org/TR/css-color-4/</Link>
      </Li>
    </List>
  </>
);

const Color = props => <ColoredComponent Component={"span"} {...props} />;

const TcColored = props => <ColoredComponent Component={Tc} {...props} />;

const ColoredComponent = ({ children, Component, invert = false }) => (
  <Component style={{ backgroundColor: children, color: invert ? "white" : null }}>{children}</Component>
);
