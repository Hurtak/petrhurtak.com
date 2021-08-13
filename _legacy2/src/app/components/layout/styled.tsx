import React from "react";
import styled from "@emotion/styled/macro";
import { Link } from "../link";
import * as s from "../../styles/styles";

export const Page = styled.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh"
});

export const PageLayoutWrapper = styled.div({
  boxSizing: "border-box",
  display: "flex",
  flexGrow: 1,
  justifyContent: "center",
  padding: `0 ${s.grid(2)}`,
  width: "100%",
  [s.breakpoints.small]: {
    padding: `0 ${s.grid(1)}`
  }
});

export const PageLayoutContent = styled.div({
  display: "flex",
  flexGrow: 1,
  width: "100%",
  maxWidth: s.size(700)
});

export const PageContent = styled.div({
  display: "flex",
  flexDirection: "column",
  flexGrow: 1,
  width: "100%",
  paddingTop: s.grid(7),
  paddingBottom: s.grid(2),

  [s.breakpoints.medium]: {
    paddingTop: s.grid(5)
  },
  [s.breakpoints.small]: {
    paddingTop: s.grid(3)
  }
});

export const PageMain = styled.main({
  flexGrow: 1, // To make footer sticky
  width: "100%"
});

export const Header = styled.header({
  display: "flex",
  width: "100%",
  paddingTop: s.grid(8),
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: s.colors.blueMain
});

export const HeaderContent = styled.div({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
});

export const HeaderLogoLink = styled(Link)({
  display: "block",
  userSelect: "none"
});

export const HeaderLogoImage = styled.img({
  display: "block",
  width: s.size(130),
  height: s.size(55),
  margin: `${s.size(20)} ${s.size(80)}`
});

export const HeaderMenu = styled.nav({
  width: "100%"
});

export const Menu = styled.ul({
  display: "flex",
  justifyContent: "space-between",
  listStyleType: "none",
  margin: 0,
  padding: 0,
  [s.breakpoints.menu]: {
    flexDirection: "column"
  }
});

export const MenuItem = styled.li({
  userSelect: "none"
});

const menuItemLinkClass = "MenuItemLink";

export const MenuItemLink = ({
  icon,
  children,
  ...restProps
}: { icon: React.ReactNode; children: string } & any) => (
  <MenuItemLinkWrapper {...restProps}>
    {icon}
    {children}
  </MenuItemLinkWrapper>
);

// TODO: item hovering does not work -- this broken menuItemLinkClass
// also there is Mmargin: 0 style generated??
export const MenuItemLinkWrapper = styled(Link)({
  ...s.fonts.headingSmall,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
  padding: `${s.grid(3)} 0`,
  borderRadius: s.dimensions.borderRadius,
  textDecoration: "none",
  ":hover": {
    color: s.colors.white
  },
  [s.breakpoints.menu]: {
    justifyContent: "flex-start",
    padding: `${s.grid(1)} 0`
  }
});

export const MenuItemLinkIcon = ({
  src,
  alt,
  padding = 0
}: { padding?: number } & React.HTMLProps<HTMLImageElement>) => {
  const iconSizePx = 20;

  return (
    <MenuItemLinkIconWrapper iconSize={iconSizePx} padding={padding}>
      <MenuItemLinkIconImg
        src={src}
        alt={alt}
        width={iconSizePx}
        height={iconSizePx}
      />
    </MenuItemLinkIconWrapper>
  );
};

export const MenuItemLinkIconWrapper = styled.div(
  {
    boxSizing: "border-box",
    marginRight: s.grid(1)
  },
  (props: { padding: number; iconSize: number }) => {
    return {
      padding: s.size(props.padding),
      width: s.size(props.iconSize),
      height: s.size(props.iconSize)
    };
  }
);

export const MenuItemLinkIconImg = styled.img({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "contain",

  /* TODO: does not work */
  [`${menuItemLinkClass}:hover &`]: {
    filter: "invert(1)"
  }
});

export const Footer = styled.footer({
  width: "100%",
  paddingTop: s.grid(8)
});

export const FooterParagraph = styled.p(
  {
    ...s.fonts.paragraphSmall,
    margin: 0,
    lineHeight: 1,
    textAlign: "center"
  },
  (props: { withMarginTop?: boolean }) => {
    if (props.withMarginTop) {
      return {
        marginTop: s.grid(0.5)
      };
    }
  }
);

export const FooterParagraphLink = styled(Link)({
  ...s.fonts.paragraphSmall,
  lineGeight: 1,
  color: s.colors.blueDark,
  textDecoration: "none"
});
