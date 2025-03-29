import { Link, useLocation } from "react-router-dom";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { useTheme } from "@/components/theme-provider";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { SearchBar } from "./SearchBar";
import { AboutDialog } from "./AboutDialog";

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const location = useLocation();
  const isMobile = useIsMobile();

  const NavLinks = () => (
    <>
      <Link 
        to="/upcoming" 
        className={`nav-link rounded-full px-4 py-2 ${
          location.pathname === "/upcoming" ? "active bg-cricket-green/10" : ""
        }`}
      >
        Upcoming Matches
      </Link>
      <Link 
        to="/highlights" 
        className={`nav-link rounded-full px-4 py-2 ${
          location.pathname === "/highlights" ? "active bg-cricket-green/10" : ""
        }`}
      >
        Highlights
      </Link>
      <Link 
        to="/live-stream" 
        className={`nav-link rounded-full px-4 py-2 ${
          location.pathname === "/live-stream" ? "active bg-cricket-green/10" : ""
        }`}
      >
        Live Stream
      </Link>
      <AboutDialog />
    </>
  );

  if (isMobile) {
    return (
      <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-b-xl">
        <div className="container flex h-14 items-center justify-between gap-4">
          <Link to="/" className="text-2xl font-bold text-foreground">
            Stumpvizz
          </Link>
          <div className="flex items-center gap-2">
            {/* <SearchBar /> */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-64">
                <div className="flex flex-col space-y-4 mt-8">
                  <NavLinks />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                    className="rounded-full"
                  >
                    {theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 rounded-b-xl">
      <div className="container flex h-16 items-center">
        <Link to="/" className="mr-8 flex items-center space-x-2">
          <span className="text-2xl font-bold text-foreground">Stumpvizz</span>
        </Link>
        <div className="flex flex-1 items-center space-x-6 text-sm font-medium">
          {/* <SearchBar /> */}
          <NavLinks />
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="hidden md:inline-flex rounded-full"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5" />
          ) : (
            <Moon className="h-5 w-5" />
          )}
          <span className="sr-only">Toggle theme</span>
        </Button>
      </div>
    </nav>
  );
};

export default Navbar;