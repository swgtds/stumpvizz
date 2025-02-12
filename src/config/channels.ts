export interface Channel {
  id: string;
  name: string;
  startTime: string; // 24-hour format "HH:mm"
  endTime: string; // 24-hour format "HH:mm"
  streamUrl: string;
  match?: {
    team1: string;
    team2: string;
    date: string; // YYYY-MM-DD format
    thumbnail: string; // Image path
  };
}

export const channels: Channel[] = [
  {
    id: "tnt-1",
    name: "Live Match 1",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
    match: {
      team1: "Pakistan",
      team2: "New Zealand",
      date: "2025-02-19",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp"
    }
  },
  {
    id: "tnt-1",
    name: "Live Match 2",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
    match: {
      team1: "India",
      team2: "Bangladesh",
      date: "2025-02-20",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp"
    }
  },
  {
    id: "tnt-1",
    name: "Live Match 3",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
    match: {
      team1: "Afghanistan",
      team2: "South Africa",
      date: "2025-02-21",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp"
    }
  },
  {
    id: "tnt-1",
    name: "Live Match 4",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
    match: {
      team1: "Australia",
      team2: "England",
      date: "2025-02-22",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp"
    }
  },
  {
    id: "tnt-1",
    name: "Live Match 5",
    startTime: "14:30",
    endTime: "23:00",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
    match: {
      team1: "India",
      team2: "pakistan",
      date: "2025-02-23",
      thumbnail: "https://thesportsprince.com/wp-content/uploads/2024/12/7-2.webp"
    }
  },
];
