import { useState } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Card from "@/components/atoms/Card";

const ImageDisplay = ({ 
  image, 
  onDownload, 
  onFullscreen, 
  className 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const handleImageLoad = () => {
    setIsLoading(false);
    setError(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
    setError(true);
  };

  if (!image) {
    return null;
  }

  return (
    <Card className={cn("p-0 overflow-hidden group", className)}>
      <div className="relative aspect-square bg-surface/30">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <ApperIcon name="ImageOff" size={48} className="mb-4" />
            <p className="text-sm">Failed to load image</p>
          </div>
        ) : (
          <img
            src={image.imageUrl}
            alt={image.prompt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            className={cn(
              "w-full h-full object-cover transition-all duration-300",
              isLoading ? "opacity-0" : "opacity-100"
            )}
          />
        )}
        
        {!isLoading && !error && (
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
            <Button
              variant="secondary"
              size="sm"
              onClick={onFullscreen}
              className="backdrop-blur-sm"
            >
              <ApperIcon name="Maximize2" size={16} />
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onDownload}
              className="backdrop-blur-sm"
            >
              <ApperIcon name="Download" size={16} />
            </Button>
          </div>
        )}
      </div>
      
      <div className="p-4">
        <p className="text-sm text-gray-300 line-clamp-2">{image.prompt}</p>
        <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
          <span>Style: {image.style}</span>
          <span>{image.aspectRatio}</span>
        </div>
      </div>
    </Card>
  );
};

export default ImageDisplay;