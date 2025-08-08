import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
const WelcomeModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    // Verifica se é uma nova sessão
    const hasShownWelcome = sessionStorage.getItem('welcome-shown');
    if (!hasShownWelcome) {
      setIsOpen(true);
    }
  }, []);
  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('welcome-shown', 'true');
  };
  return <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md mx-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold mb-4">
            Bem-vindo!
          </DialogTitle>
        </DialogHeader>
        
        <div className="text-center space-y-4 px-2">
          <p className="text-muted-foreground">
            Conecte-se à sua conta da plataforma abaixo para iniciar.
          </p>
          
          <p className="text-muted-foreground">
            Em seguida, abra o jogo do <span className="font-bold text-primary">AVIATOR</span> para começar as operações.
          </p>
          
          <p className="text-sm text-muted-foreground/80 italic">
            Importante: caso não tenha conta, basta clicar em{" "}
            <span className="underline font-medium">registre-se</span>.
          </p>
          
          <Button onClick={handleClose} className="w-full text-white py-3 mt-6 bg-[#e6a604] text-lg font-bold">
            Ok, entendi
          </Button>
        </div>
      </DialogContent>
    </Dialog>;
};
export default WelcomeModal;