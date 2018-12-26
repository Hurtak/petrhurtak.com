import React from "react";
import PropTypes from "prop-types";
import Helmet from "react-helmet";
import styled, { createGlobalStyle } from "styled-components";
import HtmlComment from "./html-comment.jsx";
import Link from "./link.jsx";
import * as s from "../common/styles.js";
import { capitalize } from "../utils/text-formatting.js";
import config from "../config/site-config";

const GlobalStyles = createGlobalStyle`
  body {
    margin: 0;
  }
`;

const Layout = props => (
  <>
    <HtmlComment>{`build time: XXX`}</HtmlComment>
    <GlobalStyles />

    <Page>
      <Helmet>
        <title>
          {(() => {
            const pageName = props.pageTitle ? capitalize(props.pageTitle) : "";
            const nDash = "\u2013";
            const siteName = capitalize(config.siteUrlShort);

            return pageName + (pageName ? ` ${nDash} ` : "") + siteName;
          })()}
        </title>
      </Helmet>

      <Header>
        <PageLayout>
          <HeaderContent>
            <HeaderLogoLink to="/">
              <HeaderLogoImage
                className="Header-logo-image"
                src="/static/images/logo.svg"
                width="130"
                height="55"
                alt={`${config.siteUrlShort} logo`}
              />
            </HeaderLogoLink>

            <HeaderMenu>
              <Menu>
                <MenuItem>
                  <MenuItemLink
                    to="/"
                    icon={
                      <MenuItemLinkIcon
                        src="/static/images/article.svg"
                        alt="Article"
                        padding={0.5}
                      />
                    }
                  >
                    Articles
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    to="https://twitter.com/PetrHurtak"
                    icon={
                      <MenuItemLinkIcon
                        src="/static/images/twitter.svg"
                        alt="Twitter"
                      />
                    }
                    target="_blank"
                  >
                    Twitter
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    to="https://github.com/Hurtak"
                    icon={
                      <MenuItemLinkIcon
                        src="/static/images/github.svg"
                        alt="Github"
                        padding={1}
                      />
                    }
                    target="_blank"
                  >
                    Github
                  </MenuItemLink>
                </MenuItem>
                <MenuItem>
                  <MenuItemLink
                    to="/rss"
                    icon={
                      <MenuItemLinkIcon
                        src="/static/images/rss.svg"
                        alt="RSS"
                        padding={2}
                      />
                    }
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
              <FooterParagraphLink to="mailto:petr.hurtak@gmail.com">
                Petr Huřťák
              </FooterParagraphLink>
            </FooterParagraph>
          </Footer>
        </PageContent>
      </PageLayout>
    </Page>
  </>
);
Layout.propTypes = {
  pageTitle: PropTypes.string,
  children: PropTypes.node.isRequired
};
export default Layout;

const Page = styled.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  textRendering: "optimizeLegibility" // TODO: is this doing anyting?
  // TODO: http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/
});

const PageLayout = props => (
  <PageLayoutWrapper>
    <PageLayoutContent>{props.children}</PageLayoutContent>
  </PageLayoutWrapper>
);
PageLayout.propTypes = {
  children: PropTypes.node.isRequired
};

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

const HeaderLogoLink = styled(Link)({
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

const MenuItemLink = props => {
  const { icon, children, ...restProps } = props;

  return (
    <MenuItemLinkWrapper {...restProps}>
      {icon}
      {children}
    </MenuItemLinkWrapper>
  );
};
MenuItemLink.propTypes = {
  icon: PropTypes.element.isRequired,
  children: PropTypes.string.isRequired
};

// TODO: item hovering does not work -- this broken menuItemLinkClass
// also there is Mmargin: 0 style generated??
const MenuItemLinkWrapper = styled(Link)(menuItemLinkClass, {
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

const MenuItemLinkIcon = props => {
  const { padding, ...restProps } = props;

  return (
    <MenuItemLinkIconWrapper padding={padding}>
      <MenuItemLinkIconImg {...restProps} />
    </MenuItemLinkIconWrapper>
  );
};
MenuItemLinkIcon.propTypes = {
  padding: PropTypes.number
};

const MenuItemLinkIconWrapper = styled.div`
  box-sizing: border-box;
  margin-right: ${s.grid(1)};
  width: ${s.size(20)};
  height: ${s.size(20)};
  padding: ${props => s.size(props.padding)};
`;
MenuItemLinkIconWrapper.propTypes = {
  padding: PropTypes.number
};
MenuItemLinkIconWrapper.defaultProps = {
  padding: 0
};

const MenuItemLinkIconImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;

  /* TODO: does not work */
  .${menuItemLinkClass}:hover & {
    filter: invert(1);
  }
`;

const Footer = styled.footer`
  width: 100%;
  padding-top: ${s.grid(8)};
`;

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

const FooterParagraphLink = styled(Link)`
  ${s.fonts.paragraphSmall};

  line-height: 1;
  color: ${s.colors.blueDark};
  text-decoration: none;
`;
