import React from "react";
import { Diagram } from "../../components";

export default () => (
  <>
    <Diagram>{`
      ┌─┬─┐
      │ │ │
      ├─┼─┤
      │ │ │
      └─┴─┘
      ╔═╦═╗
      ║ ║ ║
      ╠═╬═╣
      ║ ║ ║
      ╚═╩═╝
    `}</Diagram>
  </>
);
