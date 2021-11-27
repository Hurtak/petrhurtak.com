import { Link } from "../base/link";

export const Image = ({
  //
  src,
  width,
  height,
  alt,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
}) => {
  return (
    <Link href={src} newTab>
      <style jsx>{`
        img {
          display: block;
          max-width: 100%;
          height: auto;
        }
      `}</style>
      <img src={src} width={width} height={height} alt={alt} />
    </Link>
  );
};
