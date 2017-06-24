## Title

- simplest request
```js
const request = new window.XMLHttpRequest()
request.addEventListener('load', e => {
  console.log('response', e.target.responseText)
}
request.addEventListener('error', e => {
  console.log('error', e.target.responseText)
}
request.open('GET', './url')
request.send()
```

- Request method is case insensitive
- get/post/delete ... (POST vs post or it doesent matter?)
- https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
- ready state
    - https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/readyState
- headers
- abort
- reading headers
    - getAllResponseHeaders()
- with credentials
- CORS
- timeout
- error/done listeners
- cancel
- progress
    - after how many bytes is progress called?
        - is this consistent across browsers?


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
