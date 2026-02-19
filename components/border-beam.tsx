"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface BorderBeamProps {
  className?: string
  size?: number
  duration?: number
  delay?: number
  colorFrom?: string
  colorTo?: string
  borderWidth?: number
}

export function BorderBeam({
  className,
  size = 200,
  duration = 12,
  delay = 0,
  colorFrom = "var(--primary)",
  colorTo = "oklch(0.85 0.12 180)",
  borderWidth = 1.5,
}: BorderBeamProps) {
  return (
    <div
      className={cn("pointer-events-none absolute inset-0 rounded-[inherit]", className)}
      style={
        {
          "--size": size,
          "--duration": duration,
          "--delay": `-${delay}s`,
          "--color-from": colorFrom,
          "--color-to": colorTo,
          "--border-width": `${borderWidth}px`,
        } as React.CSSProperties
      }
    >
      <div
        className="absolute inset-0 rounded-[inherit]"
        style={{
          background: `
            linear-gradient(var(--background), var(--background)) padding-box,
            conic-gradient(from calc(var(--angle, 0) * 1deg), transparent 80%, ${colorFrom}, ${colorTo}, transparent 100%) border-box
          `,
          border: `${borderWidth}px solid transparent`,
          animation: `border-beam-spin ${duration}s linear infinite`,
          animationDelay: `var(--delay)`,
        }}
      />
    </div>
  )
}
