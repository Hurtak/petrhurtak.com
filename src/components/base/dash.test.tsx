import { renderToStaticMarkup } from "react-dom/server";
import { describe, expect, test } from "vitest";

import { Dash, mDashString, nDashString } from "./dash";

describe("dash", () => {
  test("dash strings are correct", () => {
    expect(nDashString).toEqual("–");
    expect(mDashString).toEqual("—");
  });

  test("dash component snapshot", () => {
    expect(renderToStaticMarkup(<Dash />)).toMatchInlineSnapshot('"–"');
    expect(renderToStaticMarkup(<Dash long />)).toMatchInlineSnapshot('"—"');
  });
});
