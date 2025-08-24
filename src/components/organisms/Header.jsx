import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Header = ({ className }) => {
  return (
    <header className={cn(
      "sticky top-0 z-50 border-b border-white/5 glass-morphism",
      className
    )}>
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
            <ApperIcon name="Sparkles" size={18} className="text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Artisan AI</h1>
            <p className="text-xs text-gray-400">Professional Image Generator</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm">
            <ApperIcon name="Settings" size={16} />
          </Button>
          <Button variant="ghost" size="sm">
            <ApperIcon name="HelpCircle" size={16} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;