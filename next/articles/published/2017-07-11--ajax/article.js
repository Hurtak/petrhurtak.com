import React from "react";

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
    return <div>XXX</div>;
  }
}

// ## HTTP requests in browsers

// - The most common way to make HTTP request in the browser is by using the `window.XMLHttpRequest` API.
// - XMLHttpRequest was originally designed by Microsoft and then adopted by all browser vendors. Despite its name, XMLHttpRequest can be used to fetch any type of data, not just XML.

// ## Simple example

// ```js
// const request = new window.XMLHttpRequest()

// request.addEventListener('load', e => {
//   console.log('response status code', e.target.status)
//   console.log('response body', e.target.responseText)
// })
// request.addEventListener('error', e => {
//   console.log('error', e)
// })

// request.open('GET', './url')
// request.send()
// ```

// - Once the request is successfully completed (`load` event is fired), the HTTP status code and request body are avaliable to us.
//     - `event.target.status` HTTP status code as `int`.
//     - `event.target.responseText` HTTP body as `string`.
//     - `event.target.getAllResponseHeaders()` response headers as newline separated `string`.

// ## Customizing the request

// - There are several ways to customize the request.

// ### The HTTP request method

// - HTTP method is specified as the first argument of the `open` method.
// - HTTP method name is case-insensitive.
// - All HTTP methods are supported, so you can use the less common ones like `DELETE` or `PUT`.

// ```js
// request.open('GET', './url')
// ```

// ### Setting HTTP headers

// - Call the `setRequestHeader` method after `open` and before `send`.
// - If no `Accept` header has been set, an `Accept` header with the `*/*` value is automatically added.
// - For security reasons, some headers can not be set from JavaScript and are controlled only by the browser. These headers are from the [forbidden header names](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name) and [forbidden response header](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_response_header_name) names.

// ```js
// const request = new window.XMLHttpRequest()

// request.open('GET', './url')
// request.setRequestHeader('Content-Type', 'application/json')
// request.setRequestHeader('Accept', 'application/json')
// request.send()
// ```

// Most common headers you might use:

// ```js
// request.setRequestHeader('Content-Type', 'application/json')
// request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
// request.setRequestHeader('Accept', 'application/json')
// request.setRequestHeader('Accept', 'text/plain')
// request.setRequestHeader('Accept', 'text/html')
// ```

// ### Sending data along with the request

// - If you use GET you add the data as query parameters.

// ```js
// const request = new window.XMLHttpRequest()
// request.open('GET', './url?some=data')
// request.send()
// ```

// - If you use POST you want to send the data in the HTTP request body, you do that by passing string in the `send` method.

// ```js
// const request = new window.XMLHttpRequest()
// request.open('GET', './url')
// request.send('data')
// ```

// ### Adding timeout

// - Set the `timeout` property on your request instance.
// - Timeout is set in milliseconds and when it elapses the `timeout` event is fired.

// ```js
// const request = new window.XMLHttpRequest()
// request.addEventListener('timeout', e => {
//   console.log('timeout', e)
// })
// request.timeout = 10000 // ms
// request.open('GET', './url')
// request.send()
// ```

// ## Canceling opened request

// - Once request is sent, it can be aborted at any time.

// ```js
// const request = new window.XMLHttpRequest()
// request.addEventListener('abort', e => {
//   console.log('abort', e)
// })
// request.open('GET', './url')
// request.send()

// request.abort()
// ```

// ## Request events

// ### load

// - Server responded, and request finished loading.

// ### error

// - Error with HTTP request occurred.
// - A server responding with `500` status code will not trigger the `error` event since it is an error on the server side, not with the HTTP request itself.
// - Usually, it might be one of the following:
//     - There is no internet connection.
//     - A server does not respond in time (several minutes in Chrome), and the browser terminates the connection.
//     - A request is made into a different domain, and the response does not have correct cross-origin headers.
//     - Unknown protocol scheme.

// ### loadend

// - After `error`, `abort`, or `load` have been dispatched.

// ### loadstart

// - Fires when the progress has begun.

// ### abort

// - Fires when `abort` method is called on the request instance.

// ### timeout

// - Fires when a request takes longer than a value set in the `timeout` property.
// - Does not fire when `timeout` is not set, request takes too long, and browser decides to close the connection. In that case, `error` event is fired instead.

// ### progress

