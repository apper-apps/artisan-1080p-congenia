import { forwardRef } from "react";
import { cn } from "@/utils/cn";

const Badge = forwardRef(({ className, variant = "default", ...props }, ref) => {
  const variants = {
    default: "bg-primary-500/20 text-primary-400 border-primary-500/30",
    secondary: "bg-secondary-500/20 text-secondary-400 border-secondary-500/30",
    accent: "bg-accent-500/20 text-accent-400 border-accent-500/30",
    success: "bg-green-500/20 text-green-400 border-green-500/30"
  };

  return (
    <span
      ref={ref}
      className={cn(
        "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors",
        variants[variant],
        className
      )}
      {...props}
    />
  );
});

Badge.displayName = "Badge";

export default Badge;