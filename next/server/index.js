require("babel-register")({
  presets: [
    [
      "env",
      {
        targets: {
          node: "8"
        }
      }
    ],
    "next/babel"
  ],
  plugins: ["glamorous-displayname"]
});

require("./server.js");
