import React from "react";
import { H1, P, Link, List, Li, Bold, Image } from "../../components";
import screenshot1 from "./images/screenshot-1.png";

const storeLink = "https://chrome.google.com/webstore/detail/hello/olenfgbgcphkaipfeohfjpagibimmpke";

export default () => (
  <>
    <P>
      I made <Link href={storeLink}>Chrome extension</Link> that replaces your new tab with widgets and fresh image
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

    <Image src={screenshot1} alt="" width={1280} height={800} />

    <P>
      <Bold>
        Download on <Link href={storeLink}>Chrome web store</Link>.
      </Bold>
    </P>

    <H1>Links</H1>

    <List>
      <Li>
        <Link href={storeLink}>Chrome web store</Link> where you can install it.
      </Li>
      <Li>
        <Link href="https://hello-extension.netlify.com">Live preview</Link> that you can run in your browser without
        installing the extension.
      </Li>
      <Li>
        <Link href="https://github.com/hurtak/hello">GitHub</Link> in case you want to checkout the code, the extension
        is open-source.
      </Li>
    </List>
  </>
);
