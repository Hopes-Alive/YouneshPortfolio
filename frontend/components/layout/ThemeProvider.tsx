"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { ThemeId, getThemeCSSVars } from "@/lib/themes";

interface ThemeContextValue {
  themeId: ThemeId;
  setThemeId: (id: ThemeId) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  themeId: "home",
  setThemeId: () => {},
});

export function useThemeContext() {
  return useContext(ThemeContext);
}

interface ThemeProviderProps {
  children: ReactNode;
  initialTheme?: ThemeId;
}

export function ThemeProvider({ children, initialTheme = "home" }: ThemeProviderProps) {
  const [themeId, setThemeId] = useState<ThemeId>(initialTheme);

  useEffect(() => {
    const vars = getThemeCSSVars(themeId);
    const root = document.documentElement;
    Object.entries(vars).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
    root.setAttribute("data-theme", themeId);
  }, [themeId]);

  return (
    <ThemeContext.Provider value={{ themeId, setThemeId }}>
      {children}
    </ThemeContext.Provider>
  );
}
