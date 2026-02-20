"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useTheme } from "next-themes";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";

const navItems = [
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return (
      <div className="w-[72px] h-7 rounded-full bg-secondary/50 animate-pulse" />
    );
  }

  const isNeon = (resolvedTheme ?? theme) === "neon";

  return (
    <button
      onClick={() => setTheme(isNeon ? "amber" : "neon")}
      aria-label="Toggle theme"
      className={cn(
        "relative flex items-center h-7 rounded-full px-1 gap-1 border transition-all duration-500",
        "text-[11px] font-medium tracking-widest uppercase overflow-hidden",
        isNeon
          ? "border-primary/40 bg-primary/5 text-primary"
          : "border-primary/40 bg-primary/5 text-primary",
      )}
    >
      {/* Sliding pill indicator */}
      <span
        className={cn(
          "absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full bg-primary/15 border border-primary/30 transition-all duration-300",
          isNeon ? "left-0.5" : "left-[calc(50%+1px)]",
        )}
      />

      <span
        className={cn(
          "relative z-10 px-2 py-0.5 transition-colors duration-300",
          isNeon ? "text-primary" : "text-muted-foreground",
        )}
      >
        Neon
      </span>
      <span
        className={cn(
          "relative z-10 px-2 py-0.5 transition-colors duration-300",
          !isNeon ? "text-primary" : "text-muted-foreground",
        )}
      >
        Amber
      </span>
    </button>
  );
}

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-99 transition-all duration-300",
        scrolled ? "glass py-4" : "py-6",
      )}
    >
      <nav className="container mx-auto lg:px-6 flex items-center justify-between">
        <div className="flex-1">
          <Link
            href="/"
            className="text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
          >
            duythaidev.
          </Link>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8 flex-1 justify-center">
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

        <div className="hidden md:flex items-center gap-3 flex-1 justify-end">
          <ThemeToggle />

          <Link
            href="#contact"
            className="px-4 py-2 text-sm rounded-full border border-border hover:border-primary hover:text-primary transition-all"
          >
            Let's Talk
          </Link>
        </div>

        {/* Mobile menu — Sheet sidebar */}
        <div className="flex md:hidden items-center gap-3">
          <ThemeToggle />

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="text-foreground" aria-label="Open menu">
                <Menu size={22} />
              </button>
            </SheetTrigger>

            <SheetContent
              side="right"
              className="w-72 flex flex-col pt-12 px-8 z-99 glass"
            >
              {/* Logo inside sidebar */}
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="text-2xl font-semibold tracking-tight text-foreground mb-10"
              >
                duythaidev.
              </Link>

              {/* Nav links */}
              <ul className="flex flex-col gap-6 flex-1">
                {navItems.map((item) => (
                  <li key={item.name}>
                    <SheetClose asChild>
                      <Link
                        href={item.href}
                        className="text-lg text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {item.name}
                      </Link>
                    </SheetClose>
                  </li>
                ))}
              </ul>

              {/* CTA at bottom */}
              <div className="pb-8">
                <SheetClose asChild>
                  <Link
                    href="#contact"
                    className="block w-full text-center px-4 py-3 text-sm rounded-full bg-secondary border border-primary/50 hover:border-primary hover:text-primary transition-all"
                  >
                    Let's Talk
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
