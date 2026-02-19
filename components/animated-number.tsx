"use client"

import { useEffect, useRef, useState } from "react"
import { useInView, motion, useSpring, useTransform } from "motion/react"

interface AnimatedNumberProps {
  value: number
  className?: string
  springOptions?: {
    bounce?: number
    duration?: number
  }
  suffix?: string
  prefix?: string
}

export function AnimatedNumber({
  value,
  className,
  springOptions = { bounce: 0, duration: 2000 },
  suffix = "",
  prefix = "",
}: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const spring = useSpring(0, springOptions)
  const display = useTransform(spring, (current) => Math.round(current).toLocaleString())
  const [displayValue, setDisplayValue] = useState("0")

  useEffect(() => {
    const unsubscribe = display.on("change", (latest) => {
      setDisplayValue(latest)
    })
    return unsubscribe
  }, [display])

  useEffect(() => {
    if (isInView) {
      spring.set(value)
    }
  }, [spring, value, isInView])

  return (
    <motion.span ref={ref} className={className}>
      {prefix}
      {displayValue}
      {suffix}
    </motion.span>
  )
}
