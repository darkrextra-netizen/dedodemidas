import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./components/AppSidebar";
import Index from "./pages/Index";
import Jogos from "./pages/Jogos";
import Vip from "./pages/Vip";
import Teste from "./pages/Teste";
import NotFound from "./pages/NotFound";
import Navigation from "./components/Navigation";
import SocialProof from "./components/SocialProof";
import WelcomeModal from "./components/WelcomeModal";
import { Menu } from "lucide-react";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <SidebarProvider defaultOpen={false}>
          <div className="min-h-screen flex w-full">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-16 flex items-center border-b px-4 fixed top-0 left-0 right-0 bg-background z-50">
                <SidebarTrigger>
                  <Menu className="w-5 h-5" />
                </SidebarTrigger>
              </header>
              <Navigation />
              <main className="pt-16 pb-16 flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/jogos" element={<Jogos />} />
                  <Route path="/vip" element={<Vip />} />
                  <Route path="/teste" element={<Teste />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </main>
              <SocialProof />
            </div>
          </div>
          <WelcomeModal />
        </SidebarProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
