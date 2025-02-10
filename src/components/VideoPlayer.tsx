import React from "react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  isLive?: boolean;
  isIframe?: boolean; // New prop to determine if it's an iframe
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, isLive, isIframe }) => {
  return (
    <div className="relative w-full aspect-video bg-cricket-navy rounded-lg overflow-hidden">
      {isIframe ? (
        <iframe
          src={src} // Load the HTML page inside the iframe
          width="100%"
          height="100%"
          style={{ border: "none" }}
          allowFullScreen
        ></iframe>
      ) : src ? (
        <video
          className="w-full h-full object-cover"
          poster={poster}
          controls
          autoPlay={isLive}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="w-full h-full flex items-center justify-center">
          <p className="text-white text-lg">No stream available</p>
        </div>
      )}
      {isLive && (
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
          <div className="w-2 h-2 bg-cricket-orange rounded-full animate-pulse" />
          <span className="text-white text-sm font-medium">LIVE</span>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;
