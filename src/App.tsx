import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import BornToDie from "./pages/BornToDie";
import VideoGames from "./pages/VideoGames";
import SummertimeSadness from "./pages/SummertimeSadness";
import NotFound from "./pages/NotFound";
import AccessPage from "./pages/AccessPage";

const queryClient = new QueryClient();

const App = () => {
  const [hasAccess, setHasAccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Verificar si ya tiene acceso guardado
    const access = localStorage.getItem('lana-access');
    setHasAccess(access === 'granted');
    setIsLoading(false);
  }, []);

  const handleAccessGranted = () => {
    setHasAccess(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="animate-pulse text-primary text-xl font-playfair">
          Cargando nuestro mundo ♡
        </div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!hasAccess ? (
          <AccessPage onAccessGranted={handleAccessGranted} />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/born-to-die" element={<BornToDie />} />
              <Route path="/video-games" element={<VideoGames />} />
              <Route path="/summertime-sadness" element={<SummertimeSadness />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
