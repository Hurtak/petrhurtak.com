import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "../common/styles.js";

export default class Spacer extends React.Component {
  static propTypes = {
    spacing: PropTypes.number.isRequired,
    children: PropTypes.node.isRequired
  };

  render() {
    const children = React.Children.toArray(this.props.children);

    return children.map((item, index) => {
      return (
        <glamorous.Div
          key={item.key}
          css={{
            marginTop: index === 0 ? null : s.grid(this.props.spacing)
          }}
        >
          {item}
        </glamorous.Div>
      );
    });
  }
}
