import React from "react";
import { H1, Code, P, Italic } from "../../components";

export default () => (
  <>
    <H1>Article Title</H1>
    <P>
      Discriminate union types (also called <Italic>tagged unions</Italic> or <Italic>algebraic data types</Italic>) are
      very helpful and are in my personal top 2 of mush have advanced features of typed language (along with non
      nullable types TODO:link). They can be used to cleanly model state transitions in your business logic but also in
      your UI.
    </P>

    <H1>Naive approach</H1>

    <Code multiline language="javascript">{`
      // Initial state
      let apiData = null;

      // User initiates api request, data is loading
      apiData = {
        error: false,
        loading: true,
        data: null
      };

      try {
        const apiDataRequest = await fetch(apiUrl);
        const apiDataParsed = await apiDataRequest.json();

        // Data is downloaded
        apiData = {
          error: false,
          loading: false,
          data: apiDataParsed
        };
      catch(error) {
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
      This is intentionally badly written code and that can be often seen. The main problem is that instead of clear
      indication of which type of state we are in there are bunch of boolean flags or empty/non-empty data values and we
      need to decide which has higher priority and what combination of these fields result in what state of UI.
    </P>

    <P>
      This is very error prone and can end up in states that do not really make sense, like loading: true, error: true.
      Lets see how we would model this when using union type, and the best part is you do not even need typed language
      to take advantage of this feature.
    </P>

    <H1>Discriminated union types</H1>

    <Code multiline language="javascript">{`
      // Initial state
      let apiData = {
        type: "INITIAL"
      };

      // User initiates api request, data is loading
      apiData = {
        type: "LOADING"
      };

      try {
        const apiDataRequest = await fetch(apiUrl);
        const apiDataParsed = await apiDataRequest.json();

        // Data is downloaded
        apiData = {
          type: "FINISHED",
          data: apiDataParsed
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
      Much better now because ve have clear indicator what state transition we are in and we do not need to check
      boolean flags that can be mutually exclusive, and the current state we are in only has data relevant to it, eg
      when we are in loading state there is no data field, etc.
    </P>

    <H1>TypeScript</H1>

    <P>
      When you have typed language that supports union types you can take advantage of the type system to enforce these
      rules (like you cant acces data in initial and loading states, because there is no data in this time of state
      transition)
    </P>

    <Code multiline language="typescript">{`
      type HttpData<T> =
        | { type: "INITIAL" }
        | { type: "LOADING" }
        | { type: "ERROR"; error: any }
        | { type: "FINISHED"; data: T };
    `}</Code>

    <P>
      This actually uses another cool feature of typescript that is value types, meaning you can have a type of exact
      value, like "INITIAL", instead of super-set of this like string.
    </P>

    <P>
      What we can then do is use never addition to TypeScript, the never type, to opt in exhaustiveness checking.
      Meaning you need to handle all cases of your union type, otherwise the compiler will complain. This is another
      very useful compiler check that you will appreciate as your codebase grows, and in case you ever need to extend
      your union type (like adding another states like "RETRYING"), it will force you to update and handle all pieces of
      code where given union type is used.
    </P>

    <Code multiline language="typescript">{`
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
