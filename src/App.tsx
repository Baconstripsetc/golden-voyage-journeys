
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/hooks/useAuth";
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UpcomingTrips from "./pages/UpcomingTrips";
import HiddenGems from "./pages/HiddenGems";
import Flights from "./pages/Flights";
import Hotels from "./pages/Hotels";
import NotFound from "./pages/NotFound";
import PackageDetails from "./pages/PackageDetails";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import AdminNewPackage from "./pages/AdminNewPackage";
import AdminSettings from "./pages/AdminSettings";
import AdminDiscovery from "./pages/AdminDiscovery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/upcoming-trips" element={<UpcomingTrips />} />
            <Route path="/hidden-gems" element={<HiddenGems />} />
            <Route path="/flights" element={<Flights />} />
            <Route path="/hotels" element={<Hotels />} />
            <Route path="/discover" element={<HiddenGems />} />
            <Route path="/package/:id" element={<PackageDetails />} />
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/new-package" element={<AdminNewPackage />} />
            <Route path="/admin/edit-package/:id" element={<AdminNewPackage />} />
            <Route path="/admin/discovery" element={<AdminDiscovery />} />
            <Route path="/admin/new-discovery" element={<AdminNewPackage />} />
            <Route path="/admin/edit-discovery/:id" element={<AdminNewPackage />} />
            <Route path="/admin/settings" element={<AdminSettings />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
