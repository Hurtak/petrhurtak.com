## HTTP requests in browser

- The most common way to make HTTP request in the browser is by using the `window.XMLHttpRequest` API.
- XMLHttpRequest was originally designed by Microsoft and then adopted by all browser wendors. Despite its name, XMLHttpRequest can be used to retrieve any type of data, not just XML.

## Simple example

```js
const request = new window.XMLHttpRequest()
request.addEventListener('load', e => {
  console.log('response', e.target.responseText)
})
request.addEventListener('error', e => {
  console.log('error', e)
})
request.open('GET', './url')
request.send()
```

## Customizing the request

- There are several ways to customize the request

### The HTTP request method

- HTTP method is specified as the firt argument of the `open` method.
- HTTP method name is case-insensitive.
- All HTTP methods are supported, so you can use the less common ones like `DELETE` or `PUT`.

```js
request.open('GET', './url')
```

### Setting HTTP headers

- You must call the `setRequestHeader` method after `open` and before `send`.
- If no `Accept` header has been set using this, an `Accept` header with the `*/*` value is automatically added.
- For security reasons, some headers can cannot be set from JavaScript and are controled only by the browser, these headers are from the [forbidden header names](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name) and [forbidden response header](https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_response_header_name) names.

```js
const request = new window.XMLHttpRequest()

request.open('GET', './url')
request.setRequestHeader('Content-Type', 'application/json')
request.setRequestHeader('Accept', 'application/json')
request.send()
```

#### Most commom headers you might use

```js
request.setRequestHeader('Content-Type', 'application/json')
request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
request.setRequestHeader('Accept', 'application/json')
request.setRequestHeader('Accept', 'text/plain')
request.setRequestHeader('Accept', 'text/html')
```

### Sending data along with the request

- If you use GET you add data aq query parameters

```js
const request = new window.XMLHttpRequest()
request.open('GET', './url?some=data')
request.send()
```

- If you use POST you want to send the data in the HTTP request body, you do that by passing string in the `send` method.

```js
const request = new window.XMLHttpRequest()
request.open('GET', './url')
request.send('data')
```

### Adding timeout

```js
const request = new window.XMLHttpRequest()
request.addEventListener('timeout', e => {
  console.log('timeout', e)
})
request.timeout = 10000 // ms
request.open('GET', './url')
request.send()
```

## Canceling opened request

```js
const request = new window.XMLHttpRequest()
request.addEventListener('abort', e => {
  console.log('abort', e)
})
request.open('GET', './url')
request.send()

request.abort()
```


## Request events

- `load`
    - Server responded and request finished loading.
- `error`
    - Error with HTTP request occurend
    - Server responding with `500` status code will not trigger the `error` event since it is error on the server not with the HTTP request itself
    - Usually it might be one of the following
        - There is no internet connection.
        - Server does not response in time (several minutes in Chrome) and the browser terminates the connection.
        - Request is made into different domain and the response does not have correct cross origin headers.
        - Unknown protocol scheme.
- `loadend`
    - After `error`, `abort`, or `load` have been dispatched.
- `loadstart`
    - Fires when the progress has begun.
- `abort`
    - Fires when `abort` method is called on the request instance.
- `timeout`
    - Fires when request takes longet than value set in then `timeout` property the request instance.
    - Does not fire when `timeout` is not set, request takes too ling and browser decides to close the connection, in that case `error` event is fired instead.
- `progress`
    - Fires at least one time once first chunk of data arrives, then roughly after some amount of data is downloaded.
        - In Chrome it is roughly after each 32KB are downloaded.
        - In Firefox it seemed to fire related on current network speed, so there could be several kilobytes huge chunks. At minimum there seemed to be 6.4KB chunks.
    - `event.total` size of the request body in Bytes.
    - `event.loaded` number of Bytes downloaded.

```js
let progressLastTimestamp = Date.now()
let progressLastLoadedChunk = 0

const request = new window.XMLHttpRequest()
request.addEventListener('progress', e => {
  const currentTime = Date.now()

  console.log(`progress - time since last event ${ currentTime - progressLastTimestamp } ms`)
  console.log(`progress - downloaded ${ e.loaded } B / ${ e.total } B`)
  console.log(`progress - last chunk size ${ e.loaded - progressLastLoadedChunk } B`)

  progressLastTimestamp = currentTime
  lastLoaded = e.loaded
})
request.open('GET', './url')
request.send()
```

- `readystatechange`
    - Describes the state of the HTTP request
    - Is avaliable on the `event.target.readyState` property

| Value | State              | Description |
| ----- | ------------------ | ----------- |
| 0     | `UNSENT`           | Request instance has been created but `open` method has not been called yet. |
| 1     | `OPENED`           | `open` method called. |
| 2     | `HEADERS_RECEIVED` | `send` method has been called and headers and status code received. |
| 3     | `LOADING`          | Downloading, `event.target.responseText` holds partial data. |
| 4     | `DONE`             | Request completed. |


### Events order

| Order | Event name                     | Additional info                                               |
| ------| ------------------------------ | ------------------------------------------------------------- |
| 1     | `readystatechange`             | `readyState` is `1` (`OPENED`)                                |
| 2     | `loadstart`                    |                                                               |
| 3     | `readystatechange`             | `readyState` is `2` (`HEADERS_RECEIVED`)                      |
| 4-5   | `readystatechange`             | `readyState` is `3` (`LOADING`), might happen more than once. |
| 5-6   | `progress`                     | Might happen more than once if file is larger.                |
| 5-6   | `readystatechange`             | `readyState` is `4` (`DONE`)                                  |
| 7     | `load` or `abort` or `timeout` |                                                               |
| 8     | `loadend`                      |                                                               |



- responseText and status
- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
- e object interesting stuff
- reading headers
    - getAllResponseHeaders()
- with credentials
- CORS
- there are several ways to make http requests `XMLHttpRequest` or `fetch` or `img` tag?

## Complete example, delete what you do not need

```js
var request = new window.XMLHttpRequest()

request.addEventListener('load', e => {
  console.log('load', e)
  if (e.target.status >= 200 && e.target.status < 300) {
    // ok
    const res = e.target.statusText
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
  // After `error`, `abort`, or `load` have been dispatched.
  console.log('loadend', e)
})
request.addEventListener('loadstart', e => {
  console.log('loadstart', e)
})
request.addEventListener('readystatechange', e => {
  console.log('readystatechange', e.target.readyState)
})
request.addEventListener('timeout', e => {
  console.log('timeout', e)
})

let progressLastTimestamp = Date.now()
let progressLastLoadedChunk = 0
request.addEventListener('progress', e => {
  console.log('progress', e)

  const currentTime = Date.now()
  console.log(`progress - time since last event ${ currentTime - progressLastTimestamp } ms`)
  console.log(`progress - downloaded ${ e.loaded } B / ${ e.total } B`)
  console.log(`progress - last chunk size ${ e.loaded - progressLastLoadedChunk } B`)
  progressLastTimestamp = currentTime
  lastLoaded = e.loaded
})

request.timeout = 10000 // ms

request.open('GET', './url')
request.setRequestHeader('Content-Type', 'application/json')
request.setRequestHeader('Accept', 'application/json')
request.send()

// request.abort()
```