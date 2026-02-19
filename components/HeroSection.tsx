"use client";
import { Suspense } from "react";
import { motion } from "framer-motion";
import HeroScene from "./HeroScene";
import { ChevronDown, Sparkles } from "lucide-react";
import { BlurFade } from "./blur-fade";
import { TextEffect } from "./text-effect";
import { Globe } from "./ui/globe";
import { AnimatedGridPattern } from "./ui/animated-grid-pattern";
import { cn } from "@/lib/utils";
import { GlowingEffect } from "./ui/glowing-effect";

const HeroSection = () => {
  return (
    <section
      id="hero"
      className="relative h-screen overflow-hidden border-b border-border/50"
      aria-label="Hero"
    >
      <AnimatedGridPattern
        numSquares={30}
        maxOpacity={0.1}
        duration={3}
        repeatDelay={1}
        className={cn(
          "mask-[radial-gradient(500px_circle_at_center,white,transparent)]",
          "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
        )}
      />

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-b from-background/40 via-transparent to-background/50 pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <BlurFade delay={0.1}>
          <motion.div
            className="relative mb-8 rounded-full"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-primary blur-2xl opacity-40 animate-pulse-glow" />
            <img
              src={"https://github.com/shadcn.png"}
              alt="Alex Chen - Full Stack Developer"
              className="relative w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-2 border-primary/30"
            />
            <GlowingEffect
              spread={40}
              glow={true}
              disabled={false}
              proximity={64}
              inactiveZone={0.01}
            />
          </motion.div>
        </BlurFade>

        <BlurFade delay={0.2} inView>
          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-2">
            <TextEffect
              per="char"
              preset="blur-sm"
              delay={0.3}
              speedReveal={1.5}
            >
              duythaidev
            </TextEffect>
            <div className="absolute inset-x-20  bg-linear-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
            <div className="absolute inset-x-20  bg-linear-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
            <div className="absolute inset-x-20  bg-linear-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
            <div className="absolute inset-x-20  bg-linear-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />
          </h1>
        </BlurFade>

        <motion.h1
          className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold tracking-tight"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 1, type: "spring" }}
        ></motion.h1>

        <BlurFade delay={0.5} inView className="mb-12">
          <p className="text-md sm:text-md text-primary max-w-2xl mx-auto leading-relaxed">
            I craft and build interfaces that users love, turning ideas into
            reality.
          </p>
        </BlurFade>

        <motion.div
          className="absolute bottom-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <motion.a
            href="#about"
            className="flex flex-col items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
            aria-label="Scroll to About section"
          >
            <span className="text-xs font-mono tracking-widest uppercase">
              Scroll
            </span>
            <ChevronDown className="w-5 h-5" />
          </motion.a>
        </motion.div>

        <BlurFade delay={0.6} inView>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="group relative px-8 py-3 rounded-full bg-primary text-primary-foreground font-medium overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                View Projects
              </span>
              <motion.div
                className="absolute inset-0 bg-linear-to-r from-primary via-accent to-primary"
                initial={{ x: "-100%" }}
                whileHover={{ x: "100%" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              />
            </motion.a>
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-3 rounded-full bg-secondary border-primary border hover:border-primary hover:text-primary transition-all"
            >
              Get in Touch
            </motion.a>
          </div>
        </BlurFade>
      </div>
    </section>
  );
};

export { HeroSection };
