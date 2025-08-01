import { useEffect, useState } from "react";
import { Heart } from "lucide-react";

interface FloatingHeartsProps {
  count?: number;
  className?: string;
}

const FloatingHearts = ({ count = 8, className = "" }: FloatingHeartsProps) => {
  const [hearts, setHearts] = useState<Array<{ id: number; x: number; y: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    const newHearts = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 3 + Math.random() * 4,
    }));
    setHearts(newHearts);
  }, [count]);

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute animate-float opacity-60"
          style={{
            left: `${heart.x}%`,
            top: `${heart.y}%`,
            animationDelay: `${heart.delay}s`,
            animationDuration: `${heart.duration}s`,
          }}
        >
          <Heart 
            className="w-3 h-3 text-primary animate-glow" 
            fill="currentColor"
          />
        </div>
      ))}
    </div>
  );
};

export default FloatingHearts;