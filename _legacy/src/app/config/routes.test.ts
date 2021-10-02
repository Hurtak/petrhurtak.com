import * as fs from "fs";
import * as path from "path";

import { routes } from "./routes";

it("hidden route exists", () => {
  expect(routes.hidden).toBeTruthy();
});

it("hidden route in robots.txt", () => {
  const robotsTxt = fs.readFileSync(path.join(__dirname, "../../../public/robots.txt"), "utf8");

  expect(robotsTxt).toBeTruthy();

  const regex = new RegExp(`^Disallow: ${routes.hidden}$`, "m");
  expect(robotsTxt).toEqual(expect.stringMatching(regex));
});
