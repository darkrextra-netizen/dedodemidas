import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const VipForm = () => {
  const handlePlanSelection = (planType: 'monthly' | 'lifetime') => {
    // Redirect to WhatsApp for now
    window.open("https://wa.me/+5564992670359", "_blank");
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Limited Time Offer Banner */}
      <Card className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-black p-6 mb-8 text-center">
        <p className="font-bold text-lg">
          ⚠️ Oferta disponível por tempo limitado! Não perca a chance de automatizar seus lucros com o sistema mais avançado.
        </p>
      </Card>

      {/* Plan Selection */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-white mb-6">
          Escolha o seu plano:
        </h2>
      </div>

      <div className="space-y-6">
        {/* Monthly Plan */}
        <Card className="bg-gray-800 border-gray-600 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Plano Mensal</h3>
          <p className="text-gray-300 mb-6">Acesso total por 30 dias</p>
          <div className="text-4xl font-bold text-yellow-400 mb-6">R$37,00</div>
          <Button 
            onClick={() => handlePlanSelection('monthly')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg"
          >
            Ativar Plano Mensal
          </Button>
        </Card>

        {/* Lifetime Plan */}
        <Card className="bg-gray-800 border-gray-600 p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Plano Vitalício</h3>
          <p className="text-gray-300 mb-6">Acesso vitalício ao sistema</p>
          <div className="text-4xl font-bold text-yellow-400 mb-6">R$67,00</div>
          <Button 
            onClick={() => handlePlanSelection('lifetime')}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 text-lg"
          >
            Ativar Plano Vitalício
          </Button>
        </Card>
      </div>
    </div>
  );
};

export default VipForm;