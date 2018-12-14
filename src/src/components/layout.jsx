import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import { Link, StaticQuery } from "gatsby";
import styled, { createGlobalStyle } from "styled-components";
import HtmlComment from "./html-comment";
import * as s from "../common/styles.js";
import { capitalize } from "../utils/text-formatting";
import config from "../../config/site-config";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Layout = props => (
  <StaticQuery
    query={graphql`
      query {
        site {
          buildTime(formatString: "YYYY/MM/DD HH:MM:SS Z")
        }
      }
    `}
    render={data => (
      <>
        <HtmlComment>{`build time: ${data.site.buildTime}`}</HtmlComment>
        <GlobalStyles />

        <Page>
          <Helmet>
            <title>
              {(() => {
                const pageName = props.pageTitle
                  ? capitalize(props.pageTitle)
                  : "";
                const nDash = "\u2013";
                const siteName = capitalize(config.siteUrlShort);

                return pageName + (pageName ? ` ${nDash} ` : "") + siteName;
              })()}
            </title>
          </Helmet>

          <Header>
            <PageLayout>
              <HeaderContent>
                <Link to="/">
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
                      <Link to="/">
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
              <PageMain>{props.children}</PageMain>

              <Footer>
                <FooterParagraph>
                  {config.yearFound}&ndash;
                  {config.yearCurrent}
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
      </>
    )}
  />
);
export default Layout;

const Page = styled.div({
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

const PageLayoutWrapper = styled.div({
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

const PageLayoutContent = styled.div({
  display: "flex",
  flexGrow: 1,
  width: "100%",
  maxWidth: s.size(700)
});

const PageContent = styled.div({
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

const PageMain = styled.main({
  flexGrow: 1, // To make footer sticky
  width: "100%"
});

const Header = styled.header({
  display: "flex",
  width: "100%",
  paddingTop: s.grid(8),
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: s.colors.blueMain
});

const HeaderContent = styled.div({
  ...s.dimensions.content,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  width: "100%"
});

const HeaderLogo = styled.a({
  display: "block",
  userSelect: "none"
});

const HeaderLogoImage = styled.img({
  display: "block",
  width: s.size(130),
  height: s.size(55),
  margin: `${s.size(20)} ${s.size(80)}`
});

const HeaderMenu = styled.nav({
  width: "100%"
});

const Menu = styled.ul({
  display: "flex",
  justifyContent: "space-between",
  listStyleType: "none",
  margin: 0,
  padding: 0,
  [s.breakpoints.menu]: {
    flexDirection: "column"
  }
});

const MenuItem = styled.li({
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

const MenuItemLinkWrapper = styled.a(menuItemLinkClass, {
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

const MenuItemLinkIconWrapper = styled.div({
  boxSizing: "border-box",
  marginRight: s.grid(1),
  width: s.size(20),
  height: s.size(20)
});

const MenuItemLinkIconImg = styled.img({
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "contain",
  [`.${menuItemLinkClass}:hover &`]: {
    filter: "invert(1)"
  }
});

const Footer = styled.footer({
  width: "100%",
  paddingTop: s.grid(8)
});

const FooterParagraph = styled.p(
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

const FooterParagraphLink = styled.a({
  ...s.fonts.paragraphSmall,
  lineHeight: 1,
  color: s.colors.blueDark,
  textDecoration: "none"
});
