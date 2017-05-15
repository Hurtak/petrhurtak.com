## Title

- from the point of view of frontend developer
- at Seznam.cz we use debian packages for decent amount of application of distribution, here are some notes about how we do it
- ATM we are in the transition to use Docker ofc.

Main files:
    control – meta-data about the package (dependencies, etc.)
    rules – specifies how to build the package
    copyright – copyright information for the package
    changelog – history of the Debian package

### Start

- create debian directory in the root of your project
- `mkdir debian`
- add `DEBEMAIL` and `DEBFULLNAME` env variables to `.bashrc` to make sure your name and email is filled properly when you are using `dch`.

```bash
export DEBEMAIL="petr.hurtak@gmail.com"
export DEBFULLNAME="Petr Huřťák"
```

### Create debian changelog

- either by `dch --create`
- or manually

```text
PACKAGE (0.0.1) UNRELEASED; urgency=medium

  * Initial release.

 -- Petr Huřťák <petr.hurtak@gmail.com>  Mon, 15 May 2017 21:38:29 +0200
```

- `dch` will start editing the latest entry if latest entry is unreleased or it will add new entry
- `dch -r` to change from UNRELEASED to released state and updating the date od last entry

### Debian compat

- The compat file defines the debhelper compatibility level. Currently, you should set it to the debhelper v9 as follows:
- `echo 9 > debian/compat`
- https://www.debian.org/doc/manuals/maint-guide/dother.en.html#compat

### Debian control

```text
Source: package-name
Maintainer: Petr Huřťák <petr.hurtak@firma.seznam.cz>
Section: fulltext/Seznam
Priority: extra
Build-Depends: debhelper (>= 9.0.0),
               nodejs (>= 6.0.0)
Standards-Version: 3.9.3

Package: package-name
Architecture: any
Section: fulltext/Seznam
Priority: extra
Depends: ${misc:Depends}
Description: Krasty static files
```

#### Main stuff

| Field             | Type        | Description |
| ----------------- | ----------- | ----------- |
| Source            | mandatory   | The source package name.  must consist only of lower case letters (a-z), digits (0-9), plus (+) and minus (-) signs, and periods (.). `package-name` |
| Mantainer         | mandatory   | The package maintainer's name and email address. `Name Surename <email@domain.com>` |
| Section           | recommended | An application area into which the package has been classified. List of avaliable sections https://www.debian.org/doc/debian-policy/ch-archive.html#s-subsections , at seznam we use something like `fulltext/Seznam` |
| Priority          | recommended | How important it is that the user have the package installed. https://www.debian.org/doc/debian-policy/ch-archive.html#s-priorities , package priorities `required`, `important`, `standard`, `optional`, `extra` |
| Build-Depends     | optional    | TODO |
| Standards-Version | recommended | The most recent version of the standards (the policy manual and associated texts) with which the package complies. TODO Couldnt find much about this field. |

#### Binary package stuff

| Field             | Type        | Description |
| ----------------- | ----------- | ----------- |
| Package           | mandatory   | The name of the binary package. Binary package names must follow the same syntax and restrictions as source package names. `package-name` |
| Architecture      | mandatory   | `all` for static file stuff https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-Architecture |
| Section           | recommended | same as Section above |
| Priority          | recommended | same as Priority above |
| Depends           | optional    | TODO |
| Description       | mandatory   | Description |

TODO: links to docs for all fields

#### Source
