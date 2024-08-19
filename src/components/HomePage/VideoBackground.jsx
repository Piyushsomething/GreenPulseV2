import React from "react";

const VideoBackground = ({ src }) => (
  <div className="mt-4 overflow-hidden">
    <video
      className="md:w-full md:h-80 object-cover object-center rounded-3xl px-4"
      autoPlay
      loop
      muted
    >
      <source src={src} type="video/webm" />
      Your browser does not support the video tag.
    </video>
  </div>
);

export default VideoBackground;
