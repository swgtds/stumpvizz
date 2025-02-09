import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';

interface MatchCardProps {
  team1: string;
  team2: string;
  time: string;
  date?: string;
  isLive?: boolean;
  thumbnail?: string;
  onClick?: () => void;
}

const MatchCard: React.FC<MatchCardProps> = ({
  team1,
  team2,
  time,
  date,
  isLive,
  thumbnail,
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className="group relative animate-fade-in"
    >
      <div className="absolute inset-0 bg-gradient-to-r from-cricket-green/20 to-cricket-orange/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
      <Card className="relative overflow-hidden border-white/10 bg-card hover:bg-card/80 transition-all duration-300 hover:scale-[1.02]">
        <div className="relative aspect-video">
          <img
            src={thumbnail || "/placeholder.svg"}
            alt={`${team1} vs ${team2}`}
            className="w-full h-full object-cover"
          />
          {isLive && (
            <div className="absolute top-2 left-2 flex items-center gap-2 bg-black/50 px-3 py-1 rounded-full">
              <div className="w-2 h-2 bg-cricket-orange rounded-full animate-pulse" />
              <span className="text-white text-sm font-medium">LIVE</span>
            </div>
          )}
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold mb-2 text-card-foreground">{team1} vs {team2}</h3>
          <p className="text-muted-foreground text-sm mb-1">{time}</p>
          {date && (
            <p className="text-muted-foreground text-sm mb-4">{date}</p>
          )}
          {isLive && (
            <Button asChild className="w-full bg-cricket-green hover:bg-cricket-green/90">
              <Link to="/live-stream">Watch Live</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MatchCard;