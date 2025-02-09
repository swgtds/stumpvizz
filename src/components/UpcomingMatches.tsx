import React from 'react';
import MatchCard from './MatchCard';

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

const UpcomingMatches = () => {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-white mb-6">Upcoming Matches</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {upcomingMatches.map((match, index) => (
          <MatchCard key={index} {...match} />
        ))}
      </div>
    </section>
  );
};

export default UpcomingMatches;