import React from "react";
import Helmet from "react-helmet";
import {
  Page,
  Header,
  HeaderContent,
  HeaderLogoLink,
  HeaderLogoImage,
  HeaderMenu,
  Menu,
  MenuItem,
  MenuItemLink,
  MenuItemLinkIcon,
  PageContent,
  PageMain,
  Footer,
  FooterParagraph,
  FooterParagraphLink,
  PageLayoutWrapper,
  PageLayoutContent
} from "./styled";
import { GlobalStyles } from "../../styles/styles-global";
import { capitalize } from "../../common/text-formatting";
import { config } from "../../config/site-config";
import { routes } from "../../config/routes";

import imageLogo from "../../../images/logo.svg";
import imageArticle from "../../../images/article.svg";
import imageTwitter from "../../../images/twitter.svg";
import imageGithub from "../../../images/github.svg";
import imageRss from "../../../images/rss.svg";

export const Layout = (props: {
  pageTitle?: string;
  children: React.ReactNode;
}) => (
  <>
    <Helmet>
      <title>{capitalize(config.siteUrlShort)}</title>
    </Helmet>

    <GlobalStyles />

    <Page>
      <Header>
        <PageLayout>
          <HeaderContent>
            <HeaderLogoLink to={routes.index}>
              <HeaderLogoImage
                className="Header-logo-image"
                src={imageLogo}
                width="130"
                height="55"
                alt={`${config.siteUrlShort} logo`}
              />
            </HeaderLogoLink>

            <HeaderMenu>
              <Menu>
                <MenuItem>
                  <MenuItemLink
                    to={routes.index}
                    icon={
                      <MenuItemLinkIcon
                        src={imageArticle}
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
                    icon={<MenuItemLinkIcon src={imageTwitter} alt="Twitter" />}
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
                        src={imageGithub}
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
                    to={routes.rss}
                    icon={
                      <MenuItemLinkIcon src={imageRss} alt="RSS" padding={2} />
                    }
                    rel="alternate"
                    type="application/rss+xml"
                    rawLink
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

const PageLayout = (props: { children: React.ReactNode }) => (
  <PageLayoutWrapper>
    <PageLayoutContent>{props.children}</PageLayoutContent>
  </PageLayoutWrapper>
);
