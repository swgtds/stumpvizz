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
import { ArrowBigLeft, ArrowBigRight } from "lucide-react";

const highlights = [
  {
    id: "1",
    title: "India vs Australia - T20 World Cup 2024",
    matches: [
      {
        id: "1-1",
        videoId: "dQw4w9WgXcQ",
        date: "2024-03-15",
        description: "Match Highlights - India's Victory"
      },
      {
        id: "1-2",
        videoId: "dQw4w9WgXcQ",
        date: "2024-03-10",
        description: "Best Moments - Group Stage"
      }
    ]
  },
  {
    id: "2",
    title: "England vs South Africa - Test Series 2024",
    matches: [
      {
        id: "2-1",
        videoId: "dQw4w9WgXcQ",
        date: "2024-03-05",
        description: "Day 5 Highlights - Final Test"
      }
    ]
  }
];

const HighlightsPage = () => {
  const [activeVideos, setActiveVideos] = useState<Record<string, boolean>>({});

  const toggleVideo = (matchId: string) => {
    setActiveVideos(prev => ({
      ...prev,
      [matchId]: !prev[matchId]
    }));
  };

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cricket-green to-cricket-orange">
          Match Highlights
        </h1>
        <div className="space-y-12">
          {highlights.map((series) => (
            <div key={series.id} className="space-y-6 animate-fade-in">
              <h2 className="text-2xl font-semibold text-card-foreground">{series.title}</h2>
              <Carousel className="w-full">
                <CarouselContent>
                  {series.matches.map((match) => (
                    <CarouselItem key={match.id} className="md:basis-1/2 lg:basis-1/3">
                      <Card className="overflow-hidden bg-card border-white/10 transition-all duration-300 hover:bg-card/80">
                        <div className="aspect-video relative cursor-pointer" onClick={() => toggleVideo(match.id)}>
                          {!activeVideos[match.id] ? (
                            <>
                              <img
                                src={`https://img.youtube.com/vi/${match.videoId}/maxresdefault.jpg`}
                                alt={match.description}
                                className="w-full h-full object-cover transition-opacity hover:opacity-90"
                              />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center">
                                  <div className="w-0 h-0 border-t-8 border-t-transparent border-l-[16px] border-l-white border-b-8 border-b-transparent ml-1" />
                                </div>
                              </div>
                            </>
                          ) : (
                            <iframe
                              className="w-full h-full"
                              src={`https://www.youtube.com/embed/${match.videoId}?autoplay=1`}
                              title={match.description}
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            />
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-medium mb-2 text-card-foreground">{match.description}</h3>
                          <p className="text-sm text-muted-foreground">{match.date}</p>
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