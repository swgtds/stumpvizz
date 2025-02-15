import { format } from "date-fns";

export interface Channel {
  id: string;
  name: string;
  startTime: string; // 24-hour format "HH:mm"
  endTime: string; // 24-hour format "HH:mm"
  streamUrl: string; // Path to the HTML file for embedding
  match?: {
    team1: string;
    team2: string;
    date: string; // YYYY-MM-DD format
    thumbnail: string; // Image path
  };
}

// Get today's date in "YYYY-MM-DD" format
const currentDate = format(new Date(), "yyyy-MM-dd");

// All matches (before filtering)
const allChannels: Channel[] = [
  {
    id: "pak-vs-nz",
    name: "Live Match 1",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "/videos/sky-sports-3.html",
    match: {
      team1: "Pakistan",
      team2: "New Zealand",
      date: "2025-02-19",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp",
    },
  },
  {
    id: "ind-vs-ban",
    name: "Live Match 2",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "/videos/sky-sports-3.html",
    match: {
      team1: "India",
      team2: "Bangladesh",
      date: "2025-02-20",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp",
    },
  },
  {
    id: "afg-vs-sa",
    name: "Live Match 3",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "/videos/sky-sports-3.html",
    match: {
      team1: "Afghanistan",
      team2: "South Africa",
      date: "2025-02-21",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp",
    },
  },
  {
    id: "aus-vs-eng",
    name: "Live Match 4",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "/videos/sky-sports-3.html",
    match: {
      team1: "Australia",
      team2: "England",
      date: "2025-02-22",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp",
    },
  },
  {
    id: "ind-vs-pak",
    name: "Live Match 5",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "/videos/sky-sports-3.html",
    match: {
      team1: "India",
      team2: "Pakistan",
      date: "2025-02-23",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp",
    },
  },
];

// Filter out past matches (keep only future & today's matches)
export const channels = allChannels.filter(
  (channel) => channel.match && channel.match.date >= currentDate
);
