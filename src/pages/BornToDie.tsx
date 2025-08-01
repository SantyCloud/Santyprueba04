import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import VoiceNote from "@/components/VoiceNote";
import MusicPlayer from "@/components/MusicPlayer";
import PhotoGallery from "@/components/PhotoGallery";
import FloatingHearts from "@/components/FloatingHearts";
import TypewriterText from "@/components/TypewriterText";

const BornToDie = () => {
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(null);

  const playAudio = () => {
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }
    
    const audio = new Audio("/path-to-born-to-die.mp3");
    audio.play();
    setCurrentAudio(audio);
  };

  const photos = [
    { id: 1, alt: "[ Foto de nosotros juntos ]", description: "Nuestro primer momento especial ♡" },
    { id: 2, alt: "[ Tu foto favorita de ella ]", description: "La sonrisa que me enamora cada día ♡" }
  ];

  return (
    <div className="min-h-screen bg-black text-primary font-mono p-4 relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-10"></div>
      <FloatingHearts count={6} />
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(4)].map((_, i) => (
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
          <h1 className="text-xl font-dancing bg-gradient-primary bg-clip-text text-transparent font-bold animate-shimmer bg-shimmer bg-[length:200%_100%]">♡ Born to Die ♡</h1>
        </div>

        {/* Romantic quote */}
        <div className="mb-8 text-center animate-fadeInUp" style={{ animationDelay: '0.3s' }}>
          <TypewriterText 
            text="&quot;Come and take a walk on the wild side, let me kiss you hard in the pouring rain&quot;" 
            speed={60}
            className="text-primary/80 font-crimson italic text-sm"
          />
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Left side - Photos */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
            <PhotoGallery 
              title="♡ Nuestras fotos especiales ♡"
              photos={photos}
            />

            {/* Voice Notes Section */}
            <div className="border border-primary p-4 bg-gradient-to-br from-secondary/10 to-primary/10 backdrop-blur-sm rounded-lg hover:shadow-vintage transition-all duration-300">
              <h2 className="text-sm mb-4 text-primary animate-glow font-dancing">♡ Tus notas de voz para mí ♡</h2>
              <VoiceNote className="mb-3" />
              <p className="text-xs opacity-80 text-primary font-crimson">Graba un mensaje especial sobre esta canción...</p>
            </div>
          </div>

          {/* Right side - Song info */}
          <div className="space-y-6 animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
            <div className="border border-primary p-4 bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-sm rounded-lg hover:shadow-glow transition-all duration-300">
              <h2 className="text-sm mb-4 text-primary animate-glow font-dancing">♡ Dedicatoria especial ♡</h2>
              <div className="text-xs space-y-2">
                <p className="text-primary font-crimson">"Esta canción me recuerda a ti porque..."</p>
                <div className="bg-primary/20 border border-primary/50 p-3 min-h-24 rounded-md">
                  <span className="text-primary/50 font-crimson italic">[ Escribe aquí por qué esta canción es especial para ustedes ]</span>
                </div>
              </div>
            </div>

            {/* Music Player */}
            <MusicPlayer 
              songTitle="♡ Born to Die ♡"
              songPath="/path-to-born-to-die.mp3"
            />

            <div className="border border-primary p-4 bg-gradient-to-br from-secondary/10 to-primary/10 backdrop-blur-sm rounded-lg hover:shadow-glow transition-all duration-300">
              <h2 className="text-sm mb-4 text-primary animate-glow font-dancing">♡ Letra favorita ♡</h2>
              <div className="text-xs italic text-primary/80 space-y-1 font-crimson">
                <p className="hover:text-primary transition-colors">"Come and take a walk on the wild side</p>
                <p className="hover:text-primary transition-colors">Let me kiss you hard in the pouring rain</p>
                <p className="hover:text-primary transition-colors">You like your girls insane..."</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BornToDie;