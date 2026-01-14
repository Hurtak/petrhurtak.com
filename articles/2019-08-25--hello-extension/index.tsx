import { H1, Image, Li, Link, List, P, Strong } from "../components";
import screenshot1 from "./images/screenshot-1.png";

const storeLink = "https://chrome.google.com/webstore/detail/hello/olenfgbgcphkaipfeohfjpagibimmpke";
const screenshot1Width = 1280;
const screenshot1Height = 800;

export const Article = () => (
  <>
    <P>
      I made a <Link href={storeLink}>Chrome extension</Link> that replaces your new tab with widgets and fresh image
      every day.
    </P>

    <P>
      The daily new image is from bing.com, in case you are offline there is dozen of nice wallpapers from nature that I
      liked.
    </P>

    <P>
      You can also display a widget in front. Some are traditional, like a clock, some are meant to motivate you a
      little.
    </P>

    <Image
      src={screenshot1}
      alt="Hello extension with clock widget"
      width={screenshot1Width}
      height={screenshot1Height}
    />

    <P>
      <Strong>
        Download on <Link href={storeLink}>Chrome web store</Link>.
      </Strong>
    </P>

    <H1>Links</H1>

    <List>
      <Li>
        <Link href={storeLink}>Chrome web store</Link> where you can install it.
      </Li>
      <Li>
        <Link href="https://hello-extension.netlify.app">Live preview</Link> that you can run in your browser without
        installing the extension.
      </Li>
      <Li>
        <Link href="https://github.com/hurtak/hello">GitHub</Link> in case you want to check out the code, the extension
        is open-source.
      </Li>
    </List>
  </>
);
