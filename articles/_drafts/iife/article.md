## Title

- `IIFE` is abbreviation for `immediately-invoked function expression`.
- What is basically means is, that we define new function and we execute it immediately

```js
console.log(1)

// IIFE with arrow function
;(() => {
    console.log(2)
})()

// IIFE with anonymous function
;(function () {
  console.log(3)
})()

console.log(4)

// logs: 1 2 3 4
```

- Advantages
  - Separate function scope - clojure
  ```js
  const x = 1
  console.log(x) // 1
  ;(() => {
    const x = 2
    console.log(x) // 2
  })()
  console.log(x) // 1
  ```

## Usage

### Not leaking variables into the global scope

- in browser land - if you are not using modules, it is a good practice to wrap your code inside iife to make sure you are not leaking any global variables

```js
<DOCTYPE html>
<html>
  <head>...</head>
  <body>
    ...
    <script>
      (() => {
        const config = { foo: 'bar' }
        // config is not leaked to the window object
        App.init(config)
      })()
    </script>
  </body>
</html>
```

### Module pattern

- was once popular not so much now that we have:
  - A class keyword.
  - Module system in the language spec.

- Unlike with classes, it Provides true private variables/functions/methods.

```js
const Module = (() => {
  // private variables/functions
  let state = 0

  const init = (initialState) => {
    state = initialState
  }

  function privateMethod () {
    state += 1
  }

  function publicMethod () {
    privateMethod()
    return state
  }

  // exported public functions
  return {
    init,
    publicMethod
  }
})()

Module.init(10)
Module.publicMethod() // 11
```

- This has the downsude, unlike with classes, that there is only one state and you cannot create instances

- Instancing can be simulated with the Module pattern but it is not recommended since new functions are created for each instance, instead of having one method that is reused on each instance with the prototype chaing - bigger memory requiremeents,

```js
const Module = initialState => (() => {
    // private variables/functions
    let state = initialState

    function privateMethod () {
        state += 1
    }

    function publicMethod () {
        privateMethod()
        return state
    }

    // exported public functions
    return {
        publicMethod
    }
})()


const instanceA = Module(1)
const instanceB = Module(10)
console.log(instanceA.publicMethod()) // 2
console.log(instanceB.publicMethod()) // 11
```

### React

- Might also be useful with React where ifs inside templates are usualy done either with `&&` or with ternary operators `a ? true : false` - and nesting these might start to get little unclear once more compicated logic is necessary.

```jsx
<section>
  {a
    ? b
      ? <p>a and b</p>
      : <p>a and not b</p>
    : <p>not a</p>
  }
</section>
```

```jsx
<section>
  {(() => {
    if (a) {
      if (b) {
        return <p>a and b</p>
      } else {
        return <p>a and not b</p>
      }
    } else {
      return <p>not a</p>
    }
  })()}
</section>
```

### Do keyword proposal
  - TODO better heading
  - mention that it is from functional languages
  - useful for better code structure

  - https://github.com/babel/babel/tree/master/packages/babel-plugin-syntax-do-expressions

```js
const res = do {
  const foo = getFoo()
  const bar = getBar()
  foo + bar // implicit return
}
```

```js
const data = (() => {
  const foo = getFoo()
  const bar = getBar()
  return foo + bar
})()
```

or just

```js
const foo = getFoo()
const bar = getBar()
const data = foo + bar
```

## Caveats
  - https://www.reddit.com/r/javascript/comments/54ruxx/before_self_invoking_function/
