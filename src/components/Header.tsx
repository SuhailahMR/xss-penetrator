import { MainNav } from "@/components/MainNav";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { toggleTheme, initializeTheme } from "@/utils/theme";
import { Button } from "./ui/button";

export function Header() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    initializeTheme();
    setIsDark(document.documentElement.classList.contains('dark'));
  }, []);

  const handleToggleTheme = () => {
    toggleTheme();
    setIsDark(!isDark);
  };

  return (
    <div className="border-b bg-[#800020] dark:bg-[#4d0013]">
      <div className="flex h-16 items-center px-4">
        <div className="flex items-center space-x-6">
          <h2 className="text-lg font-bold text-white">Threat Finder</h2>
          <MainNav />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleToggleTheme}
            className="text-white hover:text-white/80"
          >
            {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
        </div>
      </div>
    </div>
  );
}