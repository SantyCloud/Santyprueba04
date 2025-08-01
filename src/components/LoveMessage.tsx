import { useState, useEffect } from "react";
import { Heart, Sparkles } from "lucide-react";

interface LoveMessageProps {
  messages: string[];
  interval?: number;
  className?: string;
}

const LoveMessage = ({ messages, interval = 4000, className = "" }: LoveMessageProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % messages.length);
        setIsVisible(true);
      }, 300);
    }, interval);

    return () => clearInterval(timer);
  }, [messages.length, interval]);

  return (
    <div className={`text-center space-y-2 ${className}`}>
      <div className="flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
        <Heart className="w-4 h-4 text-primary animate-glow" fill="currentColor" />
        <Sparkles className="w-4 h-4 text-primary animate-pulse" />
      </div>
      
      <div 
        className={`transition-all duration-300 ${
          isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-y-2'
        }`}
      >
        <p className="font-dancing text-lg text-primary animate-shimmer bg-shimmer bg-[length:200%_100%]">
          {messages[currentIndex]}
        </p>
      </div>
    </div>
  );
};

export default LoveMessage;