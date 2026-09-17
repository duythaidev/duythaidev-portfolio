import { clsx, type ClassValue } from "clsx";
import { Facebook, Github, Linkedin } from "lucide-react";
import { twMerge } from "tailwind-merge";
import { env } from "./env";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook",
    value: env.FACEBOOK_URL,
  },
  {
    icon: Github,
    label: "GitHub",
    value: env.GITHUB_URL,
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: env.LINKEDIN_URL,
  },
];
