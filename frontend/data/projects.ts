export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  tags: string[];
  category: "ai" | "datascience" | "engineering" | "interior" | "dance";
  image?: string;
  link?: string;
  github?: string;
}

export const projects: Project[] = [
  {
    id: "ai-chatbot",
    title: "AI-Powered Chatbot",
    description: "An intelligent conversational AI built with LLMs and RAG architecture.",
    tags: ["Python", "LangChain", "FastAPI", "React"],
    category: "ai",
    link: "#",
    github: "#",
  },
  {
    id: "ml-pipeline",
    title: "ML Pipeline Framework",
    description: "End-to-end machine learning pipeline with automated feature engineering.",
    tags: ["Python", "Scikit-learn", "Docker", "MLflow"],
    category: "ai",
    github: "#",
  },
  {
    id: "web-platform",
    title: "Full-Stack Web Platform",
    description: "Modern web application with real-time features and microservices architecture.",
    tags: ["Next.js", "TypeScript", "PostgreSQL", "Redis"],
    category: "ai",
    link: "#",
    github: "#",
  },
  {
    id: "data-dashboard",
    title: "Analytics Dashboard",
    description: "Interactive data visualization dashboard for business intelligence.",
    tags: ["Python", "Plotly", "Pandas", "Streamlit"],
    category: "datascience",
    link: "#",
  },
  {
    id: "predictive-model",
    title: "Predictive Analytics Model",
    description: "Time-series forecasting model for market trend prediction.",
    tags: ["Python", "TensorFlow", "Prophet", "SQL"],
    category: "datascience",
    github: "#",
  },
  {
    id: "nlp-analysis",
    title: "NLP Sentiment Analyzer",
    description: "Natural language processing tool for social media sentiment analysis.",
    tags: ["Python", "BERT", "Hugging Face", "FastAPI"],
    category: "datascience",
    link: "#",
    github: "#",
  },
  {
    id: "bridge-design",
    title: "Pedestrian Bridge Design",
    description: "Structural analysis and design for a modern pedestrian bridge.",
    tags: ["AutoCAD", "SAP2000", "Structural Analysis"],
    category: "engineering",
  },
  {
    id: "residential-complex",
    title: "Residential Complex",
    description: "Complete architectural design for a multi-unit residential building.",
    tags: ["Revit", "3ds Max", "Sustainable Design"],
    category: "engineering",
  },
  {
    id: "modern-apartment",
    title: "Modern Apartment Redesign",
    description: "Full interior transformation of a luxury apartment with minimalist aesthetic.",
    tags: ["SketchUp", "V-Ray", "Space Planning"],
    category: "interior",
  },
  {
    id: "office-space",
    title: "Corporate Office Space",
    description: "Open-plan office design focused on productivity and employee wellbeing.",
    tags: ["AutoCAD", "3ds Max", "Ergonomic Design"],
    category: "interior",
  },
  {
    id: "dance-academy",
    title: "Dance Academy Curriculum",
    description: "Comprehensive dance curriculum spanning multiple styles and skill levels.",
    tags: ["Choreography", "Teaching", "Performance"],
    category: "dance",
  },
];
