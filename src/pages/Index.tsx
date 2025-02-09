import React from 'react';
import LiveMatch from '../components/LiveMatch';
import UpcomingMatches from '../components/UpcomingMatches';

const Index = () => {
  return (
    <div className="min-h-screen bg-cricket-navy">
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Cricket Live</h1>
          <p className="text-gray-400">Watch live matches and highlights</p>
        </header>

        <LiveMatch
          team1="India"
          team2="Australia"
          score1="245/6"
          score2="180/4"
        />

        <UpcomingMatches />
      </div>
    </div>
  );
};

export default Index;