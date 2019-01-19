import React from "react";
import styled from "@emotion/styled/macro";
import * as s from "../../common/styles";

export const Table = (props: {
  // TODO: children only table rows
  heading?: React.ReactNode;
  children: React.ReactNode;
}) => {
  const heading = (() => {
    const headingProp = props.heading;
    if (!headingProp) return null;

    const headingRow = React.Children.map(props.heading, (child: any) =>
      React.cloneElement(child, { heading: true })
    );

    return headingRow;
  })();

  return (
    <TableStyled>
      {heading && <thead>{heading}</thead>}
      <tbody>{props.children}</tbody>
    </TableStyled>
  );
};

const TableStyled = styled.table({
  margin: `${s.dimensions.paragraphSpacing} 0 0 0`,
  borderCollapse: "collapse"
});

export const Tr = ({
  heading = false,
  children
}: {
  // TODO: child oly TableCell

  // Children are not required because we might have empty filler cells.
  heading?: boolean;
  children: React.ReactNode;
}) => {
  const cells = React.Children.map(children, (child: any) =>
    React.cloneElement(child, { heading })
  );

  return <tr>{cells}</tr>;
};

export const Tc = ({
  heading = false,
  noWrap = false,
  center = false,
  style,
  children
}: {
  heading?: boolean;
  noWrap?: boolean;
  center?: boolean;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) => {
  const Component = heading ? TableCellHeadingStyled : (TableCellStyled as any);

  return (
    <Component noWrap={noWrap} center={center} style={style}>
      {children}
    </Component>
  );
};

const tableCellSharedStyles = {
  ...s.fonts.paragraphSmall,
  border: `${s.size(1)} solid ${s.colors.grayLight}`,
  padding: s.grid(1)
};

const tableCellSharedProps = (props: { noWrap: boolean; center: boolean }) => {
  let styles = [];
  if (props.noWrap) {
    styles.push({
      whiteSpace: "nowrap"
    });
  }
  if (props.center) {
    styles.push({
      textAlign: "center"
    });
  }
  return styles;
};

const TableCellStyled = styled.td(
  {
    ...tableCellSharedStyles
  },
  tableCellSharedProps as any
);

const TableCellHeadingStyled = styled.th(
  {
    ...tableCellSharedStyles,
    ...s.fonts.headingTable,
    fontWeight: "bold",
    textAlign: "center"
  },
  tableCellSharedProps as any
);