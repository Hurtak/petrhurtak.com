import * as React from "react";

import { config, routes } from "../../config";
import { gridCss, sizeCss } from "../../styles";
import { Dash, Link } from "..";

export const LayoutPage = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="layout">
      <header>
        <Link href={routes.root}>{config.site.domain}</Link>
      </header>

      <main>{children}</main>

      <footer>
        {config.site.yearFounded}
        <Dash />
        {new Date().getFullYear()}
        <br />
        Written by {config.author.fullName}
      </footer>
    </div>

    <style jsx>{`
      .layout {
        box-sizing: border-box;
        display: grid;
        grid-template-areas:
          "header"
          "main"
          "footer";
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;
        min-width: ${sizeCss(400)};
        max-width: ${sizeCss(600)};
        min-height: 100vh; // (sticky)
        margin: 0 auto;
        padding: ${gridCss(3)} ${gridCss(2)};
      }

      header {
        grid-area: header;
        display: flex;
        flex-direction: row;
        padding-bottom: ${gridCss(2)};
      }

      main {
        grid-area: main;
        flex-grow: 1; // (sticky) To make footer sticky, in case of content being smaller than screen height
        display: flex;
        flex-direction: column;
        overflow: auto;
      }

      footer {
        grid-area: footer;
        padding-top: ${gridCss(2)};
        text-align: center;
      }
    `}</style>
  </>
);
