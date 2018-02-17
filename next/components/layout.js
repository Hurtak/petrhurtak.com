import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import Head from "next/head";
import { rehydrate } from "glamor";
import glamorous from "glamorous";
import config from "../common/config.js";
import * as s from "../common/styles.js";

// Adds server generated styles to glamor cache. Has to run before any `style()`
// calls. '__NEXT_DATA__.ids' is set in '_document.js'.
if (typeof window !== "undefined") {
  rehydrate(window.__NEXT_DATA__.ids);
}
s.initGlobalStyles();

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    pageTitle: PropTypes.string
  };

  render() {
    return (
      <Page>
        <Head>
          <title>
            {(() => {
              const pageName = this.props.pageTitle
                ? capitalize(this.props.pageTitle)
                : "";
              const nDash = "\u2013";
              const siteName = capitalize(config.siteUrlShort);

              return pageName + (pageName ? ` ${nDash} ` : "") + siteName;
            })()}
          </title>
        </Head>

        <Header>
          <PageLayout>
            <HeaderContent>
              <Link href="/">
                <HeaderLogo href="/">
                  <HeaderLogoImage
                    className="Header-logo-image"
                    src="/static/images/logo.svg"
                    width="130"
                    height="55"
                    alt={`${config.siteUrlShort} logo`}
                  />
                </HeaderLogo>
              </Link>

              <HeaderMenu>
                <Menu>
                  <MenuItem>
                    <Link href="/">
                      <MenuItemLink
                        icon={
                          <MenuItemLinkIcon
                            src="/static/images/article.svg"
                            alt="Article"
                            padding={0.5}
                          />
                        }
                        href="/"
                      >
                        Articles
                      </MenuItemLink>
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <MenuItemLink
                      icon={
                        <MenuItemLinkIcon
                          src="/static/images/twitter.svg"
                          alt="Twitter"
                        />
                      }
                      href="https://twitter.com/PetrHurtak"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Twitter
                    </MenuItemLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuItemLink
                      icon={
                        <MenuItemLinkIcon
                          src="/static/images/github.svg"
                          alt="Github"
                          padding={1}
                        />
                      }
                      href="https://github.com/Hurtak"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Github
                    </MenuItemLink>
                  </MenuItem>
                  <MenuItem>
                    <MenuItemLink
                      icon={
                        <MenuItemLinkIcon
                          src="/static/images/rss.svg"
                          alt="RSS"
                          padding={2}
                        />
                      }
                      href="/rss"
                      rel="alternate"
                      type="application/rss+xml"
                    >
                      RSS
                    </MenuItemLink>
                  </MenuItem>
                </Menu>
              </HeaderMenu>
            </HeaderContent>
          </PageLayout>
        </Header>

        <PageLayout>
          <PageContent>
            <PageMain>{this.props.children}</PageMain>

            <Footer>
              <FooterParagraph>
                {config.yearFound}&ndash;{config.yearCurrent}
              </FooterParagraph>
              <FooterParagraph withMarginTop>
                Written by{" "}
                <FooterParagraphLink href="mailto:petr.hurtak@gmail.com">
                  Petr Huřťák
                </FooterParagraphLink>
              </FooterParagraph>
            </Footer>
          </PageContent>
        </PageLayout>
      </Page>
    );
  }
}

function capitalize(str) {
  return str[0].toUpperCase() + str.slice(1);
}

const Page = glamorous.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  textRendering: "optimizeLegibility" /* TODO: is this doing anyting? */
  /* TODO http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/ */
});

class PageLayout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <PageLayoutWrapper>
        <PageLayoutContent>{this.props.children}</PageLayoutContent>
      </PageLayoutWrapper>
    );
  }
}

const PageLayoutWrapper = glamorous.div({
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

const PageLayoutContent = glamorous.div({
  display: "flex",
  flexGrow: 1,
  width: "100%",
  maxWidth: s.size(700)
});

const PageContent = glamorous.div({
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

const PageMain = glamorous.main({
  flexGrow: 1, // To make footer sticky
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
  ...s.dimensions.content,
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
  justifyContent: "space-between",
  listStyleType: "none",
  margin: 0,
  padding: 0
});

const MenuItem = glamorous.li({
  userSelect: "none"
});

const menuItemLinkClass = "MenuItemLink";

class MenuItemLink extends React.Component {
  static propTypes = {
    icon: PropTypes.element.isRequired,
    children: PropTypes.string.isRequired
  };

  render() {
    const { icon, children, ...restProps } = this.props;

    return (
      <MenuItemLinkWrapper {...restProps}>
        {icon}
        {children}
      </MenuItemLinkWrapper>
    );
  }
}

const MenuItemLinkWrapper = glamorous.a(menuItemLinkClass, {
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
  }
});

class MenuItemLinkIcon extends React.Component {
  static propTypes = {
    padding: PropTypes.number
  };

  render() {
    const { padding, ...restProps } = this.props;

    return (
      <MenuItemLinkIconWrapper
        style={{
          padding: s.size(padding)
        }}
      >
        <MenuItemLinkIconImg {...restProps} />
      </MenuItemLinkIconWrapper>
    );
  }
}

const MenuItemLinkIconWrapper = glamorous.div({
  boxSizing: "border-box",
  marginRight: s.grid(1),
  width: s.size(20),
  height: s.size(20)
});

const MenuItemLinkIconImg = glamorous.img({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  [`.${menuItemLinkClass}:hover &`]: {
    filter: "invert(1)"
  }
});

const Footer = glamorous.footer({
  width: "100%",
  paddingTop: s.grid(8)
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
