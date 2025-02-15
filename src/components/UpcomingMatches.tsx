import MatchCard from "./MatchCard";
import { channels } from "@/config/channels";
import { womenChannels } from "@/config/women-channels";
import { format } from "date-fns";

const UpcomingMatches = () => {
  const currentDate = format(new Date(), "yyyy-MM-dd");

  // Filter upcoming matches for men and women separately
  const upcomingMenMatches = channels.filter(
    (channel) => channel.match && channel.match.date > currentDate
  );

  const upcomingWomenMatches = womenChannels.filter(
    (channel) => channel.match && channel.match.date > currentDate
  );

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Upcoming Matches</h2>

      {/* Men's Cricket Matches Section */}
      {upcomingMenMatches.length > 0 && (
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Men's Cricket</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingMenMatches.map((channel) => (
              <MatchCard
                key={channel.id}
                team1={channel.match?.team1 || ""}
                team2={channel.match?.team2 || ""}
                time={`Starts at ${channel.startTime}`}
                thumbnail={channel.match?.thumbnail || "/placeholder.svg"}
              />
            ))}
          </div>
        </div>
      )}

      {/* Women's Cricket Matches Section */}
      {upcomingWomenMatches.length > 0 && (
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Women's Cricket</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingWomenMatches.map((channel) => (
              <MatchCard
                key={channel.id}
                team1={channel.match?.team1 || ""}
                team2={channel.match?.team2 || ""}
                time={`Starts at ${channel.startTime}`}
                thumbnail={channel.match?.thumbnail || "/placeholder.svg"}
              />
            ))}
          </div>
        </div>
      )}

      {/* Fallback Message */}
      {upcomingMenMatches.length === 0 && upcomingWomenMatches.length === 0 && (
        <p className="text-white">No upcoming matches available.</p>
      )}
    </section>
  );
};

export default UpcomingMatches;
