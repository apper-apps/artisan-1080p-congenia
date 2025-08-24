import { useState, forwardRef } from "react";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const PromptInput = forwardRef(({ className, value, onChange, onSubmit, placeholder = "Describe the image you want to create...", maxLength = 500, ...props }, ref) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      onSubmit?.();
    }
  };

  const characterCount = value ? value.length : 0;
  const isNearLimit = characterCount > maxLength * 0.8;

  return (
    <div className={cn("space-y-3", className)}>
      <div className="relative">
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={4}
          className={cn(
            "w-full resize-none rounded-xl border bg-surface/50 px-4 py-3 text-white placeholder:text-gray-400 focus:outline-none transition-all duration-200",
            isFocused 
              ? "border-transparent ring-2 ring-primary-500 bg-surface/70" 
              : "border-white/10 hover:border-primary-500/30"
          )}
          {...props}
        />
        
        {isFocused && (
          <div className="absolute bottom-3 right-3 flex items-center gap-2 text-xs text-gray-400">
            <ApperIcon name="Command" size={12} />
            <span>Enter to generate</span>
          </div>
        )}
      </div>
      
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2 text-gray-400">
          <ApperIcon name="Lightbulb" size={14} />
          <span>Try: "A majestic dragon flying over a mystical forest"</span>
        </div>
        
        <div className={cn(
          "text-xs transition-colors",
          isNearLimit ? "text-yellow-400" : "text-gray-400"
        )}>
          {characterCount}/{maxLength}
        </div>
      </div>
    </div>
  );
});

PromptInput.displayName = "PromptInput";

export default PromptInput;