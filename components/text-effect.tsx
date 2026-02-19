"use client"

import { useMemo, useCallback } from "react"
import { motion, type Variants } from "framer-motion"
import type { JSX } from "react/jsx-runtime"

type TextEffectProps = {
  children: string
  per?: "word" | "char" | "line"
  as?: keyof JSX.IntrinsicElements
  variants?: {
    container?: Variants
    item?: Variants
  }
  className?: string
  preset?: "fade" | "blur" | "slide" | "scale" | "blur-sm"
  delay?: number
  trigger?: boolean
  speedReveal?: number
  speedSegment?: number
}

const defaultContainerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const presetVariants: Record<string, Variants> = {
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  blur: {
    hidden: { opacity: 0, filter: "blur(12px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  "blur-sm": {
    hidden: { opacity: 0, filter: "blur(6px)" },
    visible: { opacity: 1, filter: "blur(0px)" },
  },
  slide: {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1 },
  },
}

export function TextEffect({
  children,
  per = "word",
  as: Component = "p",
  variants,
  className,
  preset = "fade",
  delay = 0,
  trigger = true,
  speedReveal = 1,
  speedSegment = 1,
}: TextEffectProps) {
  const MotionComponent = motion[Component]

  const segments = useMemo(() => {
    if (per === "line") return children.split("\n")
    if (per === "word") return children.split(/(\s+)/)
    return children.split("")
  }, [children, per])

  const containerVariants = useMemo(
    () =>
      variants?.container || {
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.05 / speedReveal,
            delayChildren: delay,
          },
        },
      },
    [variants, delay, speedReveal],
  )

  const itemVariants = useMemo(() => variants?.item || presetVariants[preset], [variants, preset])

  const renderSegment = useCallback(
    (segment: string, index: number) => {
      if (per === "word" && /^\s+$/.test(segment)) {
        return <span key={index}>{segment}</span>
      }
      return (
        <motion.span
          key={index}
          variants={itemVariants}
          transition={{ duration: 0.3 / speedSegment }}
          className="inline-block whitespace-pre"
        >
          {segment}
        </motion.span>
      )
    },
    [per, itemVariants, speedSegment],
  )

  return (
    <MotionComponent
      initial="hidden"
      animate={trigger ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {segments.map(renderSegment)}
    </MotionComponent>
  )
}
