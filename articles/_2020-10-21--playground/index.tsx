import { Diagram, H1 } from "../components";

export const Article = () => (
  <>
    <H1>Diagram</H1>

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
