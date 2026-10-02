import { Mail, MapPin, Clock } from "lucide-react";
import { BlurFade } from "@/components/blur-fade";
import { TextEffect } from "@/components/text-effect";
import { env } from "@/lib/env";

const contactItems = [
  { icon: Mail, label: "Email", value: env.EMAIL },
  { icon: MapPin, label: "Location", value: env.LOCATION },
  {
    icon: Clock,
    label: "Availability",
    value: "Open for work",
  },
];

export function ContactInfo() {
  return (
    <div>
      <BlurFade delay={0.1} inView direction="left">
        <p className="text-primary text-sm font-medium tracking-wider uppercase mb-4">
          Contact
        </p>
      </BlurFade>
      <BlurFade delay={0.2} inView direction="left">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 text-balance">
          Let's work{" "}
          <span className="text-gradient">
            <TextEffect per="char" preset="blur-sm" delay={0.3}>
              together
            </TextEffect>
          </span>
        </h2>
      </BlurFade>
      <BlurFade delay={0.3} inView direction="left">
        <p className="text-muted-foreground mb-8 leading-relaxed">
          Have a project in mind? I'd love to hear about it. Send me a
          message and let's create something amazing together.
        </p>
      </BlurFade>

      {/* Contact info */}
      <div className="space-y-4">
        {contactItems.map((item, index) => (
          <BlurFade
            key={item.label}
            delay={0.4 + index * 0.1}
            inView
            direction="left"
          >
            <div className="flex items-center gap-4 group hover:translate-x-1.5 transition-transform duration-300">
              <div className="p-3 rounded-full glass group-hover:border-primary/50 transition-colors">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">{item.label}</p>
                <p className="font-medium">{item.value}</p>
              </div>
            </div>
          </BlurFade>
        ))}
      </div>
    </div>
  );
}
