const path = require("path");
const componentWithMDXScope = require("gatsby-mdx/component-with-mdx-scope");
const _ = require("lodash");

// exports.onCreateNode = ({ node, actions }) => {
//   const { createNodeField } = actions;
//   let slug;
//   if (node.internal.type === "MarkdownRemark") {
//     if (
//       Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
//       Object.prototype.hasOwnProperty.call(node.frontmatter, "slug")
//     ) {
//       slug = `/${_.kebabCase(node.frontmatter.slug)}`;
//     }
//     if (
//       Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
//       Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
//     ) {
//       slug = `/${_.kebabCase(node.frontmatter.title)}`;
//     }
//     createNodeField({ node, name: "slug", value: slug });
//   }
// };

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    // const categoryPage = path.join(
    //   __dirname,
    //   "src/pages-generated/category.js"
    // );

    resolve(
      graphql(`
        {
          articles: allMdx {
            edges {
              node {
                id
                frontmatter {
                  title
                  url
                  description
                  dateLastUpdate
                }
                code {
                  scope
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          process.stdout.write(result.errors + "\n");
          reject(result.errors);
          return;
        }

        const articles = result.data.articles.edges;

        articles.forEach((edge, index) => {
          const next = index === 0 ? null : articles[index - 1].node;
          const prev =
            index === articles.length - 1 ? null : articles[index + 1].node;

          createPage({
            path: edge.node.frontmatter.url,
            // component: componentWithMDXScope(
            //   path.join(__dirname, "src/pages-generated/article.jsx"),
            //   edge.node.code.scope
            // ),
            component: path.join(__dirname, "src/pages-generated/article.jsx"),

            context: {
              id: edge.node.id,
              url: edge.node.frontmatter.url,
              prev,
              next
            }
          });
        });

        // let categories = [];

        // _.each(articles, edge => {
        //   if (_.get(edge, "node.frontmatter.category")) {
        //     categories = categories.concat(edge.node.frontmatter.category);
        //   }
        // });

        // categories = _.uniq(categories);

        // categories.forEach(category => {
        //   createPage({
        //     path: `/categories/${_.kebabCase(category)}`,
        //     component: categoryPage,
        //     context: {
        //       category
        //     }
        //   });
        // });
      })
    );
  });
};

exports.onCreateWebpackConfig = ({ stage, actions }) => {
  actions.setWebpackConfig({
    resolve: {
      modules: [path.join(__dirname, "src"), "node_modules"]
    }
  });
};
