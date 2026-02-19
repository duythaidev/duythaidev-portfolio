"use client"

import { useRef } from "react"
import { useInView } from "@/hooks/use-in-view"
import { BlurFade } from "@/components/blur-fade"
import { AnimatedNumber } from "@/components/animated-number"
import { BorderBeam } from "@/components/border-beam"

const stats = [
  { value: 50, suffix: "+", label: "Projects Completed" },
  { value: 30, suffix: "+", label: "Happy Clients" },
  { value: 5, suffix: "+", label: "Years Experience" },
  { value: 99, suffix: "%", label: "Client Satisfaction" },
]

export function StatsSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.3 })

  return (
    <section ref={ref} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative glass rounded-3xl p-8 md:p-12 overflow-hidden">
          <BorderBeam size={400} duration={15} colorFrom="var(--primary)" colorTo="oklch(0.85 0.12 180)" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <BlurFade key={stat.label} delay={0.1 + index * 0.1} inView>
                <div className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      springOptions={{ bounce: 0.2, duration: 2000 }}
                    />
                  </div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </BlurFade>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
