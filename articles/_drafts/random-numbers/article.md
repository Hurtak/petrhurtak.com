## Generating random numbers in JavaScript

In JavaScript there `Math.random()` function. It returns 64bit float between 0 (inclusive) and 1 (exclusive), and is not cryptographically secure

```js
> Math.random()
0.25882258613409337
```

In case you would want random number in certain range, there is no standard library function for that and you need use something like this

```js
function getRandomInt (min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}
```

If you want to read more about how this function works, I recommend [this helpful Stack Overflow answer](https://stackoverflow.com/a/1527820).

## Cryptographic randomness

The `window.crypto.getRandomValues()` function lets you get cryptographically strong random values. The array given as the parameter is filled with random numbers (random in its cryptographic meaning).

This function takes TypedArray of certain size and fill it with random numbers in range of the typed array, eg if it is 8Bit array, values will be between 0-255.

```js
const randomNumber = window.crypto.getRandomValues(new Uint8Array(1))[0]
```

To guarantee enough performance, implementations are not using a truly random number generator, but they are using a pseudo-random number generator seeded with a value with enough entropy. The PRNG used differs from one implementation to the other but is suitable for cryptographic usages. Implementations are also required to use a seed with enough entropy, like a system-level entropy source.

var cryptoStor = new Uint16Array(8);
(In this case, we’re creating an array with eight different slots that can each contain an unsigned 16-bit integer. Other interger options include Int8Array, Uint8Array, int16Array, Int32Array and Uint32Array.

Then, fill the array with random numbers of the defined type:

window.crypto.getRandomValues(cryptoStor);
Showing the collected values in the console:

> [43484, 57947, 46691, 49849, 24272, 11827, 28203, 17423]
The Web Cryptography API has good support in modern browsers, although it is vendor prefixed in some cases.

- If you want numbers in certain range, you might do +min and %max, but that might leave uneven distribution. Add example code where we just ask for new number again.

```js
function generateCryptoRandomNumber (min, max) {
	const distance = max - min
  const maxDistance = 2 ** 32 - 1
  // TODO: better error message
	if (distance > maxDistance) throw new Error('Maximum is too big')

  let randomNumber
  do  {
    randomNumber = window.crypto.getRandomValues(new Uint32Array(1))[0]
  } while (randomNumber >= maxDistance - (maxDistance % distance))

  return randomNumber % (distance + 1) + min
}

console.log(generateCryptoRandomNumber(1, 100))
```

## Node

TODO