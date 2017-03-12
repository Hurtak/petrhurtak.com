Password form fields are masking the characters by default so from UX standpoint it is a good idea to show if Caps Lock is activated. With conventional forms, it won't help as much because users will usually notice that Caps Lock os on in the username or email field. But if password field is the only one in the form, showing such indicator is much more valuable. After all, all operating systems are doing it.

<img
    src="./images/linux.png"
    alt="Linux login screen with Caps Lock on"
    title="Linux login screen with Caps Lock on">

## The ideal solution

First lets define how it should look like:

- When page loads you can call browser API which will return Boolean whether CapsLock is active, if it is you display some warning.
- Then we listen on keyboard presses and if user presses CapsLock we toggle the warning visibility.

Seems pretty easy, unfrotuantelly the first point is not possible and the second one is not as straightforward as we would hope. So lets take a look at some "good enough" solutions.

## The easy way

When you listen on keyboard events, the event object has `KeyboardEvent.getModifierState` method which will return Boolean whether certain modifier is pressed.
<!-- TODO: https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/getModifierState -->
<!-- TODO: http://caniuse.com/#feat=keyboardevent-getmodifierstate -->
Support of this API is pretty good except for Safari where you need Safari 10.1+.

The you will need to look at the pressed keys, you can use `KeyboardEvent.key === 'CapsLock'` but there is poor browser compatibility ATM. If we want to improve on that front we can use deprecated, but widely supported, `KeyboardEvent.which === 20`.
<!-- TODO: http://caniuse.com/#feat=keyboardevent-which -->

<a href="./snippets/easy-way.html">
    Live code example snippet
</a>

## The hard way

<a href="./snippets/the-hard-way.html">
    Live code example snippet
</a>

## TODO

- js code
    - for one input
    - global detection
    - toLocaleLowerString avaliable in node 0.8
- what about phones?
