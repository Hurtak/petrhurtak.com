import * as React from "react";

import { Code, H1, P } from "../../src/components";

export const article = () => (
  <>
    <P>While connecting to PostgreSQL, you might get the following error.</P>

    <Code multiline>{`
      Connection to localhost:5432 refused. Check that the hostname and port are correct and that the postmaster is accepting TCP/IP connections.
    `}</Code>
    <P>
      This usually means that PostgreSQL is not running, but sometimes it might get stuck, and you will get the error
      even if it is running.
    </P>

    <H1>How to fix</H1>

    <P>Delete the following file.</P>

    <Code multiline language="bash">{`
      rm /usr/local/var/postgres/postmaster.pid
    `}</Code>

    <P>Then restart PostgreSQL, and it should work.</P>

    <Code multiline language="bash">{`
      # with postgres
      pg_ctl -D /usr/local/var/postgres restart

      # with brew
      brew services restart postgresql
    `}</Code>
  </>
);
