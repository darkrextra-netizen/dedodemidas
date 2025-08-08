import SignalGenerator from "@/components/SignalGenerator";
import BettingFrame from "@/components/BettingFrame";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import AnimatedCounter from "@/components/AnimatedCounter";
const games = [{
  id: "aviator",
  name: "Aviator",
  image: "/games/aviator.png",
  confidence: 93.48,
  description: "Voe alto com multiplicadores incríveis"
}, {
  id: "fortune-mouse",
  name: "Fortune Mouse",
  image: "/games/fortune-mouse.png",
  confidence: 95.16,
  description: "O ratinho da sorte dourada"
}, {
  id: "fortune-ox",
  name: "Fortune Ox",
  image: "/games/fortune-ox.png",
  confidence: 97.35,
  description: "A força do touro dourado"
}, {
  id: "fortune-tiger",
  name: "Fortune Tiger",
  image: "/games/fortune-tiger.png",
  confidence: 96.57,
  description: "O tigre das grandes fortunas"
}, {
  id: "mines",
  name: "Mines",
  image: "/games/mines.png",
  confidence: 94.82,
  description: "Encontre o ouro escondido"
}];
const Index = () => {
  const location = useLocation();
  const initialSelectedGame = location.state?.selectedGame;
  const [selectedGameForSignal, setSelectedGameForSignal] = useState(initialSelectedGame || null);
  return <div className="min-h-screen">
      {/* Hero Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-display font-black text-gradient-gold glow mb-6 md:text-7xl">
            DEDO DE MIDAS
          </h1>
          <p className="text-xl text-gold mb-4 text-center font-bold md:text-2xl">🔥 Entre no jogo que transforma cada clique em OURO puro!🔥</p>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            Os sinais mais precisos do mercado. Resultados rápidos, lucros dourados.
            Junte-se aos milhares que já multiplicaram seus ganhos!
          </p>
          
          <div className="text-center">
            <Button variant="metallic" size="lg" className="text-xl px-16 py-6 mb-3 glow">
              COMEÇAR AGORA 🚀
            </Button>
            <p className="text-muted-foreground/80 text-base">Clique no jogo para gerar sinal</p>
          </div>
        </div>

        {/* Signal Generator ou Game Selector */}
        <div className="mb-12">
          {selectedGameForSignal ? <div>
              <div className="text-center mb-6">
                <button onClick={() => setSelectedGameForSignal(null)} className="text-primary hover:text-primary/80 underline mb-4">
                  ← Escolher outro jogo
                </button>
              </div>
              <SignalGenerator selectedGame={selectedGameForSignal} />
            </div> : <div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 max-w-5xl mx-auto">
                {games.map((game, index) => <Card 
                  key={game.id} 
                  className={`bg-card border-border cursor-pointer hover:scale-105 transition-all duration-300 text-center p-4 min-w-fit`}
                  onClick={() => setSelectedGameForSignal(game)}
                >
                    <div className="text-4xl mb-3 flex justify-center">
                      {game.image.startsWith('/games/') ? <img src={game.image} alt={game.name} className="w-16 h-16 object-cover rounded" /> : <span>{game.image}</span>}
                    </div>
                    <div className="text-base font-semibold mb-2 whitespace-nowrap">{game.name}</div>
                    <div className="text-sm text-primary font-bold">
                      <AnimatedCounter target={game.confidence} />
                    </div>
                  </Card>)}
              </div>
            </div>}
        </div>

        {/* Betting Frame */}
        <BettingFrame />
      </section>
    </div>;
};
export default Index;