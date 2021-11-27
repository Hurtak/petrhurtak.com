import { Code, H1, P } from "../../src/components/article";

export const Article = () => (
  <>
    <P>
      This article assumes basic Docker knowledge and is more of a shortlist of useful commands rather than beginners
      introduction.
    </P>

    <H1>Dockerfile</H1>

    <P>
      First, you will need a <Code>Dockerfile</Code> file in your repository. Here is how simple one might look like.
    </P>

    <Code multiline language="docker">{`
      # Base image
      FROM node:12

      # Working directory inside of the container
      WORKDIR /app/

      # Copy stuff inside of the container. The left path is the host OS, the
      # right path is inside of the container relative to the WORKDIR.
      COPY ./package.json .
      COPY ./index.js .

      # Run scripts or install dependencies
      RUN npm install

      # Set environment variables
      ENV NODE_ENV production

      # What command/binary to run when the image is started
      ENTRYPOINT ["node"]
      # What default arguments to supply to given ENTRYPOINT
      CMD ["index.js"]
    `}</Code>

    <H1>Create commands</H1>

    <Code multiline language="bash">{`
      # Build image
      #   -f/--file  Path to Dockerfile, default is 'CWD/Dockerfile'
      #   -t/--tag   Name and optionally a tag in the 'name:tag' format
      docker build .

      # List images
      docker image ls

      # Run container
      #   -d/--detach   Run container in background and print container ID
      #   -p/--publish  Connect container port to host OS port, eg: '-p 8000:8000'
      docker run <IMAGE ID>

      # List running containers
      #   -a/--all  Show all containers, default shows just running
      docker ps

      # Run a command in a running container
      #   -i, --interactive  Keep STDIN open even if not attached
      #   -t, --tty          Allocate a pseudo-TTY
      docker exec -it <CONTAINER ID> /bin/sh
   `}</Code>

    <H1>Cleanup commands</H1>

    <Code multiline language="bash">{`
      # List containers
      #   --all  Shows also stopped ones
      docker ps --all

      # Stop the running container
      docker container stop <CONTAINER ID>

      # Remove container
      #   --force  Remove running containers
      docker container rm <CONTAINER ID>

      # List images
      docker image ls

      # Remove images
      docker image rm <IMAGE ID>
   `}</Code>

    <H1>Example workflow</H1>

    <Code multiline language="bash">{`
      # Take Dockerfile and build an image
      $ docker build .
      Sending build context to Docker daemon  2.008MB
      ...
      Successfully built ea5c328aef35

      # List images
      $ docker image ls
      REPOSITORY          TAG                 IMAGE ID            CREATED              SIZE
      <none>              <none>              ea5c328aef35        About a minute ago   919MB

      # Run the container
      $ docker run ea5c328aef35
      Example app listening at http://localhost:8000

      # List running containers
      $ docker ps
      CONTAINER ID        IMAGE               COMMAND             CREATED              STATUS              PORTS               NAMES
      08d6c527fe82        ea5c328aef35        "node index.js"     About a minute ago   Up About a minute                       mystifying_hellman

      # Connect to running container and execute command inside of it.
      # Command we execute is '/bin/bash', so we
      # can use bash to explore container contents.
      $ docker exec -it 08d6c527fe82 /bin/bash
      root@08d6c527fe82:/app# ls
      index.js  node_modules  packag
      root@08d6c527fe82:/app# exit

      # Stop and remove the running container
      $ docker ps
      CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES
      08d6c527fe82        ea5c328aef35        "node index.js"     3 seconds ago       Up 3 seconds                            festive_lehmann

      $ docker container stop 08d6c527fe82
      08d6c527fe82
      $ docker container rm 08d6c527fe82
      08d6c527fe82

      $ docker ps
      CONTAINER ID        IMAGE               COMMAND             CREATED             STATUS              PORTS               NAMES

      # Remove the image
      $ docker image ls
      REPOSITORY          TAG                 IMAGE ID            CREATED             SIZE
      <none>              <none>              ea5c328aef35        48 minutes ago      919MB

      $ docker image rm ea5c328aef35
      Deleted: sha256:ea5c328aef35edf1a19e10fa5d7a62f11d9e61f76db01d86c7c94da5f7432185
      ...
    `}</Code>
  </>
);
