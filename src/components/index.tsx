export const P = ({ children }: { children: React.ReactNode }) => {
  return (
    <p>
      <style jsx>{``}</style>
      {children}
    </p>
  );
};

export const H1 = ({ children }: { children: string }) => {
  return (
    <h2>
      <style jsx>{``}</style>
      {children}
    </h2>
  );
};

export const H2 = ({ children }: { children: string }) => {
  return (
    <h3>
      <style jsx>{``}</style>
      {children}
    </h3>
  );
};

export const Link = ({ href, children }: { href: string; children: string }) => {
  return (
    <a href={href}>
      <style jsx>{``}</style>
      {children}
    </a>
  );
};

export const Italic = ({ children }: { children: string }) => {
  return <em>{children}</em>;
};

export const Bold = ({ children }: { children: string }) => {
  return <strong>{children}</strong>;
};

export const Quote = ({ children }: { children: string }) => (
  <q>
    <style jsx>{`
      quotes: "“" "”";
    `}</style>

    {children}
  </q>
);

export const List = ({ children }: { children: React.ReactNode }) => {
  return <ul>{children}</ul>;
};

export const Li = ({ children }: { children: React.ReactNode }) => {
  return <li>{children}</li>;
};

export const Table = ({ heading, children }: { heading?: React.ReactNode; children: React.ReactNode }) => {
  return (
    <table>
      {heading && <thead>{heading}</thead>}
      <tbody>{children}</tbody>
    </table>
  );
};

export const Tr = ({ children }: { children: React.ReactNode }) => {
  return <tr>{children}</tr>;
};

export const Tc = ({ noWrap = false, children }: { noWrap?: boolean; children: React.ReactNode }) => {
  return (
    <td>
      <style jsx>{`
        td {
          ${noWrap && `white-space: nowrap;`}
        }
      `}</style>
      {children}
    </td>
  );
};

export const Video = ({ width, height, src }: { width: number; height: number; src: string }) => {
  return (
    <video width={width} height={height} controls autoPlay loop>
      <source src={src} type="video/mp4" />
    </video>
  );
};

export { Code } from "./code";
