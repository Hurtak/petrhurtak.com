The Screen is screen manager with terminal emulation that allows you to:

- Run a process in a terminal on background, and later on connect back.
- Use multiple terminal windows from a single session.
- Reconnect to a terminal session from various locations.

<video width="626" width="274" controls autoplay loop>
  <source src="./videos/screen.mkv" type="video/mp4">
  <source src="./videos/screen.webm" type="video/webm">
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
| Reattach to session                                    |  `screen -r [id or name]`                                                                               |
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

## Sources

- [https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/](https://www.rackaid.com/blog/linux-screen-tutorial-and-how-to/)
- [http://stackoverflow.com/questions/5392618/how-can-i-tell-whether-im-in-a-screen](http://stackoverflow.com/questions/5392618/how-can-i-tell-whether-im-in-a-screen)
- [http://stackoverflow.com/questions/1509677/kill-detached-screen-session](http://stackoverflow.com/questions/1509677/kill-detached-screen-session)
