"use client";

import { useRef } from "react";
import { useInView } from "@/hooks/use-in-view";
import {
  Github,
  Linkedin,
  Code2,
  Palette,
  Rocket,
  Sparkles,
  Facebook,
} from "lucide-react";
import { FeatureCarousel, type ServiceStep } from "./ui/feature-carousel";

const serviceSteps: ServiceStep[] = [
  {
    id: "1",
    name: "Dev",
    icon: Code2,
    title: "Web Development",
    description:
      "Building performant, scalable web applications using modern frameworks like Next.js, React, and TypeScript.",
    bullets: [
      "Server components & streaming with Next.js App Router",
      "Type-safe APIs with tRPC or GraphQL",
      "CI/CD pipelines and automated testing",
    ],
    accentColor: "#38bdf8", // sky-400
  },
  {
    id: "2",
    name: "Design",
    icon: Palette,
    title: "UI/UX Design",
    description:
      "Creating intuitive, beautiful interfaces that delight users while achieving business goals.",
    bullets: [
      "Component systems in Figma or Storybook",
      "Accessibility-first with WCAG 2.1 AA compliance",
      "Motion design and micro-interactions",
    ],
    accentColor: "#f472b6", // pink-400
  },
  {
    id: "3",
    name: "Perf",
    icon: Rocket,
    title: "Performance Optimization",
    description:
      "Improving Core Web Vitals, reducing load times, and ensuring smooth user experiences across all devices.",
    bullets: [
      "LCP, CLS, and INP tuning",
      "Bundle analysis and code splitting",
      "Edge caching and CDN strategies",
    ],
    accentColor: "#fb923c", // orange-400
  },
  {
    id: "4",
    name: "Consult",
    icon: Sparkles,
    title: "Technical Consulting",
    description:
      "Providing expert guidance on architecture decisions, tech stack selection, and best practices.",
    bullets: [
      "Monorepo and micro-frontend architecture",
      "Team code-review processes and tooling",
      "Greenfield scoping and technical roadmaps",
    ],
    accentColor: "#a3e635", // lime-400
  },
];

export function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { threshold: 0.2 });

  return (
    <section id="about" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left column - Info */}
          <div
            className={`transition-all duration-700 ${
              isInView
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-8"
            }`}
          >
            <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
              About
            </p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
              I build <span className="text-gradient">accessible</span>,
              pixel-perfect digital experiences
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                I'm a developer passionate about crafting accessible,
                pixel-perfect user interfaces that blend thoughtful design with
                robust engineering.
              </p>
              <p>
                My favorite work lies at the intersection of design and
                development, creating experiences that not only look great but
                are meticulously built for performance and usability.
              </p>
            </div>

            {/* Social links */}
            <div className="flex items-center gap-4 mt-8">
              <a
                href="#"
                target="_blank"
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="#"
                target="_blank"
                className="p-2 rounded-full border border-border hover:border-primary hover:text-primary transition-all"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Right column - Services Carousel */}
          <div>
            <FeatureCarousel
              title="What I Offer"
              description="Click to explore each service"
              serviceSteps={serviceSteps}
              bgClass="bg-gradient-to-tr from-neutral-900/90 to-neutral-800/90"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
