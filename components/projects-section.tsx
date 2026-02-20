"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import { ProjectCard } from "@/components/project-card";
import { BlurFade } from "@/components/blur-fade";
import { TextEffect } from "@/components/text-effect";
import { PinContainer } from "@/components/ui/3d-pin";

const projects = [
  {
    title: "E-Commerce Platform",
    description: "A modern shopping experience built with Next.js and Stripe",
    image: "/modern-ecommerce-dashboard-dark-theme.jpg",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    link: "#",
    featured: true,
  },
  {
    title: "AI Dashboard",
    description: "Analytics platform with real-time AI insights",
    image: "/ai-analytics-dashboard-dark-theme-cyan.jpg",
    tags: ["React", "Python", "OpenAI"],
    link: "#",
    featured: false,
  },
  {
    title: "Mobile Banking App",
    description: "Secure and intuitive banking experience",
    image: "/mobile-banking-app-dark-theme.jpg",
    tags: ["React Native", "Node.js"],
    link: "#",
    featured: false,
  },
  {
    title: "Design System",
    description: "Comprehensive component library for rapid development",
    image: "/design-system-components-dark-theme.jpg",
    tags: ["Figma", "React", "Storybook"],
    link: "#",
    featured: true,
  },
];

export function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.1 });

  return (
    <section id="projects" ref={ref} className="py-24 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <BlurFade delay={0.1} inView>
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
              Selected Work
            </p>
          </BlurFade>
          <BlurFade delay={0.2} inView>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-balance">
              Projects I've{" "}
              <span className="text-primary">
                <TextEffect per="char" preset="blur-sm" delay={0.3}>
                  crafted
                </TextEffect>
              </span>
            </h2>
          </BlurFade>
        </div>

        {/* Bento grid with perspective */}
        <div className="grid md:grid-cols-2 gap-y-20">
          {projects.map((project, index) => (
            <PinContainer
              key={project.title}
              title="github.com/duythaidev"
              href="https://github.com/duythaidev"
              className="mb-6"
            >
              <BlurFade key={project.title} delay={0.2 + index * 0.1} inView>
                <ProjectCard
                  project={project}
                  index={index}
                  isInView={isInView}
                />
              </BlurFade>
            </PinContainer>
          ))}
        </div>
      </div>
    </section>
  );
}
