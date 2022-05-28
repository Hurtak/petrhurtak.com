import { pxCss } from "../../styles";

export const Video = ({ width, height, src }: { width: number; height: number; src: string }) => {
  return (
    <>
      <div className="wrapper">
        <video controls autoPlay loop>
          <source src={src} type="video/mp4" />
        </video>
      </div>

      <style jsx>{`
        .wrapper {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        video {
          width: 100%;
          max-width: ${pxCss(width)};
          aspect-ratio: ${width} / ${height};
        }
      `}</style>
    </>
  );
};
