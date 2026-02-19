"use client"

import type React from "react"

import { cn } from "@/lib/utils"

interface ShineBorderProps {
  borderWidth?: number
  duration?: number
  shineColor?: string | string[]
  className?: string
  children?: React.ReactNode
}

export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#ffffff",
  className,
  children,
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--shine-color": Array.isArray(shineColor) ? shineColor.join(",") : shineColor,
          "--duration": `${duration}s`,
        } as React.CSSProperties
      }
      className={cn(
        "relative grid place-items-center rounded-xl bg-card text-card-foreground",
        "before:absolute before:inset-0 before:rounded-xl before:p-[var(--border-width)]",
        "before:bg-[linear-gradient(90deg,transparent_25%,var(--shine-color)_50%,transparent_75%)]",
        "before:bg-[length:250%_100%] before:animate-shine before:-z-10",
        "before:[mask-composite:exclude] before:[mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]",
        className,
      )}
    >
      {children}
    </div>
  )
}
