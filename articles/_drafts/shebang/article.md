## Title

- links
    - http://stackoverflow.com/questions/4303128/how-to-use-multiple-arguments-with-a-shebang-i-e
    - https://unix.stackexchange.com/questions/15998/what-does-the-e-do-in-a-bash-shebang
    - https://unix.stackexchange.com/questions/87560/does-the-shebang-determine-the-shell-which-runs-the-script
    - https://bash.cyberciti.biz/guide/Shebang


`#! interpreter [optional-arg]`

- links
    -

The interpreter must be a valid pathname for an executable....

- it only takes one argument so you cannot do #!/usr/bin/env node --harmony

therefore

`#!python`
will not work because python is not path name


Using #!/usr/bin/env python instead of the absolute (full path) #!/usr/bin/python makes sure python (or any other language's interpreter) is found, in case it might not be in exactly the same location across different Linux- or Unix -like distributions, as explained e.g. here.

Although #!/usr/bin/python will work on a default Ubuntu system, it is therefore good practice to use  #!/usr/bin/env python instead.

About env

env is an executable in /usr/bin, or, as mentioned by @hvd (thanks for the hint!), available as a compatibility symlink in /usr/bin to env, in pretty much all Linux distributions.


- node shebang
`#!/usr/bin/env node`



## TODO
- shebang
  - https://en.wikipedia.org/wiki/Shebang_(Unix)
  - nodejs, python
  - chmod u+x script
  - list of most common shebangs so we can easily copy paste
