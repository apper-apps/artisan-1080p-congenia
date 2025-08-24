import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const GenerateButton = ({ 
  onClick, 
  disabled, 
  loading, 
  className, 
  children = "Generate Image" 
}) => {
  return (
    <Button
      onClick={onClick}
      disabled={disabled}
      size="xl"
      className={cn(
        "relative overflow-hidden group",
        loading && "animate-pulse-glow",
        className
      )}
    >
      <div className="flex items-center gap-3">
        {loading ? (
          <ApperIcon name="Loader2" size={20} className="animate-spin" />
        ) : (
          <ApperIcon name="Sparkles" size={20} />
        )}
        <span className="font-semibold">
          {loading ? "Generating..." : children}
        </span>
      </div>
      
      {!loading && (
        <div className="absolute inset-0 bg-gradient-to-r from-primary-400/0 via-white/20 to-primary-400/0 transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
      )}
    </Button>
  );
};

export default GenerateButton;