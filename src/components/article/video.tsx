export const Video = ({ width, height, src }: { width: number; height: number; src: string }) => {
  return (
    <>
      <video width={width} height={height} controls autoPlay loop>
        <source src={src} type="video/mp4" />
      </video>

      <style jsx>{`
        video {
          width: 100%;
        }
      `}</style>
    </>
  );
};
