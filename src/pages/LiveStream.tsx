import Navbar from "@/components/Navbar";
import { channels } from "@/config/channels";
import MatchCard from "@/components/MatchCard";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";

const LiveStreamPage = () => {
  const navigate = useNavigate();
  const now = new Date();
  const currentTime = format(now, "HH:mm");
  const currentDate = format(now, "yyyy-MM-dd");

  const availableChannels = channels.filter(channel => {
    const isTimeValid = currentTime >= channel.startTime && currentTime <= channel.endTime;
    const isDateValid = channel.match?.date === currentDate;
    return isTimeValid && isDateValid;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cricket-green to-cricket-orange">
          Live Matches
        </h1>
        {availableChannels.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {availableChannels.map((channel, index) => (
              <div key={channel.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <MatchCard
                  team1={channel.match?.team1 || ""}
                  team2={channel.match?.team2 || ""}
                  time={`${channel.startTime} - ${channel.endTime}`}
                  date={channel.match?.date}
                  isLive={true}
                  thumbnail="/placeholder.svg"
                  onClick={() => navigate(`/live-stream/${channel.id}`)}
                />
              </div>
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center animate-fade-in">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">No Live Matches Right Now</h2>
              <p className="text-muted-foreground max-w-md">
                There are currently no live matches streaming. Please check back later or{" "}
                <Link to="/upcoming" className="text-cricket-green hover:underline">
                  view our upcoming matches schedule
                </Link>
                .
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LiveStreamPage;