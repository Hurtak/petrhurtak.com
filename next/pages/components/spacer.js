import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "./styles.js";

export default class Spacer extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const children = React.Children.toArray(this.props.children);

    return children.map((item, index) => {
      return (
        <SpacerItem
          key={item.key}
          css={{ marginTop: index === 0 ? null : s.grid(1) }}
        >
          {item}
        </SpacerItem>
      );
    });
  }
}

const SpacerItem = glamorous.div({});
