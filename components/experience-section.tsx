"use client"

import { Timeline } from "./timeline"
import { BlurFade } from "./blur-fade"

const experienceData = [
  {
    title: "2024",
    content: (
      <div>
        <p className="text-foreground text-base md:text-lg font-semibold mb-4">Senior Frontend Engineer at TechCorp</p>
        <p className="text-muted-foreground text-sm md:text-base mb-4">
          Leading the frontend architecture for a next-generation SaaS platform. Implemented micro-frontend
          architecture, reducing deployment time by 60% and improving team velocity.
        </p>
        <div className="grid grid-cols-2 gap-4">
          <div className="glass rounded-lg p-4">
            <p className="text-primary text-2xl font-bold">15+</p>
            <p className="text-muted-foreground text-sm">Team Members Led</p>
          </div>
          <div className="glass rounded-lg p-4">
            <p className="text-primary text-2xl font-bold">60%</p>
            <p className="text-muted-foreground text-sm">Deploy Time Reduced</p>
          </div>
        </div>
      </div>
    ),
  },
  {
    title: "2022",
    content: (
      <div>
        <p className="text-foreground text-base md:text-lg font-semibold mb-4">Full Stack Developer at StartupXYZ</p>
        <p className="text-muted-foreground text-sm md:text-base mb-4">
          Built the entire frontend from scratch using Next.js and TypeScript. Implemented real-time features with
          WebSockets and designed a component library used across multiple products.
        </p>
        <div className="flex flex-wrap gap-2">
          {["Next.js", "TypeScript", "GraphQL", "Prisma", "PostgreSQL"].map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
  {
    title: "2020",
    content: (
      <div>
        <p className="text-foreground text-base md:text-lg font-semibold mb-4">Frontend Developer at AgencyPro</p>
        <p className="text-muted-foreground text-sm md:text-base mb-4">
          Delivered 20+ client projects ranging from e-commerce platforms to corporate websites. Specialized in
          performance optimization and achieving 90+ Lighthouse scores.
        </p>
        <div className="glass rounded-lg p-4">
          <p className="text-primary text-2xl font-bold">20+</p>
          <p className="text-muted-foreground text-sm">Projects Delivered</p>
        </div>
      </div>
    ),
  },
  {
    title: "2018",
    content: (
      <div>
        <p className="text-foreground text-base md:text-lg font-semibold mb-4">Started My Journey</p>
        <p className="text-muted-foreground text-sm md:text-base mb-4">
          Graduated with a Computer Science degree and began my professional journey as a junior developer. Quickly fell
          in love with frontend development and the art of creating beautiful, functional user interfaces.
        </p>
        <div className="flex flex-wrap gap-2">
          {["HTML", "CSS", "JavaScript", "React", "Git"].map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full bg-secondary text-secondary-foreground text-sm">
              {tech}
            </span>
          ))}
        </div>
      </div>
    ),
  },
]

export function ExperienceSection() {
  return (
    <section id="experience" className="py-16 relative">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            A timeline of my professional experience and the milestones that shaped my career.
          </p>
        </BlurFade>
      </div>
      <Timeline data={experienceData} />
    </section>
  )
}
