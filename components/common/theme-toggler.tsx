import { useTheme } from "next-themes";
import { Toggle } from "../ui/toggle";
import { Moon, Sun } from "lucide-react";

export const ThemeToggler: React.FC = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Toggle
      variant="outline"
      className="group size-9 data-[state=on]:bg-transparent data-[state=on]:hover:bg-muted rounded-full"
      pressed={theme === "dark"}
      onPressedChange={() =>
        setTheme((prev) => (prev === "dark" ? "light" : "dark"))
      }
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {/* Note: After dark mode implementation, rely on dark: prefix rather than group-data-[state=on]: */}
      <Moon
        size={14}
        strokeWidth={2}
        className="shrink-0 scale-0 opacity-0 transition-all group-data-[state=on]:scale-100 group-data-[state=on]:opacity-100"
        aria-hidden="true"
      />
      <Sun
        size={14}
        strokeWidth={2}
        className="absolute shrink-0 scale-100 opacity-100 transition-all group-data-[state=on]:scale-0 group-data-[state=on]:opacity-0"
        aria-hidden="true"
      />
    </Toggle>
  );
};
