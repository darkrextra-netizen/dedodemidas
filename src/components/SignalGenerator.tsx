import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface SelectedGame {
  id: string;
  name: string;
  image: string;
  confidence: number;
  description: string;
}

interface SignalGeneratorProps {
  selectedGame?: SelectedGame;
}

const SignalGenerator = ({ selectedGame }: SignalGeneratorProps) => {
  const [currentSignal, setCurrentSignal] = useState("Clique para gerar sinal");
  const [isLoading, setIsLoading] = useState(false);
  const [riskLevel, setRiskLevel] = useState<"SEGURO" | "MÉDIO" | "ALTO" | null>(null);
  
  // Novos estados para o formato personalizado
  const [entradaNormal, setEntradaNormal] = useState<number | null>(null);
  const [entradaTurbo, setEntradaTurbo] = useState<number | null>(null);
  const [validadeAte, setValidadeAte] = useState<string | null>(null);
  const [executarEm, setExecutarEm] = useState<string | null>(null);
  const [contador, setContador] = useState<number | null>(null);
  const [progresso, setProgresso] = useState<number>(0);
  const [pessoasAnalisando, setPessoasAnalisando] = useState<number>(0);
  const [signalState, setSignalState] = useState<"initial" | "loading" | "result">("initial");
  
  // Estados específicos para Mines
  const [minesGrid, setMinesGrid] = useState<boolean[]>([]);
  const [protecoes, setProtecoes] = useState<string>("");
  const [numeroMinas, setNumeroMinas] = useState<number>(0);
  const [validadePor, setValidadePor] = useState<string>("");
  const [nextSignalTimer, setNextSignalTimer] = useState<number>(0);
  const [canGenerateSignal, setCanGenerateSignal] = useState<boolean>(true);
  const [aviatorNumbers, setAviatorNumbers] = useState<number[]>([]);

  const isMines = selectedGame?.id === "mines";
  const isAviator = selectedGame?.id === "aviator";

  // Atualizar números aleatórios para aviator durante loading
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading && isAviator) {
      interval = setInterval(() => {
        setAviatorNumbers(Array(15).fill(0).map(() => Math.floor(Math.random() * 999) + 1));
      }, 100); // Atualiza a cada 100ms para efeito rápido
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading, isAviator]);

  const generateMinesSignal = () => {
    if (!canGenerateSignal) return;
    
    setSignalState("loading");
    setCanGenerateSignal(false);
    
    // Gerar grid 5x5 com minas aleatórias
    const newGrid = Array(25).fill(false);
    const minesCount = Math.floor(Math.random() * 20) + 3; // 3-22 minas
    const minePositions = new Set<number>();
    
    while (minePositions.size < minesCount) {
      const pos = Math.floor(Math.random() * 25);
      minePositions.add(pos);
    }
    
    minePositions.forEach(pos => {
      newGrid[pos] = true;
    });
    
    // Gerar dados do sinal
    const protecaoOptions = ["1", "2", "Até 2 gales", "Até 3 gales"];
    const validadeOptions = ["1 min", "2 min", "3 min"];
    
    setTimeout(() => {
      setMinesGrid(newGrid);
      setProtecoes(protecaoOptions[Math.floor(Math.random() * protecaoOptions.length)]);
      setNumeroMinas(minesCount);
      setValidadePor(validadeOptions[Math.floor(Math.random() * validadeOptions.length)]);
      setSignalState("result");
      
      // Iniciar timer de 1 minuto para próximo sinal
      setNextSignalTimer(60);
      const timerInterval = setInterval(() => {
        setNextSignalTimer(prev => {
          if (prev <= 1) {
            clearInterval(timerInterval);
            setCanGenerateSignal(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }, 3000);
  };

  const generateSignal = () => {
    if (isMines) {
      generateMinesSignal();
    } else if (isAviator) {
      // Formato antigo para aviator
      setIsLoading(true);
      setCurrentSignal("Gerando sinal...");
      setRiskLevel(null);
      
      setTimeout(() => {
        const multiplier = (Math.random() * (15 - 1) + 1).toFixed(2);
        setCurrentSignal(`SINAL: ${multiplier}x`);
        
        // Gerar nível de risco aleatório
        const risks = ["SEGURO", "MÉDIO", "ALTO"] as const;
        const randomRisk = risks[Math.floor(Math.random() * risks.length)];
        setRiskLevel(randomRisk);
        
        setIsLoading(false);
      }, 2000);
    } else {
      // Novo formato para outros jogos
      setSignalState("loading");
      setProgresso(0);
      setPessoasAnalisando(Math.floor(Math.random() * 20) + 20); // 20-40 pessoas
      setContador(30);
      
      // Progresso e contador de 30s
      const progressInterval = setInterval(() => {
        setProgresso(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + (100/30); // Incremento para completar em 30s
        });
      }, 1000);
      
      const countdownInterval = setInterval(() => {
        setContador(prev => {
          if (prev && prev <= 1) {
            clearInterval(countdownInterval);
            // Gerar resultados
            setEntradaNormal(Math.floor(Math.random() * 10) + 1);
            setEntradaTurbo(Math.floor(Math.random() * 15) + 1);
            
            const now = new Date();
            const validadeMinutos = Math.floor(Math.random() * 10) + 5; // 5-15 min
            const validadeTime = new Date(now.getTime() + validadeMinutos * 60000);
            setValidadeAte(`${validadeTime.getHours().toString().padStart(2, '0')}:${validadeTime.getMinutes().toString().padStart(2, '0')}`);
            
            setExecutarEm("AGORA");
            setSignalState("result");
            return null;
          }
          return (prev || 30) - 1;
        });
      }, 1000);
    }
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case "SEGURO": return "bg-green-500";
      case "MÉDIO": return "bg-yellow-500";
      case "ALTO": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };


  // Renderizar formato específico para Mines
  if (isMines) {
    return (
      <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-none p-6 max-w-md mx-auto text-white">
        {/* Header */}
        <div className="bg-black/80 rounded-lg p-4 mb-6 text-center">
          <h1 className="text-white text-xl font-bold">Oportunidade encontrada!</h1>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="bg-black/80 rounded-lg p-3 text-center">
            <div className="text-sm text-gray-300 mb-1">Proteções</div>
            <div className="text-lg font-bold text-white">
              {signalState === "result" ? protecoes : "--"}
            </div>
          </div>
          <div className="bg-black/80 rounded-lg p-3 text-center">
            <div className="text-sm text-gray-300 mb-1">Nº de Minas</div>
            <div className="text-lg font-bold text-white">
              {signalState === "result" ? numeroMinas : "--"}
            </div>
          </div>
          <div className="bg-black/80 rounded-lg p-3 text-center">
            <div className="text-sm text-gray-300 mb-1">Válido por</div>
            <div className="text-lg font-bold text-white">
              {signalState === "result" ? validadePor : "-- min"}
            </div>
          </div>
        </div>

        {/* Mines Grid */}
        <div className="mb-6">
          <div className="grid grid-cols-5 gap-2 max-w-xs mx-auto">
            {Array(25).fill(null).map((_, index) => (
              <div
                key={index}
                className="aspect-square bg-blue-900/50 border-2 border-blue-400/30 rounded-sm flex items-center justify-center"
              >
                {signalState === "result" && !minesGrid[index] && (
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded flex items-center justify-center">
                    <span className="text-white text-lg">⭐</span>
                  </div>
                )}
                {signalState === "result" && minesGrid[index] && (
                  <div className="w-6 h-6 bg-red-500/60 rounded-full"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Loading or Timer */}
        {signalState === "loading" && (
          <div className="flex justify-center mb-6">
            <div className="w-8 h-8 border-4 border-white/30 border-t-white rounded-full animate-spin"></div>
          </div>
        )}

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="h-2 bg-gradient-to-r from-red-500 via-yellow-500 to-green-500 rounded-full"></div>
        </div>

        {/* Action Button */}
        <Button
          onClick={generateSignal}
          disabled={signalState === "loading" || !canGenerateSignal}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          {signalState === "loading" 
            ? "ANALISANDO..." 
            : !canGenerateSignal 
              ? `PRÓXIMO SINAL EM ${nextSignalTimer}S` 
              : "GERAR SINAL"
          }
        </Button>

        {/* Discrete Timer */}
        {nextSignalTimer > 0 && (
          <div className="text-center mt-2 text-xs text-blue-200 opacity-60">
            Próximo sinal disponível em {Math.floor(nextSignalTimer / 60)}:{(nextSignalTimer % 60).toString().padStart(2, '0')}
          </div>
        )}
      </Card>
    );
  }

  // Renderizar formato novo para jogos que não são aviator/mines
  if (!isAviator) {
    return (
      <Card className="bg-card border-border p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          {selectedGame && (
            <>
              <div className="text-4xl mb-2 flex justify-center">
                {selectedGame.image.startsWith('/games/') ? (
                  <img 
                    src={selectedGame.image} 
                    alt={selectedGame.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                ) : (
                  <span>{selectedGame.image}</span>
                )}
              </div>
              <h2 className="text-xl font-bold text-primary mb-2">
                🎯 SINAL PARA {selectedGame.name.toUpperCase()}
              </h2>
            </>
          )}
        </div>

        {signalState === "initial" && (
          <>
            <div className="text-center text-muted-foreground mb-6">
              Pronto para gerar entrada
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">ENTRADAS NORMAL</div>
                <div className="text-lg font-bold">--</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">ENTRADAS TURBO</div>
                <div className="text-lg font-bold">--</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">VALIDADE ATÉ</div>
                <div className="text-sm">--:--</div>
                <div className="text-xs text-muted-foreground">~ min</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">EXECUTAR EM</div>
                <div className="text-lg font-bold">--S</div>
              </div>
            </div>
            
            <Button 
              onClick={generateSignal}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold"
            >
              GERAR ENTRADA
            </Button>
            
            <div className="text-center mt-3 text-xs text-muted-foreground">
              • {pessoasAnalisando || Math.floor(Math.random() * 20) + 20} pessoas analisando
            </div>
          </>
        )}

        {signalState === "loading" && (
          <>
            <div className="mb-4">
              <div className="bg-primary text-primary-foreground px-3 py-1 rounded-md inline-block text-sm font-bold mb-2">
                {Math.floor(progresso)}%
              </div>
              <div className="text-muted-foreground">Buscando padrões...</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">ENTRADAS NORMAL</div>
                <div className="text-lg font-bold">--</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">ENTRADAS TURBO</div>
                <div className="text-lg font-bold">--</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">VALIDADE ATÉ</div>
                <div className="text-sm">--:--</div>
                <div className="text-xs text-muted-foreground">~ min</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">EXECUTAR EM</div>
                <div className="text-lg font-bold">--S</div>
              </div>
            </div>
            
            <Button 
              disabled
              className="w-full bg-muted text-muted-foreground font-bold"
            >
              IDENTIFICAR PADRÃO ({contador}S)
            </Button>
            
            <div className="text-center mt-3 text-xs text-muted-foreground">
              • {pessoasAnalisando} pessoas analisando
            </div>
          </>
        )}

        {signalState === "result" && (
          <>
            <div className="text-center text-primary font-semibold mb-6">
              Análise concluída
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">ENTRADAS NORMAL</div>
                <div className="text-lg font-bold text-primary">{entradaNormal}</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">ENTRADAS TURBO</div>
                <div className="text-lg font-bold text-primary">{entradaTurbo}</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">VALIDADE ATÉ</div>
                <div className="text-sm font-bold">{validadeAte}</div>
                <div className="text-xs text-muted-foreground">2 min</div>
              </div>
              <div className="bg-muted p-3 rounded-lg text-center">
                <div className="text-xs text-primary font-semibold mb-1">EXECUTAR EM</div>
                <div className="text-lg font-bold text-primary">{executarEm}</div>
              </div>
            </div>
            
            <Button 
              onClick={() => {
                setSignalState("initial");
                setEntradaNormal(null);
                setEntradaTurbo(null);
                setValidadeAte(null);
                setExecutarEm(null);
                setProgresso(0);
              }}
              className="w-full bg-muted hover:bg-muted/80 text-foreground font-bold"
            >
              IDENTIFICAR PADRÃO (23S)
            </Button>
            
            <div className="text-center mt-3 text-xs text-muted-foreground">
              • {pessoasAnalisando} pessoas analisando
            </div>
          </>
        )}
      </Card>
    );
  }

  // Formato antigo para aviator e mines
  return (
    <Card className="bg-card border-border p-8 text-center">
      <div className="mb-4">
        {selectedGame ? (
          <>
            <div className="text-4xl mb-2 flex justify-center">
              {selectedGame.image.startsWith('/games/') ? (
                <img 
                  src={selectedGame.image} 
                  alt={selectedGame.name}
                  className="w-16 h-16 object-cover rounded"
                />
              ) : (
                <span>{selectedGame.image}</span>
              )}
            </div>
            <h2 className="text-2xl font-display font-bold text-primary mb-2">
              🎯 SINAL PARA {selectedGame.name.toUpperCase()}
            </h2>
            <p className="text-muted-foreground mb-2">
              {selectedGame.description}
            </p>
            <div className="text-sm text-primary">
              Confiança: {selectedGame.confidence}%
            </div>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-display font-bold text-primary mb-2">
              🎯 GERADOR DE SINAIS DOURADOS
            </h2>
            <p className="text-muted-foreground">
              Algoritmo matemático avançado para máxima precisão
            </p>
          </>
        )}
      </div>
      
      <div className={`text-4xl font-display font-black p-6 rounded-lg border-2 transition-all duration-500 mb-6 relative overflow-hidden ${
        isLoading 
          ? "border-primary/50 bg-gray-900" 
          : "border-primary bg-primary text-primary-foreground"
      }`}>
        {isLoading ? (
          <div className="flex items-center justify-center gap-2 h-12">
            {aviatorNumbers.map((number, index) => (
              <span
                key={index}
                className={`text-lg font-bold ${
                  index % 3 === 0 ? "text-pink-400" : 
                  index % 3 === 1 ? "text-purple-400" : 
                  "text-blue-400"
                }`}
              >
                {number}
              </span>
            ))}
          </div>
        ) : (
          currentSignal
        )}
      </div>

      {riskLevel && !isLoading && (
        <div className="mb-6">
          <div className="text-sm text-muted-foreground mb-2">NÍVEL DE RISCO</div>
          <div className={`inline-block px-6 py-2 rounded-full text-white font-bold ${getRiskColor()}`}>
            {riskLevel}
          </div>
        </div>
      )}
      
      <Button
        onClick={generateSignal}
        disabled={isLoading}
        className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-3 px-8 text-lg transition-all duration-300 transform hover:scale-105"
      >
        {isLoading ? "GERANDO..." : "GERAR SINAL"}
      </Button>
    </Card>
  );
};

export default SignalGenerator;