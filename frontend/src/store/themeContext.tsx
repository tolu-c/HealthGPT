import { ReactNode, createContext, useState } from "react";

type TTheme = "light" | "dark";

export const ThemeContext = createContext({
  theme: "light",
  toggleTheme: () => {},
});

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentTheme, setCurrentTheme] = useState<TTheme>("light");

  const handleThemeToggle = () => {
    if (currentTheme === "dark") {
      setCurrentTheme("light");
    } else if (currentTheme === "light") {
      setCurrentTheme("dark");
    }
  };

  const themContextValue = {
    theme: currentTheme,
    toggleTheme: handleThemeToggle,
  };

  return (
    <ThemeContext.Provider value={themContextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
