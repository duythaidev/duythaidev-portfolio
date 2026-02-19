"use client"

import { BlurFade } from "./blur-fade"
import { ShineBorder } from "./shine-border"
import { Code2, Palette, Rocket, Sparkles } from "lucide-react"

const services = [
  {
    icon: Code2,
    title: "Web Development",
    description:
      "Building performant, scalable web applications using modern frameworks like Next.js, React, and TypeScript.",
  },
  {
    icon: Palette,
    title: "UI/UX Design",
    description: "Creating intuitive, beautiful interfaces that delight users while achieving business goals.",
  },
  {
    icon: Rocket,
    title: "Performance Optimization",
    description:
      "Improving Core Web Vitals, reducing load times, and ensuring smooth user experiences across all devices.",
  },
  {
    icon: Sparkles,
    title: "Technical Consulting",
    description: "Providing expert guidance on architecture decisions, tech stack selection, and best practices.",
  },
]

export function ServicesSection() {
  return (
    <section id="services" className="py-24 relative">
      <div className="container mx-auto px-4">
        <BlurFade delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What I <span className="text-gradient">Offer</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Comprehensive solutions tailored to your needs. From concept to deployment, I've got you covered.
          </p>
        </BlurFade>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {services.map((service, index) => (
            <BlurFade key={service.title} delay={0.1 + index * 0.1}>
              <ShineBorder shineColor={["#22d3ee", "#0ea5e9", "#06b6d4"]} className="w-full">
                <div className="p-6 glass rounded-xl w-full">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <service.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </div>
              </ShineBorder>
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  )
}
