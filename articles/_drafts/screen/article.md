## Basic information

- Screen is window session manager
- It allows you to:
    - Use multiple shell windows from a single session.
    - Run a processes in separate shell on the background and later on, connect back to that backgroud shell.
    - Disconnect and reconnect to a shell sessions from multiple locations.

## Instalation

```bash
sudo apt-get install screen
```

## Workflow

- start the screen session with `screen` command
- once you are in a screen you can exit it just as you would exit regular shell by typing `exit`
- or you can `detach` from the screen session, which will bring you back to the original shell. Later on, you can reattach to the detached screen

## Keyboard shortcuts

- Controlling the screen is mainly through keyboard shortcuts
- Most common shortcuts:
    - Help
        - `ctrl+a ?`
    - Disconnect
        - `ctrl+a d`
    - Kill
        - `ctrl+a K`
        - or just type `exit`

## Commands

- New session
    - `screen`
- New session with name
    - `screen -S name`
- List of running screens
    - `screen -ls`
- Reattach to already running screen with name or id
    - `screen -r name`
- Reattach to already running screen with name or id, if not exists create new
    - `screen -R [id or name]`
- Kill running session
    - `screen -X -S [id or name] quit`
    ```bash
    $ screen -ls
    There is a screen on:
        10574.test (08/04/17 23:50:04) (Detached)
    1 Socket in /var/run/screen/S-hurtak.

    $ screen -S 10574 -X quit

    $ screen -ls
    No Sockets found in /var/run/screen/S-hurtak.
    ```
    - Or just connect to the screen with `screen -r [id or name]` and then just run `exit`
- Get screen session id and name
    - Take a look at the `$STY` environment variable.
    - STY stands for `Alternate socket name`.
    - If screen is invoked, `$STY` is set, otherwise it is empty.
    ```bash
    $ echo $STY
    10921.test
    ```

## Am I running in screen?

### STY environment variable

```bash
$ echo $STY

$ screen -S test
$ echo $STY
6825.test
```

### TERM environment variable

```bash
$ echo $TERM
xterm-256color
$ screen
$ echo $TERM
screen
```

## Sources

- [https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/](https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/)
- [http://stackoverflow.com/questions/5392618/how-can-i-tell-whether-im-in-a-screen](http://stackoverflow.com/questions/5392618/how-can-i-tell-whether-im-in-a-screen)
- [http://stackoverflow.com/questions/1509677/kill-detached-screen-session](http://stackoverflow.com/questions/1509677/kill-detached-screen-session)
