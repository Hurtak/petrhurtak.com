import { config } from "../../config";
import { gridCss, sizeCss } from "../../styles";

export const Layout = ({ children }: { children: React.ReactNode }) => (
  <>
    <div className="layout">
      <main>{children}</main>

      <footer>
        {config.site.yearFounded}–{new Date().getFullYear()}
        <br />
        Written by {config.author.fullName}
      </footer>
    </div>

    <style jsx>{`
      .layout {
        box-sizing: border-box;
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: 1fr;
        min-width: ${sizeCss(400)};
        max-width: ${sizeCss(700)};
        min-height: 100vh; // (sticky)
        margin: 0 auto;
        padding: ${gridCss(3)} ${gridCss(2)};
      }

      main {
        flex-grow: 1; // (sticky) To make footer sticky, in case of content being smaller than screen height
        overflow: auto;
      }

      footer {
        padding-top: ${gridCss(2)};
        text-align: center;
      }
    `}</style>
  </>
);
