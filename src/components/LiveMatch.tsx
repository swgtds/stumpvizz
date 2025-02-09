import React from 'react';
import VideoPlayer from './VideoPlayer';

interface LiveMatchProps {
  team1: string;
  team2: string;
  score1?: string;
  score2?: string;
  streamUrl?: string;
}

const LiveMatch: React.FC<LiveMatchProps> = ({
  team1,
  team2,
  score1,
  score2,
  streamUrl,
}) => {
  return (
    <div className="w-full">
      <VideoPlayer isLive src={streamUrl} />
      <div className="mt-4 bg-white/5 rounded-lg p-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <h2 className="text-2xl font-bold text-white">{team1}</h2>
            <span className="text-cricket-green text-xl font-semibold">{score1}</span>
          </div>
          <span className="text-white text-lg">vs</span>
          <div className="flex items-center gap-4">
            <span className="text-cricket-green text-xl font-semibold">{score2}</span>
            <h2 className="text-2xl font-bold text-white">{team2}</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LiveMatch;