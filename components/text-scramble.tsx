"use client"

import { useEffect, useState, useCallback } from "react"

interface TextScrambleProps {
  texts: string[]
  speed?: number
}

const chars = "!<>-_\\/[]{}—=+*^?#________"

export function TextScramble({ texts, speed = 50 }: TextScrambleProps) {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)

  const scramble = useCallback(
    (text: string) => {
      let iteration = 0
      const maxIterations = text.length

      const interval = setInterval(() => {
        setDisplayText(
          text
            .split("")
            .map((char, index) => {
              if (index < iteration) {
                return char
              }
              return chars[Math.floor(Math.random() * chars.length)]
            })
            .join(""),
        )

        if (iteration >= maxIterations) {
          clearInterval(interval)
        }

        iteration += 1 / 3
      }, speed)

      return () => clearInterval(interval)
    },
    [speed],
  )

  useEffect(() => {
    const cleanup = scramble(texts[currentIndex])

    const timeout = setTimeout(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length)
    }, 3000)

    return () => {
      cleanup()
      clearTimeout(timeout)
    }
  }, [currentIndex, texts, scramble])

  return <span className="font-mono">{displayText || texts[0]}</span>
}
