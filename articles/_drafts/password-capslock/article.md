Password form fields are masking the characters by default so from UX standpoint it is a good idea to show if Caps Lock is activated. With conventional forms, it won't help as much because users will usually notice that Caps Lock os on in the username or email field. But if password field is the only one in the form, showing such indicator is much more valuable. After all, all operating systems are doing it.

<img
    src="images/linux.png"
    alt="Linux login screen with Caps Lock on"
    title="Linux login screen with Caps Lock on">


<input type="password" id="pass-1">
<p id="capslock-message">Caps Lock is on</p>
<script>
    const passEl = document.querySelector('#pass-1')
    const capsLockMessage = document.querySelector('#capslock-message')
    passEl.addEventListener('keydown', e => {
        const KEY_CAPSLOCK = 20
        console.log(e)
        if (e.keyCode === KEY_CAPSLOCK) {
            console.log(e)
        }
    })
</script>

## TODO

- js code
    - for one input
    - global detection
    - modern code which straight away detects if capslock is pressed
    - toLocaleLowerString avaliable in node 0.8
