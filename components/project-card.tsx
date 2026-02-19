"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import { ArrowUpRight } from "lucide-react"
import { motion, useMotionValue, useSpring, useTransform } from "motion/react"
import { BorderBeam } from "@/components/border-beam"

interface Project {
  title: string
  description: string
  image: string
  tags: string[]
  link: string
  featured: boolean
}

interface ProjectCardProps {
  project: Project
  index: number
  isInView: boolean
}

export function ProjectCard({ project, index, isInView }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLAnchorElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7.5deg", "-7.5deg"])
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7.5deg", "7.5deg"])

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
    setIsHovered(false)
  }

  return (
    <motion.a
      ref={ref}
      href={project.link}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className={`group relative overflow-hidden rounded-2xl glass transition-all duration-700 ${
        project.featured ? "md:row-span-2" : ""
      } ${isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {isHovered && <BorderBeam size={300} duration={8} colorFrom="var(--primary)" colorTo="oklch(0.85 0.12 180)" />}

      {/* Image */}
      <div
        className={`relative overflow-hidden ${project.featured ? "aspect-[4/5]" : "aspect-video"}`}
        style={{ transform: "translateZ(20px)" }}
      >
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`object-cover transition-transform duration-500 ${isHovered ? "scale-110" : "scale-100"}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6" style={{ transform: "translateZ(40px)" }}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
            <p className="text-sm text-muted-foreground mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs rounded-full bg-secondary text-secondary-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <motion.div
            animate={{
              x: isHovered ? 0 : 4,
              y: isHovered ? 0 : 4,
              scale: isHovered ? 1.1 : 1,
            }}
            className="p-2 rounded-full border border-border group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
          >
            <ArrowUpRight className="w-5 h-5" />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        style={{
          background:
            "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)",
          transform: "translateZ(50px)",
        }}
      />
    </motion.a>
  )
}
