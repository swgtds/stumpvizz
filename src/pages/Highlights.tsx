
import { useState } from "react";
import Navbar from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { ArrowBigLeft, ArrowBigRight, Trophy } from "lucide-react";
import { menHighlightChannels } from "@/config/men-highlights-channels";
import VideoPlayer from "@/components/VideoPlayer";
import { useIsMobile } from "@/hooks/use-mobile";
import LiveMatchAlert from "@/components/LiveMatchAlert";
import LiveBanner from "@/components/LiveBanner";

const HighlightsPage = () => {
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();

  const toggleVideo = (matchId: string, url: string) => {
    // Check if it's a Hotstar link and handle accordingly
    if (isHotstarUrl(url)) {
      handleHotstarRedirect(url);
      return;
    }
    
    setActiveVideos(prev => ({
      ...prev,
      [matchId]: !prev[matchId]
    }));
  };
  const isHotstarUrl = (url: string): boolean => {
    return url.includes('hotstar.com');
  };

  const handleHotstarRedirect = (url: string) => {
    window.open(url, '_blank');
  };
  const highlightsByTournament = menHighlightChannels.reduce((acc, highlight) => {
    if (!acc[highlight.tournament]) {
      acc[highlight.tournament] = [];
    }
    acc[highlight.tournament].push(highlight);
    return acc;
  }, {} as Record<string, typeof menHighlightChannels>);

  //function to determine if URL is YouTube
  const isYouTubeUrl = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  //function to extract YouTube video ID
  const getYouTubeVideoId = (url: string): string => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : "";
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <LiveMatchAlert />
      <div className="container mx-auto px-4 py-4">
      <LiveBanner />
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cricket-green to-cricket-orange">
          Match Highlights
        </h1>
        <div className="space-y-12">
          {Object.entries(highlightsByTournament).map(([tournament, highlights]) => (
            <div key={tournament} className="space-y-6 animate-fade-in">
              <div className="flex items-center gap-2">
                <Trophy className="h-6 w-6 text-cricket-orange" />
                <h2 className="text-2xl font-semibold text-card-foreground">{tournament}</h2>
              </div>
              <Carousel className="w-full">
                <CarouselContent>
                  {highlights.map((highlight) => (
                    <CarouselItem key={highlight.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden bg-card border-white/10 transition-all duration-300 hover:bg-card/80">
                        <div 
                          className="aspect-video relative cursor-pointer" 
                          onClick={() => toggleVideo(highlight.id, highlight.url)}
                        >
                          {!activeVideos[highlight.id] ? (
                            <>
                              <img
                                src={highlight.thumbnail}
                                alt={`${highlight.team1} vs ${highlight.team2}`}
                                className="w-full h-full object-cover transition-opacity hover:opacity-90"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1" />
                                </div>
                              </div>
                              {isHotstarUrl(highlight.url) && (
                                <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded text-xs">
                                  Hotstar
                                </div>
                              )}
                            </>
                          ) : (
                            isYouTubeUrl(highlight.url) ? (
                              <iframe
                                className="w-full h-full"
                                src={`https://www.youtube.com/embed/${getYouTubeVideoId(highlight.url)}?autoplay=1`}
                                title={highlight.description}
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                              />
                            ) : (
                              <VideoPlayer 
                                src={highlight.url} 
                                poster={highlight.thumbnail} 
                              />
                            )
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-1 text-card-foreground">{highlight.team1} vs {highlight.team2}</h3>
                          <p className="text-sm mb-2 text-card-foreground">{highlight.description}</p>
                          <p className="text-xs text-muted-foreground">{highlight.date}</p>
                        </div>
                      </Card>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <div className="flex justify-center gap-4 mt-6">
                  <CarouselPrevious className="relative static translate-x-0 bg-card hover:bg-card/80 border-none shadow-lg h-12 w-12">
                    <ArrowBigLeft className="h-8 w-8" />
                  </CarouselPrevious>
                  <CarouselNext className="relative static translate-x-0 bg-card hover:bg-card/80 border-none shadow-lg h-12 w-12">
                    <ArrowBigRight className="h-8 w-8" />
                  </CarouselNext>
                </div>
              </Carousel>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HighlightsPage;