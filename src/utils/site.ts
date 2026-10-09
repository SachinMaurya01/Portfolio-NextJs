const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://the-portfolio-lac.vercel.app";

export const siteConfig = {
  name: "Sachin Maurya | Software Engineer, Backend, Cloud and Applied GenAI",
  description:
    "Software Engineer with 4 years building production backend systems, cloud infrastructure, and applied GenAI/RAG pipelines. Go API Gateway, AWS event-driven systems, FinSight RAG, TaskLattice, ResearchMind.",
  url: site_url,
  ogImage: `${site_url}/_static/og-image.png`,
  links: {
    github: "https://github.com/SachinMaurya01",
    linkedin: "https://www.linkedin.com/in/sachin-maurya-01/",
  },
  mailSupport: "mauryasachin789@gmail.com",
};
