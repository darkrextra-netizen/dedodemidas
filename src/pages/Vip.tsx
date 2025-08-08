import VipForm from "@/components/VipForm";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
const Vip = () => {
  const benefits = [{
    icon: "⚡",
    title: "Sinais em Tempo Real",
    desc: "Receba alertas instantâneos no Telegram"
  }, {
    icon: "🎯",
    title: "87% de Assertividade",
    desc: "Comprovado por milhares de membros"
  }, {
    icon: "💰",
    title: "Lucros Consistentes",
    desc: "Estratégias testadas e aprovadas"
  }, {
    icon: "🤝",
    title: "Suporte Exclusivo",
    desc: "Tire suas dúvidas diretamente conosco"
  }, {
    icon: "📊",
    title: "Análises Avançadas",
    desc: "Relatórios detalhados dos melhores horários"
  }, {
    icon: "🔒",
    title: "Grupo Privado",
    desc: "Comunidade exclusiva de traders vencedores"
  }];
  const testimonials = [{
    name: "Maria Silva",
    profit: "R$ 3.450,00",
    time: "1 semana",
    rating: 5
  }, {
    name: "João Santos",
    profit: "R$ 2.890,00",
    time: "5 dias",
    rating: 5
  }, {
    name: "Ana Costa",
    profit: "R$ 4.200,00",
    time: "2 semanas",
    rating: 5
  }];
  return <div className="min-h-screen">
      <section className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="bg-gradient-gold text-black font-bold text-lg px-6 py-2 mb-4">
            🔥 ACESSO LIMITADO
          </Badge>
          <h1 className="text-4xl md:text-6xl font-display font-black text-gradient-gold glow mb-6">
            GRUPO VIP EXCLUSIVO
          </h1>
          <p className="text-xl md:text-2xl text-gold mb-4">
            Faça parte da elite dos investidores que realmente lucram!
          </p>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Mais de 2.500 membros já transformaram suas vidas financeiras. 
            Chegou a sua vez de fazer parte dessa comunidade de vencedores.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          <Card className="bg-gradient-gold text-black p-6 text-center">
            <div className="text-3xl font-bold">2.500+</div>
            <div className="text-sm font-semibold">Membros Ativos</div>
          </Card>
          <Card className="bg-gradient-gold text-black p-6 text-center">
            <div className="text-3xl font-bold">87%</div>
            <div className="text-sm font-semibold">Taxa de Acerto</div>
          </Card>
          <Card className="bg-gradient-gold text-black p-6 text-center">
            <div className="text-3xl font-bold">R$ 12,5M</div>
            <div className="text-sm font-semibold">Total Lucrado</div>
          </Card>
          <Card className="bg-gradient-gold text-black p-6 text-center">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm font-semibold">Suporte VIP</div>
          </Card>
        </div>

        {/* Benefits */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold text-center text-gold glow mb-8">
            🎯 O QUE VOCÊ RECEBE NO VIP
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => <Card key={index} className="bg-card border-gold/20 p-6 hover:border-gold/40 transition-all duration-300">
                <div className="text-4xl mb-3">{benefit.icon}</div>
                <h3 className="font-bold text-gold mb-2 text-sm">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.desc}</p>
              </Card>)}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h2 className="text-3xl font-display font-bold text-center text-gold glow mb-8">
            💬 O QUE NOSSOS VIPS FALAM
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => <Card key={index} className="bg-black border-gold/30 p-6">
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => <span key={i} className="text-gold">⭐</span>)}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Incrível! Em apenas {testimonial.time} já consegui lucrar {testimonial.profit}. 
                  Os sinais são precisos e o suporte é excepcional!"
                </p>
                <div className="font-semibold text-gold">- {testimonial.name}</div>
              </Card>)}
          </div>
        </div>

        {/* VIP Form */}
        <VipForm />

        {/* Urgency */}
        <div className="mt-12 text-center">
          <Card className="bg-red-900/20 border-red-500/30 p-6">
            <h3 className="text-2xl font-bold text-red-400 mb-2">⏰ ATENÇÃO: VAGAS LIMITADAS!</h3>
            <p className="text-muted-foreground">
              Só aceitamos novos membros até atingirmos 3.000 VIPs. 
              Restam apenas <span className="font-bold text-gold">47 vagas</span>!
            </p>
          </Card>
        </div>
      </section>
    </div>;
};
export default Vip;