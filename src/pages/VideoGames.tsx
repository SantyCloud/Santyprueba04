import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import VoiceNote from "@/components/VoiceNote";

const VideoGames = () => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    
    const audio = new Audio("/path-to-video-games.mp3");
    audio.play();
    setCurrentAudio(audio);
  };

  return (
    <div className="min-h-screen bg-black text-primary font-mono p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-10"></div>
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-primary rounded-full animate-float opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${4 + Math.random() * 2}s`
            }}
          ></div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8 animate-fadeInUp">
          <Link 
            to="/" 
            className="text-primary hover:text-secondary transition-all duration-300 hover:scale-110 hover:animate-glow"
          >
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-xl bg-gradient-primary bg-clip-text text-transparent font-bold animate-shimmer bg-shimmer bg-[length:200%_100%]">♡ Video Games ♡</h1>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Photos */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <div className="border border-primary p-4 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-lg hover:shadow-glow transition-all duration-300">
              <h2 className="text-sm mb-4 text-primary animate-glow">♡ Momentos dulces ♡</h2>
              
              {/* Photo placeholder 1 */}
              <div className="bg-primary/20 border border-primary/50 h-48 mb-4 flex items-center justify-center rounded-md hover:scale-105 transition-transform duration-300 group">
                <span className="text-primary text-sm group-hover:animate-pulse">[ Foto de un momento especial ]</span>
              </div>

              {/* Photo placeholder 2 */}
              <div className="bg-primary/20 border border-primary/50 h-48 flex items-center justify-center rounded-md hover:scale-105 transition-transform duration-300 group">
                <span className="text-primary text-sm group-hover:animate-pulse">[ Su sonrisa que amas ]</span>
              </div>
            </div>

            {/* Voice Notes Section */}
            <div className="border border-primary p-4 bg-gradient-to-br from-secondary/10 to-primary/10 backdrop-blur-sm rounded-lg hover:shadow-vintage transition-all duration-300">
              <h2 className="text-sm mb-4 text-primary animate-glow">♡ Gaming memories ♡</h2>
              <VoiceNote className="mb-3" />
              <p className="text-xs opacity-80 text-primary">Cuéntame sobre nuestros juegos favoritos...</p>
            </div>
          </div>

          {/* Right side - Song info */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="border border-primary p-4 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-lg hover:shadow-glow transition-all duration-300">
              <h2 className="text-sm mb-4 text-primary animate-glow">♡ Nuestros juegos favoritos ♡</h2>
              <div className="text-xs space-y-2">
                <p className="text-primary">"Cuando jugamos juntos me siento como..."</p>
                <div className="bg-primary/20 border border-primary/50 p-3 min-h-24 rounded-md">
                  <span className="text-primary/50">[ Describe sus momentos gaming juntos ]</span>
                </div>
              </div>
            </div>

            <div className="border border-primary p-4 bg-gradient-vintage rounded-lg hover:shadow-vintage transition-all duration-300">
              <h2 className="text-sm mb-4 text-primary animate-glow">♡ Controles ♡</h2>
              <button
                onClick={playAudio}
                className="w-full text-left bg-gradient-primary text-primary-foreground hover:shadow-glow transition-all duration-300 p-3 border border-primary rounded-md hover:scale-105 group"
              >
                <span className="flex items-center">
                  ♡ [PLAY] Video Games - Lana Del Rey
                  <span className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">🎮</span>
                </span>
              </button>
            </div>

            <div className="border border-primary p-4 bg-gradient-to-br from-secondary/10 to-primary/10 backdrop-blur-sm rounded-lg hover:shadow-glow transition-all duration-300">
              <h2 className="text-sm mb-4 text-primary animate-glow">♡ Letra que nos representa ♡</h2>
              <div className="text-xs italic text-primary/80 space-y-1">
                <p className="hover:text-primary transition-colors">"It's you, it's you, it's all for you</p>
                <p className="hover:text-primary transition-colors">Everything I do</p>
                <p className="hover:text-primary transition-colors">I tell you all the time..."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoGames;