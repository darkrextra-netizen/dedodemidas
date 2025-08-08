import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const WinnersRanking = () => {
  const winners = [
    { name: "João Silva", amount: "R$ 1.245,00", multiplier: "12.8x", time: "2 min atrás" },
    { name: "Maria Santos", amount: "R$ 2.890,00", multiplier: "15.2x", time: "5 min atrás" },
    { name: "Carlos Lima", amount: "R$ 890,00", multiplier: "8.9x", time: "8 min atrás" },
    { name: "Ana Costa", amount: "R$ 3.120,00", multiplier: "18.6x", time: "12 min atrás" },
    { name: "Pedro Oliveira", amount: "R$ 756,00", multiplier: "7.2x", time: "15 min atrás" },
  ];

  return (
    <Card className="bg-black border-gold/30 shadow-gold">
      <div className="p-6">
        <div className="text-center mb-6">
          <h3 className="text-2xl font-display font-bold text-gold glow flex items-center justify-center gap-2">
            🏆 ÚLTIMOS GANHADORES
          </h3>
          <p className="text-muted-foreground mt-2">
            Veja quem está lucrando com nossos sinais dourados
          </p>
        </div>
        
        <div className="space-y-3">
          {winners.map((winner, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-card rounded-lg border border-gold/20 hover:border-gold/40 transition-all duration-300">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-gold rounded-full flex items-center justify-center text-black font-bold">
                  {index + 1}
                </div>
                <div>
                  <p className="font-semibold text-gold">{winner.name}</p>
                  <p className="text-sm text-muted-foreground">{winner.time}</p>
                </div>
              </div>
              
              <div className="text-right">
                <p className="font-bold text-gold text-lg">{winner.amount}</p>
                <Badge variant="secondary" className="bg-gold/20 text-gold border-gold/30">
                  {winner.multiplier} 🚀
                </Badge>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-6 p-4 bg-gradient-gold rounded-lg">
          <p className="text-black font-bold">
            💎 Quer estar na próxima lista? Entre no nosso Grupo VIP!
          </p>
        </div>
      </div>
    </Card>
  );
};

export default WinnersRanking;