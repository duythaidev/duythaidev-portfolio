import { env } from "./env";
import { domain } from "./meta";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${domain}/#person`,
      name: "duythaidev",
      alternateName: ["Nguyen Duy Thai", "duythai"],
      url: domain,
      image:
        "https://avatars.githubusercontent.com/u/199640274?s=400&u=6d8ea65fa19a68b7f9b5eec1824187ba57b321a9&v=4",
      jobTitle: "Frontend Engineer & Software Architecture",
      description:
        "Crafting modern frontend experiences with scalable architectures, high-performance interfaces, and elegant user interactions.",
      sameAs: [env.FACEBOOK_URL, env.GITHUB_URL, env.LINKEDIN_URL],
    },
    {
      "@type": "WebSite",
      "@id": `${domain}/#website`,
      url: domain,
      name: "duythaidev - Portfolio",
      description:
        "This is my personal portfolio website showing my projects and experience with some cool animations and effects.",
      publisher: {
        "@id": `${domain}/#person`,
      },
      inLanguage: "vi-VN",
    },
    {
      "@type": "ProfilePage",
      "@id": domain,
      url: domain,
      name: "duythaidev - Portfolio",
      mainEntity: {
        "@id": `${domain}/#person`,
      },
    },
  ],
};

export { jsonLd };
