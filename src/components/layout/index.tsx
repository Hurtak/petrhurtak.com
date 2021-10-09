import { config } from "../../config";
import * as s from "../../styles";

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
        min-width: 400px;
        max-width: 700px;
        min-height: 100vh; // (sticky)
        margin: 0 auto;
        padding: ${s.gridCss(3)} ${s.gridCss(2)};
      }

      main {
        flex-grow: 1; // (sticky) To make footer sticky, in case of content being smaller than screen height
      }

      footer {
        padding-top: ${s.gridCss(2)};
        text-align: center;
      }
    `}</style>
  </>
);
