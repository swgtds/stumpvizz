import Navbar from "@/components/Navbar";
import MatchCard from "@/components/MatchCard";

const upcomingMatches = [
  {
    team1: "India",
    team2: "Australia",
    time: "Tomorrow, 14:30",
    thumbnail: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  },
  {
    team1: "England",
    team2: "South Africa",
    time: "Today, 19:00",
    thumbnail: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7",
  },
  {
    team1: "New Zealand",
    team2: "Pakistan",
    time: "Saturday, 16:00",
    thumbnail: "https://images.unsplash.com/photo-1518770660439-4636190af475",
  },
];

const UpcomingMatchesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cricket-green to-cricket-orange">
          Upcoming Matches
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {upcomingMatches.map((match, index) => (
            <div key={index} className="animate-fade-in" style={{ animationDelay: `${index * 200}ms` }}>
              <MatchCard {...match} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UpcomingMatchesPage;