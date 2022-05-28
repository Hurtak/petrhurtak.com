import { Br, Code, H1, P, Table, Tc, Tr } from "../components";

const Sep = () => (
  <>
    ,<Br />
  </>
);

export const Article = () => (
  <>
    <P>
      I always got confused about what certain parts of an URL are called, so here is a simple diagram that should help.
      Some parts are not 100% specified, so there can be slight variations of what people call them.
    </P>

    <H1>Common URL</H1>

    <Code>https://www.example.com/products/computers.php?type=laptop#return-policy</Code>

    <H1>Parts of the URL</H1>

    <Table
      heading={
        <Tr>
          <Tc>Part</Tc>
          <Tc colSpan={4}>Name</Tc>
        </Tr>
      }
    >
      <Tr>
        <Tc>https://</Tc>

        <Tc rowSpan={8}>URL</Tc>
        <Tc rowSpan={4}>origin</Tc>
        <Tc colSpan={2}>
          protocol
          <Sep />
          scheme
        </Tc>
      </Tr>
      <Tr>
        <Tc>www</Tc>

        <Tc rowSpan={3}>
          domain
          <Sep />
          hostname
        </Tc>
        <Tc>subdomain</Tc>
      </Tr>
      <Tr>
        <Tc>example</Tc>

        <Tc>second level domain</Tc>
      </Tr>
      <Tr>
        <Tc>com</Tc>

        <Tc>top level domain</Tc>
      </Tr>
      <Tr>
        <Tc>products/</Tc>

        <Tc rowSpan={2}>path name</Tc>
        <Tc colSpan={2}>directory</Tc>
      </Tr>
      <Tr>
        <Tc>computers.php</Tc>

        <Tc colSpan={2}>
          file
          <Sep />
          page
        </Tc>
      </Tr>
      <Tr>
        <Tc>?type=laptop</Tc>

        <Tc colSpan={3}>
          query string
          <Sep />
          parameters
          <Sep />
          search
        </Tc>
      </Tr>
      <Tr>
        <Tc>#return-policy</Tc>

        <Tc colSpan={3}>
          fragment
          <Sep />
          hash
        </Tc>
      </Tr>
    </Table>
  </>
);
