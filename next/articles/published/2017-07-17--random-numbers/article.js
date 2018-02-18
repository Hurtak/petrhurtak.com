import React from "react";
import * as a from "../../../components/article.js";

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
      <React.Fragment>
        <a.List>
          <a.Li>
            In JavaScript, most common way to get pseudo random values is from
            the <a.Code>Math.random()</a.Code> standard library function.
            <a.List>
              <a.Li>
                Returns 64bit float between 0 (inclusive) and 1 (exclusive).
              </a.Li>
              <a.Li>Not cryptographically secure.</a.Li>
              <a.Li>
                Available both in the browser and in the server environment.
              </a.Li>
            </a.List>
          </a.Li>
        </a.List>

        <a.Code multiline language="javascript">{`
          > Math.random()
          0.5392704424754013
        `}</a.Code>

        <a.List>
          <a.Li>
            In case you would want a random number in a certain range, there is
            no standard library function for that. So you either need to do the
            range transformations by yourself or use some package/library.
          </a.Li>
        </a.List>

        <a.H1>Random integer in range</a.H1>

        <a.Code multiline language="javascript">{`
          /**
           * Get random integer in given rangee.
           * @param {int} min - Random number lower boundary (inclusive).
           * @param {int} max - Random number upper boundary (inclusive).
           * @return {int} Random integer.
           */
          function getRandomInt(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
        `}</a.Code>

        <a.P>
          If you want to read more about how this range transformation works, I
          recommend{" "}
          <a.Link href="https://stackoverflow.com/a/1527820">
            this helpful Stack Overflow answer
          </a.Link>.
        </a.P>

        <a.H1>Random float in range</a.H1>

        <a.Code multiline language="javascript">{`
          /**
           * Get random float in given range.
           * @param {number} min - Random number lower boundary (inclusive).
           * @param {number} max - Random number upper boundary (exclusive).
           * @return {number} Random number.
           */
          function getRandomFloat(min, max) {
            return Math.random() * (max - min) + min;
          }
        `}</a.Code>

        <a.H1>Cryptographically secure numbers</a.H1>

        <a.List>
          <a.Li>
            In the browser world you have{" "}
            <a.Link href="https://developer.mozilla.org/en/docs/Web/API/RandomSource/getRandomValues">
              window.crypto.getRandomValues
            </a.Link>.
          </a.Li>
          <a.Li>
            In Node.js there is{" "}
            <a.Link href="https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback">
              global.crypto.randomBytes
            </a.Link>.
          </a.Li>
          <a.Li>
            You probably should not do the range transformations by yourself as
            they can be{" "}
            <a.Link href="https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba">
              error prone
            </a.Link>. I would recommend using some library for that.
          </a.Li>
        </a.List>
      </React.Fragment>
    );
  }
}
