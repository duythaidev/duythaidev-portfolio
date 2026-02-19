"use client"

import type React from "react"
import { useRef, useState } from "react"
import { useInView } from "@/hooks/use-in-view"
import { Send, Mail, MapPin, Clock } from "lucide-react"
import { BlurFade } from "@/components/blur-fade"
import { TextEffect } from "@/components/text-effect"
import { BorderBeam } from "@/components/border-beam"
import { motion } from "motion/react"

export function ContactSection() {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { threshold: 0.2 })
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSubmitting(false)
    console.log(formState)
  }

  return (
    <section id="contact" ref={ref} className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left column */}
          <div>
            <BlurFade delay={0.1} inView direction="left">
              <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">Contact</p>
            </BlurFade>
            <BlurFade delay={0.2} inView direction="left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
                Let's work{" "}
                <span className="text-gradient">
                  <TextEffect per="char" preset="blur-sm" delay={0.3}>
                    together
                  </TextEffect>
                </span>
              </h2>
            </BlurFade>
            <BlurFade delay={0.3} inView direction="left">
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Have a project in mind? I'd love to hear about it. Send me a message and let's create something amazing
                together.
              </p>
            </BlurFade>

            {/* Contact info */}
            <div className="space-y-4">
              {[
                { icon: Mail, label: "Email", value: "hello@johndoe.dev" },
                { icon: MapPin, label: "Location", value: "San Francisco, CA" },
                { icon: Clock, label: "Availability", value: "Open for freelance" },
              ].map((item, index) => (
                <BlurFade key={item.label} delay={0.4 + index * 0.1} inView direction="left">
                  <motion.div className="flex items-center gap-4 group" whileHover={{ x: 5 }}>
                    <div className="p-3 rounded-full glass group-hover:border-primary/50 transition-colors">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">{item.label}</p>
                      <p className="font-medium">{item.value}</p>
                    </div>
                  </motion.div>
                </BlurFade>
              ))}
            </div>
          </div>

          {/* Right column - Form */}
          <BlurFade delay={0.3} inView direction="right">
              <BorderBeam size={300} duration={12} />
            <form onSubmit={handleSubmit} className="relative glass rounded-2xl p-8 space-y-6 overflow-hidden">

              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors text-foreground"
                  placeholder="your@email.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none text-foreground"
                  placeholder="Tell me about your project..."
                  required
                />
              </div>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-50"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
                <Send className={`w-4 h-4 transition-transform ${!isSubmitting && "group-hover:translate-x-1"}`} />
              </motion.button>
            </form>
          </BlurFade>
        </div>
      </div>
    </section>
  )
}
