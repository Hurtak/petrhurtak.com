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
function theFunction (state) {
  return state + 1
}

class TheClass {
  constructor () {
    this.state = 0
  }

  theMethod () {
    this.state += 1
  }
}
```

### Function

- Data is usually passed into the function explicitely.

### Method

- OOP paradigm.
- Methods are called on instance or object `instance.theMethod()`.
- Usually it operates on data that is contained within the instance of the class.

If you know about any other expressions that get confused often, tell me in comments.

## Serial vs pararell

### Serial

```diagram

    input ━━ A ━━ B ━━ C ━━ response

```

### Pararell

```diagram

            ┏━━ A ━━┓
            ┃       ┃
    input ━━╋━━ B ━━╋━━ response
            ┃       ┃
            ┗━━ C ━━┛

```

## TODO

- common mistakes in naming
  - url vs uri
    - https://stackoverflow.com/questions/176264/what-is-the-difference-between-a-uri-a-url-and-a-urn
  - imperative vs procedural vs declarative
- is `expression` the right word?
