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
      id: "mi-w-vs-dc-w",
      name: "Women's Match 1",
      startTime: "19:30",
      endTime: "23:00",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "Mumbai Indians",
        team2: "Delhi Capitals",
        date: "2025-02-15",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
    {
      id: "eng-w-vs-sa-w",
      name: "Women's Match 2",
      startTime: "14:00",
      endTime: "22:30",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "England Women",
        team2: "South Africa Women",
        date: "2025-02-20",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
    {
      id: "pak-w-vs-nz-w",
      name: "Women's Match 3",
      startTime: "15:30",
      endTime: "23:00",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "Pakistan Women",
        team2: "New Zealand Women",
        date: "2025-02-21",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
    {
      id: "wi-w-vs-ban-w",
      name: "Women's Match 4",
      startTime: "12:00",
      endTime: "20:00",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "West Indies Women",
        team2: "Bangladesh Women",
        date: "2025-02-22",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
    {
      id: "ind-w-vs-pak-w",
      name: "Women's Match 5",
      startTime: "16:00",
      endTime: "23:30",
      streamUrl: "/videos/fox-cricket.html",
      match: {
        team1: "India Women",
        team2: "Pakistan Women",
        date: "2025-02-23",
        thumbnail: "https://bsmedia.business-standard.com/_media/bs/img/article/2025-01/17/full/1737096327-3013.jpg?im=FeatureCrop,size=(826,465)",
      },
    },
  ];
  