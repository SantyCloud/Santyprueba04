import { useEffect, useState } from "react";
import { Heart, X } from "lucide-react";

interface ToastProps {
  message: string;
  type?: "love" | "success" | "info";
  duration?: number;
  onClose?: () => void;
}

const Toast = ({ message, type = "love", duration = 3000, onClose }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => {
        onClose?.();
      }, 300);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  return (
    <div className={`fixed top-4 right-4 z-50 transition-all duration-300 ${
      isVisible ? 'opacity-100 transform-none' : 'opacity-0 transform translate-x-full'
    }`}>
      <div className="bg-gradient-to-r from-primary/90 to-secondary/90 backdrop-blur-sm text-primary-foreground rounded-lg p-4 shadow-glow max-w-sm">
        <div className="flex items-start gap-3">
          <Heart className="w-5 h-5 text-white animate-glow flex-shrink-0 mt-0.5" fill="currentColor" />
          <div className="flex-1">
            <p className="font-dancing text-sm">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/70 hover:text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Toast;