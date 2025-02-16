import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { channels } from "@/config/channels";
import { womenChannels } from "@/config/women-channels";
import MatchCard from "@/components/MatchCard";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format, parse } from "date-fns";

const LiveStreamPage = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(format(new Date(), "HH:mm"));
  const [currentDate, setCurrentDate] = useState(format(new Date(), "yyyy-MM-dd"));

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(format(now, "HH:mm"));
      setCurrentDate(format(now, "yyyy-MM-dd"));
    }, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  // Converts "yyyy-mm-dd" to "dd mm, yyyy"
  const formatDate = (dateStr: string): string => {
    return format(new Date(dateStr), "do MMM, yyyy");
  };

  // Converts "hh:mm" to "hh:mm AM/PM"
  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
  };

  // Helper function to compare times
  const isTimeInRange = (startTime: string, endTime: string, currentTime: string) => {
    const start = parse(startTime, "HH:mm", new Date());
    const end = parse(endTime, "HH:mm", new Date());
    const current = parse(currentTime, "HH:mm", new Date());

    return current >= start && current <= end;
  };

  // Filter live men's matches
  const liveMenMatches = channels.filter(channel => {
    const isMatchToday = channel.match?.date === currentDate;
    const isWithinTimeRange = isTimeInRange(channel.startTime, channel.endTime, currentTime);
    return isMatchToday && isWithinTimeRange;
  });

  // Filter live women's matches
  const liveWomenMatches = womenChannels.filter(channel => {
    const isMatchToday = channel.match?.date === currentDate;
    const isWithinTimeRange = isTimeInRange(channel.startTime, channel.endTime, currentTime);
    return isMatchToday && isWithinTimeRange;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cricket-green to-cricket-orange">
          Live Matches
        </h1>

        {/* Men's Cricket Section */}
        {liveMenMatches.length > 0 && (
          <div>
            <h2 className="text-3xl font-semibold mb-4 text-cricket-green">Men's Cricket</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveMenMatches.map((channel, index) => (
                <div key={channel.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <MatchCard
                    team1={channel.match?.team1 || ""}
                    team2={channel.match?.team2 || ""}
                    time={`${formatTime(channel.startTime)} - ${formatTime(channel.endTime)}`}
                    date={formatDate(channel.match?.date)}
                    isLive={true}
                    thumbnail={channel.match?.thumbnail || "/placeholder.svg"}
                    onClick={() => navigate(`/live-stream/${channel.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Women's Cricket Section */}
        {liveWomenMatches.length > 0 && (
          <div className="mt-10">
            <h2 className="text-3xl font-semibold mb-4 text-cricket-orange">Women's Cricket</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {liveWomenMatches.map((channel, index) => (
                <div key={channel.id} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                  <MatchCard
                    team1={channel.match?.team1 || ""}
                    team2={channel.match?.team2 || ""}
                    time={`${formatTime(channel.startTime)} - ${formatTime(channel.endTime)}`}
                    date={formatDate(channel.match?.date)}
                    isLive={true}
                    thumbnail={channel.match?.thumbnail || "/placeholder.svg"}
                    onClick={() => navigate(`/live-stream/${channel.id}`)}
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* No Live Matches Message */}
        {liveMenMatches.length === 0 && liveWomenMatches.length === 0 && (
          <Card className="p-8 text-center animate-fade-in mt-8">
            <div className="flex flex-col items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
                <Calendar className="w-8 h-8 text-muted-foreground" />
              </div>
              <h2 className="text-2xl font-semibold text-foreground">No Live Matches Right Now</h2>
              <p className="text-muted-foreground max-w-md">
                <Link to="/upcoming" className="text-cricket-green hover:underline">
                  View our upcoming matches schedule
                </Link>
              </p>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
};

export default LiveStreamPage;
