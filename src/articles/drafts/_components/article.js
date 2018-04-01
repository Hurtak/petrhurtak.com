import React from "react";
import {
  ArticleWrapper,
  H1,
  H2,
  List,
  Li,
  Link,
  P,
  Q,
  Diagram,
  Code
} from "../../../components/article.js";

class ComponentName extends React.Component {
  render() {
    return (
      <div>
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
      </div>
    );
  }
}
