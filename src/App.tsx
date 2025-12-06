
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { useEffect } from "react";
import { setupBasicDevToolsProtection } from "@/utils/devToolsProtection";
import Index from "./pages/Index";
import About from "./pages/About";
import Darshan from "./pages/Darshan";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Visit from "./pages/Visit";
import FAQ from "./pages/FAQ";
import Donate from "./pages/Donate";
import Events from "./pages/Events";
import EventDetail from "./pages/EventDetail";
import Auth from "./pages/Auth";
import Admin from "./pages/Admin";
import DevoteeRegistration from "./pages/DevoteeRegistration";
import SrilaPrabhupada from "./pages/SrilaPrabhupada"; // Import the new page

const queryClient = new QueryClient();

// Component to handle scroll to top on route change
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

const App = () => {
  useEffect(() => {
    // Initialize basic dev tools protection
    setupBasicDevToolsProtection();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/about" element={<About />} />
              <Route path="/darshan" element={<Darshan />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/visit" element={<Visit />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/donate" element={<Donate />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:id" element={<EventDetail />} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/devotee-registration" element={<DevoteeRegistration />} />
              <Route path="/srila-prabhupada" element={<SrilaPrabhupada />} /> {/* Add the new route */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </TooltipProvider>
        </AuthProvider>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
