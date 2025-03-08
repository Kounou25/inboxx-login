
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="rounded-full transition-transform hover:scale-110 active:scale-95"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "light" ? "rotate-0 opacity-100" : "rotate-90 opacity-0"
        } absolute`}
      />
      <Moon
        className={`h-5 w-5 transition-all duration-300 ${
          theme === "dark" ? "rotate-0 opacity-100" : "-rotate-90 opacity-0"
        } absolute`}
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
