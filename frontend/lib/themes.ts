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
      bgPrimary: "#00000a",
      bgSecondary: "#0a0a18",
      textPrimary: "#f0f0ff",
      textSecondary: "#7878a0",
      accent: "#6c63ff",
      accentHover: "#a78bfa",
      navBg: "rgba(0,0,10,0.6)",
      navText: "#f0f0ff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  about: {
    id: "about",
    label: "About",
    colors: {
      bgPrimary: "#0a0608",
      bgSecondary: "#140c10",
      textPrimary: "#f5f0ef",
      textSecondary: "#8a7a78",
      accent: "#e8906a",
      accentHover: "#f0a880",
      navBg: "rgba(10,6,8,0.85)",
      navText: "#f5f0ef",
    },
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
  },
  ai: {
    id: "ai",
    label: "AI & Software",
    colors: {
      bgPrimary: "#00080a",
      bgSecondary: "#001014",
      textPrimary: "#d0ffe8",
      textSecondary: "#4a8060",
      accent: "#00ff88",
      accentHover: "#33ffaa",
      navBg: "rgba(0,8,10,0.85)",
      navText: "#d0ffe8",
    },
    fontHeading: "'JetBrains Mono', monospace",
    fontBody: "'Inter', sans-serif",
  },
  datascience: {
    id: "datascience",
    label: "Data Science",
    colors: {
      bgPrimary: "#080510",
      bgSecondary: "#100a1a",
      textPrimary: "#f0eaff",
      textSecondary: "#7060a0",
      accent: "#ff6b35",
      accentHover: "#ff8c5a",
      navBg: "rgba(8,5,16,0.85)",
      navText: "#f0eaff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'IBM Plex Mono', monospace",
  },
  engineering: {
    id: "engineering",
    label: "Engineering",
    colors: {
      bgPrimary: "#050a10",
      bgSecondary: "#0a1220",
      textPrimary: "#e0f0ff",
      textSecondary: "#4a7090",
      accent: "#4fc3f7",
      accentHover: "#80d8ff",
      navBg: "rgba(5,10,16,0.85)",
      navText: "#e0f0ff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  interior: {
    id: "interior",
    label: "Interior Design",
    colors: {
      bgPrimary: "#0a0806",
      bgSecondary: "#160e0a",
      textPrimary: "#f5f0ea",
      textSecondary: "#806858",
      accent: "#d4a574",
      accentHover: "#e8c090",
      navBg: "rgba(10,8,6,0.85)",
      navText: "#f5f0ea",
    },
    fontHeading: "'Playfair Display', serif",
    fontBody: "'Inter', sans-serif",
  },
  dance: {
    id: "dance",
    label: "Dance",
    colors: {
      bgPrimary: "#0a0014",
      bgSecondary: "#14001e",
      textPrimary: "#f8e8ff",
      textSecondary: "#8050a0",
      accent: "#ff4081",
      accentHover: "#ff6090",
      navBg: "rgba(10,0,20,0.85)",
      navText: "#f8e8ff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  hobbies: {
    id: "hobbies",
    label: "Hobbies",
    colors: {
      bgPrimary: "#05050f",
      bgSecondary: "#0c0c1e",
      textPrimary: "#e8e8ff",
      textSecondary: "#5858a0",
      accent: "#7c6ee8",
      accentHover: "#9c8ef8",
      navBg: "rgba(5,5,15,0.85)",
      navText: "#e8e8ff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  vision: {
    id: "vision",
    label: "Vision",
    colors: {
      bgPrimary: "#030310",
      bgSecondary: "#07071e",
      textPrimary: "#e0e0ff",
      textSecondary: "#6060a0",
      accent: "#9c6fff",
      accentHover: "#b89fff",
      navBg: "rgba(3,3,16,0.85)",
      navText: "#e0e0ff",
    },
    fontHeading: "'Space Grotesk', sans-serif",
    fontBody: "'Inter', sans-serif",
  },
  contact: {
    id: "contact",
    label: "Contact",
    colors: {
      bgPrimary: "#04040e",
      bgSecondary: "#0c0c1c",
      textPrimary: "#eeeeff",
      textSecondary: "#6868a8",
      accent: "#5b8cff",
      accentHover: "#80aaff",
      navBg: "rgba(4,4,14,0.85)",
      navText: "#eeeeff",
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
