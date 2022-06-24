import { Code, H1, Li, Link, List, P } from "../components";

export const Article = () => (
  <>
    <P>
      In JavaScript, most common way to get pseudo random values is from the <Code language="js">Math.random()</Code>{" "}
      standard library function.
    </P>
    <List>
      <Li>Returns 64bit float between 0 (inclusive) and 1 (exclusive).</Li>
      <Li>Not cryptographically secure.</Li>
      <Li>Available both in the browser and in the server environment.</Li>
    </List>

    <Code language="js">{`
      > Math.random()
      0.5392704424754013
    `}</Code>

    <P>
      In case you would want a random number in a certain range, there is no standard library function for that. So you
      either need to do the range transformations by yourself or use some package/library.
    </P>

    <H1>Random integer in range</H1>

    <Code language="js">{`
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
      If you want to read more about how this range transformation works, I recommend{" "}
      <Link href="https://stackoverflow.com/a/1527820">this helpful Stack Overflow answer</Link>.
    </P>

    <H1>Random float in range</H1>

    <Code language="js">{`
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
        <Link href="https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues">
          window.crypto.getRandomValues
        </Link>
        .
      </Li>
      <Li>
        In Node.js there is{" "}
        <Link href="https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback">
          global.crypto.randomBytes
        </Link>
        .
      </Li>
      <Li>
        You probably should not do the range transformations by yourself as they can be{" "}
        <Link href="https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba">error prone</Link>. I would
        recommend using some library for that.
      </Li>
    </List>
  </>
);
