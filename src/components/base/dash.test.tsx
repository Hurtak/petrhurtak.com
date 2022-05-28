import * as React from "react";
import renderer from "react-test-renderer";
import { describe, expect, test } from "vitest";

import { Dash, mDashString, nDashString } from "./dash";

describe("dash", () => {
  test("dash strings are correct", () => {
    expect(nDashString).toEqual("–");
    expect(mDashString).toEqual("—");
  });

  test("dash component snapshot", () => {
    expect(renderer.create(<Dash />).toJSON()).toMatchInlineSnapshot('"–"');
    expect(renderer.create(<Dash long />).toJSON()).toMatchInlineSnapshot('"—"');
  });
});
