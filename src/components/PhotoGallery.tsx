import { useState } from "react";
import { Heart, Camera, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Photo {
  id: number;
  src?: string;
  alt: string;
  description: string;
}

interface PhotoGalleryProps {
  title: string;
  photos: Photo[];
  className?: string;
}

const PhotoGallery = ({ title, photos, className = "" }: PhotoGalleryProps) => {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [hoveredPhoto, setHoveredPhoto] = useState<number | null>(null);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center gap-2 mb-4">
        <Camera className="w-4 h-4 text-primary animate-glow" />
        <h2 className="text-sm font-dancing text-primary animate-shimmer bg-shimmer bg-[length:200%_100%]">{title}</h2>
        <Heart className="w-4 h-4 text-primary animate-pulse" fill="currentColor" />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {photos.map((photo) => (
          <div
            key={photo.id}
            className="relative group cursor-pointer"
            onMouseEnter={() => setHoveredPhoto(photo.id)}
            onMouseLeave={() => setHoveredPhoto(null)}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className="bg-primary/20 border border-primary/50 h-48 flex items-center justify-center rounded-lg overflow-hidden hover:scale-105 transition-all duration-300 hover:shadow-glow">
              {photo.src ? (
                <img 
                  src={photo.src} 
                  alt={photo.alt}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <Plus className="w-8 h-8 text-primary/50" />
                  <span className="text-primary text-sm text-center px-2">{photo.alt}</span>
                </div>
              )}
              
              {/* Hover overlay */}
              <div className={`absolute inset-0 bg-primary/20 flex items-center justify-center transition-opacity duration-300 ${
                hoveredPhoto === photo.id ? 'opacity-100' : 'opacity-0'
              }`}>
                <div className="text-center">
                  <Heart className="w-6 h-6 text-white animate-pulse mx-auto mb-2" fill="currentColor" />
                  <p className="text-white text-xs font-dancing">{photo.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        size="sm"
        variant="outline"
        className="w-full bg-gradient-to-r from-primary/20 to-secondary/20 border-primary text-primary hover:bg-gradient-primary hover:text-primary-foreground transition-all duration-300"
      >
        <Plus className="w-4 h-4 mr-2" />
        Agregar más fotos de nuestros momentos ♡
      </Button>

      {/* Modal for selected photo */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-2xl max-h-[90vh] bg-black/90 rounded-lg p-4 border border-primary">
            <div className="text-center mb-4">
              <h3 className="font-dancing text-lg text-primary">{selectedPhoto.description}</h3>
            </div>
            {selectedPhoto.src ? (
              <img 
                src={selectedPhoto.src}
                alt={selectedPhoto.alt}
                className="w-full h-auto rounded-lg"
              />
            ) : (
              <div className="bg-primary/20 border border-primary/50 h-64 flex items-center justify-center rounded-lg">
                <span className="text-primary text-center">{selectedPhoto.alt}</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PhotoGallery;