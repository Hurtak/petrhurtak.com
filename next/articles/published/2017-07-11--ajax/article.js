import React from "react";
import {
  H1,
  H2,
  P,
  // Bold,
  Link,
  Code,
  List,
  Li,
  Table,
  Tr,
  Tc
} from "../../../components/article.js";

export default class Article extends React.Component {
  static metadata = {
    title: "Ajax",

    description:
      "How to create HTTP requests in the browser using the XMLHttpRequest API.",

    url: "ajax",

    datePublication: "2017-07-11 08:00:00",
    dateLastUpdate: "2017-07-11 08:00:00",

    id: "fc568f5676a51a1fce53c5c35bd1b84c"
  };

  render() {
    return (
      <React.Fragment>
        <H1>HTTP requests in browsers</H1>

        <List>
          <Li>
            The most common way to make HTTP request in the browser is by using
            the <Code>window.XMLHttpRequest</Code> API.
          </Li>
          <Li>
            XMLHttpRequest was originally designed by Microsoft and then adopted
            by all browser vendors. Despite its name, XMLHttpRequest can be used
            to fetch any type of data, not just XML.
          </Li>
        </List>

        <H1>Simple example</H1>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();

          request.addEventListener("load", e => {
            console.log("response status code", e.target.status);
            console.log("response body", e.target.responseText);
          });
          request.addEventListener("error", e => {
            console.log("error", e);
          });

          request.open("GET", "./url");
          request.send();
        `}</Code>

        <P>
          Once the request is successfully completed (<Code>load</Code> event is
          fired), the HTTP status code and request body are avaliable to us.
        </P>

        <List>
          <Li>
            <Code>event.target.status</Code> HTTP status code as{" "}
            <Code>int</Code>.
          </Li>
          <Li>
            <Code>event.target.responseText</Code> HTTP body as{" "}
            <Code>string</Code>.
          </Li>
          <Li>
            <Code>event.target.getAllResponseHeaders()</Code> response headers
            as newline separated <Code>string</Code>.
          </Li>
        </List>

        <H1>Customizing the request</H1>

        <P>There are several ways to customize the request.</P>

        <H2>The HTTP request method</H2>

        <List>
          <Li>
            HTTP method is specified as the first argument of the{" "}
            <Code>open</Code> method.
          </Li>
          <Li>HTTP method name is case-insensitive.</Li>
          <Li>
            All HTTP methods are supported, so you can use the less common ones
            like <Code>DELETE</Code> or <Code>PUT</Code>.
          </Li>
        </List>

        <Code multiline language="javascript">{`
          request.open("GET", "./url");
        `}</Code>

        <H2>Setting HTTP headers</H2>

        <List>
          <Li>
            Call the <Code>setRequestHeader</Code> method after{" "}
            <Code>open</Code> and before <Code>send</Code>.
          </Li>
          <Li>
            If no <Code>Accept</Code> header has been set, an{" "}
            <Code>Accept</Code> header with the
            <Code>*/*</Code> value is automatically added.
          </Li>
          <Li>
            For security reasons, some headers can not be set from JavaScript
            and are controlled only by the browser. These headers are from the
            <Link href="https://developer.mozillorg/en-US/docs/Glossary/Forbidden_header_name">
              forbidden header names
            </Link>{" "}
            and{" "}
            <Link href="https://developer.mozillorg/en-US/docs/Glossary/Forbidden_response_header_name">
              forbidden response header
            </Link>{" "}
            names.
          </Li>
        </List>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();

          request.open("GET", "./url");
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader("Accept", "application/json");
          request.send();
        `}</Code>

        <P>Most common headers you might use:</P>

        <Code multiline language="javascript">{`
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          request.setRequestHeader("Accept", "application/json");
          request.setRequestHeader("Accept", "text/plain");
          request.setRequestHeader("Accept", "text/html");
        `}</Code>

        <H2>Sending data along with the request</H2>

        <P>If you use GET you add the data as query parameters.</P>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();
          request.open("GET", "./url?some=data");
          request.send();
        `}</Code>

        <P>
          If you use POST you want to send the data in the HTTP request body,
          you do that by passing string in the <Code>send</Code> method.
        </P>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();
          request.open("GET", "./url");
          request.send("data");
        `}</Code>

        <H2>Adding timeout</H2>

