import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Button = forwardRef(({ className, variant = "primary", size = "md", children, disabled, ...props }, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gradient-to-r from-primary-600 to-secondary-500 text-white hover:from-primary-500 hover:to-secondary-400 hover:shadow-lg hover:shadow-primary-500/25 focus:ring-primary-500",
    secondary: "bg-surface text-white border border-white/10 hover:bg-surface/80 hover:border-primary-500/30 focus:ring-primary-500",
    ghost: "text-white hover:bg-white/5 focus:ring-primary-500",
    outline: "border border-primary-500 text-primary-400 hover:bg-primary-500 hover:text-white focus:ring-primary-500"
  };
  
  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-10 px-4 text-sm",
    lg: "h-12 px-6 text-base",
    xl: "h-14 px-8 text-lg"
  };
  
  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";

export default Button;