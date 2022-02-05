export const List = ({ numbered = false, children }: { numbered?: boolean; children: React.ReactNode }) => {
  const Tag = numbered ? "ol" : "ul";
  return <Tag>{children}</Tag>;
};

export const Li = ({ children }: { children: React.ReactNode }) => {
  return <li>{children}</li>;
};
