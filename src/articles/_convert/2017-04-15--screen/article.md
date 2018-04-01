The Screen is screen manager with terminal emulation that allows you to:

- Run a process in a terminal on background, and later on connect back.
- Use multiple terminal windows from a single session.
- Reconnect to a terminal session from various locations.

<video width="626" height="274" controls autoplay loop>
  <source src="./videos/screen.mp4" type="video/mp4">
</video>

## Instalation

```bash
sudo apt install screen
```

## Workflow

- Start the Screen session with `screen` command.
- Exit the session as you would exit a regular shell, by typing `exit`.
- Or you can detach from the Screen session so later you can come back.
- Inside the Screen, you can create windows and switch between them.

## Keyboard shortcuts

Once you are in a Screen session, you can control it through keyboard shortcuts.

| Action                  | Keyboard shortcut | Command  |
| ----------------------- | ----------------- | -------- |
| Disconnect from session | `ctrl+a d`        |          |
| Kill current session    | `ctrl+a k`        | `exit`   |
| New Screen window       | `ctrl+a c`        | `screen` |
| List of Screen windows  | `ctrl+a "`        |          |
| Help                    | `ctrl+a ?`        |          |

## Commands

| Action                                                 | Command                                                                                                 |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| New session                                            | `screen`                                                                                                |
| New session with name                                  | `screen -S name`                                                                                        |
| List of Screen sessions                                | `screen -ls`                                                                                            |
| Reattach to session                                    | `screen -r [id or name]`                                                                               |
| Reattach to session or create one if it does not exist | `screen -R [id or name]`                                                                                |
| Kill session                                           | `screen -S [id or name] -X quit` <br>Or just connect to the screen with `screen -r` and then run `exit` |
| Kill all sessions                                      | `pkill screen`                                                                                          |

## Get screen session id and name

- Take a look at the `$STY` environment variable (STY stands for `Alternate socket name`).
- If you are running inside a Screen, `$STY` is set. Otherwise, it is empty.

```bash
$ echo $STY
10921.session-name
```

## Am I running in a screen?

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

## Conclusion

I use Screen mainly for running processes in the background &ndash; for the ease of coming back to them, seeing what they logged into the console, and terminating them.
With the window management stuff, I am fine with just using regular tabs in my terminal. But if you ever needed something more powerful than that, you should consider either Screen or its more powerful competitor [Tmux](https://tmux.github.io/).

## Links

- [https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/](https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/)
- [https://tmux.github.io/](https://tmux.github.io/)
