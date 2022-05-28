import { pxCss } from "../../styles";
import { Link } from "../base/link";
import { CenterContent } from "../internal/center-content";

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
    <>
      <CenterContent>
        <Link href={src} newTab>
          <img src={src} alt={alt} />
        </Link>
      </CenterContent>

      <style jsx>{`
        img {
          display: block;
          width: 100%;
          max-width: ${pxCss(width)};
          aspect-ratio: ${width} / ${height};
        }
      `}</style>
    </>
  );
};
