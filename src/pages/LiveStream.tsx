import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { fetchChannels } from "@/config/channels"; // Fetch men's matches
import { fetchWomenChannels } from "@/config/women-channels"; // Fetch women's matches
import MatchCard from "@/components/MatchCard";
import { useNavigate, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format, parse } from "date-fns";

const LiveStreamPage = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(format(new Date(), "HH:mm"));
  const [currentDate, setCurrentDate] = useState(format(new Date(), "yyyy-MM-dd"));

  const [menMatches, setMenMatches] = useState([]); // Store fetched men's matches
  const [womenMatches, setWomenMatches] = useState([]); // Store fetched women's matches

  // Fetch matches from backend on component mount
  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const menData = await fetchChannels();
        const womenData = await fetchWomenChannels();
        setMenMatches(menData);
        setWomenMatches(womenData);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };
    fetchMatches();
  }, []);

  // Update current time every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(format(now, "HH:mm"));
      setCurrentDate(format(now, "yyyy-MM-dd"));
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const formatDate = (dateStr: string): string => format(new Date(dateStr), "do MMM, yyyy");

  const formatTime = (time: string): string => {
    const [hours, minutes] = time.split(":").map(Number);
    const suffix = hours >= 12 ? "PM" : "AM";
    const formattedHours = hours % 12 || 12;
    return `${formattedHours}:${minutes.toString().padStart(2, "0")} ${suffix}`;
  };

  const isTimeInRange = (startTime: string, endTime: string, currentTime: string) => {
    const start = parse(startTime, "HH:mm", new Date());
    const end = parse(endTime, "HH:mm", new Date());
    const current = parse(currentTime, "HH:mm", new Date());
    return current >= start && current <= end;
  };

  const liveMenMatches = menMatches.filter(
    (channel) => channel.match?.date === currentDate && isTimeInRange(channel.startTime, channel.endTime, currentTime)
  );

  const liveWomenMatches = womenMatches.filter(
    (channel) => channel.match?.date === currentDate && isTimeInRange(channel.startTime, channel.endTime, currentTime)
  );

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