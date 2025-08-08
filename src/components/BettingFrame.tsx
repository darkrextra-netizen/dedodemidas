import { Card } from "@/components/ui/card";

const BettingFrame = () => {
  return (
    <Card className="bg-card border-gold/20 overflow-hidden">
      <div className="p-4 bg-gradient-gold text-black">
        <h3 className="text-xl font-display font-bold text-center">
          🏆 MINHA CASA DE APOSTA OFICIAL
        </h3>
        <p className="text-center text-sm mt-1">
          Aposte com segurança e multiplique seus ganhos
        </p>
      </div>
      
      <div className="relative">
        <iframe 
          src="https://pf.rnpass.com/"
          width="100%" 
          height="700"
          className="border-none"
          title="Casa de Aposta"
          allowFullScreen
        />
        
        {/* Overlay para mobile responsiveness */}
        <div className="absolute inset-0 pointer-events-none md:hidden bg-black/10" />
      </div>
      
      <div className="p-4 bg-black/50 text-center">
        <p className="text-gold font-medium">
          ⚡ Resultados instantâneos | 💰 Saques rápidos | 🔒 100% Seguro
        </p>
      </div>
    </Card>
  );
};

export default BettingFrame;