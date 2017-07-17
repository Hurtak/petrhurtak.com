- In JavaScript, most common way to get random values is from the `Math.random()` standard library function.
    - Returns 64bit float between 0 (inclusive) and 1 (exclusive).
    - Not cryptographically secure.
    - Available both in the browser and in the server environment.

```js
> Math.random()
0.5392704424754013
```

- In case you would want a random number in a certain range, there is no standard library function for that. So you either need to do the range transformations by yourself or use some package/library.

## Random integer in range

```js
/**
  * Get random integer in given rangee.
  * @param {int} min - Random number lower boundary (inclusive).
  * @param {int} max - Random number upper boundary (inclusive).
  * @return {int} Random integer.
  */
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

If you want to read more about how this range transformation works, I recommend [this helpful Stack Overflow answer](https://stackoverflow.com/a/1527820).

## Random float in range

```js
/**
  * Get random float in given range.
  * @param {number} min - Random number lower boundary (inclusive).
  * @param {number} max - Random number upper boundary (exclusive).
  * @return {number} Random number.
  */
function getRandomFloat (min, max) {
  return Math.random() * (max - min) + min
}
```

## Cryptographically secure numbers

- In the browser world you have [window.crypto.getRandomValues](https://developer.mozilla.org/en/docs/Web/API/RandomSource/getRandomValues).
- In Node.js there is [global.crypto.randomBytes](https://nodejs.org/api/crypto.html#crypto_crypto_randombytes_size_callback).
- You probably should not do the range transformations by yourself as they can be [error prone](https://gist.github.com/joepie91/7105003c3b26e65efcea63f3db82dfba). I would recommend using some library for that.
