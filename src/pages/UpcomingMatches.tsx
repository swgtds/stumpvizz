import React from 'react';
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import MatchCard from "@/components/MatchCard";
import { fetchChannels } from "@/config/channels"; 
import { fetchWomenChannels } from "@/config/women-channels"; 
import { format, isAfter, isEqual, parse } from "date-fns";
import LiveMatchAlert from "@/components/LiveMatchAlert";
import LiveBanner from "@/components/LiveBanner";

const UpcomingMatchesPage = () => {
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

  // Function to filter upcoming matches
  const getUpcomingMatches = (matches: any[]) =>
    matches
      .filter(channel => channel.match)
      .filter(channel => {
        const matchDate = channel.match!.date;
        const isFutureMatch = isAfter(
          parse(matchDate, "yyyy-MM-dd", new Date()),
          parse(currentDate, "yyyy-MM-dd", new Date())
        );

        // If match is today, check if its time is still upcoming
        const isTodayMatch = isEqual(
          parse(matchDate, "yyyy-MM-dd", new Date()),
          parse(currentDate, "yyyy-MM-dd", new Date())
        );
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

  const menUpcomingMatches = getUpcomingMatches(menMatches);
  const womenUpcomingMatches = getUpcomingMatches(womenMatches);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <LiveMatchAlert />
      <div className="container mx-auto px-4 py-4">
      <LiveBanner />
        <h1 className="text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-cricket-green to-cricket-orange">
          Upcoming Matches
        </h1>

        {/* Men's Matches Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4 text-cricket-green">Men's Cricket</h2>
          {menUpcomingMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {menUpcomingMatches.map((match, index) => (
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
            <p className="text-center text-muted-foreground text-lg">No upcoming men's matches.</p>
          )}
        </section>

        {/* Women's Matches Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-cricket-orange">Women's Cricket</h2>
          {womenUpcomingMatches.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {womenUpcomingMatches.map((match, index) => (
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
            <p className="text-center text-muted-foreground text-lg">No upcoming women's matches.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default UpcomingMatchesPage;
