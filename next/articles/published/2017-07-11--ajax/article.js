import React from "react";
import {
  Paragraph,
  List,
  ListItem,
  Link,
  Bold,
  Heading1,
  Heading2,
  Code,
  Table,
  TableRow,
  TableCell
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

  static links = {
    forbiddenHeaders:
      "https://developer.mozillorg/en-US/docs/Glossary/Forbidden_header_name",
    forbidenResponseHeaders:
      "https://developer.mozillorg/en-US/docs/Glossary/Forbidden_response_header_name",
    fetch: "https://developer.mozillorg/en/docs/Web/API/Fetch_API"
  };

  render() {
    return (
      <React.Fragment>
        <Heading1>HTTP requests in browsers</Heading1>

        <List>
          <ListItem>
            The most common way to make HTTP request in the browser is by using
            the <Code>window.XMLHttpRequest</Code> API.
          </ListItem>
          <ListItem>
            XMLHttpRequest was originally designed by Microsoft and then adopted
            by all browser vendors. Despite its name, XMLHttpRequest can be used
            to fetch any type of data, not just XML.
          </ListItem>
        </List>

        <Heading1>Simple example</Heading1>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest()

          request.addEventListener('load', e => {
            console.log('response status code', e.target.status)
            console.log('response body', e.target.responseText)
          })
          request.addEventListener('error', e => {
            console.log('error', e)
          })

          request.open('GET', './url')
          request.send()
        `}</Code>

        <Paragraph>
          Once the request is successfully completed (<Code>load</Code> event is
          fired), the HTTP status code and request body are avaliable to us.
        </Paragraph>

        <List>
          <ListItem>
            <Code>event.target.status</Code> HTTP status code as{" "}
            <Code>int</Code>.
          </ListItem>
          <ListItem>
            <Code>event.target.responseText</Code> HTTP body as{" "}
            <Code>string</Code>.
          </ListItem>
          <ListItem>
            <Code>event.target.getAllResponseHeaders()</Code> response headers
            as newline separated <Code>string</Code>.
          </ListItem>
        </List>

        <Heading1>Customizing the request</Heading1>

        <Paragraph>There are several ways to customize the request.</Paragraph>

        <Heading2>The HTTP request method</Heading2>

        <List>
          <ListItem>
            HTTP method is specified as the first argument of the{" "}
            <Code>open</Code> method.
          </ListItem>
          <ListItem>HTTP method name is case-insensitive.</ListItem>
          <ListItem>
            All HTTP methods are supported, so you can use the less common ones
            like <Code>DELETE</Code> or <Code>PUT</Code>.
          </ListItem>
        </List>

        <Code multiline language="javascript">{`
          request.open('GET', './url')
        `}</Code>

        <Heading2>Setting HTTP headers</Heading2>

        <List>
          <ListItem>
            Call the <Code>setRequestHeader</Code> method after{" "}
            <Code>open</Code> and before <Code>send</Code>.
          </ListItem>
          <ListItem>
            If no <Code>Accept</Code> header has been set, an{" "}
            <Code>Accept</Code> header with the
            <Code>*/*</Code> value is automatically added.
          </ListItem>
          <ListItem>
            For security reasons, some headers can not be set from JavaScript
            and are controlled only by the browser. These headers are from the
            <Link href={Article.links.forbiddenHeaders}>
              forbidden header names
            </Link>{" "}
            and{" "}
            <Link href={Article.links.forbidenResponseHeaders}>
              forbidden response header
            </Link>{" "}
            names.
          </ListItem>
        </List>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest()

          request.open('GET', './url')
          request.setRequestHeader('Content-Type', 'application/json')
          request.setRequestHeader('Accept', 'application/json')
          request.send()
        `}</Code>

        <Paragraph>Most common headers you might use:</Paragraph>

        <Code multiline language="javascript">{`
          request.setRequestHeader('Content-Type', 'application/json')
          request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
          request.setRequestHeader('Accept', 'application/json')
          request.setRequestHeader('Accept', 'text/plain')
          request.setRequestHeader('Accept', 'text/html')
        `}</Code>

        <Heading2>Sending data along with the request</Heading2>

        <Paragraph>
          If you use GET you add the data as query parameters.
        </Paragraph>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest()
          request.open('GET', './url?some=data')
          request.send()
        `}</Code>

        <Paragraph>
          If you use POST you want to send the data in the HTTP request body,
          you do that by passing string in the <Code>send</Code> method.
        </Paragraph>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest()
          request.open('GET', './url')
          request.send('data')
        `}</Code>

        <Heading2>Adding timeout</Heading2>

        <List>
          <ListItem>
            Set the <Code>timeout</Code> property on your request instance.
          </ListItem>
          <ListItem>
            Timeout is set in milliseconds and when it elapses the{" "}
            <Code>timeout</Code>
            event is fired.
          </ListItem>
        </List>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest()
          request.addEventListener('timeout', e => {
            console.log('timeout', e)
          })
          request.timeout = 10000 // ms
          request.open('GET', './url')
          request.send()
        `}</Code>

        <Heading1>Canceling opened request</Heading1>

        <Paragraph>
          Once request is sent, it can be aborted at any time.
        </Paragraph>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest()
          request.addEventListener('abort', e => {
            console.log('abort', e)
          })
          request.open('GET', './url')
          request.send()

          request.abort()
        `}</Code>

        <Heading1>Request events</Heading1>

        <Heading2>load</Heading2>

        <List>
          <ListItem>Server responded, and request finished loading.</ListItem>
        </List>

        <Heading2>error</Heading2>

        <List>
          <ListItem>Error with HTTP request occurred.</ListItem>
          <ListItem>
            A server responding with <Code>500</Code> status code will not
            trigger the
            <Code>error</Code> event since it is an error on the server side,
            not with the HTTP request itself.
          </ListItem>
          <ListItem>
            Usually, it might be one of the following:
            <List>
              <ListItem>There is no internet connection.</ListItem>
              <ListItem>
                A server does not respond in time (several minutes in Chrome),
                and the browser terminates the connection.
              </ListItem>
              <ListItem>
                A request is made into a different domain, and the response does
                not have correct cross-origin headers.
              </ListItem>
              <ListItem>Unknown protocol scheme.</ListItem>
            </List>
          </ListItem>
        </List>

        <Heading2>loadend</Heading2>

        <List>
          <ListItem>
            After <Code>error</Code>, <Code>abort</Code>, or <Code>load</Code>{" "}
            have been dispatched.
          </ListItem>
        </List>

        <Heading2>loadstart</Heading2>

        <List>
          <ListItem>Fires when the progress has begun.</ListItem>
        </List>

        <Heading2>abort</Heading2>

        <List>
          <ListItem>
            Fires when <Code>abort</Code> method is called on the request
            instance.
          </ListItem>
        </List>

        <Heading2>timeout</Heading2>

        <List>
          <ListItem>
            Fires when a request takes longer than a value set in the{" "}
            <Code>timeout</Code>
            property.
          </ListItem>
          <ListItem>
            Does not fire when <Code>timeout</Code> is not set, request takes
            too long, and browser decides to close the connection. In that case,{" "}
            <Code>error</Code> event is fired instead.
          </ListItem>
        </List>

        <Heading2>progress</Heading2>

        <List>
          <ListItem>
            Fires at least one time once the first chunk of data arrives, then
            after some amount of data is downloaded.
            <List>
              <ListItem>
                In Chrome it is roughly after each 32KB are downloaded.
              </ListItem>
              <ListItem>
                In Firefox it seemed to fire relative to the current network
                speed, it varied between few KB and several hundred KB.
              </ListItem>
            </List>
          </ListItem>
          <ListItem>
            <Code>event.total</Code> the size of the request body in Bytes.
          </ListItem>
          <ListItem>
            <Code>event.loaded</Code> number of Bytes downloaded.
          </ListItem>
        </List>

        <Code multiline language="javascript">{`
          let progressLastTimestamp = Date.now()
          let progressLastLoadedChunk = 0

          const request = new window.XMLHttpRequest()
          request.addEventListener('progress', e => {
            const currentTime = Date.now()

            console.log(\`progress - time since last event \${ currentTime - progressLastTimestamp } ms\`)
            console.log(\`progress - downloaded \${ e.loaded } B / \${ e.total } B\`)
            console.log(\`progress - last chunk size \${ e.loaded - progressLastLoadedChunk } B\`)

            progressLastTimestamp = currentTime
            lastLoaded = e.loaded
          })
          request.open('GET', './url')
          request.send()
        `}</Code>

        <Heading2>readystatechange</Heading2>

        <List>
          <ListItem>Describes the state of the HTTP request.</ListItem>
          <ListItem>
            Is available on the <Code>event.target.readyState</Code> property.
          </ListItem>
        </List>

        <Table
          heading={
            <TableRow>
              <TableCell>Value</TableCell>
              <TableCell>State</TableCell>
              <TableCell>Description</TableCell>
            </TableRow>
          }
        >
          <TableRow>
            <TableCell>0</TableCell>
            <TableCell>
              <Code>UNSENT</Code>
            </TableCell>
            <TableCell>
              Request instance has been created, but <Code>open</Code> method
              has not been called yet.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              <Code>OPENED</Code>
            </TableCell>
            <TableCell>
              <Code>open</Code> method called.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>
              <Code>HEADERS_RECEIVED</Code>
            </TableCell>
            <TableCell>
              <Code>send</Code> method has been called, and headers and status
              code received.
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>
              <Code>LOADING</Code>
            </TableCell>
            <TableCell>
              Downloading, <Code>event.target.responseText</Code> holds partial
              dat
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>4</TableCell>
            <TableCell>
              <Code>DONE</Code>
            </TableCell>
            <TableCell>Request completed.</TableCell>
          </TableRow>
        </Table>

        <Heading1>Events order</Heading1>

        <Table
          heading={
            <TableRow>
              <TableCell>Order</TableCell>
              <TableCell>Event name</TableCell>
              <TableCell>Additional info</TableCell>
            </TableRow>
          }
        >
          <TableRow>
            <TableCell>1</TableCell>
            <TableCell>
              <Code>readystatechange</Code>
            </TableCell>
            <TableCell>
              <Code>readyState</Code> is <Code>1</Code> (<Code>OPENED</Code>)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>2</TableCell>
            <TableCell>
              <Code>loadstart</Code>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>3</TableCell>
            <TableCell>
              <Code>readystatechange</Code>
            </TableCell>
            <TableCell>
              <Code>readyState</Code> is <Code>2</Code> (<Code>
                HEADERS_RECEIVED
              </Code>)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>4-5</TableCell>
            <TableCell>
              <Code>readystatechange</Code>
            </TableCell>
            <TableCell>
              <Code>readyState</Code> is <Code>3</Code> (<Code>LOADING</Code>),
              might happen more than once.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5-6</TableCell>
            <TableCell>
              <Code>progress</Code>
            </TableCell>
            <TableCell>
              Might happen more than once with larger files or slower internet
              connection.
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>5-6</TableCell>
            <TableCell>
              <Code>readystatechange</Code>
            </TableCell>
            <TableCell>
              <Code>readyState</Code> is <Code>4</Code> (<Code>DONE</Code>)
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>7</TableCell>
            <TableCell>
              <Code>load</Code> or <Code>abort</Code> or <Code>timeout</Code>
            </TableCell>
            <TableCell />
          </TableRow>
          <TableRow>
            <TableCell>8</TableCell>
            <TableCell>
              <Code>loadend</Code>
            </TableCell>
            <TableCell />
          </TableRow>
        </Table>

        <Heading1>Complete example, delete what you do not need</Heading1>

        <Code multiline language="javascript">{`
          const request = new window.XMLHttpRequest()

          request.addEventListener('load', e => {
            console.log('load', e)
            if (e.target.status >= 200 && e.target.status < 300) {
              // ok
              const res = e.target.responseText
            } else {
              // not ok
            }
          })
          request.addEventListener('error', e => {
            console.log('error', e)
          })
          request.addEventListener('abort', e => {
            console.log('abort', e)
          })
          request.addEventListener('loadend', e => {
            // After \`error\`, \`abort\`, or \`load\` have been dispatched.
            console.log('loadend', e)
          })
          request.addEventListener('readystatechange', e => {
            console.log('readystatechange', e.target.readyState)
          })

          request.timeout = 10000 // ms
          request.addEventListener('timeout', e => {
            console.log('timeout', e)
          })

          let progressLastTimestamp = Date.now()
          let progressLastLoadedChunk = 0
          request.addEventListener('progress', e => {
            console.log('progress', e)

            const currentTime = Date.now()
            console.log(\`progress - time since last event \${ currentTime - progressLastTimestamp } ms\`)
            console.log(\`progress - downloaded \${ e.loaded } B / \${ e.total } B\`)
            console.log(\`progress - last chunk size \${ e.loaded - progressLastLoadedChunk } B\`)
            progressLastTimestamp = currentTime
            lastLoaded = e.loaded
          })

          request.open('GET', './url')
          request.setRequestHeader('Content-Type', 'application/json')
          request.setRequestHeader('Accept', 'application/json')
          request.send()

          // request.abort()
        `}</Code>

        <Heading1>Alternatives</Heading1>

        <Paragraph>
          A modern alternative to XMLHttpRequest is the
          <Link href={Article.links.fetch}>Fetch</Link> API that uses promises
          but has some downsides like worse browser support and not supporting
          request cancellation which is needed surprisingly often – Lately, I
          have found myself rewriting Fetch to XMLHttpRequest many times, just
          because I needed the cancellation feature.
        </Paragraph>
      </React.Fragment>
    );
  }
}
