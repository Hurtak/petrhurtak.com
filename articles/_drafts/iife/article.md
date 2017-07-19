## What is IIFE

- `IIFE` is abbreviation for `immediately-invoked function expression`.
- What that basically means is, that we define new function and we execute it immediately

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

- In browser land - if you are not using modules, it is a good practice to wrap your code inside iife to make sure:
    - You are not leaking any global variables into global scope.
    - Your variables are not overwriten by later scripts that also can acces global scope.
    - You do not overwrite global variables with variables that you define with the same name.

```js
<DOCTYPE html>
<html>
  <head><!-- code --></head>
  <body>
    <!-- code -->
    <script>
      (() => {
        const config = { foo: 'bar' }
        // Config is not leaked to the window object
        App.init(config)
      })()
    </script>
  </body>
</html>
```

### Nested code block that assign value to variable

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

- This is more common in functional languages where there are keywords for such nesting.

```elm
res =
  let
    foo = 1
    bar = 2
  in
    foo + bar
```

- This might lead to better code structure where it is clearer what parts of code are only sub computations and it also provides better variable names (shadowing?).

- There is also stage 1 `do` keyword [proposal](https://gist.github.com/dherman/1c97dfb25179fa34a41b5fff040f9879) for JavaScript that introduces such functionality. It is also supported by [Babel](https://babeljs.io/repl/#?babili=false&evaluate=true&lineWrap=false&presets=es2015%2Cstage-0%2Cstage-1%2Cstage-2%2Cstage-3&targets=&browsers=&builtIns=false&debug=false&code_lz=MYewdgzgLgBATgUwjAvDAJiGBvAUDGUSWAMxCzQEZ9DxoYAjAQzlRgCYaysBqRl3AF8gA).

```js
const res = do {
  const foo = getFoo()
  const bar = getBar()
  foo + bar // implicit return
}
```

### React

- In React `if` statements inside templates are usualy done either with logical operators `condition && <b>true</b>` or with ternary operators `condition ? <b>true</b> : false`. IIFE might be used to create blocks with regular code flow.

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

- Also might be useful when we want to do some computations right in the templates.

```jsx
<section>
  {(() => {
    const foo = getFoo()
    const bar = getBar()
    const res = foo + bar

    return <p>{ res }</p>
  })()}
</section>
```

### Module pattern

- Module pattern was once popular before the module system was introduced into the language.
- This pattern provides:
    - Encapsulation
    - True pripave variables/functions/methods (unlike with JavaScript class).

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

- Compared to classes there is downside, that there is only one shared state and you cannot create multiple instances.

- While instancing can be done with the module pattern, it is not recommended since new functions are created for each instance. Instead of having one method that is reused on each instance with the prototype chaing. This will lead to bigger memory requiremeents compared to classes.

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

## Why are parentheses required around IIFE?

You have to wrap the function in parens in order to make it [parse as an expression](http://benalman.com/news/2010/11/immediately-invoked-function-expression/). While it will parse in some cases, in most it will not so it is a good practice to always wrap them.

| Code                                            | Valid   |
| ----------------------------------------------- | ------- |
| `const x = (() => { return foo() })()`          | valid   |
| `const x = (function () { return foo() })()`    | valid   |
| `const x = () => { return foo() }()`            | invalid |
| `const x = function () { return foo() }()`      | valid   |
| `function () { return foo() }()`                | invalid |
| `(() => { return foo() })()`                    | valid   |
| `() => { return foo() }()`                      | invalid |

## Semicolon at the beginning


- Use linter like [ESLint](http://eslint.org/) to prevent you from making such mistake

It prevents the parens from being seen as a possible function call. Simple example:
(function (val) {
  console.log(val)
})('hello world')
This logs 'hello world'. Maybe I share this with someone else so they can paste it into their script. Their script, brilliant as they are, looks like this:
alert
And when the add the IIFE, you get
alert

(function (val) {
  console.log(val)
})('hello world')
But what JavaScript sees is
alert(function (val) {
  console.log(val)
})('hello world')
Which when run, will alert the function then complain that the result of the alert call is not a function and produces an error.
The semicolon ends whatever expression that might precede the IIFE so that its parens can't be misinterpreted as a function call.
alert

// ; to end the alert (or anything else up there)
;(function (val) {
  console.log(val)
})('hello world')
