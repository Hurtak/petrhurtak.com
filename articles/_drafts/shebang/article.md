
Under Unix-like operating systems you can either run scripts by specifying the
interpreter along with the path, for example: `python test.py`. Or you can run them as programs with `./program` and have the interpreter specified in the shebang on the first line of the script

## Syntax

```bash
#! interpreter [optional-arg]

the script run by specified interpreter
```

- The interpreter must be a valid pathname for an executable - therefore something like `#!python` will not work, because python is not path name. Use full path like `#!/usr/bin/env python`.
- It usually takes only one argument, so you cannot do `#!/usr/bin/env node --harmony`

### Example

```bash
#!/usr/bin/env bash
echo "Hello"
```

TODO --------- video

### usr/bin/env

- It is recomended to use `#!/usr/bin/env` instead of the absolute path like `#!/usr/bin/python`
- to make sure python (or any other language's interpreter) is found, in case it might not be in exactly the same location across different systems.
- env is an executable in `/usr/bin`, is in pretty much all Linux distributions and it
    runs a program in a modified environment


env is a shell command for Unix and Unix-like operating systems. It is used to either print a list of environment variables or run another utility in an altered environment without having to modify the currently existing environment. Using env, variables may be added or removed, and existing variables may be changed by assigning new values to them.

and in relation to your question:

In practice, env has another common use. It is often used by shell scripts to launch the correct interpreter. In this usage, the environment is typically not changed


You should use #!/usr/bin/env bash for portability: different *nixes put bash in different places, and using /usr/bin/env is a workaround to run the first bash found on the PATH. And sh is not bash.

/bin/sh is usually a link to the system's default shell, which many or most places will be/usr/bin/bash. However, the original Bourne shell is sh, so if your script uses some bash (2nd generation, "Bourne Again sh"), then you should be more specific and use the later. This way, on systems where bash is not installed, your script won't run.


Although #!/usr/bin/python will work on a default Ubuntu system, it is therefore good practice to use  #!/usr/bin/env python instead.

## Common shebangs

| Interpreter | Shebang                 |
| ----------- | ----------------------- |
| Bash        | `#!/usr/bin/env bash`   |
| Python      | `#!/usr/bin/env python` |
| Node.js     | `#!/usr/bin/env node`   |
