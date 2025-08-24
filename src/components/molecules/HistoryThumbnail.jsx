import React, { useState } from "react";
import { format } from "date-fns";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import { downloadImage } from "@/utils/downloadImage";

const HistoryThumbnail = ({ 
  image, 
  onClick, 
  onDelete, 
  isActive = false, 
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

  return (
    <div className={cn(
      "group relative cursor-pointer rounded-lg overflow-hidden border-2 transition-all duration-200",
      isActive ? "border-primary-500" : "border-white/10 hover:border-primary-500/50",
      className
    )}>
      <div className="aspect-square bg-surface/30 relative">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 border border-primary-500 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
        
        {error ? (
          <div className="absolute inset-0 flex items-center justify-center text-gray-400">
            <ApperIcon name="ImageOff" size={24} />
          </div>
        ) : (
          <img
            src={image.imageUrl}
            alt={image.prompt}
            onLoad={handleImageLoad}
            onError={handleImageError}
            onClick={() => onClick?.(image)}
            className={cn(
              "w-full h-full object-cover transition-all duration-300",
              isLoading ? "opacity-0" : "opacity-100 group-hover:scale-105"
            )}
          />
        )}
        
<div className="absolute top-2 right-2 flex gap-1">
          <button
            onClick={async (e) => {
              e.stopPropagation();
              const filename = image.prompt ? 
                `artisan-ai-${image.prompt.substring(0, 30)}` : 
                `artisan-ai-${image.id || Date.now()}`;
              await downloadImage(image.imageUrl, filename, 'jpg', 0.9);
            }}
            className="w-6 h-6 bg-primary-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-primary-500"
          >
            <ApperIcon name="Download" size={12} />
          </button>
          {onDelete && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(image.id);
              }}
              className="w-6 h-6 bg-red-500/80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-red-500"
            >
              <ApperIcon name="X" size={12} />
            </button>
          )}
        </div>
      </div>
      
      <div className="p-2">
        <p className="text-xs text-gray-300 line-clamp-2 mb-1">{image.prompt}</p>
        <p className="text-xs text-gray-500">
          {format(new Date(image.timestamp), "MMM d, HH:mm")}
        </p>
      </div>
    </div>
  );
};

export default HistoryThumbnail;