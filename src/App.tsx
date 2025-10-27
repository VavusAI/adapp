import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "@/stores/authStore";

// Auth pages
import Login from "./routes/auth/Login";
import Register from "./routes/auth/Register";
import ChooseRole from "./routes/auth/ChooseRole";

// App pages
import { AppLayout } from "./components/AppLayout";
import Overview from "./routes/app/Overview";
import CampaignsList from "./routes/app/campaigns/List";
import NewCampaign from "./routes/app/campaigns/NewCampaign";
import Creatives from "./routes/app/Creatives";
import Inventory from "./routes/app/Inventory";
import Reports from "./routes/app/Reports";
import InfluencerSettings from "./routes/app/influencer/Settings";
import MyContent from "./routes/app/influencer/Content";
import Briefs from "./routes/app/influencer/Briefs";

import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  return isAuthenticated ? <>{children}</> : <Navigate to="/auth/login" />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/auth/login" />} />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/choose-role" element={<ProtectedRoute><ChooseRole /></ProtectedRoute>} />
          
          <Route path="/app" element={<ProtectedRoute><AppLayout><Overview /></AppLayout></ProtectedRoute>} />
          <Route path="/app/overview" element={<ProtectedRoute><AppLayout><Overview /></AppLayout></ProtectedRoute>} />
          <Route path="/app/campaigns" element={<ProtectedRoute><AppLayout><CampaignsList /></AppLayout></ProtectedRoute>} />
          <Route path="/app/campaigns/new" element={<ProtectedRoute><AppLayout><NewCampaign /></AppLayout></ProtectedRoute>} />
          <Route path="/app/creatives" element={<ProtectedRoute><AppLayout><Creatives /></AppLayout></ProtectedRoute>} />
          <Route path="/app/inventory" element={<ProtectedRoute><AppLayout><Inventory /></AppLayout></ProtectedRoute>} />
          <Route path="/app/reports" element={<ProtectedRoute><AppLayout><Reports /></AppLayout></ProtectedRoute>} />
          <Route path="/app/influencer/settings" element={<ProtectedRoute><AppLayout><InfluencerSettings /></AppLayout></ProtectedRoute>} />
          <Route path="/app/influencer/content" element={<ProtectedRoute><AppLayout><MyContent /></AppLayout></ProtectedRoute>} />
          <Route path="/app/influencer/briefs" element={<ProtectedRoute><AppLayout><Briefs /></AppLayout></ProtectedRoute>} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
