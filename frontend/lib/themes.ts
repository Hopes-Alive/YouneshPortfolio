export type ThemeId =
  | "home"
  | "about"
  | "ai"
  | "datascience"
  | "engineering"
  | "interior"
  | "dance"
  | "hobbies"
  | "vision"
  | "contact";

export interface ThemeConfig {
  id: ThemeId;
  label: string;
  colors: {
    bgPrimary: string;
    bgSecondary: string;
    textPrimary: string;
    textSecondary: string;
    accent: string;
    accentHover: string;
    navBg: string;
    navText: string;
  };
  fontHeading: string;
  fontBody: string;
}

export const themes: Record<ThemeId, ThemeConfig> = {
  home: {
    id: "home",
    label: "Home",
    colors: {
      bgPrimary: "#f8f7ff",
      bgSecondary: "#efeeff",
      textPrimary: "#1a1a2e",
      textSecondary: "#6b6b8d",
      accent: "#6c63ff",
      accentHover: "#5a52d5",
      navBg: "rgba(248,247,255,0.85)",
      navText: "#1a1a2e",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  about: {
    id: "about",
    label: "About",
    colors: {
      bgPrimary: "#faf6f1",
      bgSecondary: "#f0e8dc",
      textPrimary: "#2d2418",
      textSecondary: "#6b5d4d",
      accent: "#c8956c",
      accentHover: "#b07d55",
      navBg: "rgba(250,246,241,0.92)",
      navText: "#2d2418",
    },
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
  },
  ai: {
    id: "ai",
    label: "AI & Software",
    colors: {
      bgPrimary: "#0a0a0f",
      bgSecondary: "#12121a",
      textPrimary: "#e0e0e0",
      textSecondary: "#8888a0",
      accent: "#00ff88",
      accentHover: "#00cc6a",
      navBg: "rgba(10,10,15,0.9)",
      navText: "#e0e0e0",
    },
    fontHeading: "'JetBrains Mono', monospace",
    fontBody: "'Inter', sans-serif",
  },
  datascience: {
    id: "datascience",
    label: "Data Science",
    colors: {
      bgPrimary: "#0a1628",
      bgSecondary: "#0f1f38",
      textPrimary: "#e0e8f0",
      textSecondary: "#7a8da0",
      accent: "#ff6b35",
      accentHover: "#e05520",
      navBg: "rgba(10,22,40,0.9)",
      navText: "#e0e8f0",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'IBM Plex Mono', monospace",
  },
  engineering: {
    id: "engineering",
    label: "Engineering",
    colors: {
      bgPrimary: "#0d1b2a",
      bgSecondary: "#1b2838",
      textPrimary: "#e0f0ff",
      textSecondary: "#6a8fa8",
      accent: "#4fc3f7",
      accentHover: "#29b6f6",
      navBg: "rgba(13,27,42,0.9)",
      navText: "#e0f0ff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  interior: {
    id: "interior",
    label: "Interior Design",
    colors: {
      bgPrimary: "#faf5f0",
      bgSecondary: "#f2ebe3",
      textPrimary: "#2d2420",
      textSecondary: "#7a6b5d",
      accent: "#c8956c",
      accentHover: "#a87850",
      navBg: "rgba(250,245,240,0.92)",
      navText: "#2d2420",
    },
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
  },
  dance: {
    id: "dance",
    label: "Dance",
    colors: {
      bgPrimary: "#1a0a2e",
      bgSecondary: "#240e3e",
      textPrimary: "#f0e0ff",
      textSecondary: "#a080c0",
      accent: "#ff4081",
      accentHover: "#f50057",
      navBg: "rgba(26,10,46,0.9)",
      navText: "#f0e0ff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  hobbies: {
    id: "hobbies",
    label: "Hobbies",
    colors: {
      bgPrimary: "#f0f4ff",
      bgSecondary: "#e4eaff",
      textPrimary: "#1a1a2e",
      textSecondary: "#5a5a7a",
      accent: "#6c5ce7",
      accentHover: "#5a4bd1",
      navBg: "rgba(240,244,255,0.92)",
      navText: "#1a1a2e",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  vision: {
    id: "vision",
    label: "Vision",
    colors: {
      bgPrimary: "#060618",
      bgSecondary: "#0c0c28",
      textPrimary: "#e0e0ff",
      textSecondary: "#8080b0",
      accent: "#7c4dff",
      accentHover: "#651fff",
      navBg: "rgba(6,6,24,0.9)",
      navText: "#e0e0ff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  contact: {
    id: "contact",
    label: "Contact",
    colors: {
      bgPrimary: "#fafafa",
      bgSecondary: "#f0f0f0",
      textPrimary: "#1a1a1a",
      textSecondary: "#666666",
      accent: "#2563eb",
      accentHover: "#1d4ed8",
      navBg: "rgba(250,250,250,0.92)",
      navText: "#1a1a1a",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
};

export function getThemeCSSVars(themeId: ThemeId): Record<string, string> {
  const t = themes[themeId];
  return {
    "--bg-primary": t.colors.bgPrimary,
    "--bg-secondary": t.colors.bgSecondary,
    "--text-primary": t.colors.textPrimary,
    "--text-secondary": t.colors.textSecondary,
    "--accent": t.colors.accent,
    "--accent-hover": t.colors.accentHover,
    "--nav-bg": t.colors.navBg,
    "--nav-text": t.colors.navText,
    "--font-heading": t.fontHeading,
    "--font-body": t.fontBody,
  };
}
