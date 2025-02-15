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
      thumbnail: string; // Image path (blank)
    };
  }
  
  export const womenChannels: Channel[] = [
    {
      id: "gg-w-vs-upw-w",
      name: "Women's Match 1",
      startTime: "19:30",
      endTime: "23:00",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "Gujarat Giants",
        team2: "UP Warriorz",
        date: "2025-02-16",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
    {
      id: "dc-w-vs-rcb-w",
      name: "Women's Match 2",
      startTime: "19:30",
      endTime: "23:00",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "Delhi Capitals",
        team2: "Royal Challengers Bangalore",
        date: "2025-02-17",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
    {
      id: "gg-w-vs-mi-w",
      name: "Women's Match 3",
      startTime: "19:30",
      endTime: "23:00",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "Gujarat Giants",
        team2: "Mumbai Indians",
        date: "2025-02-18",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
    {
      id: "upw-w-vs-dc-w",
      name: "Women's Match 4",
      startTime: "19:30",
      endTime: "23:00",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "UP Warriorz",
        team2: "Delhi Capitals",
        date: "2025-02-19",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
    {
      id: "rcb-w-vs-mi-w",
      name: "Women's Match 5",
      startTime: "19:30",
      endTime: "23:00",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "Royal Challengers Bangalore",
        team2: "Mumbai Indians",
        date: "2025-02-21",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },

  ];
  