"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
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
      <nav className="container mx-auto px-6 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-semibold tracking-tight text-foreground hover:text-primary transition-colors"
        >
          JD.
        </Link>

        {/* Desktop nav */}
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

        {/* Mobile menu — Sheet sidebar */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <button
              className="md:hidden text-foreground"
              aria-label="Open menu"
            >
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
              JD.
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
      </nav>
    </header>
  );
}
