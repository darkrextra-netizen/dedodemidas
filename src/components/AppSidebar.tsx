import { useState } from "react";
import { Home, Settings, ChevronDown, Bot, HeadphonesIcon, CreditCard, Menu } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const [modeOpen, setModeOpen] = useState(false);
  const [selectedMode, setSelectedMode] = useState("Conservador");
  
  const isActive = (path: string) => location.pathname === path;
  
  const modes = ["Conservador", "Moderado", "Avançado"];

  return (
    <Sidebar className="border-r border-sidebar-border">
      <SidebarContent className="bg-sidebar">
        {/* Menu Principal */}
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton asChild>
                <Link 
                  to="/" 
                  className={`flex items-center gap-3 px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent ${
                    isActive('/') ? 'bg-sidebar-accent text-sidebar-accent-foreground' : ''
                  }`}
                >
                  <Home className="w-5 h-5" />
                  {open && <span>Início</span>}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>

        {/* Modo de Uso */}
        <SidebarGroup>
          <Collapsible open={modeOpen} onOpenChange={setModeOpen}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full justify-between px-4 py-3 text-sidebar-foreground hover:bg-sidebar-accent"
              >
                <div className="flex items-center gap-3">
                  <Settings className="w-5 h-5" />
                  {open && <span>Modo de uso</span>}
                </div>
                {open && <ChevronDown className={`w-4 h-4 transition-transform ${modeOpen ? 'rotate-180' : ''}`} />}
              </Button>
            </CollapsibleTrigger>
            
            {open && (
              <CollapsibleContent className="px-4 space-y-1">
                {modes.map((mode) => (
                  <Button
                    key={mode}
                    variant="ghost"
                    className={`w-full justify-start py-2 text-sm ${
                      selectedMode === mode 
                        ? 'bg-primary text-primary-foreground' 
                        : 'text-sidebar-foreground hover:bg-sidebar-accent'
                    }`}
                    onClick={() => setSelectedMode(mode)}
                  >
                    {mode}
                  </Button>
                ))}
              </CollapsibleContent>
            )}
          </Collapsible>
        </SidebarGroup>

        {/* Versão Automática */}
        <SidebarGroup>
          <div className="px-4 py-4 border border-primary/30 rounded-lg mx-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <Bot className="w-5 h-5 text-primary" />
              <span className="text-primary font-medium text-sm">VERSÃO AUTOMÁTICA</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Este jogo possui uma versão automática
            </p>
            <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
              Ativar
            </Button>
          </div>
        </SidebarGroup>

        {/* Suporte */}
        <SidebarGroup>
          <div className="px-4 py-4 mx-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <HeadphonesIcon className="w-5 h-5 text-sidebar-foreground" />
              <span className="text-sidebar-foreground font-medium text-sm">SUPORTE</span>
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Fale com o suporte para ajuda imediata
            </p>
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.open('https://wa.me/+5564992670359', '_blank')}
            >
              Entrar em contato
            </Button>
          </div>
        </SidebarGroup>

        {/* Depósitos */}
        <SidebarGroup>
          <div className="px-4 py-4 mx-4 mb-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="w-5 h-5 text-sidebar-foreground" />
            </div>
            <p className="text-xs text-muted-foreground mb-3">
              Realize depósitos na própria plataforma
            </p>
            <Button 
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => window.open('https://pf.rnpass.com/', '_blank')}
            >
              Depositar
            </Button>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}