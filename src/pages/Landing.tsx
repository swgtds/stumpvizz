
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, PlayCircle, Calendar, Sun, Moon } from "lucide-react";
import { useTheme } from "@/components/theme-provider";
import { useEffect, useState } from "react";

const Landing = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const title = "Stumpvizz";

  useEffect(() => {
    setMounted(true);
  }, []);

  const renderAnimatedTitle = () => {
    return (
      <h1 className="text-6xl md:text-7xl font-bold text-foreground">
        <span className="block text-2xl mb-2 animate-fade-in [animation-delay:0.5s]">Welcome to</span>
        {title.split('').map((letter, index) => (
          <span
            key={index}
            className="letter-animation inline-block"
            style={{
              animationDelay: `${index * 0.1}s`
            }}
          >
            {letter}
          </span>
        ))}
      </h1>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="fixed top-4 right-4 rounded-full"
      >
        {theme === "dark" ? (
          <Sun className="h-5 w-5" />
        ) : (
          <Moon className="h-5 w-5" />
        )}
        <span className="sr-only">Toggle theme</span>
      </Button>

      <div className="container mx-auto px-4 pt-20 pb-12">
        <div className="text-center space-y-8 max-w-4xl mx-auto mb-20">
          {mounted && renderAnimatedTitle()}
          <p className="text-xl text-muted-foreground animate-fade-in [animation-delay:1s]">
            Your ultimate destination for live cricket streams, match highlights, and upcoming fixtures.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cricket-green/20 to-cricket-orange/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
            <Link 
              to="/live-stream"
              className="relative block p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10"
            >
              <div className="flex flex-col items-center space-y-4 text-center">
                <PlayCircle className="w-16 h-16 text-cricket-green animate-bounce" />
                <h2 className="text-2xl font-bold text-foreground">Watch Live</h2>
                <p className="text-muted-foreground">Stream live cricket matches in HD quality</p>
                <Button 
                  variant="ghost" 
                  className="group mt-4 text-cricket-green hover:text-foreground hover:bg-cricket-green/20"
                >
                  Watch Now
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>
          </div>

          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cricket-orange/20 to-cricket-green/20 rounded-2xl blur-xl transition-all duration-500 group-hover:blur-2xl" />
            <Link 
              to="/upcoming"
              className="relative block p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-transform duration-300 hover:scale-[1.02] hover:bg-white/10"
            >
              <div className="flex flex-col items-center space-y-4 text-center">
                <Calendar className="w-16 h-16 text-cricket-orange animate-bounce" />
                <h2 className="text-2xl font-bold text-foreground">View Matches and Highlights</h2>
                <p className="text-muted-foreground">Check upcoming matches and highlights</p>
                <Button 
                  variant="ghost" 
                  className="group mt-4 text-cricket-orange hover:text-foreground hover:bg-cricket-orange/20"
                >
                  View Schedule
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </Link>
          </div>
        </div>

        <div className="mt-20 text-center animate-fade-in [animation-delay:1.2s]">
          <p className="text-muted-foreground">
            Experience cricket like never before with our premium streaming service
          </p>
        </div>
      </div>
    </div>
  );
};

export default Landing;
