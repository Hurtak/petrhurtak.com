import * as React from "react";
import renderer from "react-test-renderer";
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

    expect(renderer.create(c).toJSON()).toMatchSnapshot();
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
