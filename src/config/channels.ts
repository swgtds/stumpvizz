export interface Channel {
  id: string;
  name: string;
  startTime: string;
  endTime: string;
  streamUrl: string;
  match?: {
    team1: string;
    team2: string;
    date: string;
    thumbnail: string;
  };
};

// Fetch men's matches from backend
export const fetchChannels = async (): Promise<Channel[]> => {
  try {
    const response = await fetch("https://stumpviizz-backend.onrender.com/api/men-matches"); // Update with correct backend URL
    if (!response.ok) {
      throw new Error("Failed to fetch men's matches");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
