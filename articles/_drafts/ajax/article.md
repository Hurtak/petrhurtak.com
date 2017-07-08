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

## Request events

- load
- error
- readystatechange
- progress
- any other?
- link to all events

- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
- ready state
    - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
- abort
- e object interesting stuff
- reading headers
    - getAllResponseHeaders()
- with credentials
- CORS
- timeout
- error/done listeners
- cancel
- there are several ways to make http requests `XMLHttpRequest` or `fetch` or `img` tag?
- progress
    - after how many bytes is progress called?
        - is this consistent across browsers?

- most common example - delete what you do not use - maybe separate article?


<script>
    const request = new window.XMLHttpRequest();
    request.addEventListener('readystatechange', e => {
        console.log(e.target.readyState)
        if (e.target.readyState === 4) {
            /* console.log(request.responseText) */
        }
    })
    request.addEventListener('progress', e => {
        console.log('progress', e.target.responseText.length)
    })
    request.open('GET', './extra/data.json');
    request.send();
</script>
