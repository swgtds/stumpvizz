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
export const fetchChannels = async (): Promise<Channel[]> => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("Backend URL is not defined in environment variables.");
    }
    const response = await fetch(`${backendUrl}/api/men-matches`);
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
