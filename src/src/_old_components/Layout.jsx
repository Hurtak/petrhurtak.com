/* eslint no-unused-expressions:0 */

import React from "react";
import PropTypes from "prop-types";
import { StaticQuery, graphql } from "gatsby";
import styled, { ThemeProvider } from "styled-components";
import { SEO } from "./index";
import theme from "../../config/Theme";

const Footer = styled.footer`
  text-align: center;
  padding: 3rem 0;
  span {
    font-size: 0.75rem;
  }
`;

const Layout = ({ children }) => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          buildTime(formatString: "DD.MM.YYYY")
        }
      }
    `}
    render={data => (
      <ThemeProvider theme={theme}>
        <React.Fragment>
          <SEO />
          {children}
          <Footer>
            &copy; 2018 by John Doe. All rights reserved. <br />
            <a href="https://github.com/LekoArts/gatsby-starter-minimal-blog">
              GitHub Repository
            </a>{" "}
            <br />
            <span>Last build: {data.site.buildTime}</span>
          </Footer>
        </React.Fragment>
      </ThemeProvider>
    )}
  />
);

export default Layout;

Layout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.array, PropTypes.node]).isRequired
};
