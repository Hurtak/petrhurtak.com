import {
  P,
  Link,
  Bold,
  Italic,
  Quote,
  Dash
} from "../app/components/article/text";
import { H1, H2 } from "../app/components/article/headings";
import { List, Li } from "../app/components/article/list";
import { Table, Tr, Tc } from "../app/components/article/table";
import { Video } from "../app/components/article/video";
import { Image } from "../app/components/article/image";
import { Code, Diagram } from "../app/components/article/code";

export {
  P,
  Link,
  Bold,
  Italic,
  Quote,
  Dash,
  H1,
  H2,
  List,
  Li,
  Table,
  Tr,
  Tc,
  Video,
  Image,
  Code,
  Diagram
};

// TODO

// .Article-content mark {
//   background-color: var(--color-yellow);
// }

// .Article-content s {
//   text-decoration: line-through;
// }

// TODO: probably not used?
// export class Small extends React.Component {
//   static propTypes = {
//     children: PropTypes.string.isRequired
//   };

//   render() {
//     return <SmallComponent>{this.props.children}</SmallComponent>;
//   }
// }

// const SmallComponent = styled.small({
//   ...s.fonts.paragraphSmall,
//   marginTop: s.dimensions.paragraphSpacing,
//   color: s.colors.grayDark
// });

/*

TODO






// comments

.Article-comments {
}

.Article-comments-heading {
  margin: 0;
  padding: var(--font-padding-headline);
  font-size: var(--font-size-headline);
  line-height: var(--font-line-height-headline);
  font-family: var(--font-family-heading);
  font-weight: normal;
  color: var(--color-gray-dark);
}

.Article-content figure {
  margin: var(--paragraph-spacing) 0 0 0;
  font-family: var(--font-family-paragraph);
  font-size: var(--font-size-paragraph);
  line-height: var(--font-line-height-paragraph);
}

.Article-content figure figcaption {
  font-size: var(--font-size-paragraph-small);
  font-family: var(--font-family-paragraph);
  line-height: var(--font-line-height-paragraph-small);
}

// videos

.Article-content video {
  max-width: 100%;
  height: auto;
}

// quotes

.Article-content blockquote {
  margin: var(--paragraph-spacing) 0 0 0;
  padding-left: 1em;
  padding-right: 1em;
  border-left: 0.6rem solid var(--color-gray-lighter);
  font-family: var(--font-family-paragraph);
  font-size: var(--font-size-paragraph);
  line-height: var(--font-line-height-paragraph);
}

.Article-content blockquote p {
  margin: 0;
}

.Article-content blockquote footer {
  margin-top: 0.4em;
}

 */
