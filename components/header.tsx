"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { cn } from "@/lib/utils"

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header className={cn("fixed top-0 left-0 right-0 z-999 transition-all duration-300", scrolled ? "glass py-4" : "py-6")} >
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          JD.
        </Link>

        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.name}>
              <Link
                href={item.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="#contact"
          className="hidden md:block px-4 py-2 text-sm rounded-full border border-border hover:border-primary hover:text-primary transition-all"
        >
          Let's Talk
        </Link>

        {/* Mobile menu button */}
        <button className="md:hidden text-foreground" aria-label="Open menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>
      </nav>
    </header>
  )
}
