import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";
import ApperIcon from "@/components/ApperIcon";

const Header = () => {
  const location = useLocation();

  const navItems = [
    { path: "/", label: "Generator", icon: "Wand2" },
    { path: "/gallery", label: "Gallery", icon: "Images" }
  ];

  return (
    <header className="sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
              <ApperIcon name="Sparkles" size={18} className="text-white" />
            </div>
            <span className="text-xl font-bold text-white">Artisan AI</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 text-sm font-medium",
                  location.pathname === item.path
                    ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                    : "text-gray-400 hover:text-white hover:bg-white/10"
                )}
              >
                <ApperIcon name={item.icon} size={16} />
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;