import React from "react";

import { Code, H1, H2, Li, Link, List, P, Table, Tc, Tr } from "../components";

export const Article = () => (
  <>
    <H1>What is IIFE</H1>

    <List>
      <Li>
        <Code>IIFE</Code> is an abbreviation for <Code>immediately-invoked function expression</Code>.
      </Li>
      <Li>What that means is that we define a new function and execute it immediately.</Li>
    </List>

    <Code language="js">{`
      console.log(1);

      // IIFE with arrow function
      (() => {
          console.log(2);
      })();

      // IIFE with anonymous function
      (function () {
        console.log(3);
      })();

      // Regular function call equivalent
      function foo () {
        console.log(4);
      }
      foo();

      console.log(5);

      // logs: 1 2 3 4 5
    `}</Code>

    <H1>Where IIFE can be useful</H1>

    <H2>Not leaking variables into the global scope</H2>

    <P>
      In the browser environment (if you are not using module system), it is a good practice to wrap your code inside
      IIFE to make sure:
    </P>

    <List>
      <Li>You are not leaking any global variables/functions into global scope.</Li>
      <Li>Your variables cannot be overwritten by any other scripts that also might be accessing global scope.</Li>
      <Li>You do not accidentally overwrite global variables of other scripts by using the same name.</Li>
    </List>

    <Code language="js">{`
      <DOCTYPE html>
      <html>
        <head><!-- code --></head>
        <body>
          <!-- code -->
          <script>
            (() => {
              const config = { foo: 'bar' };
              // "config" is not leaked to the window object
              Analytics.init(config);
            })()
          </script>
        </body>
      </html>
    `}</Code>

    <H2>Variable assignment with its own scope</H2>

    <Code language="js">{`
      // IIFE
      const res = (() => {
        const foo = 1;
        const bar = 2;
        return foo + bar;
      })();

      // Vs regular approach
      const foo = 1;
      const bar = 2;
      const res = foo + bar;
    `}</Code>

    <P>
      This approach might lead to better code structure where it is clearer what parts of the code are only sub
      computations and what are the results of these computations.
    </P>

    <P>
      It is more common to see this in functional languages where keywords like <Code>let</Code> are available.
    </P>
    <Code language="elm">{`
      res =
        let
          foo = 1
          bar = 2
        in
          foo + bar
    `}</Code>
    <P>
      At the moment there is a stage 1 <Code>do</Code> keyword{" "}
      <Link href="https://github.com/tc39/proposal-do-expressions">proposal</Link> for JavaScript that introduces such
      functionality.
    </P>

    <Code language="js">{`
      const res = do {
        const foo = 1;
        const bar = 2;
        foo + bar; // implicit return
      }
    `}</Code>

    <H2>React</H2>

    <P>
      In React <Code>if</Code> statements inside templates are usually done either with logical operators{" "}
      <Code language="js">{`
        condition && <b>true</b>
      `}</Code>{" "}
      or with ternary operators
      <Code language="js">{`
        condition ? <b>true</b> : <b>false</b>
      `}</Code>
      IIFE might be used to create blocks with regular code flow.
    </P>

    <Code language="js">{`
      const html = (
        <section>
          {(() => {
            if (a) {
              if (b) {
                return <p>a and b</p>;
              } else {
                return <p>a and not b</p>;
              }
            } else {
              return <p>not a</p>;
            }
          })()}
        </section>
      );
    `}</Code>

    <P>Also might be useful when we want to do some computations right in the templates.</P>

    <Code language="js">{`
      const html = (
        <section>
          {(() => {
            const foo = 1;
            const bar = 2;
            const res = foo + bar;

            return <p>{res}</p>;
          })()}
        </section>
      )
    `}</Code>

    <H2>Module pattern</H2>

    <P>Module pattern was once popular before the module system was introduced into the language.</P>

    <P>This pattern provides:</P>

    <List>
      <Li>Encapsulation.</Li>
      <Li>True private variables/functions/methods (unlike with JavaScript classes).</Li>
    </List>

    <Code language="js">{`
      const Counter = (() => {
        // private variables/functions
        let state = 0;

        function init (initialState) {
          state = initialState;
        }

        function privateMethod () {
          state += 1;
        }

        function increment () {
          privateMethod();
          return state;
        }

        // exported public functions
        return {
          init,
          increment
        };
      })()

      Counter.init(10);
      Counter.increment(); // 11
    `}</Code>

    <P>
      Compared to classes there is a downside, there is only one shared state, and you cannot create multiple instances.
    </P>

    <P>
      While instances can be done with the module pattern, it is not recommended to do that because new functions are
      created for each instance, instead of having one method on the prototype chain that is reused by each instance.
      This will also lead to bigger memory requirements compared to classes.
    </P>

    <Code language="js">{`
      const Counter = initialState => (() => {
        // private variables/functions
        let state = initialState;

        function privateMethod () {
          state += 1;
        }

        function increment () {
          privateMethod();
          return state;
        }

        // exported public functions
        return {
          increment
        };
      })()

      const counterA = Counter(1);
      const counterB = Counter(10);
      counterA.increment(); // 2
      counterB.increment(); // 11
    `}</Code>

    <H1>Why are parentheses required around IIFE?</H1>

    <P>
      You have to wrap the function in parentheses in order to make the code{" "}
      <Link href="http://benalman.com/news/2010/11/immediately-invoked-function-expression/">
        parse as an expression
      </Link>
      . While the code will be parsed in some cases, in most it will not, so it is a good practice to always use them.
    </P>

    <Table
      heading={
        <Tr>
          <Tc>Code</Tc>
          <Tc>Valid</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>
          <Code language="js">{`const x = (() => { return foo() })()`}</Code>
        </Tc>
        <Tc>valid</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code language="js">{`const x = () => { return foo() }()`}</Code>
        </Tc>
        <Tc>invalid</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code language="js">{`const x = (function () { return foo() })()`}</Code>
        </Tc>
        <Tc>valid</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code language="js">{`const x = function () { return foo() }()`}</Code>
        </Tc>
        <Tc>valid</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code language="js">{`(() => { return foo() })()`}</Code>
        </Tc>
        <Tc>valid</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code language="js">{`() => { return foo() }()`}</Code>
        </Tc>
        <Tc>invalid</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code language="js">{`(function () { return foo() })()`}</Code>
        </Tc>
        <Tc>valid</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code language="js">{`function () { return foo() }()`}</Code>
        </Tc>
        <Tc>invalid</Tc>
      </Tr>
    </Table>

    <H1>Semicolon at the beginning</H1>

    <P>There are two cases where putting a semicolon before the IIFE is necessary.</P>

    <H2>If you are not using any module system and concatenate JavaScript files manually.</H2>

    <Code language="js">{`
      // File a.js
      console.log(1)

      // File b.js
      (() => {
        // ...
      })()
    `}</Code>

    <P>If you concatenate these files, the executed code is the equivalent to</P>

    <Code language="js">{`
      console.log(1)(() => {})()
      // Uncaught TypeError: console.log(...) is not a function
    `}</Code>

    <P>You can solve this problem by putting semicolon before the IIFE</P>

    <Code language="js">{`
    ;(() => {
      // ...
    })()
    `}</Code>

    <H2>If you are not using semicolons</H2>

    <P>
      When you decide to omit semicolons at the end of statements, and you have standalone IIFE with no assignment,
      semicolon at the beginning is required for the reasons described above.
    </P>

    <Code language="js">{`
      // ok
      const res1 = (() => { return 1 })()
      const res2 = (() => { return 1 })()

      // not ok
      (() => { return 1 })()
      (() => { return 1 })()

      // ok
      ;(() => { return 1 })()
      ;(() => { return 1 })()
    `}</Code>

    <P>
      You can use linter like <Link href="http://eslint.org/">ESLint</Link> to prevent you from making such mistakes.
    </P>

    <H1>Other ways to enforce function expression</H1>

    <P>
      There are several other ways you can write the IIFE's, but they do not work with arrow functions and are not that
      commonly used (outside of minifies which use them because they are 1 character shorter than the version with
      parentheses).
    </P>

    <Code language="js">{`
      !function () { /* ... */ }()
      ~function () { /* ... */ }()
      -function () { /* ... */ }()
      +function () { /* ... */ }()
      void function () { /* ... */ }()
    `}</Code>
  </>
);
