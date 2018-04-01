Under Unix-like operating systems you can either run scripts by specifying the interpreter along with the path `python test.py`, or you can run them as programs `./test.py`, and have the interpreter specified in the shebang on the first line of the script.

## Syntax

```bash
#! interpreter [optional-arg]

the script content run by the specified interpreter
```

- The interpreter must be a valid pathname for an executable. Therefore something like `#!python` will not work because `python` is not a path name. Use full path like `#!/usr/bin/env python`.
- The interpreted usually takes only one argument, so you cannot do something like `#!/usr/bin/env node --harmony`.

### Example

```bash
#!/usr/bin/env bash
echo "Hello"
```

<video width="626" height="274" controls autoplay loop>
  <source src="./videos/shebang.mp4" type="video/mp4">
</video>

### usr/bin/env

Env is an executable in Unix-like operating systems that, among other things, is often used by shell scripts to launch the correct interpreter. Env is located at `/usr/bin/env`.

It is recommended to use `#!/usr/bin/env` instead of the absolute path like `#!/usr/bin/python`. Although `#!/usr/bin/python` will work on a default Ubuntu system, it is good practice to use  `#!/usr/bin/env python` instead.

Same thing can be said about shells, you should use `#!/usr/bin/env bash` instead of `#!/bin/bash` for portability reasons. Different *nixes put the bash in various places, and using `/usr/bin/env` is a workaround to run the first bash found on the PATH.

## Common shebangs

| Interpreter | Shebang                 |
| ----------- | ----------------------- |
| Bash        | `#!/usr/bin/env bash`   |
| Shell       | `#!/usr/bin/env sh`     |
| Python      | `#!/usr/bin/env python` |
| Node.js     | `#!/usr/bin/env node`   |
