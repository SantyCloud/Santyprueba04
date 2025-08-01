import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Heart } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import FloatingHearts from "@/components/FloatingHearts";
import { useToast } from "@/hooks/use-toast";

interface AccessPageProps {
  onAccessGranted: () => void;
}

const AccessPage = ({ onAccessGranted }: AccessPageProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  // La fecha de aniversario correcta (puedes cambiarla por la real)
  const anniversaryDate = new Date(2024, 1, 14); // 14 de febrero de 2024 (ejemplo)
  
  const handleSubmit = () => {
    if (!selectedDate) {
      toast({
        title: "Selecciona una fecha ♡",
        description: "¿Cuál es nuestra fecha especial?",
        variant: "destructive"
      });
      return;
    }
    
    // Comparar solo día, mes y año
    const selected = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
    const anniversary = new Date(anniversaryDate.getFullYear(), anniversaryDate.getMonth(), anniversaryDate.getDate());
    
    if (selected.getTime() === anniversary.getTime()) {
      toast({
        title: "¡Acceso concedido! ♡",
        description: "Bienvenida a nuestro lugar especial, mi amor",
      });
      localStorage.setItem('lana-access', 'granted');
      setTimeout(() => onAccessGranted(), 1500);
    } else {
      toast({
        title: "Fecha incorrecta ♡",
        description: "¿Estás segura que esa es nuestra fecha especial?",
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
            ¿Cuál es nuestra fecha especial?
          </h2>
          <p className="text-sm opacity-80 font-dancing text-lg">
            Selecciona el día que cambió nuestras vidas para siempre ♡
          </p>
        </div>

        {/* Date picker */}
        <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <Popover open={isOpen} onOpenChange={setIsOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal bg-gradient-to-r from-primary/10 to-secondary/10 backdrop-blur-sm border-primary hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 hover:shadow-glow hover:scale-105",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "dd/MM/yyyy") : <span>Selecciona nuestra fecha ♡</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0 bg-black border-primary" align="center">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(date) => {
                  setSelectedDate(date);
                  setIsOpen(false);
                }}
                className="pointer-events-auto border-primary"
                disabled={(date) => date > new Date()}
              />
            </PopoverContent>
          </Popover>

          <Button
            onClick={handleSubmit}
            className="w-full bg-gradient-primary hover:shadow-glow hover:scale-105 transition-all duration-300 text-primary-foreground font-semibold py-3"
            disabled={!selectedDate}
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