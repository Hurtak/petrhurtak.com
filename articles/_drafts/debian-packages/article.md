At [Seznam.cz](https://www.seznam.cz/) we use debian packages for packaging and distribution of decent amount of applications. While we are in the process of transitioning to Docker based solutions, Debian packages still play important role.

In this article I will tell you the basics about how to make simple debian package with static website application. Also note that this article is written from the frontend developer point of view so some parts of creating packages might be ommited simply because they are not needed for simple frontend apps.

## Basics

- create directory callend `debian` in the root of your project
    - `mkdir debian`
- make sure these dependencies are installed
    - `apt-get install --yes git build-essential devscripts`
    - TODO: double check if both of these are really used
- add `DEBEMAIL` and `DEBFULLNAME` env variables to `.bashrc` to make sure your name and email is filled properly when you will be manipulating with changelog with `dch` tool.

```bash
export DEBEMAIL="petr.hurtak@firma.seznam.cz"
export DEBFULLNAME="Petr Huřťák"
```

## Folder structure

- inside the `debian` folder you will need to create these five files

| Filename             | Description |
| -------------------- | ----------- |
| control              | Meta data about the package, like its name, maintainers or dependencies |
| rules                | Specifies how to build the package    |
| compat               | Defines the debhelper (tool used to create the package) compatibility level |
| changelog            | Changes and release date of each version of your package  |
| package-name.install | If there are files that need to be copied into your package, put them here |

### Changelog file

- create file `debian/cangelog`
- either by running `dch --create` or manually
- This is how it should look like:

```
PACKAGE (0.0.1) UNRELEASED; urgency=medium

  * Initial release.

 -- Petr Huřťák <petr.hurtak@firma.seznam.cz>  Mon, 15 May 2017 21:38:29 +0200
```

#### Working with the changelog

| Command              | Description |
| -------------------- | ----------- |
| `dch --create`       | Creates new changelog file with "Initial release" entry TODO: quotes |
| `dch`                | Meta data about the package, like its name, maintainers or dependencies |
| `dch -r`             | Changes from `UNRELEASED` to released state and updates the date od last entry |
| just use your editor | Works fine most of the time |

At Seznam.cz when we release package we also do not use the official distributions, instead we do something like `dch -r --force-distribution --distribution Seznam`

### Compat file

- The compat file defines the debhelper compatibility level. [Currently, you should set it to the debhelper v9](https://www.debian.org/doc/manuals/maint-guide/dother.en.html#compat)
- `echo 9 > debian/compat`

### Control file

- Here is how `control` file could look like

```
Source: package-name
Maintainer: Petr Huřťák <petr.hurtak@firma.seznam.cz>
Section: fulltext/Seznam
Priority: extra
Build-Depends: debhelper (>= 9.0.0)
Standards-Version: 3.9.4

Package: package-name
Architecture: all
Section: fulltext/Seznam
Priority: extra
Depends: ${misc:Depends}
Description: Package description
```

#### Main fields

| Field             | Type        | Description |
| ----------------- | ----------- | ----------- |
| [Source](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Source)                       | mandatory   | The source package name. Must consist only of lower case letters (a-z), digits (0-9), plus (+) and minus (-) signs, and periods (.). `package-name` |
| [Mantainer](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Maintainer)                | mandatory   | The package maintainer's name and email address. `Name Surename <name@email.com>` |
| [Section](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Section)                     | recommended | An [application area](https://www.debian.org/doc/debian-policy/ch-archive.html#s-subsections) into which the package has been classified. At Seznam.cz we use something like `fulltext/Seznam` |
| [Priority](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Priority)                   | recommended | How important it is that the user have the package installed. The [priorities](https://www.debian.org/doc/debian-policy/ch-archive.html#s-priorities) are (in descending order): `required`, `important`, `standard`, `optional`, `extra` |
| [Build-Depends](https://www.debian.org/doc/debian-policy/ch-relationships.html#s-sourcebinarydeps)        | optional    | What packages need to be installed before we can start building your package. |
| [Standards-Version](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Standards-Version) | recommended | The most recent version of the standards (the policy manual and associated texts) with which the package complies. I couldnt find much more about this field but [official Debians maintainer's guide](https://www.debian.org/doc/manuals/maint-guide/dreq.en.html#control) recommends putting `3.9.4` in there. |

#### Binary package fields

| Field             | Type        | Description |
| ----------------- | ----------- | ----------- |
| [Package](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Package)           | mandatory   | The name of the binary package. Binary package names must follow the same syntax and restrictions as source package names. `package-name` |
| [Architecture](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Architecture) | mandatory   | This value is usually one of the following depending on the type of the binary package: `any` - architecture dependent one usually in a compiled language, `all` - architecture independent one usually consisting of text, images, or scripts in an interpreted language. |
| [Section](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Section)           | recommended | Same as Section of source package |
| [Priority](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Priority)         | recommended | Same as Priority of source package |
| [Depends](https://www.debian.org/doc/debian-policy/ch-relationships.html#s-binarydeps)          | optional    | Some debhelper commands may cause the generated package to depend on some additional packages. All such commands generate a list of required packages for each binary package, this list is used for substituting `${misc:Depends}`. |
| [Description](https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Description)   | mandatory   | Description |

### Rules file

- Now we need to take a look at the exact rules which `dpkg-buildpackage` command will use to actually create the package.
- This file is in fact another Makefile so make sure to:
    - mark this file as executable `chmod u+x debian/rules`
    - use only tabs as indentation

Minimal rules file:

```makefile
#!/usr/bin/make -f

%:
	dh $@
```

### Debian install script

- creat file named `package-name.install`
- put there what you want to copy into the debian package
- from file stystem : into debian package - then during installation these files will be installed in the right specified path
- directory is relative to the parent of `debian` directory, eg if you have `project/debian/package-name.install`, paths will be relative to `project` dir.

```
dist/* /www/package-name/
```

## Static files build dependencies

So far we have only covered how to take some `dist` directory and package it up in debian package but how do we express dependencies needed for building the `dist` directory? I found two reasonable approaches

If we have some CI build pipeline, it makes more sense to have one build task for building the static files, and another one for building the debian package - and just passing the build artifacts from the first task to the other. This will allow use to use differend docker images (eg `node:7` for the static files, and `debian:8` for the packaging) where lots of needed stuff will be preinstalled and we will not have to manage it ourselves.

In case we would want to express the static files build dependencies and building itseld in the debian directory here is how it could look like

### Control file

Extend `Build-Depends` from

```
Build-Depends: debhelper (>= 9.0.0)
```

to

```
Build-Depends: debhelper (>= 9.0.0),
               nodejs (>= 6.0.0)
```

### Rules file

Add override to build step where we will do the installation of dependencies from other package managers and also the building itself

```makefile
#!/usr/bin/make -f

%:
	dh $@

override_dh_auto_build:
	cd src && \
	npm install && \
	./build-script

```
