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
  };
}

export const channels: Channel[] = [
  {
    id: "tnt-1",
    name: "Live Match 1",
    startTime: "09:00",
    endTime: "23:00",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/wf8usag51e/out/v1/bd3b0c314fff4bb1ab4693358f3cd2d3/cenc.mpd",
    match: {
      team1: "India",
      team2: "England",
      date: "2024-02-02"
    }
  },
  {
    id: "tnt-2",
    name: "Live Match 2",
    startTime: "10:00",
    endTime: "22:00",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/f0qvkrra8j/out/v1/f8fa17f087564f51aa4d5c700be43ec4/cenc.mpd",
    match: {
      team1: "Australia",
      team2: "West Indies",
      date: "2024-02-02"
    }
  },
  {
    id: "tnt-3",
    name: "Live Match 3",
    startTime: "08:00",
    endTime: "21:00",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/lsdasbvglv/out/v1/bb548d71dce9/cenc.mpd",
    match: {
      team1: "South Africa",
      team2: "New Zealand",
      date: "2024-02-02"
    }
  },
  {
    id: "astro-cricket",
    name: "Live Match 4",
    startTime: "07:00",
    endTime: "23:59",
    streamUrl: "https://ottb.live.cf.ww.aiv-cdn.net/lhr-nitro/live/clients/dash/enc/lsdasbvglv/out/v1/bb548d71dce9/cenc.mpd",
    match: {
      team1: "Pakistan",
      team2: "Sri Lanka",
      date: "2024-02-02"
    }
  }
];