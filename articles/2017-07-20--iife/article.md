## What is IIFE

- `IIFE` is an abbreviation for `immediately-invoked function expression`.
- What that means is that we define a new function and execute it immediately.

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

// Regular function call equivalent
function foo () {
  console.log(4)
}
foo()

console.log(5)

// logs: 1 2 3 4 5
```

## Where IIFE can be useful

### Not leaking variables into the global scope

In the browser environment (if you are not using module system), it is a good practice to wrap your code inside IIFE to make sure:

- You are not leaking any global variables/functions into global scope.
- Your variables cannot be overwritten by any other scripts that also might be accessing global scope.
- You do not accidentally overwrite global variables of other scripts by using the same name.

```js
<DOCTYPE html>
<html>
  <head><!-- code --></head>
  <body>
    <!-- code -->
    <script>
      (() => {
        const config = { foo: 'bar' }
        // `config` is not leaked to the window object
        App.init(config)
      })()
    </script>
  </body>
</html>
```

### Variable assignment with its own scope

```js
// IIFE
const res = (() => {
  const foo = 1
  const bar = 2
  return foo + bar
})()

// Vs regular approach
const foo = 1
const bar = 2
const res = foo + bar
```

This approach might lead to better code structure where it is clearer what parts of the code are only sub computations and what are the results of these computations.

It is more common to see this in functional languages where keywords like `let` are available.

```elm
res =
  let
    foo = 1
    bar = 2
  in
    foo + bar
```

At the moment there is a stage 1 `do` keyword [proposal](https://gist.github.com/dherman/1c97dfb25179fa34a41b5fff040f9879) for JavaScript that introduces such functionality. It is also supported by [Babel](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&targets=&browsers=&builtIns=false&debug=false&code_lz=MYewdgzgLgBATgUwjAvDAJiGBvAUDGUSWAMxCzQEZ9DxoYAjAQzlRgCYaysBqRl3AF8gA).

```js
const res = do {
  const foo = 1
  const bar = 2
  foo + bar // implicit return
}
```

### React

In React `if` statements inside templates are usualy done either with logical operators `condition && <b>true</b>` or with ternary operators `condition ? <b>true</b> : <b>false</b>`. IIFE might be used to create blocks with regular code flow.

```jsx
const html = (
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
)
```

Also might be useful when we want to do some computations right in the templates.

```jsx
const html = (
  <section>
    {(() => {
      const foo = 1
      const bar = 2
      const res = foo + bar

      return <p>{res}</p>
    })()}
  </section>
)
```

### Module pattern

Module pattern was once popular before the module system was introduced into the language.

This pattern provides:

- Encapsulation.
- True private variables/functions/methods (unlike with JavaScript classes).

```js
const Counter = (() => {
  // private variables/functions
  let state = 0

  function init (initialState) {
    state = initialState
  }

  function privateMethod () {
    state += 1
  }

  function increment () {
    privateMethod()
    return state
  }

  // exported public functions
  return {
    init,
    increment
  }
})()

Counter.init(10)
Counter.increment() // 11
```

Compared to classes there is a downside,  there is only one shared state, and you cannot create multiple instances.

While instances can be done with the module pattern, it is not recommended to do that because new functions are created for each instance, instead of having one method on the prototype chain that is reused by each instance. This will also lead to bigger memory requirements compared to classes.

```js
const Counter = initialState => (() => {
  // private variables/functions
  let state = initialState

  function privateMethod () {
    state += 1
  }

  function increment () {
    privateMethod()
    return state
  }

  // exported public functions
  return {
    increment
  }
})()

const counterA = Counter(1)
const counterB = Counter(10)
counterA.increment() // 2
counterB.increment() // 11
```

## Why are parentheses required around IIFE?

You have to wrap the function in parentheses in order to make the code [parse as an expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/). While the code will be parsed in some cases, in most it will not, so it is a good practice to always use them.

| Code                                            | Valid   |
| ----------------------------------------------- | ------- |
| `const x = (() => { return foo() })()`          | valid   |
| `const x = () => { return foo() }()`            | invalid |
| `const x = (function () { return foo() })()`    | valid   |
| `const x = function () { return foo() }()`      | valid   |
| `(() => { return foo() })()`                    | valid   |
| `() => { return foo() }()`                      | invalid |
| `(function () { return foo() })()`              | valid   |
| `function () { return foo() }()`                | invalid |

## Semicolon at the beginning

There are two cases where putting a semicolon before the IIFE is necessary.

### If you are not using any module system and concatenate JavaScript files manually.

```js
// File a.js
console.log(1)

// File b.js
(() => {
  // ...
})()
```

If you concatenate these files, the executed code is the equivalent to

```js
console.log(1)(() => {})()
// Uncaught TypeError: console.log(...) is not a function
```

You can solve this problem by putting semicolon before the IIFE

```js
;(() => {
  // ...
})()
```

### If you are not using semicolons

When you decide to omit semicolons at the end of statements, and you have standalone IIFE with no assignment, semicolon at the beginning is required for the reasons described above.

```js
// ok
const res1 = (() => { return 1 })()
const res2 = (() => { return 1 })()

// not ok
(() => { return 1 })()
(() => { return 1 })()

// ok
;(() => { return 1 })()
;(() => { return 1 })()
```

You can use linter like [ESLint](http://eslint.org/) to prevent you from making such mistakes.

## Other ways to enforce function expression

There are several other ways you can write the IIFE's, but they do not work with arrow functions and are not that commonly used (outside of minifies which use them because they are 1 character shorter than the version with parentheses).

```js
!function () { /* ... */ }()
~function () { /* ... */ }()
-function () { /* ... */ }()
+function () { /* ... */ }()
void function () { /* ... */ }()
```
