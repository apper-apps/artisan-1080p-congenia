import { cn } from "@/utils/cn";

const DimensionSelector = ({ 
  value = "1:1", 
  onChange, 
  className 
}) => {
  const dimensions = [
    { value: "1:1", label: "Square", description: "1:1" },
    { value: "3:4", label: "Portrait", description: "3:4" },
    { value: "4:3", label: "Landscape", description: "4:3" },
    { value: "16:9", label: "Wide", description: "16:9" }
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <label className="block text-sm font-medium text-white mb-3">
        Image Dimensions
      </label>
      
      <div className="grid grid-cols-2 gap-3">
        {dimensions.map((dimension) => (
          <label
            key={dimension.value}
            className={cn(
              "relative flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-all duration-200",
              value === dimension.value
                ? "border-primary-500 bg-primary-500/10"
                : "border-white/10 hover:border-primary-500/30 hover:bg-white/5"
            )}
          >
            <input
              type="radio"
              name="dimension"
              value={dimension.value}
              checked={value === dimension.value}
              onChange={(e) => onChange?.(e.target.value)}
              className="sr-only"
            />
            
            <div className={cn(
              "w-4 h-4 rounded-full border-2 flex items-center justify-center",
              value === dimension.value
                ? "border-primary-500"
                : "border-gray-400"
            )}>
              {value === dimension.value && (
                <div className="w-2 h-2 rounded-full bg-primary-500" />
              )}
            </div>
            
            <div className="flex-1">
              <div className="text-sm font-medium text-white">
                {dimension.label}
              </div>
              <div className="text-xs text-gray-400">
                {dimension.description}
              </div>
            </div>
            
            {/* Visual ratio indicator */}
            <div className="flex items-center justify-center w-8 h-8">
              <div 
                className={cn(
                  "border border-gray-400 rounded-sm",
                  dimension.value === "1:1" && "w-4 h-4",
                  dimension.value === "3:4" && "w-3 h-4",
                  dimension.value === "4:3" && "w-4 h-3",
                  dimension.value === "16:9" && "w-5 h-2.5"
                )}
              />
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};

export default DimensionSelector;