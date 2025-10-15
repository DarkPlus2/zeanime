import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

interface Server {
  id: string;
  name: string;
  type: "embed" | "hls";
  url: string;
}

const Player: React.FC<{ server: Server }> = ({ server }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (server?.type === "hls" && videoRef.current) {
      const hls = new Hls();
      hls.loadSource(server.url);
      hls.attachMedia(videoRef.current);
      return () => hls.destroy();
    }
  }, [server]);

  if (!server) return <p>No server selected</p>;
  if (server.type === "embed")
    return (
      <iframe
        src={server.url}
        className="w-full h-[560px] rounded-xl border border-gray-700"
        allowFullScreen
      />
    );

  return (
    <video
      ref={videoRef}
      controls
      className="w-full h-[560px] bg-black rounded-xl"
    />
  );
};

export default Player;
