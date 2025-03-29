import React, { useEffect, useRef } from "react";

interface VideoPlayerProps {
  src?: string;
  poster?: string;
  isLive?: boolean;
  isIframe?: boolean; 
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ src, poster, isLive, isIframe }) => {
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (!isIframe || !iframeRef.current) return;

    const blockRedirects = () => {
      const iframe = iframeRef.current;
      
      if (iframe && iframe.contentWindow) {
        try {
          const observer = new MutationObserver(() => {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;

            if (iframeDoc) {
              // Block all navigation attempts inside the iframe
              iframeDoc.addEventListener("click", (e) => {
                e.preventDefault();
                e.stopPropagation();
                console.log("Blocked navigation attempt.");
              });

              // Override window.open to prevent new tab redirects
              iframe.contentWindow.open = () => {
                console.log("Blocked new tab redirect.");
                return null;
              };

              // Override top-level navigation attempts
              iframe.contentWindow.location.assign = () => {
                console.log("Blocked top-level navigation.");
              };
              iframe.contentWindow.location.replace = () => {
                console.log("Blocked location replace.");
              };
            }
          });

          observer.observe(iframe, { childList: true, subtree: true });
        } catch (error) {
          console.error("Failed to block redirects:", error);
        }
      }
    };

    const interval = setInterval(blockRedirects, 1000);

    return () => clearInterval(interval);
  }, [isIframe]);

  return (
    <div className="relative w-full aspect-video bg-cricket-navy rounded-lg overflow-hidden">
      {isIframe ? (
        <iframe
          ref={iframeRef}
          src={src}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          sandbox="allow-scripts allow-same-origin" 
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
