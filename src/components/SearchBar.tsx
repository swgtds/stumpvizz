import { Search } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";

const games = [
  { id: 1, title: "India vs Australia", keywords: ["ind", "aus", "india", "australia"] },
  { id: 2, title: "England vs New Zealand", keywords: ["eng", "nz", "england", "new zealand"] },
  { id: 3, title: "South Africa vs Pakistan", keywords: ["sa", "pak", "south africa", "pakistan"] },
  { id: 4, title: "Bangladesh vs Sri Lanka", keywords: ["ban", "sl", "bangladesh", "sri lanka"] },
  { id: 5, title: "West Indies vs Zimbabwe", keywords: ["wi", "zim", "west indies", "zimbabwe"] }
];

export function SearchBar() {
  const [open, setOpen] = useState(false);
  const [searchResults, setSearchResults] = useState(games);

  const handleSearch = (query: string) => {
    const searchTerm = query.toLowerCase().trim();
    if (!searchTerm) {
      setSearchResults(games);
      return;
    }

    const filtered = games.filter((game) => {
      const titleMatch = game.title.toLowerCase().includes(searchTerm);
      const keywordMatch = game.keywords.some(keyword => 
        keyword.toLowerCase().includes(searchTerm)
      );
      return titleMatch || keywordMatch;
    });
    setSearchResults(filtered);
  };

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 rounded-full border-2 hover:border-cricket-green w-9 md:w-60 p-0 md:justify-start md:px-3 md:py-2"
        onClick={() => setOpen(true)}
      >
        <Search className="h-4 w-4 md:mr-2" />
        <span className="hidden md:inline-flex">Search games...</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput 
          placeholder="Search all games..." 
          onValueChange={handleSearch}
        />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Games">
            {searchResults.map((game) => (
              <CommandItem
                key={game.id}
                onSelect={() => {
                  setOpen(false);
                }}
              >
                {game.title}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}