import { Channel } from "@/config/channels";

// Fetch women's matches from backend
export const fetchWomenChannels = async (): Promise<Channel[]> => {
  try {
    const response = await fetch("http://localhost:5000/api/women-matches"); // Update with correct backend URL
    if (!response.ok) {
      throw new Error("Failed to fetch women's matches");
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
};
