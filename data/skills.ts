export interface Skill {
  name: string;
  category?: string;
}

export const skills: Skill[] = [
  // Product Skills
  { name: "0→1 Development", category: "Product" },
  { name: "Product Strategy", category: "Product" },
  { name: "Roadmapping", category: "Product" },
  { name: "User Research", category: "Product" },
  { name: "Growth Funnels", category: "Product" },
  { name: "A/B Testing", category: "Product" },
  { name: "PRDs", category: "Product" },
  { name: "Stakeholder Management", category: "Product" },

  // Technical Skills
  { name: "AWS (EC2, S3, Lambda)", category: "Technical" },
  { name: "Docker", category: "Technical" },
  { name: "Kubernetes", category: "Technical" },
  { name: "Redis", category: "Technical" },
  { name: "PostgreSQL", category: "Technical" },
  { name: "MongoDB", category: "Technical" },
  { name: "LLM Applications", category: "Technical" },
  { name: "Prompt Engineering", category: "Technical" },
  { name: "Retrieval Systems", category: "Technical" },
  { name: "NLP", category: "Technical" },
  { name: "SQL", category: "Technical" },
  { name: "Python (Pandas, NumPy)", category: "Technical" },
  { name: "Distributed Systems", category: "Technical" },
  { name: "Microservices", category: "Technical" },
  { name: "REST APIs", category: "Technical" },
  { name: "System Design", category: "Technical" },
  { name: "Scalable Architectures", category: "Technical" }
];
