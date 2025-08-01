import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Heart, Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import FloatingHearts from "@/components/FloatingHearts";
import { useToast } from "@/hooks/use-toast";

interface AccessPageProps {
  onAccessGranted: () => void;
}

const AccessPage = ({ onAccessGranted }: AccessPageProps) => {
  const [password, setPassword] = useState("");
  const { toast } = useToast();
  
  // La contraseña correcta
  const correctPassword = "SantyLoveAida";
  
  const handleSubmit = () => {
    if (!password.trim()) {
      toast({
        title: "Ingresa la contraseña ♡",
        description: "¿Cuál es nuestra palabra especial?",
        variant: "destructive"
      });
      return;
    }
    
    if (password === correctPassword) {
      toast({
        title: "¡Acceso concedido! ♡",
        description: "Bienvenida a nuestro lugar especial, mi amor",
      });
      localStorage.setItem('lana-access', 'granted');
      setTimeout(() => onAccessGranted(), 1500);
    } else {
      toast({
        title: "Contraseña incorrecta ♡",
        description: "¿Estás segura que esa es nuestra palabra especial?",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="min-h-screen bg-black text-primary font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      
      {/* Floating hearts */}
      <FloatingHearts count={8} />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-1 h-1 bg-primary rounded-full animate-float opacity-40`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="text-center space-y-8 max-w-md relative z-10 animate-fadeInUp">
        {/* ASCII Art / Logo */}
        <div className="text-xs sm:text-sm leading-tight animate-glow">
          <pre className="whitespace-pre bg-gradient-primary bg-clip-text text-transparent font-bold font-playfair">
{`┌─────────────────────────┐
│      ACCESO PRIVADO     │
│    ♡ Solo para ti ♡     │
│         ~ 2024 ~        │
└─────────────────────────┘`}
          </pre>
        </div>

        {/* Heart icon */}
        <div className="flex justify-center animate-pulse">
          <Heart className="w-12 h-12 text-primary fill-current animate-glow" />
        </div>

        {/* Instructions */}
        <div className="space-y-4 animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <h2 className="text-xl font-playfair bg-gradient-primary bg-clip-text text-transparent">
            ¿Cuál es nuestra palabra especial?
          </h2>
          <p className="text-sm opacity-80 font-dancing text-lg">
            Ingresa la contraseña de nuestro amor ♡
          </p>
        </div>

        {/* Password input */}
        <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-primary/60" />
            <Input
              type="password"
              placeholder="Nuestra palabra secreta ♡"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
              className="pl-10 bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border-primary hover:border-primary/80 focus:border-primary text-primary placeholder:text-primary/60 font-mono"
            />
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 text-primary-foreground font-semibold py-3"
            disabled={!password.trim()}
          >
            <Heart className="mr-2 h-4 w-4 fill-current" />
            Entrar a nuestro mundo ♡
          </Button>
        </div>

        {/* Footer text */}
        <div className="text-xs opacity-60 mt-8 animate-fadeInUp font-crimson" style={{ animationDelay: '0.7s' }}>
          <p className="text-primary animate-shimmer bg-shimmer bg-[length:200%_100%] font-dancing">
            ♡ Un lugar secreto solo para nosotros ♡
          </p>
          <p className="animate-pulse mt-2 font-playfair italic opacity-50">
            Donde vive nuestro amor infinito...
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccessPage;