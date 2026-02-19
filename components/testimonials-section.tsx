"use client"

import { InfiniteMovingCards } from "./infinite-moving-cards"
import { BlurFade } from "./blur-fade"

const testimonials = [
  {
    quote:
      "Working with John was an absolute pleasure. His attention to detail and creative problem-solving skills transformed our vision into reality. The final product exceeded our expectations.",
    name: "Sarah Chen",
    title: "CEO at TechStart Inc.",
  },
  {
    quote:
      "John delivered exceptional work on our platform redesign. His technical expertise combined with a keen eye for design resulted in a product that our users love.",
    name: "Michael Torres",
    title: "Product Manager at DesignCo",
  },
  {
    quote:
      "The best developer I've worked with. John doesn't just write code - he understands the business goals and creates solutions that drive real results.",
    name: "Emily Watson",
    title: "Founder at StartupXYZ",
  },
  {
    quote:
      "Incredible attention to performance and accessibility. John's work on our e-commerce site increased conversions by 40% and improved our Lighthouse scores significantly.",
    name: "David Kim",
    title: "CTO at Commerce Plus",
  },
  {
    quote:
      "John has a rare combination of technical skills and creative vision. He turned our complex requirements into an elegant, user-friendly application.",
    name: "Lisa Anderson",
    title: "Director of Engineering at DataFlow",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div className="container mx-auto px-4 mb-12">
        <BlurFade delay={0.1}>
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            What <span className="text-gradient">Clients Say</span>
          </h2>
          <p className="text-muted-foreground text-center max-w-2xl mx-auto">
            Don't just take my word for it. Here's what clients and collaborators have to say about working with me.
          </p>
        </BlurFade>
      </div>
      <BlurFade delay={0.2}>
        <InfiniteMovingCards items={testimonials} direction="right" speed="slow" />
      </BlurFade>
    </section>
  )
}
