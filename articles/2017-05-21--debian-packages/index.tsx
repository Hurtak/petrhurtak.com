import { Code, H1, H2, Italic, Li, Link, List, P, Strong, Table, Tc, Tr, Video } from "../components";

export const Article = () => (
  <>
    <P>
      At <Link href="https://www.seznam.cz/">Seznam.cz</Link> we use Debian packages for packaging and distribution of a
      decent amount of our applications. While we are in the process of transitioning to solutions using Docker, Debian
      packages still play a significant role.
    </P>

    <P>
      In this article, I will tell you the basics about how to make a simple Debian package with a static website. I
      wrote this article from the frontend developer point of view, so not all parts of Debian packaging are covered.
    </P>

    <H1>Basics</H1>

    <List>
      <Li>
        Create a directory named <Code>debian</Code> in the root of your project.
      </Li>
      <Li>
        We will use <Code>debhelper</Code> which is a collection of small tools that are used to automate various
        aspects of building a Debian package.
      </Li>
      <Li>
        Add <Code>DEBEMAIL</Code> and <Code>DEBFULLNAME</Code> environment variables to your
        <Code>.bashrc</Code> to have your name and email automatically filled when you will manipulate the changelog
        with the <Code>dch</Code>.
      </Li>
    </List>

    <Code language="bash">{`
      export DEBFULLNAME="Forename Surname"
      export DEBEMAIL="name@email.com"
    `}</Code>

    <List>
      <Li>
        You will need <Code>debhelper</Code> and <Code>dch</Code>. These tools are in <Code>build-essential</Code> and{" "}
        <Code>devscripts</Code> packages.
      </Li>
      <Li>
        <Code language="bash">apt-get install build-essential devscripts</Code>
      </Li>
    </List>

    <H1>Folder structure</H1>

    <P>
      Inside the <Code>debian</Code> folder you will need to create these five files:
    </P>

    <Table
      heading={
        <Tr>
          <Tc>Filename</Tc>
          <Tc>Description</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>changelog</Tc>
        <Tc>Changes and release dates of each version of your package.</Tc>
      </Tr>
      <Tr>
        <Tc>compat</Tc>
        <Tc>Defines the debhelper compatibility level.</Tc>
      </Tr>
      <Tr>
        <Tc>control</Tc>
        <Tc>Metadata about the package, like its name, maintainers or dependencies.</Tc>
      </Tr>
      <Tr>
        <Tc>rules</Tc>
        <Tc>Specifies how to build the package.</Tc>
      </Tr>
      <Tr>
        <Tc noWrap>package-name.install</Tc>
        <Tc>What files to include in the package.</Tc>
      </Tr>
    </Table>

    <H1>Changelog file</H1>

    <P>
      Create <Code>debian/changelog</Code> file, either by running <Code>dch --create</Code> or manually.
    </P>

    <Code>{`
      package-name (0.0.1) UNRELEASED; urgency=medium

        * Initial release.

      -- Forename Surname <name@email.com>  Mon, 15 May 2017 20:00:00 +0200
    `}</Code>

    <H2>Working with the changelog</H2>

    <Table
      heading={
        <Tr>
          <Tc>Command</Tc>
          <Tc>Description</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc noWrap>
          <Code>dch --create</Code>
        </Tc>
        <Tc>
          Creates new changelog file with <Italic>Initial release</Italic> entry.
        </Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code>dch</Code>
        </Tc>
        <Tc>
          Adds new version if the latest one is not <Italic>UNRELEASED</Italic>. Otherwise, it adds a new item to the
          current version and updates the date.
        </Tc>
      </Tr>
      <Tr>
        <Tc>
          <Code>dch -r</Code>
        </Tc>
        <Tc>
          Changes from <Italic>UNRELEASED</Italic> to released state and updates the date.
        </Tc>
      </Tr>
      <Tr>
        <Tc>Just use your editor</Tc>
        <Tc>Works fine most of the time.</Tc>
      </Tr>
    </Table>

    <P>
      At Seznam.cz when we release a package we do not use the official distributions, instead we do something like{" "}
      <Code>dch -r --force-distribution --distribution Seznam</Code>.
    </P>

    <H1>Compat file</H1>

    <P>
      The compat file defines the debhelper compatibility level.{" "}
      <Link href="https://www.debian.org/doc/manuals/maint-guide/dother.en.html#compat">
        Currently, you should set it to the debhelper v9
      </Link>
      .
    </P>

    <Code language="bash">{`
      echo 9 > debian/compat
    `}</Code>

    <H1>Control file</H1>
    <List>
      <Li>
        In this file, we specify all the metadata about our packages, like their names, dependencies, and maintainers.
      </Li>
      <Li>
        There are two types of packages:
        <List>
          <Li>
            <Strong>Source releases</Strong>: contain a human readable version of the application, meaning they have to
            be compiled before they can be used.
          </Li>
          <Li>
            <Strong>Binary releases</Strong>: include computer readable version of the app, meaning they are already
            compiled.
          </Li>
        </List>
      </Li>
      <Li>
        For our purposes, we will only build the binary package, but fields for the source release also need to be
        specified.
      </Li>
    </List>

    <H2>Minimal control file</H2>

    <Code>{`
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
      Depends: \${misc:Depends}
      Description: Package description
    `}</Code>

    <H2>Source package fields</H2>

    <Table
      heading={
        <Tr>
          <Tc>Field</Tc>
          <Tc>Type</Tc>
          <Tc>Description</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-source">Source</Link>
        </Tc>
        <Tc>mandatory</Tc>
        <Tc>
          The source package name. Must consist only of lower case letters (a-z), digits (0-9), plus (+) and minus (-)
          signs, and periods (.).
          <br />
          <Code>package-name</Code>
        </Tc>
      </Tr>
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-maintainer">Maintainer</Link>
        </Tc>
        <Tc>mandatory</Tc>
        <Tc>
          The package maintainer&rsquo;s name and email address.
          <br />
          <Code>Forename Surname &lt;name@email.com&gt;</Code>.
        </Tc>
      </Tr>
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-section">Section</Link>
        </Tc>
        <Tc>recommended</Tc>
        <Tc>
          An <Link href="https://www.debian.org/doc/debian-policy/ch-archive.html#s-subsections">application area</Link>{" "}
          into which the package has been classified.
          <br />
          At Seznam.cz we use something like <Code>fulltext/Seznam</Code>.
        </Tc>
      </Tr>
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-priority">Priority</Link>
        </Tc>
        <Tc>recommended</Tc>
        <Tc>
          How important it is that the user have the package installed. The{" "}
          <Link href="https://www.debian.org/doc/debian-policy/ch-archive.html#s-priorities">priorities</Link> are (in
          descending order): <Code>required</Code>, <Code>important</Code>, <Code>standard</Code>, <Code>optional</Code>
          , <Code>extra</Code>.
        </Tc>
      </Tr>
      <Tr>
        <Tc noWrap>
          <Link href="https://www.debian.org/doc/debian-policy/ch-relationships.html#s-sourcebinarydeps">
            Build-Depends
          </Link>
        </Tc>
        <Tc>optional</Tc>
        <Tc>What dependencies need to be installed before we can start building the package.</Tc>
      </Tr>
      <Tr>
        <Tc noWrap>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-standards-version">
            Standards-Version
          </Link>
        </Tc>
        <Tc>recommended</Tc>
        <Tc>
          The most recent version of the{" "}
          <Link href="https://www.debian.org/doc/debian-policy/">Debian Policy Manual</Link> with which the package
          complies. You can find the latest version at the bottom of every Debian policy page.
        </Tc>
      </Tr>
    </Table>

    <H2>Binary package fields</H2>

    <Table
      heading={
        <Tr>
          <Tc>Field</Tc>
          <Tc>Type</Tc>
          <Tc>Description</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-package">Package</Link>
        </Tc>
        <Tc>mandatory</Tc>
        <Tc>
          Name of the binary package. Binary package names must follow the same syntax and restrictions as source
          package names.
        </Tc>
      </Tr>
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-architecture">
            Architecture
          </Link>
        </Tc>
        <Tc>mandatory</Tc>
        <Tc>
          Usually one of the following:
          <br />
          <Code>all</Code> - Architecture independent, usually consisting of text, images, or scripts in an interpreted
          language.
          <br />
          <Code>any</Code> - Architecture dependent, usually in a compiled language.
        </Tc>
      </Tr>
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html">Section</Link>
        </Tc>
        <Tc>recommended</Tc>
        <Tc>Same as Section of source package.</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-priority">Priority</Link>
        </Tc>
        <Tc>recommended</Tc>
        <Tc>Same as Priority of source package.</Tc>
      </Tr>
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-relationships.html#s-binarydeps">Depends</Link>
        </Tc>
        <Tc>optional</Tc>
        <Tc>
          Dependencies of the package. Some debhelper commands may cause the generated package to depend on some
          additional packages. All such commands produce a list of required packages for each binary package. This list
          will then substitute the <Code>{`\${misc:Depends}`}</Code> string.
        </Tc>
      </Tr>
      <Tr>
        <Tc>
          <Link href="https://www.debian.org/doc/debian-policy/ch-controlfields.html#s-f-description">Description</Link>
        </Tc>
        <Tc>mandatory</Tc>
        <Tc>Description.</Tc>
      </Tr>
    </Table>

    <H1>Rules file</H1>
    <List>
      <Li>
        Create <Code>debian/rules</Code>. This file is <Italic>Makefile</Italic> so make sure to:
        <List>
          <Li>
            Mark it as executable <Code>chmod u+x debian/rules</Code>.
          </Li>
          <Li>Use only tabs for indentation.</Li>
        </List>
      </Li>
      <Li>
        This file contains rules about how to build your package. We will be using the <Code>dh</Code> command from the{" "}
        <Code>debhelper</Code> package to help us with the build. Here is minimal rules file that only calls the{" "}
        <Code>dh</Code> without any other configuration.
      </Li>
    </List>

    <Code language="makefile">{`
      #!/usr/bin/make -f

      %:
        dh $@
    `}</Code>

    <List>
      <Li>
        The <Code>dh</Code> command has many build stages, and you will see them mentioned in the console once you start
        building your package. If you need to override or extend parts of the <Code>dh</Code> build steps, here is how
        you do it:
      </Li>
    </List>

    <Code language="makefile">{`
      #!/usr/bin/make -f

      %:
        dh $@

      override_dh_auto_build:
        dh_auto_build # We can omit this call and only use our scripts
        ./my-script
    `}</Code>

    <H1>Debian install script</H1>
    <List>
      <Li>
        Create file named <Code>debian/package-name.install</Code>.
      </Li>
      <Li>
        In this file, we specify what files or folders will be copied into the package. Then once the package is
        installed, these files will be copied from the package onto the filesystem.
      </Li>
      <Li>
        Directories are relative to the parent of <Italic>debian</Italic> directory, for example, if you have{" "}
        <Code>project/debian/package-name.install</Code>, paths will be relative to the <Code>project</Code> dir.
      </Li>
    </List>

    <Code>{`
      dist/* /www/package-name/
    `}</Code>

    <H1>Build the package</H1>

    <List>
      <Li>
        In the root of your project directory run <Code>dpkg-buildpackage -b -uc</Code>.
        <List>
          <Li>
            <Code>-b</Code> only make a binary package and do not create a package with source files.
          </Li>
          <Li>
            <Code>-uc</Code> skip the signing stage of the <Code>.changes</Code> file with your PGP key.
          </Li>
        </List>
      </Li>
      <Li>
        If everything went ok, you should see file named <Code>package-name_1.0.0_all.deb</Code> one level up from the
        root directory of your project.
      </Li>
    </List>

    <H2>Build artefacts</H2>

    <P>
      After the build, you will see some build artifacts inside the <Code>debian</Code> directory. They are useful for
      your build debugging, but if everything goes ok, you can safely remove them with something like:
    </P>

    <Code language="bash">{`
      git clean -df debian
    `}</Code>

    <H1>Inspecting the package</H1>

    <List>
      <Li>
        To get basic metadata about package (mostly stuff from <Code>debian/control</Code>)
        <List>
          <Li>
            <Code>dpkg --info &lt;file&gt;.deb</Code>
          </Li>
        </List>
      </Li>
      <Li>
        Midnight Commander program is pretty helpful if we want to take a look inside of the package
        <List>
          <Li>
            <Code>sudo apt-get install mc</Code>
          </Li>
          <Li>
            Press <Code>F3</Code> or the <Code>View</Code> command while having the package selected to see basic info.
          </Li>
          <Li>Or press enter to open the package and inspect its content.</Li>
        </List>
      </Li>
      <Li>
        Trying to install the package is also useful to see if there are not any conflicts or dependency problems
        <List>
          <Li>
            <Code>sudo dpkg -i &lt;file&gt;.deb</Code>
          </Li>
        </List>
      </Li>
    </List>

    <Video
      width={698}
      height={308}
      src={
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */
        require("./videos/packaging.mp4")
      }
    />

    <H1>Static files build dependencies</H1>

    <P>
      So far we have only covered how to take already existing <Code>dist</Code> directory and package it up, but how do
      we express dependencies needed for building the <Code>dist</Code> directory? I think there are two reasonable
      approaches.
    </P>

    <H2>Express everything in the debian/control and debian/rules</H2>

    <P>
      In case we would want to express the static files build dependencies and the build itself in the debian directory,
      here is how it could look like.
    </P>

    <P>Control file:</P>
    <List>
      <Li>
        From <Code>Build-Depends: debhelper (&gt;= 9.0.0)</Code>.
      </Li>
      <Li>
        To <Code>Build-Depends: debhelper (&gt;= 9.0.0), nodejs (&gt;= 6.0.0)</Code> (or whatever dependencis you need
        and can install with <Code>apt</Code>).
      </Li>
    </List>

    <P>Rules file:</P>

    <List>
      <Li>
        Add an override to the build step where we will do the installation of additional dependencies from other
        package managers and also the building itself.
      </Li>
    </List>

    <Code language="makefile">{`
      #!/usr/bin/make -f

      %:
        dh $@

      override_dh_auto_build:
        cd src && npm install && ./build-script
      `}</Code>

    <H2>CI Build pipeline</H2>

    <P>
      If we have some CI build pipeline, it makes more sense to have one CI task for the build of the static files, and
      another one for the creation of the Debian package. Then we just pass the build artifacts from the build task to
      the package task. This will allow use to use the right Docker image for given task (e.g. <Code>node:7</Code> for
      the static files, and <Code>debian:8</Code> for the packaging) and worry less about installing additional
      dependencies.
    </P>

    <H2>Example of GitLab CI file</H2>

    <Code language="yaml">{`
      stages:
        - build
        - package

      build:
        stage: build
        image: node:7.8.0
        script:
          - cd app
          - npm install
          - ./scripts/build
        artifacts:
          expire_in: "1 week"
          paths:
            - ./app/build

      package:
        stage: package
        image: debian:8.8
        script:
          - apt-get update
          - apt-get install --yes build-essential devscripts
          - dpkg-buildpackage -b -uc
          - mv ../*.deb .
        artifacts:
          expire_in: "1 week"
          paths:
            - ./*.deb
    `}</Code>

    <H1>Links</H1>

    <List>
      <Li>
        <Link href="https://www.debian.org/doc/debian-policy/">Debian Policy Manual</Link>
      </Li>
      <Li>
        <Link href="https://www.debian.org/doc/manuals/maint-guide/">Debian New Maintainers Guide</Link>
      </Li>
    </List>
  </>
);
