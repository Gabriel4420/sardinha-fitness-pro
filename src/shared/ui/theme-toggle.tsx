import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/app/providers/theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-pressed={isDark}
      aria-label={`Ativar modo ${isDark ? "claro" : "escuro"}`}
      title={`Ativar modo ${isDark ? "claro" : "escuro"}`}
      className="group grid size-10 place-items-center rounded-xl border border-border bg-card/80 text-foreground shadow-sm transition hover:border-primary/50 hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
    >
      {isDark ? (
        <Sun className="size-4 transition-transform group-hover:rotate-12" />
      ) : (
        <Moon className="size-4 transition-transform group-hover:-rotate-12" />
      )}
    </button>
  );
}
