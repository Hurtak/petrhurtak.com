Little collection of technical expressions that I either confuse often or that I see often confused by other people.

## Parameter vs argument

```js
function log (parameter) {
  console.log(parameter)
}

log('argument')
```

### Parameter

Variable in a funtion signature that is placeholder for the actual value passed into the function.

### Argument

Actual value passed into the function.

## Function vs method

```js
function functionName (state) {
  return state + 1
}

class ClassName {
  constructor () {
    this.state = 0
  }

  methodName () {
    this.state += 1
  }
}
```

### Function

- Data is usually passed into the function explicitely.

### Method

- OOP paradigm.
- Methods are called on instance or object `instance.methodName()`.
- Usually it operates on data that is contained within the instance of the class.

## Serial vs pararell

### Serial

```diagram

    input ━━ A ━━ B ━━ C ━━ response

```

### Pararell

```diagram

            ┏━━━━ A ━━━━┓
            ┃           ┃
    input ━━╋━━━━ B ━━━━╋━━ response
            ┃           ┃
            ┗━━━━ C ━━━━┛

```

## URL vs URI

URIs are identifiers, and that can mean name, location, or both. All URLs are URIs, but the opposite is not true. The part that makes something a URL is the inclusion of the "access mechanism", or "network location", such as `https://`, or `mailto:`.

- URI: when you’re referring to a resource just by its name or some other fragment.
- URL: When you’re giving both the name of a resource and the method of accessing it.

### Examples

- `example.com` URI.
- `https://example.com` URI and URL.

## Links

- [https://danielmiessler.com/study/url-uri/](https://danielmiessler.com/study/url-uri/)

If you know about any other expressions that get confused often, tell me in comments.
