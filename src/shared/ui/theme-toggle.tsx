import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button type="button" onClick={toggleTheme} aria-label={`Ativar modo ${isDark ? "claro" : "escuro"}`}
      title={`Ativar modo ${isDark ? "claro" : "escuro"}`}
      className="grid size-10 place-items-center rounded-full border border-border bg-card/80 text-foreground shadow-sm transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary">
      {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
    </button>
  );
}
