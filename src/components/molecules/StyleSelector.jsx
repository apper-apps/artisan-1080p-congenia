import { cn } from "@/utils/cn";

const StyleSelector = ({ 
  value = "Photorealistic", 
  onChange, 
  className 
}) => {
  const styles = [
    { 
      value: "Photorealistic", 
      label: "Photorealistic", 
      description: "Realistic photos",
      thumbnail: "🖼️"
    },
    { 
      value: "Digital Art", 
      label: "Digital Art", 
      description: "Modern digital",
      thumbnail: "🎨"
    },
    { 
      value: "Oil Painting", 
      label: "Oil Painting", 
      description: "Classic paint",
      thumbnail: "🖌️"
    },
    { 
      value: "Sketch", 
      label: "Sketch", 
      description: "Hand drawn",
      thumbnail: "✏️"
    },
    { 
      value: "Anime", 
      label: "Anime", 
      description: "Japanese style",
      thumbnail: "🎌"
    },
    { 
      value: "Abstract", 
      label: "Abstract", 
      description: "Artistic forms",
      thumbnail: "🔮"
    }
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-white mb-3">
        Art Style
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        {styles.map((style) => (
          <label
            key={style.value}
            className={cn(
              "relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200",
              value === style.value
                ? "border-primary-500 bg-primary-500/10"
                : "border-white/10 hover:border-primary-500/30 hover:bg-white/5"
            )}
          >
            <input
              type="radio"
              name="style"
              value={style.value}
              checked={value === style.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="sr-only"
            />
            
            <div className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center",
              value === style.value
                ? "border-primary-500"
                : "border-gray-400"
            )}>
              {value === style.value && (
                <div className="w-2 h-2 rounded-full bg-primary-500" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="text-sm font-medium text-white">
                {style.label}
              </div>
              <div className="text-xs text-gray-400">
                {style.description}
              </div>
            </div>
            
            {/* Style thumbnail preview */}
            <div className="flex items-center justify-center w-8 h-8">
              <div className={cn(
                "w-6 h-6 rounded border border-gray-400 flex items-center justify-center text-sm bg-gray-800/50",
                value === style.value && "border-primary-500"
              )}>
                {style.thumbnail}
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector;