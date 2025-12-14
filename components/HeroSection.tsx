"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Download } from "lucide-react";
import {
  SiCss3,
  SiHtml5,
  SiJavascript,
  SiNextdotjs,
  SiNodedotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiFigma,
} from "react-icons/si";

interface HeroSectionProps {
  imageUrl?: string;
}

const orbitTechBadges = [
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
  { name: "Tailwind", icon: SiTailwindcss },
  { name: "Node.js", icon: SiNodedotjs },
  { name: "JavaScript", icon: SiJavascript },
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss3 },
  { name: "TypeScript", icon: SiTypescript },
  { name: "Figma", icon: SiFigma },
];

const bgIcons = [
  SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiJavascript,
  SiHtml5, SiCss3, SiTypescript, SiFigma,
];

export default function HeroSection({ imageUrl }: HeroSectionProps) {
  const name = "HejiDev".split(""); // Split name into letters

  return (
    <section className="relative w-full max-w-8xl mx-auto px-4 md:px-16 py-10 overflow-hidden bg-gray-200 dark:bg-gray-900 shadow-lg">
      {/* Background gradient */}
      <div className="absolute inset-0 -z-20 bg-linear-to-br from-purple-50 to-purple-200 dark:from-gray-900 dark:to-gray-800"></div>

      {/* Floating background icons */}
      {Array.from({ length: 50 }).map((_, i) => {
        const Icon = bgIcons[Math.floor(Math.random() * bgIcons.length)];
        const size = Math.floor(Math.random() * 8) + 12;
        const top = Math.floor(Math.random() * 100);
        const left = Math.floor(Math.random() * 100);
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 15;
        return (
          <motion.div
            key={i}
            className="absolute text-purple-600/10 dark:text-purple-400/10"
            style={{ top: `${top}%`, left: `${left}%` }}
            animate={{ y: [0, -20, 0], x: [0, 5, -5, 0] }}
            transition={{ repeat: Infinity, duration, delay }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}

      {/* Hero content */}
      <div className="max-w-8xl relative z-10 flex flex-col-reverse md:flex-row items-center justify-between mx-auto gap-10 md:gap-16">
        {/* Text */}
        <div className="flex-1 space-y-4 text-center md:text-left">
          <motion.h1
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xl md:text-4xl max-w-2xl font-bold leading-tight dark:text-white text-black/90"
          >
            Crafting <span className="text-purple-600 dark:text-purple-400">Next-Level Web Experiences</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-gray-700 dark:text-gray-300 text-sm md:text-xl max-w-xl"
          >
            I build scalable, high-performance web applications that combine stunning visuals, clean architecture, and seamless user experiences.
            Every interaction is deliberate, every animation polished, and every feature optimized.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="flex justify-center md:justify-start gap-4 flex-wrap"
          >
            <Button asChild size="lg" className="hover:scale-105 transition-transform">
              <Link href="#projects" className="flex items-center gap-2">
                Explore Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>

            <Button asChild variant="outline" size="lg" className="hover:scale-105 transition-transform">
              <Link href="#contact">Work With Me</Link>
            </Button>

            {/* ✅ DOWNLOAD RESUME BUTTON */}
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="hover:scale-105 transition-transform"
            >
              <a
                href="/hejidev-resume.pdf"
                download
                className="flex items-center gap-2"
              >
                Download Resume
                <Download className="h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>

        {/* Profile image with badges and animated name */}
        {imageUrl && (
          <motion.div
            className="relative flex flex-col items-center justify-center"
            animate={{ y: [0, -10, 0], scale: [1, 1.03, 1] }}
            transition={{ repeat: Infinity, duration: 5 }}
          >
            {/* Profile Image */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: [1, 1.03, 1] }}
              transition={{ delay: 0.3, duration: 1.2 }}
              className="relative w-50 h-50 md:w-72 md:h-72 rounded-full overflow-hidden shadow-2xl ring-4 ring-purple-600/20 dark:ring-purple-400/20"
            >
              <Image
                src={imageUrl}
                alt="HejiDev"
                width={400}
                height={400}
                className="w-full h-full object-cover"
                priority
              />
              <div className="absolute inset-0 rounded-full bg-linear-to-br from-purple-400/20 to-purple-600/20 blur-xl animate-pulse"></div>
            </motion.div>

            {/* Orbiting badges */}
            {orbitTechBadges.map((tech, idx) => {
              const Icon = tech.icon;
              const angle = (360 / orbitTechBadges.length) * idx;
              const radius = 80 + Math.random() * 50;
              const radians = (angle * Math.PI) / 180;
              const x = radius * Math.cos(radians);
              const y = radius * Math.sin(radians);

              return (
                <motion.div
                  key={tech.name}
                  className="absolute"
                  style={{ top: `50%`, left: `50%` }}
                  animate={{
                    x: [0, x, x + 5, 0],
                    y: [0, y, y + 10, 0],
                    scale: [1, 1.1, 1],
                    rotate: [0, 360],
                  }}
                  transition={{ repeat: Infinity, duration: 15 + Math.random() * 10, ease: "easeInOut" }}
                >
                  <div className="flex items-center justify-center w-5 h-5 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                    <Icon className="w-2 h-2 text-purple-600 dark:text-purple-400" />
                  </div>
                </motion.div>
              );
            })}

            {/* Animated name "I am HejiDev" */}
            <div className="mt-6 flex justify-center gap-1">
              <motion.span
                className="text-xl md:text-3xl font-semibold text-purple-600 dark:text-purple-400 drop-shadow-lg"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 1 }}
              >
                I am
              </motion.span>
              {name.map((letter, i) => (
                <motion.span
                  key={i}
                  className="text-xl md:text-4xl font-extrabold text-purple-600 dark:text-purple-400 drop-shadow-lg"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.1, duration: 0.8 }}
                >
                  {letter}
                </motion.span>
              ))}
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
