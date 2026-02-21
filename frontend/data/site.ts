import { ThemeId } from "@/lib/themes";

export interface NavItem {
  label: string;
  href: string;
  themeId: ThemeId;
  icon?: string;
}

export interface NavGroup {
  label: string;
  items: NavItem[];
}

export const siteConfig = {
  name: "Younesh",
  title: "Younesh | Multi-Disciplinary Creator",
  description:
    "Portfolio of Younesh — AI Developer, Data Scientist, Civil Engineer, Architect, Interior Designer, and Dance Teacher.",
  url: "https://younesh.dev",
  socials: {
    github: "https://github.com/younesh",
    linkedin: "https://linkedin.com/in/younesh",
    email: "hello@younesh.dev",
  },
};

export const primaryNavItems: NavItem[] = [
  { label: "Home", href: "/", themeId: "home" },
  { label: "About", href: "/about", themeId: "about" },
];

export const workNavGroup: NavGroup = {
  label: "Work",
  items: [
    { label: "AI & Software", href: "/ai-development", themeId: "ai", icon: "cpu" },
    { label: "Data Science", href: "/data-science", themeId: "datascience", icon: "bar-chart" },
    { label: "Engineering", href: "/engineering", themeId: "engineering", icon: "building" },
    { label: "Interior Design", href: "/interior-design", themeId: "interior", icon: "palette" },
    { label: "Dance", href: "/dance", themeId: "dance", icon: "music" },
  ],
};

export const secondaryNavItems: NavItem[] = [
  { label: "Hobbies", href: "/hobbies", themeId: "hobbies" },
  { label: "Vision", href: "/vision", themeId: "vision" },
  { label: "Contact", href: "/contact", themeId: "contact" },
];

export const navItems: NavItem[] = [
  ...primaryNavItems,
  ...workNavGroup.items,
  ...secondaryNavItems,
];
