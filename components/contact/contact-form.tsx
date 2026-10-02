"use client";

import React, { useState } from "react";
import { Send } from "lucide-react";
import { BlurFade } from "@/components/blur-fade";
import { BorderBeam } from "@/components/border-beam";
import { motion } from "motion/react";
import { HoverBorderGradient } from "@/components/ui/hover-border-gradient";
import FormInput from "../form/input";

export function ContactForm() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  };

  return (
    <BlurFade delay={0.3} inView direction="right">
      <BorderBeam size={300} duration={12} />
      <form
        onSubmit={handleSubmit}
        className="relative glass rounded-2xl p-8 space-y-6 overflow-hidden"
      >
        <div className="relative">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Name
          </label>
          <HoverBorderGradient
            containerClassName="rounded-lg w-full"
            as="div"
            className="items-center p-0 w-full flex-1"
          >
            <FormInput
              type="text"
              id="name"
              value={formState.name}
              onChange={(e) =>
                setFormState({ ...formState, name: e.target.value })
              }
              placeholder="Your name"
              required
            />
          </HoverBorderGradient>
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-2">
            Email
          </label>
          <HoverBorderGradient
            containerClassName="rounded-lg w-full"
            as="div"
            className="items-center p-0 w-full flex-1"
          >
            <FormInput
              type="email"
              id="email"
              value={formState.email}
              onChange={(e) =>
                setFormState({ ...formState, email: e.target.value })
              }
              placeholder="your@email.com"
              required
            />
          </HoverBorderGradient>
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium mb-2">
            Message
          </label>
          <textarea
            id="message"
            value={formState.message}
            onChange={(e) =>
              setFormState({ ...formState, message: e.target.value })
            }
            rows={5}
            className="w-full px-4 py-3 rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none transition-colors resize-none text-foreground"
            placeholder="Tell me about your project..."
            required
          />
        </div>
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-8 py-4 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity flex items-center justify-center gap-2 group disabled:opacity-50"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
          <Send
            className={`w-4 h-4 transition-transform ${!isSubmitting && "group-hover:translate-x-1"}`}
          />
        </motion.button>
      </form>
    </BlurFade>
  );
}