// - Fires at least one time once the first chunk of data arrives, then after some amount of data is downloaded.
//     - In Chrome it is roughly after each 32KB are downloaded.
//     - In Firefox it seemed to fire relative to the current network speed, it varied between few KB and several hundred KB.
// - `event.total` the size of the request body in Bytes.
// - `event.loaded` number of Bytes downloaded.

// ```js
// let progressLastTimestamp = Date.now()
// let progressLastLoadedChunk = 0

// const request = new window.XMLHttpRequest()
// request.addEventListener('progress', e => {
//   const currentTime = Date.now()

//   console.log(`progress - time since last event ${ currentTime - progressLastTimestamp } ms`)
//   console.log(`progress - downloaded ${ e.loaded } B / ${ e.total } B`)
//   console.log(`progress - last chunk size ${ e.loaded - progressLastLoadedChunk } B`)

//   progressLastTimestamp = currentTime
//   lastLoaded = e.loaded
// })
// request.open('GET', './url')
// request.send()
// ```

// ### readystatechange

// - Describes the state of the HTTP request.
// - Is available on the `event.target.readyState` property.

// | Value | State              | Description                                                                   |
// | ----- | ------------------ | ----------------------------------------------------------------------------- |
// | 0     | `UNSENT`           | Request instance has been created, but `open` method has not been called yet. |
// | 1     | `OPENED`           | `open` method called.                                                         |
// | 2     | `HEADERS_RECEIVED` | `send` method has been called, and headers and status code received.          |
// | 3     | `LOADING`          | Downloading, `event.target.responseText` holds partial data.                  |
// | 4     | `DONE`             | Request completed.                                                            |

// ## Events order

// | Order | Event name                     | Additional info                                                              |
// | ------| ------------------------------ | ---------------------------------------------------------------------------- |
// | 1     | `readystatechange`             | `readyState` is `1` (`OPENED`)                                               |
// | 2     | `loadstart`                    |                                                                              |
// | 3     | `readystatechange`             | `readyState` is `2` (`HEADERS_RECEIVED`)                                     |
// | 4-5   | `readystatechange`             | `readyState` is `3` (`LOADING`), might happen more than once.                |
// | 5-6   | `progress`                     | Might happen more than once with larger files or slower internet connection. |
// | 5-6   | `readystatechange`             | `readyState` is `4` (`DONE`)                                                 |
// | 7     | `load` or `abort` or `timeout` |                                                                              |
// | 8     | `loadend`                      |                                                                              |

// ## Complete example, delete what you do not need

// ```js
// const request = new window.XMLHttpRequest()

// request.addEventListener('load', e => {
//   console.log('load', e)
//   if (e.target.status >= 200 && e.target.status < 300) {
//     // ok
//     const res = e.target.responseText
//   } else {
//     // not ok
//   }
// })
// request.addEventListener('error', e => {
//   console.log('error', e)
// })
// request.addEventListener('abort', e => {
//   console.log('abort', e)
// })
// request.addEventListener('loadend', e => {
//   // After `error`, `abort`, or `load` have been dispatched.
//   console.log('loadend', e)
// })
// request.addEventListener('readystatechange', e => {
//   console.log('readystatechange', e.target.readyState)
// })

// request.timeout = 10000 // ms
// request.addEventListener('timeout', e => {
//   console.log('timeout', e)
// })

// let progressLastTimestamp = Date.now()
// let progressLastLoadedChunk = 0
// request.addEventListener('progress', e => {
//   console.log('progress', e)

//   const currentTime = Date.now()
//   console.log(`progress - time since last event ${ currentTime - progressLastTimestamp } ms`)
//   console.log(`progress - downloaded ${ e.loaded } B / ${ e.total } B`)
//   console.log(`progress - last chunk size ${ e.loaded - progressLastLoadedChunk } B`)
//   progressLastTimestamp = currentTime
//   lastLoaded = e.loaded
// })

// request.open('GET', './url')
// request.setRequestHeader('Content-Type', 'application/json')
// request.setRequestHeader('Accept', 'application/json')
// request.send()

// // request.abort()
// ```

// ## Alternatives

// A modern alternative to XMLHttpRequest is the [Fetch](https://developer.mozilla.org/en/docs/Web/API/Fetch_API) API that uses promises but has some downsides like worse browser support and not supporting request cancellation which is needed surprisingly often – Lately, I have found myself rewriting Fetch to XMLHttpRequest many times, just because I needed the cancellation feature.
