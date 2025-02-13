import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MatchCard from "@/components/MatchCard";
import { channels } from "@/config/channels";
import { format, isAfter, isEqual, parse } from "date-fns";

const UpcomingMatchesPage = () => {
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

  // Fetch upcoming matches from channels.ts
  const upcomingMatches = channels
    .filter(channel => channel.match)
    .filter(channel => {
      const matchDate = channel.match!.date; 
      const isFutureMatch = isAfter(parse(matchDate, "yyyy-MM-dd", new Date()), parse(currentDate, "yyyy-MM-dd", new Date()));

      // If match is today, check if its time is still upcoming
      const isTodayMatch = isEqual(parse(matchDate, "yyyy-MM-dd", new Date()), parse(currentDate, "yyyy-MM-dd", new Date()));
      const isUpcomingToday = isTodayMatch && channel.startTime > currentTime;

      return isFutureMatch || isUpcomingToday;
    })
    .map(channel => ({
      team1: channel.match!.team1,
      team2: channel.match!.team2,
      date: formatDate(channel.match!.date),
      time: formatTime(channel.startTime),
      thumbnail: channel.match!.thumbnail, 
    }));

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cricket-green to-cricket-orange">
          Upcoming Matches
        </h1>
        {upcomingMatches.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMatches.map((match, index) => (
              <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
                <MatchCard 
                  team1={match.team1} 
                  team2={match.team2} 
                  time={match.time} 
                  date={match.date} 
                  thumbnail={match.thumbnail} 
                />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground text-lg">
            No upcoming matches at the moment.
          </p>
        )}
      </div>
    </div>
  );
};

export default UpcomingMatchesPage;
