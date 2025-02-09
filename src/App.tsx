
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { ThemeProvider } from "@/components/theme-provider"
import { useEffect, useState } from "react"
import Landing from "./pages/Landing"
import UpcomingMatches from "./pages/UpcomingMatches"
import Highlights from "./pages/Highlights"
import LiveStream from "./pages/LiveStream"
import ChannelStream from "./components/ChannelStream"
import NotFound from "./pages/NotFound"

function App() {
  const queryClient = new QueryClient()
  const [isInitializing, setIsInitializing] = useState(true)

  useEffect(() => {
    // Simulate initial app initialization
    const timer = setTimeout(() => {
      setIsInitializing(false)
    }, 1500) // Shorter animation duration

    return () => clearTimeout(timer)
  }, [])

  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <TooltipProvider>
            <div className={`transition-opacity duration-500 ${isInitializing ? 'opacity-0' : 'opacity-100'}`}>
              <Toaster />
              <Sonner />
              <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/upcoming" element={<UpcomingMatches />} />
                <Route path="/highlights" element={<Highlights />} />
                <Route path="/live-stream" element={<LiveStream />} />
                <Route path="/live-stream/:channelId" element={<ChannelStream />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
