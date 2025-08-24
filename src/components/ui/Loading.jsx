import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Loading = ({ 
  message = "Loading...", 
  size = "md", 
  className 
}) => {
  const sizes = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12"
  };

  return (
    <div className={cn("flex flex-col items-center justify-center p-8 text-center", className)}>
      <div className="relative">
        <div className={cn("border-2 border-primary-500/30 border-t-primary-500 rounded-full animate-spin", sizes[size])} />
        <div className="absolute inset-0 flex items-center justify-center">
          <ApperIcon name="Sparkles" size={size === "sm" ? 8 : size === "md" ? 16 : 24} className="text-primary-400" />
        </div>
      </div>
      <p className="text-gray-400 text-sm mt-4">{message}</p>
    </div>
  );
};

export default Loading;