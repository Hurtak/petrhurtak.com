import { Code, H1, H2, Italic, Li, Link, List, P } from "../components";

export const Article = () => (
  <>
    <P>
      Discriminate union types (also called <Italic>tagged unions</Italic> or <Italic>algebraic data types</Italic>) are
      one of my favorite features of any typed language.
    </P>

    <P>
      They can be used to cleanly model and describe state transitions in your business logic and your UI. They are
      worth knowing about because patterns emerging from these can also be used in dynamic languages without the need
      for a type system.
    </P>

    <H1>HTTP request example</H1>

    <P>
      Let's take a simple example of making an HTTP request and displaying the response in the UI. With these async
      operations you also need to handle the loading and error case and display it to the user.
    </P>

    <H1>"Traditional" approach</H1>

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
        const requestData = await getApiData();

        // Data is fetched
        apiData = {
          error: false,
          loading: false,
          data: requestData
        };
      } catch (error) {
        // Error with the request
        apiData = {
          error: error,
          loading: false,
          data: null
        };
      }

      // Somewhere in your UI code
      if (!apiData) {
        return <p>Initial state</p>;
      } else if (apiData.loading) {
        return <p>Loading</p>;
      } else if (apiData.error) {
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
        Instead of a clear indication of which type of state we are in, there are a bunch of boolean flags or
        empty/non-empty data values and we need to decide which has higher priority and what combination of these fields
        results in the corresponding state type.
      </Li>
      <Li>
        The data structure can end up in states that do not make sense, like <Code>loading: true</Code> and{" "}
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
        const requestData = await getApiData();

        // Data is fetched
        apiData = {
          type: "FINISHED",
          data: requestData
        };
      } catch (error) {
        // Error with the request
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
      This is much better now because we have a clear indicator of what state transition we are in, and we do not need
      to check boolean flags that can be mutually exclusive. Also the current state we are in only has data relevant to
      it, so for example, when we are in the loading state there is no empty data field and false in the error field.
    </P>

    <H1>TypeScript</H1>

    <P>
      If you have typed language that supports union types you can take advantage of the type system to enforce these
      rules during compile time. Here is how it would look like in TypeScript.
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
  </>
);
