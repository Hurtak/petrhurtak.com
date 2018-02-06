import React from "react";
import PropTypes from "prop-types";
import { rehydrate, css } from "glamor";
import glamorous from "glamorous";
import * as s from "./styles.js";

const config = {
  yearFound: 2015,
  yearCurrent: new Date().getFullYear()
};

// Adds server generated styles to glamor cache.
// Has to run before any `style()` calls
// '__NEXT_DATA__.ids' is set in '_document.js'
if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}
s.globals.forEach(({ selector, definitions }) => {
  css.global(selector, definitions);
});

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <Page>
        <Header>
          <HeaderContent>
            <HeaderLogo href="/">
              <HeaderLogoImage
                className="Header-logo-image"
                src="/static/images/logo.svg"
                width="130"
                height="55"
                alt="{{ globals.siteUrlShort | capitalize }} logo"
              />
            </HeaderLogo>

            <HeaderMenu>
              <Menu>
                <MenuItem>
                  <MenuItemLink
                    className="Menu-item-link Menu-item-link--articles"
                    href="/"
                  >
                    Articles
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    className="Menu-item-link Menu-item-link--twitter"
                    href="https://twitter.com/PetrHurtak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    className="Menu-item-link Menu-item-link--github"
                    href="https://github.com/Hurtak"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Github
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    className="Menu-item-link Menu-item-link--rss"
                    href="/rss.xml"
                    rel="alternate"
                    type="application/rss+xml"
                  >
                    RSS
                  </MenuItemLink>
                </MenuItem>
              </Menu>
            </HeaderMenu>
          </HeaderContent>
        </Header>

        <PageCentered>
          <PageMain>{this.props.children}</PageMain>

          <Footer>
            <FooterParagraph>2015&ndash;{config.yearCurrent}</FooterParagraph>
            <FooterParagraph withMarginTop>
              Written by{" "}
              <FooterParagraphLink href="mailto:petr.hurtak@gmail.com">
                Petr Huřťák
              </FooterParagraphLink>
            </FooterParagraph>
          </Footer>
        </PageCentered>
      </Page>
    );
  }
}

const limitedWidthWithPadding = {
  paddingLeft: s.dimensions.contentSpacing,
  paddingRight: s.dimensions.contentSpacing,
  maxWidth: s.dimensions.contentMaxWidth,
  width: "100%"
};

const Page = glamorous.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  textRendering: "optimizeLegibility" /* TODO: is this doing anyting? */
  /* TODO http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/ */
});

const PageCentered = glamorous.div({
  ...limitedWidthWithPadding,
  display: "flex",
  flex: 1,
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
});

const PageMain = glamorous.main({
  flex: 1, // To make footer sticky
  width: "100%"
});

const Header = glamorous.header({
  display: "flex",
  width: "100%",
  paddingTop: s.grid(7.5), // TODO
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: s.colors.blueMain
});

const HeaderContent = glamorous.div({
  ...limitedWidthWithPadding,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
});

const HeaderLogo = glamorous.a({
  display: "block"
});

const HeaderLogoImage = glamorous.img({
  display: "block",
  width: s.size(130),
  height: s.size(55),
  margin: `${s.size(20)} ${s.size(80)}`
});

const HeaderMenu = glamorous.nav({
  width: "100%"
});

const Menu = glamorous.ul({
  display: "flex",
  listStyleType: "none",
  margin: 0,
  padding: 0
});

const MenuItem = glamorous.li({
  width: "25%",
  textAlign: "center",
  userSelect: "none"
});

const MenuItemLink = glamorous.a({
  ...s.fonts.headingSmall,
  display: "block",
  color: "black",
  padding: `${s.grid(3)} 0`,
  borderRadius: s.dimensions.borderRadius,
  textDecoration: "none"
});

const Footer = glamorous.footer({
  width: "100%",
  padding: `${s.grid(8)} 0 ${s.grid(2)}`
});

const FooterParagraph = glamorous.p(
  {
    ...s.fonts.paragraphSmall,
    margin: 0,
    lineHeight: 1,
    textAlign: "center"
  },
  props => {
    if (props.withMarginTop) {
      return {
        marginTop: s.grid(1)
      };
    }
  }
);

const FooterParagraphLink = glamorous.a({
  ...s.fonts.paragraphSmall,
  lineHeight: 1,
  color: s.colors.blueDark,
  textDecoration: "none"
});

export default Layout;
