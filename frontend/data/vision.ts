export interface VisionPillar {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  items: string[];
}

export const visionPillars: VisionPillar[] = [
  {
    id: "future-goals",
    title: "Future Goals",
    subtitle: "Where I'm Heading",
    description:
      "A clear trajectory toward building AI systems that make a real difference. The next decade is about scaling impact.",
    icon: "rocket",
    items: [
      "Lead AI innovation in real-world applications",
      "Build products used by millions worldwide",
      "Bridge the gap between design thinking and technology",
      "Establish a research-driven development practice",
    ],
  },
  {
    id: "mission",
    title: "Mission & Philosophy",
    subtitle: "Why I Do What I Do",
    description:
      "Every career shift taught me something new. The common thread? Creating things that improve people's lives.",
    icon: "compass",
    items: [
      "Technology should serve humanity, not the other way around",
      "The best solutions come from diverse perspectives",
      "Continuous learning is the only sustainable advantage",
      "Great work happens at the intersection of disciplines",
    ],
  },
  {
    id: "ventures",
    title: "Ventures",
    subtitle: "What I'm Building",
    description:
      "Active projects and startup ideas at various stages — from ideation to execution.",
    icon: "lightbulb",
    items: [
      "AI-powered design automation platform",
      "Educational technology for creative disciplines",
      "Data-driven solutions for construction industry",
      "Open-source tools for the developer community",
    ],
  },
  {
    id: "impact",
    title: "Impact",
    subtitle: "The Mark I Want to Leave",
    description:
      "It's not just about building — it's about what those buildings, algorithms, and designs do for the world.",
    icon: "globe",
    items: [
      "Democratize access to AI-powered tools",
      "Inspire others to embrace multi-disciplinary careers",
      "Contribute meaningfully to open-source ecosystems",
      "Mentor the next generation of creators and engineers",
    ],
  },
];
