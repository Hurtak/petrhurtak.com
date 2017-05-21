At [Seznam.cz](https://www.seznam.cz/) we use Debian packages for packaging and distribution of a decent amount of applications. While we are in the process of transitioning to solutions using Docker, Debian packages still play a significant role.

In this article, I will tell you the basics about how to make a simple Debian package with static website application. I wrote this article from the frontend developer point of view, so not all parts of Debian packaging are covered.

## Basics

- Create a directory named `debian` in the root of your project.
- We will use `debhelper` which is a collection of small tools that are used in to automate various aspects of building a Debian package.
- Add `DEBEMAIL` and `DEBFULLNAME` environment variables to your `.bashrc` to have your name and email automatically filled when you will manipulate the changelog with the `dch`.

```bash
export DEBEMAIL="name@email.com"
export DEBFULLNAME="Forename Surname"
```

- You will need `debhelper` and `dch`. These tools are located in `build-essential` and `devscripts` packages.
    - `apt-get install build-essential devscripts`

## Folder structure

Inside the `debian` folder you will need to create these five files:

| Filename             | Description                                                             |
| -------------------- | ----------------------------------------------------------------------- |
| changelog            | Changes and release date of each version of your package.               |
| compat               | Defines the debhelper compatibility level.                              |
| control              | Metadata about the package, like its name, maintainers or dependencies. |
| rules                | Specifies how to build the package.                                     |
| package-name.install | Specifies what files to copy into the package.                          |

## Changelog file

Create `debian/changelog` file, either by running `dch --create` or manually.

```
package-name (0.0.1) UNRELEASED; urgency=medium

  * Initial release.

 -- Forename Surname <name@email.com>  Mon, 15 May 2017 20:00:00 +0200
```

### Working with the changelog

| Command                                                 | Description                                                                                                                        |
| ------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| <span style="white-space: nowrap">`dch --create`</span> | Creates new changelog file with _Initial release_ entry.                                                                           |
| `dch`                                                   | Adds new version if the latest one is not _UNRELEASED_. Otherwise, it adds a new item to the current version and updates the date. |
| `dch -r`                                                | Changes from _UNRELEASED_ to released state and updates the date.                                                                  |
| Just use your editor                                    | Works fine most of the time.                                                                                                       |

At Seznam.cz when we release a package we do not use the official distributions, instead we do something like `dch -r --force-distribution --distribution Seznam`.

## Compat file

The compat file defines the debhelper compatibility level. [Currently, you should set it to the debhelper v9][debhelper].

```bash
echo 9 > debian/compat
```

[debhelper]: https://www.debian.org/doc/manuals/maint-guide/dother.en.html#compat

## Control file

- In this file we specify all the metadata about our package, like its name, dependencies and maintainers.
- There are two types of packages:
    - __Source releases__: contain human readable version of the application, meaning it has to be compiled before it can be used.
    - __Binary releases__: contain computer readable version of the application, meaning it is compiled.
- For our purposes we will only build the binary package, but fields for the source release also need to be specified.

```
Source: package-name
Maintainer: Forename Surname <name@email.com>
Section: fulltext/Seznam
Priority: extra
Build-Depends: debhelper (>= 9.0.0)
Standards-Version: 3.9.8

Package: package-name
Architecture: all
Section: fulltext/Seznam
Priority: extra
Depends: ${misc:Depends}
Description: Package description
```

### Main fields

| Field                                  | Type        | Description |
| -------------------------------------- | ----------- | ----------- |
| [Source][source]                       | mandatory   | The source package name. Must consist only of lower case letters (a-z), digits (0-9), plus (+) and minus (-) signs, and periods (.). `package-name`. |
| [Mantainer][maintainer]                | mandatory   | The package maintainer's name and email address. `Name Surname <name@email.com>`. |
| [Section][section]                     | recommended | An [application area][application-area] into which the package has been classified. At Seznam.cz we use something like `fulltext/Seznam`. |
| [Priority][priority]                   | recommended | How important it is that the user have the package installed. The [priorities][priorities] are (in descending order): `required`, `important`, `standard`, `optional`, `extra`. |
| [Build-Depends][build-depends]         | optional    | What packages need to be installed before we can start building your package. |
| [Standards-Version][standards-version] | recommended | The most recent version of the [Debian Policy Manual][standards] with which the package complies. You can find the version at the bottom of every Debian policy page we have linked here. |

### Binary package fields

| Field                        | Type        | Description |
| ---------------------------- | ----------- | ----------- |
| [Package][package]           | mandatory   | The name of the binary package. Binary package names must follow the same syntax and restrictions as source package names. `package-name`. |
| [Architecture][architecture] | mandatory   | Usually one of the following: `all` - Architecture independent, usually consisting of text, images, or scripts in an interpreted language. `any` - Architecture dependent, usually in a compiled language. |
| [Section][section]           | recommended | Same as Section of source package. |
| [Priority][priority]         | recommended | Same as Priority of source package. |
| [Depends][depends]           | optional    | Dependencies of the package. Some debhelper commands may cause the generated package to depend on some additional packages. All such commands generate a list of required packages for each binary package, this list is used for substituting `${misc:Depends}`. |
| [Description][description]   | mandatory   | Description. TODO: multiline description |

- TODO: how dependencies work when we are installing / uninstalling

[source]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Source
[maintainer]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Maintainer
[section]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Section
[application-area]: https://www.debian.org/doc/debian-policy/ch-archive.html#s-subsections
[priority]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Priority
[priorities]: https://www.debian.org/doc/debian-policy/ch-archive.html#s-priorities
[build-depends]: https://www.debian.org/doc/debian-policy/ch-relationships.html#s-sourcebinarydeps
[standards-version]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Standards-Version
[standards]: https://www.debian.org/doc/debian-policy/
[maintainers-guide]: https://www.debian.org/doc/manuals/maint-guide/dreq.en.html#control

[package]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Package
[architecture]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Architecture
[priority]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Priority
[depends]: https://www.debian.org/doc/debian-policy/ch-relationships.html#s-binarydeps
[description]: https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Description

## Rules file

- Create `debian/rules` file.
- This file contains rules about how to build your package. We will be using the `dh` command from the `debhelper` package to help us with the build.

```makefile
#!/usr/bin/make -f

%:
	dh $@
```

- This file is _Makefile_ so make sure to:
    - Mark it as executable `chmod u+x debian/rules`.
    - Use only tabs for indentation.

- The `dh` have many stages of the buils and you will see them all in the console once you start building your package.
- If you need to override or extend parts of the `dh` build steps, here is how you do it:

```makefile
#!/usr/bin/make -f

%:
	dh $@

override_dh_auto_build:
	dh_auto_build # We can ommit this call and only use our scripts
	./my-script
```

## Debian install script

- Creat file named `debian/package-name.install`.
- Put there what you want to copy into the debian package.
- From file stystem : into debian package - then during installation these files will be installed in the right specified path.
- Directory is relative to the parent of _debian_ directory, eg if you have `project/debian/package-name.install`, paths will be relative to `project` dir.

```
dist/* /www/package-name/
```

## Create the package

- In the root of your project directory run `dpkg-buildpackage -b -uc`.
    - `-b` makes only binary package (with the final compiled files) and does not create package with source files.
    - `-uc` will skipp the signing stage of the `.changes` file with your PGP key.
- If everything went ok, you should see file named `package-name_1.0.0_all.deb` one level up from the root directory of your project.

### Build artefacts

There are also some build artefacts in the `debian` directory from the creation of the package, they are usefull for debugging, but if everything went ok, you can remove them with something like

```bash
git clean -df debian
```

## Inspecting the package

- To get basic metadata about package (mostly stuff from `debian/control`)
    - `dpkg --info <file>.deb`
- Midnight Commander is pretty helpful when taking a look inside the package
    - `sudo apt-get install mc`
    - Press `F3` or the `View` command while having the package selected
    - Or press enter to open the package and inspect its contents.
- Trying to install the package is also useful to see if there are not any conflicts or dependency problems
    - `sudo dpkg -i <file>.deb`

<video width="698" height="308" controls autoplay loop>
  <source src="./videos/packaging.mp4" type="video/mp4">
</video>


## Static files build dependencies

So far we have only covered how to take some `dist` directory and package it up in Debian package, but how do we express dependencies needed for building the `dist` directory? I think there are two reasonable approaches.

If we have some CI build pipeline, it makes more sense to have one build task for building the static files, and another one for building the debian package - and just passing the build artifacts from the first task to the other. This will allow use to use differend docker images (eg `node:7` for building the static files, and `debian:8` for the packaging) where lots of needed stuff will be preinstalled on those images and we will not have to manage it ourselves.

In case we would want to express the static files build dependencies and build in the debian directory, here is how it could look like:

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

Or whatever dependencis you need and can install with `apt`.

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

## Links

- [Debian Policy Manual](https://www.debian.org/doc/debian-policy/)
- [Debian New Maintainers' Guide](https://www.debian.org/doc/manuals/maint-guide/)
