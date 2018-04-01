import React from "react";
import {
  ArticleWrapper,
  Code,
  H1,
  Link,
  List,
  Li,
  P
} from "../../../components/article.js";

export default class Article extends React.Component {
  static metadata = {
    title: "Random numbers in JavaScript",

    description: "How to generate random numbers in JavaScript.",

    url: "random-numbers",

    datePublication: "2017-07-17 11:00:00",
    dateLastUpdate: "2017-07-17 11:00:00",

    id: "85defc6de4eb216ae64a7c5c617e893e"
  };

  render() {
    return (
      <ArticleWrapper>
        <List>
          <Li>
            In JavaScript, most common way to get pseudo random values is from
            the <Code>Math.random()</Code> standard library function.
            <List>
              <Li>
                Returns 64bit float between 0 (inclusive) and 1 (exclusive).
              </Li>
              <Li>Not cryptographically secure.</Li>
              <Li>
                Available both in the browser and in the server environment.
              </Li>
            </List>
          </Li>
        </List>

        <Code multiline language="javascript">{`
          > Math.random()
          0.5392704424754013
        `}</Code>

        <List>
          <Li>
            In case you would want a random number in a certain range, there is
            no standard library function for that. So you either need to do the
            range transformations by yourself or use some package/library.
          </Li>
        </List>

        <H1>Random integer in range</H1>

        <Code multiline language="javascript">{`
          /**
           * Get random integer in given rangee.
           * @param {int} min - Random number lower boundary (inclusive).
           * @param {int} max - Random number upper boundary (inclusive).
           * @return {int} Random integer.
           */
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
        `}</Code>

        <P>
          If you want to read more about how this range transformation works, I
          recommend{" "}
          <Link href="https://stackoverflow.com/a/1527820">
            this helpful Stack Overflow answer
          </Link>.
        </P>

        <H1>Random float in range</H1>

        <Code multiline language="javascript">{`
          /**
           * Get random float in given range.
           * @param {number} min - Random number lower boundary (inclusive).
           * @param {number} max - Random number upper boundary (exclusive).
           * @return {number} Random number.
           */
          function getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
          }
        `}</Code>

        <H1>Cryptographically secure numbers</H1>

        <List>
          <Li>
            In the browser world you have{" "}
            <Link href="https://developer.mozillorg/en/docs/Web/API/RandomSource/getRandomValues">
              window.crypto.getRandomValues
            </Link>.
          </Li>
          <Li>
            In Node.js there is{" "}
            <Link href="https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback">
              global.crypto.randomBytes
            </Link>.
          </Li>
          <Li>
            You probably should not do the range transformations by yourself as
            they can be{" "}
            <Link href="https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba">
              error prone
            </Link>. I would recommend using some library for that.
          </Li>
        </List>
      </ArticleWrapper>
    );
  }
}
