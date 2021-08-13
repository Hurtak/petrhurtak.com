import React from "react";
import { H1, P, Link, Code } from "../../components";

export default () => (
  <>
    <P>When you create merge request often you will want to squash all the commits into one.</P>

    <P>
      If you search Google about how to squash all commits, you will often find confusing tutorials that will either
      recommend using <Code language="bash">git rebase</Code> (where you have to manually specify which commits you want
      to squash), or tutorials recommending using <Code language="bash">git reset</Code> or{" "}
      <Code language="bash">git rebase</Code> on latest <Code>n</Code> commits (where you need to know how many commits
      you made in your branch). But there is an easier way.
    </P>

    <H1>One liner solution</H1>
    <Code language="bash" multiline>{`
      git reset $(git merge-base origin/master $(git rev-parse --abbrev-ref HEAD))
    `}</Code>

    <H1>What happens</H1>

    <Code language="bash" multiline>{`
      git rev-parse --abbrev-ref HEAD
    `}</Code>

    <P>
      Gets current name of the branch, eg.: <Code>branch-name</Code>
    </P>

    <Code language="bash" multiline>{`
      git merge-base origin/master my-branch
    `}</Code>

    <P>
      Git <Link to="https://git-scm.com/docs/git-merge-base">merge-base</Link> finds best common ancestor between two
      commits to use in a three-way merge, eg.: <Code>c111855daca0d1834cc836dc65ea39d22dabf14c</Code>.
    </P>

    <P>
      After this command you will end up in the state where your branch will be identical to <Code>origin/master</Code>{" "}
      and all the changes you made on your branch will be unstaged. So all you need to do is add the changes to staging,
      create squashed commit and force push to your branch.
    </P>

    <Code language="bash" multiline>{`
      git add .
      git commit -m "commit message"
      git push --force
    `}</Code>

    <P>That's it.</P>

    <H1>TLDR</H1>

    <P>
      Replace <Code>origin/master</Code> with the branch against you are merging.
    </P>

    <Code language="bash" multiline>{`
      git reset $(git merge-base origin/master $(git rev-parse --abbrev-ref HEAD))
      git add .
      git commit -m "commit message"
      git push --force
    `}</Code>
  </>
);