        <List>
          <Li>
            Set the <Code>timeout</Code> property on your request instance.
          </Li>
          <Li>
            Timeout is set in milliseconds and when it elapses the{" "}
            <Code>timeout</Code> event is fired.
          </Li>
        </List>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();
          request.addEventListener("timeout", e => {
            console.log("timeout", e);
          });
          request.timeout = 10000; // ms
          request.open("GET", "./url");
          request.send();
        `}</Code>

        <H1>Canceling opened request</H1>

        <P>Once request is sent, it can be aborted at any time.</P>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();
          request.addEventListener("abort", e => {
            console.log("abort", e);
          });
          request.open("GET", "./url");
          request.send();

          request.abort();
        `}</Code>

        <H1>Request events</H1>

        <H2>load</H2>

        <List>
          <Li>Server responded, and request finished loading.</Li>
        </List>

        <H2>error</H2>

        <List>
          <Li>Error with HTTP request occurred.</Li>
          <Li>
            A server responding with <Code>500</Code> status code will not
            trigger the
            <Code>error</Code> event since it is an error on the server side,
            not with the HTTP request itself.
          </Li>
          <Li>
            Usually, it might be one of the following:
            <List>
              <Li>There is no internet connection.</Li>
              <Li>
                A server does not respond in time (several minutes in Chrome),
                and the browser terminates the connection.
              </Li>
              <Li>
                A request is made into a different domain, and the response does
                not have correct cross-origin headers.
              </Li>
              <Li>Unknown protocol scheme.</Li>
            </List>
          </Li>
        </List>

        <H2>loadend</H2>

        <List>
          <Li>
            After <Code>error</Code>, <Code>abort</Code>, or <Code>load</Code>{" "}
            have been dispatched.
          </Li>
        </List>

        <H2>loadstart</H2>

        <List>
          <Li>Fires when the progress has begun.</Li>
        </List>

        <H2>abort</H2>

        <List>
          <Li>
            Fires when <Code>abort</Code> method is called on the request
            instance.
          </Li>
        </List>

        <H2>timeout</H2>

        <List>
          <Li>
            Fires when a request takes longer than a value set in the{" "}
            <Code>timeout</Code>
            property.
          </Li>
          <Li>
            Does not fire when <Code>timeout</Code> is not set, request takes
            too long, and browser decides to close the connection. In that case,{" "}
            <Code>error</Code> event is fired instead.
          </Li>
        </List>

        <H2>progress</H2>

        <List>
          <Li>
            Fires at least one time once the first chunk of data arrives, then
            after some amount of data is downloaded.
            <List>
              <Li>In Chrome it is roughly after each 32KB are downloaded.</Li>
              <Li>
                In Firefox it seemed to fire relative to the current network
                speed, it varied between few KB and several hundred KB.
              </Li>
            </List>
          </Li>
          <Li>
            <Code>event.total</Code> the size of the request body in Bytes.
          </Li>
          <Li>
            <Code>event.loaded</Code> number of Bytes downloaded.
          </Li>
        </List>

        <Code multiline language="javascript">{`
          let progressLastTimestamp = Date.now();
          let progressLastLoadedChunk = 0;

          const request = new window.XMLHttpRequest();
          request.addEventListener("progress", e => {
            const currentTime = Date.now();

            console.log(\`progress - time since last event \${currentTime - progressLastTimestamp} ms\`);
            console.log(\`progress - downloaded \${e.loaded} B / \${e.total} B\`);
            console.log(\`progress - last chunk size \${e.loaded - progressLastLoadedChunk} B\`);

            progressLastTimestamp = currentTime;
            lastLoaded = e.loaded;
          });
          request.open("GET", "./url");
          request.send();
        `}</Code>

        <H2>readystatechange</H2>

        <List>
          <Li>Describes the state of the HTTP request.</Li>
          <Li>
            Is available on the <Code>event.target.readyState</Code> property.
          </Li>
        </List>

        <Table
          heading={
            <Tr>
              <Tc>Value</Tc>
              <Tc>State</Tc>
              <Tc>Description</Tc>
            </Tr>
          }
        >
          <Tr>
            <Tc>0</Tc>
            <Tc>
              <Code>UNSENT</Code>
            </Tc>
            <Tc>
              Request instance has been created, but <Code>open</Code> method
              has not been called yet.
            </Tc>
          </Tr>

          <Tr>
            <Tc>1</Tc>
            <Tc>
              <Code>OPENED</Code>
            </Tc>
            <Tc>
              <Code>open</Code> method called.
            </Tc>
          </Tr>

          <Tr>
            <Tc>2</Tc>
            <Tc>
              <Code>HEADERS_RECEIVED</Code>
            </Tc>
            <Tc>
              <Code>send</Code> method has been called, and headers and status
              code received.
            </Tc>
          </Tr>

          <Tr>
            <Tc>3</Tc>
            <Tc>
              <Code>LOADING</Code>
            </Tc>
            <Tc>
              Downloading, <Code>event.target.responseText</Code> holds partial
              dat
            </Tc>
          </Tr>

          <Tr>
            <Tc>4</Tc>
            <Tc>
              <Code>DONE</Code>
            </Tc>
            <Tc>Request completed.</Tc>
          </Tr>
        </Table>

        <H1>Events order</H1>

        <Table
          heading={
            <Tr>
              <Tc>Order</Tc>
              <Tc>Event name</Tc>
              <Tc>Additional info</Tc>
            </Tr>
          }
        >
          <Tr>
            <Tc>1</Tc>
            <Tc>
              <Code>readystatechange</Code>
            </Tc>
            <Tc>
              <Code>readyState</Code> is <Code>1</Code> (<Code>OPENED</Code>)
            </Tc>
          </Tr>
          <Tr>
            <Tc>2</Tc>
            <Tc>
              <Code>loadstart</Code>
            </Tc>
            <Tc />
          </Tr>
          <Tr>
            <Tc>3</Tc>
            <Tc>
              <Code>readystatechange</Code>
            </Tc>
            <Tc>
              <Code>readyState</Code> is <Code>2</Code> (<Code>
                HEADERS_RECEIVED
              </Code>)
            </Tc>
          </Tr>
          <Tr>
            <Tc>4-5</Tc>
            <Tc>
              <Code>readystatechange</Code>
            </Tc>
            <Tc>
              <Code>readyState</Code> is <Code>3</Code> (<Code>LOADING</Code>),
              might happen more than once.
            </Tc>
          </Tr>
          <Tr>
            <Tc>5-6</Tc>
            <Tc>
              <Code>progress</Code>
            </Tc>
            <Tc>
              Might happen more than once with larger files or slower internet
              connection.
            </Tc>
          </Tr>
          <Tr>
            <Tc>5-6</Tc>
            <Tc>
              <Code>readystatechange</Code>
            </Tc>
            <Tc>
              <Code>readyState</Code> is <Code>4</Code> (<Code>DONE</Code>)
            </Tc>
          </Tr>
          <Tr>
            <Tc>7</Tc>
            <Tc>
              <Code>load</Code> or <Code>abort</Code> or <Code>timeout</Code>
            </Tc>
            <Tc />
          </Tr>
          <Tr>
            <Tc>8</Tc>
            <Tc>
              <Code>loadend</Code>
            </Tc>
            <Tc />
          </Tr>
        </Table>

        <H1>Complete example, delete what you do not need</H1>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();

          request.addEventListener("load", e => {
            console.log("load", e);
            if (e.target.status >= 200 && e.target.status < 300) {
              // ok
              const res = e.target.responseText;
            } else {
              // not ok
            }
          });
          request.addEventListener("error", e => {
            console.log("error", e);
          });
          request.addEventListener("abort", e => {
            console.log("abort", e);
          });
          request.addEventListener("loadend", e => {
            // After "error", "abort", or "load" have been dispatched.
            console.log("loadend", e);
          });
          request.addEventListener("readystatechange", e => {
            console.log("readystatechange", e.target.readyState);
          });

          request.timeout = 10000; // ms
          request.addEventListener("timeout", e => {
            console.log("timeout", e);
          });

          let progressLastTimestamp = Date.now();
          let progressLastLoadedChunk = 0;
          request.addEventListener("progress", e => {
            console.log("progress", e);

            const currentTime = Date.now();
            console.log(\`progress - time since last event \${currentTime - progressLastTimestamp} ms\`);
            console.log(\`progress - downloaded \${e.loaded} B / \${e.total} B\`);
            console.log(\`progress - last chunk size \${e.loaded - progressLastLoadedChunk} B\`);
            progressLastTimestamp = currentTime;
            lastLoaded = e.loaded;
          });

          request.open("GET", "./url");
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader("Accept", "application/json");
          request.send();

          // request.abort()
        `}</Code>

        <H1>Alternatives</H1>

        <P>
          A modern alternative to XMLHttpRequest is the{" "}
          <Link href="https://developer.mozillorg/en/docs/Web/API/Fetch_API">
            Fetch
          </Link>{" "}
          API that uses promises but has some downsides like worse browser
          support and not supporting request cancellation which is needed
          surprisingly often – Lately, I have found myself rewriting Fetch to
          XMLHttpRequest many times, just because I needed the cancellation
          feature.
        </P>
      </React.Fragment>
    );
  }
}
