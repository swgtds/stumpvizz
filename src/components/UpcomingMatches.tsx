import { useState, useEffect } from "react";
import MatchCard from "./MatchCard";
import { fetchChannels } from "@/config/channels";
import { fetchWomenChannels } from "@/config/women-channels";
import { format, isAfter, parse } from "date-fns";

const UpcomingMatches = () => {
  const [menMatches, setMenMatches] = useState([]);
  const [womenMatches, setWomenMatches] = useState([]);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const [menData, womenData] = await Promise.all([
          fetchChannels(),
          fetchWomenChannels()
        ]);
        setMenMatches(menData);
        setWomenMatches(womenData);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const now = new Date();

  // Filter upcoming matches by comparing match date with current date
  const getUpcomingMatches = (matches: any[]) =>
    matches.filter(channel => {
      const matchDate = channel.match?.date;
      if (!matchDate) return false;

      const parsedDate = parse(matchDate, "yyyy-MM-dd", new Date());
      return isAfter(parsedDate, now);
    });

  const upcomingMenMatches = getUpcomingMatches(menMatches);
  const upcomingWomenMatches = getUpcomingMatches(womenMatches);

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Upcoming Matches</h2>

      {/* Men's Matches */}
      {upcomingMenMatches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Men's Cricket</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMenMatches.map(channel => (
              <MatchCard
                key={channel.id}
                team1={channel.match?.team1 || "Team A"}
                team2={channel.match?.team2 || "Team B"}
                time={`Starts at ${channel.startTime}`}
                thumbnail={channel.match?.thumbnail || "/placeholder.svg"}
              />
            ))}
          </div>
        </div>
      )}

      {/* Women's Matches */}
      {upcomingWomenMatches.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Women's Cricket</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWomenMatches.map(channel => (
              <MatchCard
                key={channel.id}
                team1={channel.match?.team1 || "Team A"}
                team2={channel.match?.team2 || "Team B"}
                time={`Starts at ${channel.startTime}`}
                thumbnail={channel.match?.thumbnail || "/placeholder.svg"}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fallback */}
      {upcomingMenMatches.length === 0 && upcomingWomenMatches.length === 0 && (
        <p className="text-white">No upcoming matches available.</p>
      )}
    </section>
  );
};

export default UpcomingMatches;
