import { Header } from "@/components/header"
import { AboutSection } from "@/components/about-section"
import { ProjectsSection } from "@/components/projects-section"
import { StatsSection } from "@/components/stats-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"
import { SpotlightBackground } from "@/components/spotlight-background"
import { FloatingDock } from "@/components/floating-dock"
import { HomeIcon, User, Briefcase, Mail, Clock } from "lucide-react"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ExperienceSection } from "@/components/experience-section"
import { TechStackSection } from "@/components/tech-stack-section"
import { HeroSection } from "@/components/HeroSection"

const dockItems = [
  { title: "Home", icon: <HomeIcon className="w-full h-full" />, href: "#" },
  { title: "About", icon: <User className="w-full h-full" />, href: "#about" },
  { title: "Projects", icon: <Briefcase className="w-full h-full" />, href: "#projects" },
  { title: "Experience", icon: <Clock className="w-full h-full" />, href: "#experience" },
  { title: "Contact", icon: <Mail className="w-full h-full" />, href: "#contact" },
]

export default function Page() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <SpotlightBackground />
      <Header />
      <HeroSection />
      <AboutSection />
      <TechStackSection />
      <ProjectsSection />
      <ExperienceSection />
      <StatsSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
      <FloatingDock items={dockItems} />
    </main>
  )
}
