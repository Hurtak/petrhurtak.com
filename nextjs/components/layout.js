import React from "react";
import PropTypes from "prop-types";
import glamorous from "glamorous";
import * as s from "./styles.js";

const config = {
  yearFound: 2015,
  yearCurrent: new Date().getFullYear()
};

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    return (
      <Page>
        {/* {% include 'components/header.njk' %} */}
        <PageCentered>
          <PageMain>{this.props.children}</PageMain>

          <Footer>
            <FooterParagraph>2015&ndash;{config.yearCurrent}</FooterParagraph>
            <FooterParagraph author>
              Written by{" "}
              <FooterParagraphLink href="mailto:petr.hurtak@gmail.com">
                Petr Huřťák
              </FooterParagraphLink>
            </FooterParagraph>
          </Footer>

          {/* {% include 'components/footer.njk' %} */}
        </PageCentered>
      </Page>
    );
  }
}

const Page = glamorous.div({
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
  minHeight: "100vh",
  textRendering: "optimizeLegibility" /* TODO: is this doing anyting? */
  /* TODO http://usabilitypost.com/2012/11/05/stop-fixing-font-smoothing/ */
});

const PageCentered = glamorous.div({
  display: "flex",
  flex: 1,
  flexDirection: "column",
  width: "100%",

  /* TODO: move into mixin once they are avaliable - same code used in header.css & page.css */
  padding: `0 ${s.dimensions.contentSpacing}`,
  maxWidth: s.dimensions.contentMaxWidth
});

const PageMain = glamorous.main({
  flex: 1 // To make footer sticky
});

const Footer = glamorous.footer({
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
    if (props.author) {
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
