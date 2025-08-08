import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";

const games = [
  {
    id: "aviator",
    name: "Aviator",
    image: "/games/aviator.png",
    confidence: 93.48,
    description: "Voe alto com multiplicadores incríveis"
  },
  {
    id: "fortune-rabbit",
    name: "Fortune Rabbit",
    image: "/games/fortune-rabbit.png",
    confidence: 95.16,
    description: "O coelho da sorte dourada"
  },
  {
    id: "fortune-ox",
    name: "Fortune Ox",
    image: "/games/fortune-ox.png",
    confidence: 97.35,
    description: "A força do touro dourado"
  },
  {
    id: "fortune-tiger",
    name: "Fortune Tiger",
    image: "/games/fortune-tiger.png",
    confidence: 96.57,
    description: "O tigre das grandes fortunas"
  },
  {
    id: "mines",
    name: "Mines",
    image: "/games/mines.png",
    confidence: 94.82,
    description: "Encontre o ouro escondido"
  }
];

const Jogos = () => {
  const navigate = useNavigate();

  const handleGameClick = (game: typeof games[0]) => {
    navigate("/", { state: { selectedGame: game } });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-display font-black text-primary mb-4">
            CHEGOU O MOMENTO DE OPERAR DE FORMA SEGURA!
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Selecione os jogos que estão mais pagando no momento, destacados com a{" "}
            <span className="text-primary font-bold">MAIOR taxa de assertividade</span>.
          </p>
        </div>

        {/* Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {games.map((game) => (
            <Card
              key={game.id}
              className="bg-card border-border cursor-pointer hover:scale-105 transition-all duration-300 overflow-hidden"
              onClick={() => handleGameClick(game)}
            >
              <div className="aspect-square bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
                {game.image.startsWith('/games/') ? (
                  <img 
                    src={game.image} 
                    alt={game.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-6xl">{game.image}</span>
                )}
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-bold text-center mb-2">{game.name}</h3>
                <p className="text-sm text-muted-foreground text-center mb-4">{game.description}</p>
                
                <div className="space-y-2">
                  <div className="text-sm text-center text-primary font-semibold">
                    Nível de Confiança Atual
                  </div>
                  
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className="bg-primary h-2 rounded-full transition-all duration-500"
                      style={{ width: `${game.confidence}%` }}
                    />
                  </div>
                  
                  <div className="text-center">
                    <span className="bg-primary text-primary-foreground px-3 py-1 rounded-md font-bold text-sm">
                      {game.confidence}%
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Jogos;