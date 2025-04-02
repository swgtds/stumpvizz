export interface menHighlightChannels {
    id: string;
    title: string;
    tournament: string;
    date: string; 
    team1: string;
    team2: string;
    url: string; 
    thumbnail: string; 
    description: string;
  }
  
  export const menHighlightChannels: menHighlightChannels[] = [
    {
      id: "1",
      title: "Sunrisers Hyderabad vs Lucknow SUpeer Giants",
      tournament: "IPL 2025",
      date: "2024-03-27",
      team1: "SRH",
      team2: "LSG",
      url: "https://www.hotstar.com/in/sports/cricket/srh-vs-lsg-highlights/1540040197/video/highlights/watch",
      thumbnail: "/images/srh-vs-lsg-27-mar.png",
      description: "Shardul Thakur's 4/34 curbed Sunrisers Hyderabad to 190/9 before Nicholas Pooran and Mitchell Marsh sealed the chase for Lucknow Super Giants in TATA IPL 2025"
    },
    {
      id: "2",
      title: "Chennai Super Kings Vs Royal Challengers Bangalore",
      tournament: "IPL 2025",
      date: "2024-03-28",
      team1: "CSK",
      team2: "RCB",
      url: "https://www.hotstar.com/in/sports/cricket/csk-vs-rcb-highlights/1540040200/video/highlights/watch",
      thumbnail: "/images/csk-vs-rcb-28-mar.png",
      description: "Royal Challengers Bengaluru ended their 17-year curse at Chepauk as they shone in all departments to defeat Chennai Super Kings in TATA IPL 2025"
    },
  ];