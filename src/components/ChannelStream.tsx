import { useEffect, useState } from "react";
import { useParams, Navigate, useNavigate } from "react-router-dom";
import { channels } from "@/config/channels";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import VideoPlayer from "./VideoPlayer";
import { format } from "date-fns";

const ChannelStream = () => {
  const { channelId } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isAvailable, setIsAvailable] = useState(false);

  const channel = channels.find((c) => c.id === channelId);

  useEffect(() => {
    if (!channel) return;

    const checkAvailability = () => {
      const now = new Date();
      const currentTime = format(now, "HH:mm");
      const currentDate = format(now, "yyyy-MM-dd");

      const isTimeValid =
        currentTime >= channel.startTime && currentTime <= channel.endTime;
      const isDateValid = channel.match?.date === currentDate;

      const isValid = isTimeValid && isDateValid;
      setIsAvailable(isValid);

      if (!isValid) {
        let message = "Match is not available. ";
        if (!isDateValid) {
          message += `This match is scheduled for ${channel.match?.date}. `;
        }
        if (!isTimeValid) {
          message += `Live streaming is only available between ${channel.startTime} and ${channel.endTime}.`;
        }

        toast({
          variant: "destructive",
          title: "Match Unavailable",
          description: message,
        });
      }
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [channel, toast]);

  if (!channel) {
    return <Navigate to="/live-stream" replace />;
  }

  if (!isAvailable) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Button
          variant="outline"
          className="mb-4"
          onClick={() => navigate("/live-stream")}
        >
          <ArrowLeft className="mr-2" /> Back to Channels
        </Button>
        <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
          <h2 className="text-2xl font-bold text-muted-foreground">
            Match Currently Unavailable
          </h2>
          <p className="text-muted-foreground text-center">
            {channel.match?.team1} vs {channel.match?.team2} will be available
            on {channel.match?.date} <br />
            between {channel.startTime} and {channel.endTime}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <Button
        variant="outline"
        className="mb-4"
        onClick={() => navigate("/live-stream")}
      >
        <ArrowLeft className="mr-2" /> Back to Channels
      </Button>
      <div className="flex flex-col space-y-4">
        <h1 className="text-3xl font-bold">
          {channel.match?.team1} vs {channel.match?.team2}
        </h1>
        <p className="text-muted-foreground">Live Match - {channel.match?.date}</p>
      </div>

      {/* If it's TNT Sports 1, load tnt-1.html inside an iframe */}
      {channel.id === "tnt-1" ? (
        <VideoPlayer src="/videos/tnt-1.html" isIframe={true} isLive />
      ) : (
        <VideoPlayer src={channel.streamUrl} isLive />
      )}
      
    </div>
  );
};

export default ChannelStream;
