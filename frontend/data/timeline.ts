export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
  category: "dance" | "engineering" | "architecture" | "interior" | "ai" | "datascience";
  icon: string;
}

export const timelineEvents: TimelineEvent[] = [
  {
    year: "2015",
    title: "Dance Teacher",
    description:
      "Started teaching dance — expressing creativity through movement and rhythm, connecting with students through art.",
    category: "dance",
    icon: "music",
  },
  {
    year: "2017",
    title: "Civil Engineering",
    description:
      "Pursued civil engineering — designing structures, understanding materials, and building foundations that last.",
    category: "engineering",
    icon: "building-2",
  },
  {
    year: "2019",
    title: "Architecture",
    description:
      "Expanded into architecture — blending structural engineering with aesthetic vision to create spaces that inspire.",
    category: "architecture",
    icon: "ruler",
  },
  {
    year: "2020",
    title: "Interior Design",
    description:
      "Moved into interior design — transforming spaces into experiences, crafting environments that tell stories.",
    category: "interior",
    icon: "palette",
  },
  {
    year: "2022",
    title: "AI & Software Development",
    description:
      "Transitioned into AI and software development — building intelligent systems and pushing the boundaries of technology.",
    category: "ai",
    icon: "cpu",
  },
  {
    year: "2023",
    title: "Data Science",
    description:
      "Deep dive into data science — extracting insights from data, building models, and driving decisions with analytics.",
    category: "datascience",
    icon: "bar-chart-3",
  },
];
