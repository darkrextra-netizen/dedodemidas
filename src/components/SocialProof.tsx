import { useState, useEffect } from "react";

const SocialProof = () => {
  const [onlineUsers, setOnlineUsers] = useState(312);
  const [lastSignal, setLastSignal] = useState("14.8x");

  useEffect(() => {
    const interval = setInterval(() => {
      // Simular flutuação de usuários online
      setOnlineUsers(prev => {
        const change = Math.floor(Math.random() * 10) - 5;
        const newValue = prev + change;
        return Math.max(280, Math.min(450, newValue));
      });

      // Atualizar último sinal ocasionalmente
      if (Math.random() < 0.3) {
        const newSignal = (Math.random() * (18 - 8) + 8).toFixed(1);
        setLastSignal(`${newSignal}x`);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-sm border-t border-gold/30 text-center py-3 px-4">
      <div className="container mx-auto">
        <p className="text-sm font-medium text-gold">
          🔥 <span className="font-bold">{onlineUsers}</span> usuários online agora | 
          Último sinal bateu <span className="font-bold text-gradient-gold glow">{lastSignal}</span> 🚀
        </p>
      </div>
    </div>
  );
};

export default SocialProof;