import { Button } from "./ui/button";
import { useTheme } from "../context/ThemeProvider";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

export function ThemeToggler() {
  const { theme, setTheme } = useTheme();

  /**
   * Toggle Theme
   */
  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else if (theme === "dark") {
      setTheme("light");
    }
  };
  return (
    <Button
      variant="outline"
      size="icon"
      className="rounded-full"
      onClick={toggleTheme}
    >
      <SunIcon
        width="18"
        height="18"
        className="rotate-90 scale-0 transition-transform duration-300 dark:-rotate-0 dark:scale-100"
      />
      <MoonIcon
        width="18"
        height="18"
        className="absolute rotate-0 scale-100 transition-transform duration-300 dark:-rotate-90 dark:scale-0"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
