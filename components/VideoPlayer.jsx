"use client";
import React, { useEffect, useRef } from "react";
import Plyr from "plyr";
import "plyr/dist/plyr.css";

export default function VideoPlayer({ src, title }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const player = new Plyr(videoRef.current, {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "settings",
          "fullscreen",
        ],
      });
      return () => player.destroy();
    }
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <video ref={videoRef} className="w-full rounded-xl shadow-lg" playsInline controls>
        <source src={src} type="video/mp4" />
        {title && <track kind="captions" label={title} />}
      </video>
    </div>
  );
}
