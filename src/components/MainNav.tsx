import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

export function MainNav() {
  const location = useLocation();
  
  return (
    <nav className="flex items-center space-x-4 lg:space-x-6">
      <Link
        to="/"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          location.pathname === "/" 
            ? "text-white"
            : "text-white/60"
        )}
      >
        Scan
      </Link>
      <Link
        to="/dashboard"
        className={cn(
          "text-sm font-medium transition-colors hover:text-primary",
          location.pathname === "/dashboard"
            ? "text-white"
            : "text-white/60"
        )}
      >
        Results
      </Link>
    </nav>
  );
}