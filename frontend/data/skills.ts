export interface Skill {
  name: string;
  level: number; // 0-100
  category: string;
}

export interface SkillGroup {
  title: string;
  themeId: string;
  skills: Skill[];
}

export const skillGroups: SkillGroup[] = [
  {
    title: "AI & Software Development",
    themeId: "ai",
    skills: [
      { name: "Python", level: 95, category: "language" },
      { name: "TypeScript", level: 90, category: "language" },
      { name: "React / Next.js", level: 88, category: "framework" },
      { name: "LangChain / LLMs", level: 85, category: "ai" },
      { name: "FastAPI", level: 85, category: "framework" },
      { name: "Docker & DevOps", level: 80, category: "tools" },
      { name: "PostgreSQL / MongoDB", level: 82, category: "database" },
      { name: "Git & CI/CD", level: 88, category: "tools" },
    ],
  },
  {
    title: "Data Science",
    themeId: "datascience",
    skills: [
      { name: "Pandas / NumPy", level: 92, category: "library" },
      { name: "Scikit-learn", level: 88, category: "ml" },
      { name: "TensorFlow / PyTorch", level: 82, category: "ml" },
      { name: "Data Visualization", level: 90, category: "analysis" },
      { name: "SQL & Databases", level: 85, category: "database" },
      { name: "Statistical Analysis", level: 85, category: "analysis" },
      { name: "NLP", level: 80, category: "ml" },
      { name: "MLOps", level: 75, category: "tools" },
    ],
  },
  {
    title: "Civil Engineering & Architecture",
    themeId: "engineering",
    skills: [
      { name: "AutoCAD", level: 90, category: "software" },
      { name: "Revit", level: 85, category: "software" },
      { name: "Structural Analysis", level: 88, category: "engineering" },
      { name: "3ds Max", level: 80, category: "software" },
      { name: "Project Management", level: 85, category: "management" },
      { name: "Sustainable Design", level: 78, category: "design" },
    ],
  },
  {
    title: "Interior Design",
    themeId: "interior",
    skills: [
      { name: "Space Planning", level: 92, category: "design" },
      { name: "SketchUp", level: 88, category: "software" },
      { name: "V-Ray Rendering", level: 82, category: "software" },
      { name: "Color Theory", level: 90, category: "design" },
      { name: "Material Selection", level: 88, category: "design" },
      { name: "Client Relations", level: 85, category: "management" },
    ],
  },
  {
    title: "Dance",
    themeId: "dance",
    skills: [
      { name: "Choreography", level: 92, category: "performance" },
      { name: "Teaching", level: 95, category: "education" },
      { name: "Performance", level: 88, category: "performance" },
      { name: "Music Interpretation", level: 90, category: "artistry" },
      { name: "Student Mentoring", level: 92, category: "education" },
    ],
  },
];
