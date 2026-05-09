import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import { Diagram, trimEmptyEdgeLines } from "./diagram";

describe("Diagram", () => {
  test("Diagram component snapshot", () => {
    const c = (
      <Diagram>{`
        ┌─┬─┐
        │ │ │
        ├─┼─┤
        │ │ │
        └─┴─┘
      `}</Diagram>
    );

    expect(renderToStaticMarkup(c)).toMatchSnapshot();
  });
});

describe("trimEmptyEdgeLines", () => {
  test("trims the edge lines", () => {
    expect(
      trimEmptyEdgeLines(`
        x
      `),
    ).toMatchInlineSnapshot('"        x"');
  });

  test("trims only one line from each edge", () => {
    expect(
      trimEmptyEdgeLines(`

        x

      `),
    ).toMatchInlineSnapshot(`
      "
              x
      "
    `);
  });

  test("does not trim when edge lines are not empty", () => {
    expect(trimEmptyEdgeLines(` x `)).toMatchInlineSnapshot('" x "');
    expect(
      trimEmptyEdgeLines(
        `x
x
x`,
      ),
    ).toMatchInlineSnapshot(`
      "x
      x
      x"
    `);
  });
});
