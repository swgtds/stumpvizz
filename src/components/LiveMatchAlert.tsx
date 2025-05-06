import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchChannels } from '@/config/channels';
import { format } from 'date-fns';
import { X, Play } from 'lucide-react';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';

export const LiveMatchAlert = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [liveMatch, setLiveMatch] = useState<{
    id: string;
  } | null>(null);
  const navigate = useNavigate();

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

          const hasDismissed = sessionStorage.getItem('livealert-dismissed');
          if (!hasDismissed) {
            setIsOpen(true);
          }
        } else {
          setLiveMatch(null);
        }
      } catch (error) {
        console.error("Failed to fetch channels:", error);
      }
    };

    checkLiveMatches(); 

    const interval = setInterval(() => {
      checkLiveMatches(); 
    }, 60000);

    return () => clearInterval(interval); 
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('livealert-dismissed', 'true');
  };

  const handleWatchNow = () => {
    handleClose();
    navigate('/live-stream');
  };

  if (!liveMatch) return null;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="sm:max-w-md border-cricket-green/30 bg-gradient-to-br from-background to-cricket-green/10" hideCloseButton>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cricket-orange rounded-full animate-pulse" />
              <h3 className="text-lg font-bold">Live Match Alert!</h3>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose} className="h-8 w-8">
              <X className="h-4 w-4" />
            </Button>
          </div>

          <p className="text-muted-foreground">POV: You just found the live stream 👀</p>

          <Button
            onClick={handleWatchNow}
            className="w-full bg-cricket-green hover:bg-cricket-green/90 text-white"
          >
            <Play className="mr-2 h-4 w-4" /> Watch Now!
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LiveMatchAlert;
