import { ReactNode } from "react";

import { config, routes } from "../../config";
import { gridCss, gridNumber, sizeCss } from "../../styles";
import { Dash } from "../base/dash";
import { Link } from "../base/link";
import { parseSvgImage } from "../utils";
import logo from "./logo.svg";

export const LayoutPage = ({ children }: { children: ReactNode }) => (
  <>
    <div className="layout">
      <header>
        <Link href={routes.root}>
          <img
            width={gridNumber(2.5)}
            height={gridNumber(2.5)}
            src={parseSvgImage(logo).src}
            alt={`${config.site.domain} site logo`}
          />
        </Link>
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
      :global(body) {
        /*
        Always show Y scrollbar on whole layout to prevent content jumping
        when switching between scrollbar and non scrollbar pages.
        */
        overflow-y: scroll;
      }

      .layout {
        box-sizing: border-box;
        display: grid;
        grid-template-areas:
          "header"
          "main"
          "footer";
        grid-template-rows: auto 1fr auto;
        grid-template-columns: 1fr;
        min-width: var(--layout-min-width, ${sizeCss(400)});
        max-width: var(--layout-max-width, ${sizeCss(600)});
        min-height: 100vh; // (sticky)
        margin: 0 auto;
        padding: var(--layout-padding, ${gridCss(3)} ${gridCss(2)});
      }

      header {
        grid-area: header;
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: ${gridCss(1)};
        padding-bottom: ${gridCss(3)};
      }

      main {
        grid-area: main;
        flex-grow: 1; // (sticky) To make footer sticky, in case of content being smaller than screen height
        display: flex;
        flex-direction: column;
        overflow-x: auto;
      }

      footer {
        grid-area: footer;
        padding-top: ${gridCss(2)};
        text-align: center;
      }
    `}</style>
  </>
);
