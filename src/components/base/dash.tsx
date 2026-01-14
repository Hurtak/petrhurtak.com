export const nDashString = "\u2013";
export const mDashString = "\u2014";

export const Dash = ({ long = false }: { long?: boolean }) => <>{long ? mDashString : nDashString}</>;
