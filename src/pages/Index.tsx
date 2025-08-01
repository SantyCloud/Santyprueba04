import { useState } from "react";
import { Link } from "react-router-dom";
import FloatingHearts from "@/components/FloatingHearts";
import TypewriterText from "@/components/TypewriterText";
import LoveMessage from "@/components/LoveMessage";

const Index = () => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const loveMessages = [
    "Eres la melodía más hermosa de mi corazón ♡",
    "Cada día contigo es como una canción de Lana ♡",
    "Tu amor es mi droga favorita ♡",
    "Naciste para ser amada por mí ♡",
    "Eres mi verano eterno ♡",
    "Tu sonrisa es mi lugar favorito ♡"
  ];

  const playAudio = (audioSrc: string) => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    
    const audio = new Audio(audioSrc);
    audio.play();
    setCurrentAudio(audio);
  };

  return (
    <div className="min-h-screen bg-black text-primary font-mono flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-glow opacity-20"></div>
      
      {/* Floating hearts */}
      <FloatingHearts count={12} />
      
      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 bg-primary rounded-full animate-float opacity-60`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>
      
      <div className="text-center space-y-8 max-w-md relative z-10 animate-fadeInUp">
        {/* ASCII Art / Logo */}
        <div className="text-xs sm:text-sm leading-tight animate-glow">
          <pre className="whitespace-pre bg-gradient-primary bg-clip-text text-transparent font-bold font-playfair">
{`┌─────────────────────────┐
│    LANA DEL REY ♡       │
│    Para mi amor ♡       │
│         ~ 2024 ~        │
└─────────────────────────┘`}
          </pre>
        </div>

        {/* Love Messages */}
        <div className="animate-fadeInUp" style={{ animationDelay: '0.5s' }}>
          <LoveMessage 
            messages={loveMessages}
            interval={3500}
            className="mb-6"
          />
        </div>

        {/* Navigation buttons */}
        <div className="space-y-4">
          <Link
            to="/born-to-die"
            className="block w-full text-left bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary text-primary hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 p-3 rounded-md hover:shadow-glow hover:scale-105 group"
          >
            <span className="flex items-center">
              ♡ [ENTER] Born to Die
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">✨</span>
            </span>
          </Link>
          
          <Link
            to="/video-games"
            className="block w-full text-left bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary text-primary hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 p-3 rounded-md hover:shadow-glow hover:scale-105 group"
          >
            <span className="flex items-center">
              ♡ [ENTER] Video Games
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">🎮</span>
            </span>
          </Link>
          
          <Link
            to="/summertime-sadness"
            className="block w-full text-left bg-gradient-to-r from-primary/20 to-secondary/20 backdrop-blur-sm border border-primary text-primary hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300 p-3 rounded-md hover:shadow-glow hover:scale-105 group"
          >
            <span className="flex items-center">
              ♡ [ENTER] Summertime Sadness
              <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">☀️</span>
            </span>
          </Link>
        </div>

        {/* Footer text */}
        <div className="text-xs opacity-70 mt-8 animate-fadeInUp font-crimson" style={{ animationDelay: '0.3s' }}>
          <p className="text-primary animate-shimmer bg-shimmer bg-[length:200%_100%] font-dancing text-lg">♡ Hecho con amor infinito para ti ♡</p>
          <p className="animate-pulse mt-2 font-playfair italic">Eres mi Lana Del Rey favorita...</p>
          <p className="mt-2 text-xs opacity-50">Un lugar especial donde vive nuestro amor</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
