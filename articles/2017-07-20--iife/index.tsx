import React from "react";

import { Code, H1, H2, Li, Link, List, P } from "../components";

export const Article = () => (
  <>
    <P>
      <Code>IIFE</Code> is an abbreviation for <Code>immediately-invoked function expression</Code>. What that means is
      that we define a new function and execute it immediately.
    </P>

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
              AnalyticsScript.init(config);
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
      In React <Code>if</Code> statements inside templates are usually done either with ternary operators, which might
      get hairy when there is some nesting.
    </P>

    <Code language="jsx">{`
      <section>
        {condition ? <p>true</p> : <p>false</p>}
      </section>
    `}</Code>

    <P>IIFE might be used to create blocks with regular code flow.</P>

    <Code language="jsx">{`
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
    `}</Code>

    <P>Also might be useful when we want to do some computations right in the templates.</P>

    <Code language="jsx">{`
      <section>
        {(() => {
          const foo = 1;
          const bar = 2;
          const res = foo + bar;

          return <p>{res}</p>;
        })()}
      </section>
    `}</Code>

    <H2>Module pattern</H2>

    <P>Module pattern was once popular before the module system was introduced into the language.</P>

    <P>This pattern provides:</P>

    <List>
      <Li>Encapsulation.</Li>
      <Li>Private variables/functions/methods.</Li>
    </List>

    <Code language="js">{`
      const Counter = (() => {
        // private variables/functions
        let state = 0;

        function privateMethod () {
          // ...
        }

        // exported public functions
        return {
          init: (initialState) => {
            state = initialState;
          },
          increment: () => {
            privateMethod();
            state += 1;
          },
          getCount: () => state
        };
      })()

      Counter.init(1);
      Counter.increment();
      Counter.getCount(); // 2
    `}</Code>

    <P>
      Class like interface can also be done with the module pattern. It is not recommended for objects that are created
      often because new functions are created for each instance, instead of having one method on the prototype chain
      that is reused by each instance, this will also lead to bigger memory requirements compared to classes.
    </P>

    <Code language="js">{`
      const Counter = initialState => {
        // private variables/functions
        let state = initialState;

        function privateMethod () {
          // ...
        }

        // exported public functions
        return {
          increment: () => {
            privateMethod();
            state += 1;
          },
          getCount: () => state
        };
      }

      const counterA = Counter(1);
      const counterB = Counter(2);
      counterA.increment();
      counterB.increment();
      counterA.getCount(); // 2
      counterB.getCount(); // 3
    `}</Code>

    <H1>Downsides</H1>

    <List>
      <Li>They are not commonly used pattern, so they might be confusing.</Li>
      <Li>
        They might not promote best practices, for example they might lead you to write more inlined code, while
        refactoring into some nice testable function might be better option.
      </Li>
      <Li>
        They are not best from performance point of view, you are creating function that is technically not needed most
        of the time, and then you are executing it immediately.
      </Li>
    </List>
  </>
);
