import { useState, useRef } from "react";
import { Mic, MicOff, Play, Pause, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

interface VoiceNoteProps {
  onSave?: (audioBlob: Blob) => void;
  className?: string;
}

const VoiceNote = ({ onSave, className = "" }: VoiceNoteProps) => {
  const [isRecording, setIsRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'audio/wav' });
        const url = URL.createObjectURL(blob);
        setAudioUrl(url);
        onSave?.(blob);
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);
      
      // Start timer
      timerRef.current = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);

    } catch (error) {
      console.error('Error accessing microphone:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    }
  };

  const playAudio = () => {
    if (audioUrl) {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      
      const audio = new Audio(audioUrl);
      audioRef.current = audio;
      
      audio.onended = () => setIsPlaying(false);
      audio.play();
      setIsPlaying(true);
    }
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div className="flex items-center gap-3">
        {!isRecording ? (
          <Button
            onClick={startRecording}
            variant="outline"
            size="sm"
            className="group bg-gradient-primary border-primary text-primary-foreground hover:shadow-glow transition-all duration-300 hover:scale-105"
          >
            <Mic className="w-4 h-4 mr-2 group-hover:animate-pulse" />
            Grabar nota de voz
          </Button>
        ) : (
          <Button
            onClick={stopRecording}
            variant="destructive"
            size="sm"
            className="animate-pulse bg-destructive hover:bg-destructive/90"
          >
            <MicOff className="w-4 h-4 mr-2" />
            Detener ({formatTime(recordingTime)})
          </Button>
        )}

        {audioUrl && !isRecording && (
          <Button
            onClick={isPlaying ? pauseAudio : playAudio}
            variant="outline"
            size="sm"
            className="bg-gradient-vintage border-accent text-accent-foreground hover:shadow-vintage transition-all duration-300"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 mr-2" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            {isPlaying ? 'Pausar' : 'Reproducir'}
          </Button>
        )}
      </div>

      {audioUrl && (
        <div className="flex items-center gap-2 text-xs opacity-80 animate-fadeInUp">
          <Heart className="w-3 h-3 text-primary animate-glow" />
          <span>Tu nota de voz está guardada con amor ♡</span>
        </div>
      )}
    </div>
  );
};

export default VoiceNote;