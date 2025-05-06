import { Channel } from "@/config/channels";

export const fetchWomenChannels = async (): Promise<Channel[]> => {
  try {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    if (!backendUrl) {
      throw new Error("Backend URL is not defined in environment variables.");
    }
    const response = await fetch(`${backendUrl}/api/women-matches`);
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
