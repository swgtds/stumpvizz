import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { fetchChannels } from '@/config/channels';
import { format } from 'date-fns';
import { Circle, Play } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';

const LiveBanner = () => {
  const [liveMatch, setLiveMatch] = useState<{
    id: string;
  } | null>(null);

  useEffect(() => {
    const checkLiveMatches = async () => {
      const now = new Date(); 
      const currentTime = format(now, "HH:mm");
      const currentDate = format(now, "yyyy-MM-dd");

      try {
        const channels = await fetchChannels(); 
        const liveChannel = channels.find(channel => {
          const isMatchToday = channel.match?.date === currentDate;
          const isTimeValid = currentTime >= channel.startTime && currentTime <= channel.endTime;
          return isMatchToday && isTimeValid;
        });

        if (liveChannel?.match) {
          setLiveMatch({ id: liveChannel.id });
        } else {
          setLiveMatch(null);
        }
      } catch (error) {
        console.error("Error checking live matches:", error);
      }
    };

    checkLiveMatches(); // Initial check
    const interval = setInterval(checkLiveMatches, 60000); // Check every 60s

    return () => clearInterval(interval); 
  }, []);

  if (!liveMatch) return null;

  return (
    <Alert className="border border-cricket-green/30 bg-gradient-to-r from-cricket-green/10 to-cricket-orange/10 my-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Circle className="h-3 w-3 fill-cricket-orange animate-pulse" />
          <AlertDescription className="text-sm md:text-base">
          Live Right now, Join!!
          
          </AlertDescription>
        </div>
        <Link to="/live-stream">
          <Button 
            variant="ghost" 
            size="sm" 
            className="bg-cricket-green/20 hover:bg-cricket-green/30 text-white"
          >
            <Play className="mr-1 h-3 w-3" /> Watch Now!
          </Button>
        </Link>
      </div>
    </Alert>
  );
};

export default LiveBanner;
