"use client";

import { motion } from "framer-motion";
import { 
  SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, 
  SiExpress, SiNestjs, SiFirebase, SiSupabase, SiMongodb, 
  SiPostgresql, SiRedis, SiNodedotjs, 
  SiNextcloud,
  SiJavascript
} from "react-icons/si";

interface AboutSectionProps {}

export default function AboutSection({}: AboutSectionProps) {
  const skills = {
    Frontend: [
      { name: "React", icon: SiReact, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "Next.js", icon: SiNextdotjs, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "JavaScript", icon: SiJavascript, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "TypeScript", icon: SiTypescript, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "TailwindCSS", icon: SiTailwindcss, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
    ],
    Backend: [
      { name: "Node.js", icon: SiNodedotjs, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "Next.js", icon: SiNextdotjs, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
    ],
    Database: [
      { name: "Firebase", icon: SiFirebase, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "NextAuth", icon: SiNextcloud, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "Supabase", icon: SiSupabase, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "MongoDB", icon: SiMongodb, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "PostgreSQL", icon: SiPostgresql, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
      { name: "Redis", icon: SiRedis, color: "bg-gray-900/20 text-gray-800 dark:text-gray-100" },
    ],
  };

  const bgIcons = [
    SiReact, SiNextdotjs, SiTailwindcss, SiNodedotjs, SiTypescript,
    SiExpress, SiNestjs, SiFirebase, SiSupabase, SiMongodb
  ];

  return (
    <section className="relative w-full max-w-7xl flex flex-col justify-center items-center mx-auto px-4 sm:px-4 md:px-20 py-20 sm:pb-10 overflow-hidden">
      {/* Floating background icons */}
      {Array.from({ length: 30 }).map((_, i) => {
        const Icon = bgIcons[Math.floor(Math.random() * bgIcons.length)];
        const size = Math.floor(Math.random() * 12) + 8; // smaller icons
        const top = Math.floor(Math.random() * 100);
        const left = Math.floor(Math.random() * 100);
        const delay = Math.random() * 10;
        const duration = Math.random() * 15 + 10; // shorter animation
        return (
          <motion.div
            key={i}
            className="absolute text-purple-600/10 dark:text-purple-400/10"
            style={{ top: `${top}%`, left: `${left}%` }}
            animate={{ y: [0, -15, 0], x: [0, 3, -3, 0] }}
            transition={{ repeat: Infinity, duration, delay }}
          >
            <Icon size={size} />
          </motion.div>
        );
      })}

      {/* Heading */}
      <motion.h2
        className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4 text-center justify-center md:text-left"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        About Me
      </motion.h2>

      {/* Introduction */}
      <motion.p
        className="text-sm sm:text-base text-gray-700 dark:text-gray-300 mb-8 sm:mb-10 max-w-3xl text-center md:text-left"
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
      >
         Modern web developer building scalable, performant applications.
      </motion.p>

      {/* Flex container for Journey + Skills */}
      <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
        {/* Journey */}
        <motion.div
          className="flex-1 max-w-xl"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <h3 className="text-xl sm:text-2xl font-semibold text-purple-600 dark:text-purple-400 mb-3 sm:mb-4">My Journey</h3>
          <p className="text-gray-700 dark:text-gray-300 mb-2 text-xs sm:text-sm">
            Based in Osogbo, Nigeria, I have dedicated my career to mastering modern web technologies and building robust, high-performance web applications. 
            My journey has been fueled by curiosity, creativity, and a love for solving complex challenges.
          </p>
          <p className="text-gray-700 dark:text-gray-300 mb-2 text-xs sm:text-sm">
            I work extensively with React, Next.js, and TypeScript for frontend development, also Node.js, and NestJS for backend systems. 
            Every project I contribute to is scalable, maintainable, and highly optimized.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-xs sm:text-sm">
            Outside coding, I enjoy exploring emerging technologies, contributing to open-source projects, and sharing knowledge with the developer community.
          </p>
        </motion.div>

        {/* Skills */}
        <motion.div
          className="flex-1 flex flex-col gap-4 sm:gap-6"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.2 } },
          }}
        >
          {Object.entries(skills).map(([category, items], idx) => (
            <motion.div
              key={category}
              className="bg-purple-50 dark:bg-gray-800 p-4 sm:p-6 rounded-2xl shadow-md sm:shadow-lg flex flex-col gap-3 hover:scale-105 transition-transform duration-500"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2, duration: 0.6 }}
            >
              <h4 className="text-lg sm:text-xl font-semibold text-purple-600 dark:text-purple-400">{category}</h4>
              <div className="flex flex-wrap gap-2 sm:gap-3 mt-1 sm:mt-2">
                {items.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      className={`flex items-center gap-1 px-2 py-1 sm:px-2 sm:py-1 rounded-full shadow-sm ${skill.color} bg-opacity-20 cursor-pointer`}
                      whileHover={{ scale: 1.05, rotate: 2 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-4 h-4" />
                      <span className="font-medium text-[9px] sm:text-[10px]">{skill.name}</span>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
