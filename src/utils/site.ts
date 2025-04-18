const site_url =
  process.env.NEXT_PUBLIC_APP_URL || "https://the-portfolio-lac.vercel.app";

export const siteConfig = {
  name: "Sachin Maurya | Full Stack Developer",
  description:
    "Personal portfolio website showcasing my projects and skills as a full stack developer",
  url: site_url,
  ogImage: `${site_url}/_static/og-image.png`,
  links: {
    github: "https://github.com/SachinMaurya01",
  },
  mailSupport: "mauryasachin789@gmail.com",
};
