## Title

Collection of dotfiles configurations that might be useful in your average
project.

## .editorconfig

http://editorconfig.org/

### Example configuration

```toml
root = true

[*]
indent_style = space
indent_size = 2
end_of_line = lf
charset = utf-8
trim_trailing_whitespace = true
insert_final_newline = true

[Makefile]
indent_style = tab
```

## .gitignore

Files and folders that will be ignores by git.

### Syntax

| Syntax         | Description                                            |
| -------------- | ------------------------------------------------------ |
| `folder_name`  | Ignores all folders called `folder_name`.              |
| `/folder_name` | Ignores folder called `folder_name` in foot directory. |
| `file_name`    | Ignores folder.                                        |

TODO folder/file ?? how about nesting

### Example configuration

```text
/.vscode
/app/build
/app/coverage
node_modules
```

## .gitkeep

There is no way to commit empty directory into the git repository, so there is
convention to crate empty `.gitkeep` file that you put into the directory, and
then that file is commited along with the directory into the git source control.
