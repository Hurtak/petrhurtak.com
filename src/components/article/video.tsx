import { pxCss } from "../../styles";
import { CenterContent } from "../internal/center-content";

export const Video = ({ width, height, src }: { width: number; height: number; src: string }) => {
  return (
    <>
      <CenterContent>
        <video controls autoPlay loop>
          <source src={src} type="video/mp4" />
        </video>
      </CenterContent>

      <style jsx>{`
        video {
          width: 100%;
          max-width: ${pxCss(width)};
          aspect-ratio: ${width} / ${height};
        }
      `}</style>
    </>
  );
};
