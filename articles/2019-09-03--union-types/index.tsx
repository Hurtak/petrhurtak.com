import { Code, H1, H2, Italic, Li, Link, List, P } from "../../src/components/article";

export const Article = () => (
  <>
    <P>
      Discriminate union types (also called <Italic>tagged unions</Italic> or <Italic>algebraic data types</Italic>) are
      very helpful and are in my personal top 2 of must-have advanced features of any typed language, along with{" "}
      <Link href="https://www.typescriptlang.org/docs/handbook/advanced-types.html#nullable-types">
        non-nullable types
      </Link>
      .
    </P>

    <P>
      They can be used to cleanly model and describe state transitions in your business logic and your UI. They are
      worth knowing about because patterns emerging from these can also be used in dynamic languages without the need of
      type system.
    </P>

    <H1>HTTP request example</H1>

    <P>
      Let's take a simple example of making API HTTP request and displaying the response in the UI. Since the request
      takes some time to finish, or it can fail, we will also need to handle these cases.
    </P>

    <H1>"Classic" approach</H1>

    <Code language="jsx">{`
      // Initial state
      let apiData = null;

      // User initiates API request, data is loading
      apiData = {
        error: false,
        loading: true,
        data: null
      };

      try {
        const request = await fetch(apiUrl);
        const requestData = await request.text();

        // Data is downloaded
        apiData = {
          error: false,
          loading: false,
          data: requestData
        };
      } catch (error) {
        // Error state
        apiData = {
          error: error,
          loading: false,
          data: null
        };
      }

      // Somewhere in your UI code
      if (!apiData) {
        return <p>Initial state</p>;
      }
      if (apiData.loading) {
        return <p>Loading</p>;
      }
      if (apiData.error) {
        return <p>Error</p>;
      }

      return <p>Api data: {apiData.data}</p>;
    `}</Code>

    <P>
      This is an approach that can be often seen. While it might be ok when the structure is small and local, problems
      will start surfacing when there will be more state transitions or when the data structure will be used in more
      places.
    </P>

    <H2>Problems</H2>

    <List>
      <Li>
        Instead of clear indication of which type of state we are in, there are a bunch of boolean flags or
        empty/non-empty data values and we need to decide which has higher priority and what combination of these fields
        results in corresponding state type.
      </Li>
      <Li>
        Data structure can end up in states that do not make sense, like <Code>loading: true</Code> and{" "}
        <Code>error: true</Code> at the same time.
      </Li>
      <Li>
        Extending the structure, let's say by adding <Code>RETRYING</Code> or <Code>CANCELLED</Code> request states,
        only magnifies the problem.
      </Li>
    </List>

    <H1>Discriminated union types</H1>

    <P>
      Let's see how we would model this problem when using union types. The best part is you do not even need typed
      language to take advantage of this approach.
    </P>

    <Code language="jsx">{`
      // Initial state
      let apiData = {
        type: "INITIAL"
      };

      // User initiates API request, data is loading
      apiData = {
        type: "LOADING"
      };

      try {
        const request = await fetch(apiUrl);
        const requestData = await request.text();

        // Data is downloaded
        apiData = {
          type: "FINISHED",
          data: requestData
        };
      } catch (error) {
        // Error state
        apiData = {
          type: "ERROR",
          error: error
        };
      }

      // Somewhere in your UI code
      switch (apiData.type) {
        case "INITIAL":
          return <p>Initial state</p>;
        case "LOADING":
          return <p>Loading</p>;
        case "ERROR":
          return <p>Error</p>;
        case "FINISHED":
          return <p>Api data: {apiData.data}</p>;
        default:
          throw new Error(\`Unknown apiData.type "\${apiData.type}"\`);
      }
    `}</Code>

    <P>
      This is much better now because we have clear indicator what state transition we are in, and we do not need to
      check boolean flags that can be mutually exclusive. Also the current state we are in only has data relevant to it,
      so for example, when we are in loading state there is no empty data field and false in error field.
    </P>

    <H1>TypeScript</H1>

    <P>
      If you have typed language that supports union types you can take advantage of the type system to enforce these
      rules. Here is how it would look like in TypeScript
    </P>

    <Code language="ts">{`
      type HttpData<T> =
        | { type: "INITIAL" }
        | { type: "LOADING" }
        | { type: "ERROR"; error: any }
        | { type: "FINISHED"; data: T };
    `}</Code>

    <P>
      This uses another interesting feature of TypeScript that is{" "}
      <Link href="https://basarat.gitbooks.io/typescript/docs/types/literal-types.html">literal types</Link>, meaning
      you can have a type of exact values, like <Code>"INITIAL"</Code>, instead of super-set like <Code>string</Code>.
    </P>

    <Code language="tsx">{`
      type HttpData<T> =
        | { type: "INITIAL" }
        | { type: "LOADING" }
        | { type: "ERROR"; error: any }
        | { type: "FINISHED"; data: T };

      const apiData: HttpData<string> = {
        type: "FINISHED",
        data: "api response data"
      };

      // Somewhere in your UI code
      switch (apiData.type) {
        case "INITIAL":
          return <p>Initial state</p>;
        case "LOADING":
          return <p>Loading</p>;
        case "ERROR":
          return <p>Error</p>;
        case "FINISHED":
          return <p>Api data: {apiData.data}</p>;
        default:
          throw new Error(\`Unknown apiData.type "\${apiData.type}"\`);
        }
    `}</Code>

    <P>
      What we can then do is use the{" "}
      <Link href="https://basarat.gitbooks.io/typescript/docs/types/never.html">never type</Link>, to opt into
      exhaustiveness checking. Meaning you will need to handle all cases of your union type, otherwise, the compiler
      will complain. This is another very useful compiler check that you will appreciate as your codebase grows, and in
      case you ever need to extend your union type, like adding <Code>CANCELLED</Code> state to your HTTP request type,
      it will force you to update all pieces of code where given union type is used.
    </P>

    <Code language="tsx">{`
      type HttpData<T> =
        | { type: "INITIAL" }
        | { type: "LOADING" }
        | { type: "ERROR"; error: any }
        | { type: "FINISHED"; data: T };

      const apiData: HttpData<string> = {
        type: "FINISHED",
        data: "api response data"
      };

      function never(value: never): never {
        throw new Error("This part of code should never be reached. " + JSON.stringify(value));
      }

      // Somewhere in your UI code
      switch (apiData.type) {
        case "INITIAL":
          return <p>Initial state</p>;
        case "LOADING":
          return <p>Loading</p>;
        case "ERROR":
          return <p>Error</p>;
        // case "FINISHED":
        //   return <p>Api data: {apiData.data}</p>;
        default:
          // If you do not handle all cases, TS will complain:
          //   Argument of type '{ type: "FINISHED"; data: string; }' is not assignable to parameter of type 'never'.
          return never(apiData);
        }
    `}</Code>
  </>
);
