"use client";

import { useEffect } from "react";
import { ThemeId } from "@/lib/themes";
import { useThemeContext } from "@/components/layout/ThemeProvider";

export function useTheme(themeId: ThemeId) {
  const { setThemeId } = useThemeContext();

  useEffect(() => {
    setThemeId(themeId);
  }, [themeId, setThemeId]);
}
