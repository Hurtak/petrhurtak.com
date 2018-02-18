import React from "react";
import * as a from "../../../components/article.js";

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
        <a.H1>HTTP requests in browsers</a.H1>

        <a.List>
          <a.Li>
            The most common way to make HTTP request in the browser is by using
            the <a.Code>window.XMLHttpRequest</a.Code> API.
          </a.Li>
          <a.Li>
            XMLHttpRequest was originally designed by Microsoft and then adopted
            by all browser vendors. Despite its name, XMLHttpRequest can be used
            to fetch any type of data, not just XML.
          </a.Li>
        </a.List>

        <a.H1>Simple example</a.H1>

        <a.Code multiline language="javascript">{`
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
        `}</a.Code>

        <a.P>
          Once the request is successfully completed (<a.Code>load</a.Code>{" "}
          event is fired), the HTTP status code and request body are avaliable
          to us.
        </a.P>

        <a.List>
          <a.Li>
            <a.Code>event.target.status</a.Code> HTTP status code as{" "}
            <a.Code>int</a.Code>.
          </a.Li>
          <a.Li>
            <a.Code>event.target.responseText</a.Code> HTTP body as{" "}
            <a.Code>string</a.Code>.
          </a.Li>
          <a.Li>
            <a.Code>event.target.getAllResponseHeaders()</a.Code> response
            headers as newline separated <a.Code>string</a.Code>.
          </a.Li>
        </a.List>

        <a.H1>Customizing the request</a.H1>

        <a.P>There are several ways to customize the request.</a.P>

        <a.H2>The HTTP request method</a.H2>

        <a.List>
          <a.Li>
            HTTP method is specified as the first argument of the{" "}
            <a.Code>open</a.Code> method.
          </a.Li>
          <a.Li>HTTP method name is case-insensitive.</a.Li>
          <a.Li>
            All HTTP methods are supported, so you can use the less common ones
            like <a.Code>DELETE</a.Code> or <a.Code>PUT</a.Code>.
          </a.Li>
        </a.List>

        <a.Code multiline language="javascript">{`
          request.open("GET", "./url");
        `}</a.Code>

        <a.H2>Setting HTTP headers</a.H2>

        <a.List>
          <a.Li>
            Call the <a.Code>setRequestHeader</a.Code> method after{" "}
            <a.Code>open</a.Code> and before <a.Code>send</a.Code>.
          </a.Li>
          <a.Li>
            If no <a.Code>Accept</a.Code> header has been set, an{" "}
            <a.Code>Accept</a.Code> header with the
            <a.Code>*/*</a.Code> value is automatically added.
          </a.Li>
          <a.Li>
            For security reasons, some headers can not be set from JavaScript
            and are controlled only by the browser. These headers are from the{" "}
            <a.Link href="https://developer.mozillorg/en-US/docs/Glossary/Forbidden_header_name">
              forbidden header names
            </a.Link>{" "}
            and{" "}
            <a.Link href="https://developer.mozillorg/en-US/docs/Glossary/Forbidden_response_header_name">
              forbidden response header
            </a.Link>{" "}
            names.
          </a.Li>
        </a.List>

        <a.Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();

          request.open("GET", "./url");
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader("Accept", "application/json");
          request.send();
        `}</a.Code>

        <a.P>Most common headers you might use:</a.P>

        <a.Code multiline language="javascript">{`
          request.setRequestHeader("Content-Type", "application/json");
          request.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
          request.setRequestHeader("Accept", "application/json");
          request.setRequestHeader("Accept", "text/plain");
          request.setRequestHeader("Accept", "text/html");
        `}</a.Code>

        <a.H2>Sending data along with the request</a.H2>

        <a.P>If you use GET you add the data as query parameters.</a.P>

        <a.Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();
          request.open("GET", "./url?some=data");
          request.send();
        `}</a.Code>

        <a.P>
          If you use POST you want to send the data in the HTTP request body,
          you do that by passing string in the <a.Code>send</a.Code> method.
        </a.P>

        <a.Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();
          request.open("GET", "./url");
          request.send("data");
        `}</a.Code>

        <a.H2>Adding timeout</a.H2>

        <a.List>
          <a.Li>
            Set the <a.Code>timeout</a.Code> property on your request instance.
          </a.Li>
          <a.Li>
            Timeout is set in milliseconds and when it elapses the{" "}
            <a.Code>timeout</a.Code> event is fired.
          </a.Li>
        </a.List>

        <a.Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();
          request.addEventListener("timeout", e => {
            console.log("timeout", e);
          });
          request.timeout = 10000; // ms
          request.open("GET", "./url");
          request.send();
        `}</a.Code>

        <a.H1>Canceling opened request</a.H1>

        <a.P>Once request is sent, it can be aborted at any time.</a.P>

        <a.Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest();
          request.addEventListener("abort", e => {
            console.log("abort", e);
          });
          request.open("GET", "./url");
          request.send();

          request.abort();
        `}</a.Code>

        <a.H1>Request events</a.H1>

        <a.H2>load</a.H2>

        <a.List>
          <a.Li>Server responded, and request finished loading.</a.Li>
        </a.List>

        <a.H2>error</a.H2>

        <a.List>
          <a.Li>Error with HTTP request occurred.</a.Li>
          <a.Li>
            A server responding with <a.Code>500</a.Code> status code will not
            trigger the <a.Code>error</a.Code> event since it is an error on the
            server side, not with the HTTP request itself.
          </a.Li>
          <a.Li>
            Usually, it might be one of the following:
            <a.List>
              <a.Li>There is no internet connection.</a.Li>
              <a.Li>
                A server does not respond in time (several minutes in Chrome),
                and the browser terminates the connection.
              </a.Li>
              <a.Li>
                A request is made into a different domain, and the response does
                not have correct cross-origin headers.
              </a.Li>
              <a.Li>Unknown protocol scheme.</a.Li>
            </a.List>
          </a.Li>
        </a.List>

        <a.H2>loadend</a.H2>

        <a.List>
          <a.Li>
            After <a.Code>error</a.Code>, <a.Code>abort</a.Code>, or{" "}
            <a.Code>load</a.Code> have been dispatched.
          </a.Li>
        </a.List>

        <a.H2>loadstart</a.H2>

        <a.List>
          <a.Li>Fires when the progress has begun.</a.Li>
        </a.List>

        <a.H2>abort</a.H2>

        <a.List>
          <a.Li>
            Fires when <a.Code>abort</a.Code> method is called on the request
            instance.
          </a.Li>
        </a.List>

        <a.H2>timeout</a.H2>

        <a.List>
          <a.Li>
            Fires when a request takes longer than a value set in the{" "}
            <a.Code>timeout</a.Code> property.
          </a.Li>
          <a.Li>
            Does not fire when <a.Code>timeout</a.Code> is not set, request
            takes too long, and browser decides to close the connection. In that
            case, <a.Code>error</a.Code> event is fired instead.
          </a.Li>
        </a.List>

        <a.H2>progress</a.H2>

        <a.List>
          <a.Li>
            Fires at least one time once the first chunk of data arrives, then
            after some amount of data is downloaded.
            <a.List>
              <a.Li>
                In Chrome it is roughly after each 32KB are downloaded.
              </a.Li>
              <a.Li>
                In Firefox it seemed to fire relative to the current network
                speed, it varied between few KB and several hundred KB.
              </a.Li>
            </a.List>
          </a.Li>
          <a.Li>
            <a.Code>event.total</a.Code> the size of the request body in Bytes.
          </a.Li>
          <a.Li>
            <a.Code>event.loaded</a.Code> number of Bytes downloaded.
          </a.Li>
        </a.List>

        <a.Code multiline language="javascript">{`
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
        `}</a.Code>

        <a.H2>readystatechange</a.H2>

        <a.List>
          <a.Li>Describes the state of the HTTP request.</a.Li>
          <a.Li>
            Is available on the <a.Code>event.target.readyState</a.Code>{" "}
            property.
          </a.Li>
        </a.List>

        <a.Table
          heading={
            <a.Tr>
              <a.Tc>Value</a.Tc>
              <a.Tc>State</a.Tc>
              <a.Tc>Description</a.Tc>
            </a.Tr>
          }
        >
          <a.Tr>
            <a.Tc>0</a.Tc>
            <a.Tc>
              <a.Code>UNSENT</a.Code>
            </a.Tc>
            <a.Tc>
              Request instance has been created, but <a.Code>open</a.Code>{" "}
              method has not been called yet.
            </a.Tc>
          </a.Tr>

          <a.Tr>
            <a.Tc>1</a.Tc>
            <a.Tc>
              <a.Code>OPENED</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Code>open</a.Code> method called.
            </a.Tc>
          </a.Tr>

          <a.Tr>
            <a.Tc>2</a.Tc>
            <a.Tc>
              <a.Code>HEADERS_RECEIVED</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Code>send</a.Code> method has been called, and headers and
              status code received.
            </a.Tc>
          </a.Tr>

          <a.Tr>
            <a.Tc>3</a.Tc>
            <a.Tc>
              <a.Code>LOADING</a.Code>
            </a.Tc>
            <a.Tc>
              Downloading, <a.Code>event.target.responseText</a.Code> holds
              partial dat
            </a.Tc>
          </a.Tr>

          <a.Tr>
            <a.Tc>4</a.Tc>
            <a.Tc>
              <a.Code>DONE</a.Code>
            </a.Tc>
            <a.Tc>Request completed.</a.Tc>
          </a.Tr>
        </a.Table>

        <a.H1>Events order</a.H1>

        <a.Table
          heading={
            <a.Tr>
              <a.Tc>Order</a.Tc>
              <a.Tc>Event name</a.Tc>
              <a.Tc>Additional info</a.Tc>
            </a.Tr>
          }
        >
          <a.Tr>
            <a.Tc>1</a.Tc>
            <a.Tc>
              <a.Code>readystatechange</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Code>readyState</a.Code> is <a.Code>1</a.Code> (<a.Code>
                OPENED
              </a.Code>)
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>2</a.Tc>
            <a.Tc>
              <a.Code>loadstart</a.Code>
            </a.Tc>
            <a.Tc />
          </a.Tr>
          <a.Tr>
            <a.Tc>3</a.Tc>
            <a.Tc>
              <a.Code>readystatechange</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Code>readyState</a.Code> is <a.Code>2</a.Code> (<a.Code>
                HEADERS_RECEIVED
              </a.Code>)
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>4-5</a.Tc>
            <a.Tc>
              <a.Code>readystatechange</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Code>readyState</a.Code> is <a.Code>3</a.Code> (<a.Code>
                LOADING
              </a.Code>), might happen more than once.
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>5-6</a.Tc>
            <a.Tc>
              <a.Code>progress</a.Code>
            </a.Tc>
            <a.Tc>
              Might happen more than once with larger files or slower internet
              connection.
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>5-6</a.Tc>
            <a.Tc>
              <a.Code>readystatechange</a.Code>
            </a.Tc>
            <a.Tc>
              <a.Code>readyState</a.Code> is <a.Code>4</a.Code> (<a.Code>
                DONE
              </a.Code>)
            </a.Tc>
          </a.Tr>
          <a.Tr>
            <a.Tc>7</a.Tc>
            <a.Tc>
              <a.Code>load</a.Code> or <a.Code>abort</a.Code> or{" "}
              <a.Code>timeout</a.Code>
            </a.Tc>
            <a.Tc />
          </a.Tr>
          <a.Tr>
            <a.Tc>8</a.Tc>
            <a.Tc>
              <a.Code>loadend</a.Code>
            </a.Tc>
            <a.Tc />
          </a.Tr>
        </a.Table>

        <a.H1>Complete example, delete what you do not need</a.H1>

        <a.Code multiline language="javascript">{`
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
        `}</a.Code>

        <a.H1>Alternatives</a.H1>

        <a.P>
          A modern alternative to XMLHttpRequest is the{" "}
          <a.Link href="https://developer.mozillorg/en/docs/Web/API/Fetch_API">
            Fetch
          </a.Link>{" "}
          API that uses promises but has some downsides like worse browser
          support and not supporting request cancellation which is needed
          surprisingly often – Lately, I have found myself rewriting Fetch to
          XMLHttpRequest many times, just because I needed the cancellation
          feature.
        </a.P>
      </React.Fragment>
    );
  }
}
