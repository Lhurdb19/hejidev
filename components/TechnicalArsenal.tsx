"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFramer,
  SiMongodb,
  SiSupabase,
  SiFirebase,
  SiVercel,
  SiCloudinary,
  SiGit,
  SiPostman,
  SiFigma,
  SiDocker,
  SiNpm,
  SiSqlite,
  SiNodedotjs,
  SiAmazonwebservices,
  SiVscodium,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: any;
  level?: number;
  experience?: string;
};

const categories: { title: string; color: string; skills: Skill[] }[] = [
  {
    title: "Frontend Development",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "HTML5", icon: SiHtml5, level: 95, experience: "3+ years" },
      { name: "CSS3", icon: SiCss3, level: 95, experience: "3+ years" },
      { name: "JavaScript", icon: SiJavascript, level: 92, experience: "2+ years" },
      { name: "TypeScript", icon: SiTypescript, level: 90, experience: "2+ years" },
      { name: "React", icon: SiReact, level: 92, experience: "2+ years" },
      { name: "Next.js", icon: SiNextdotjs, level: 90, experience: "1+ years" },
      { name: "Tailwind CSS", icon: SiTailwindcss, level: 95, experience: "1+ years" },
      { name: "Framer Motion", icon: SiFramer, level: 85, experience: "2+ years" },
    ],
  },
  {
    title: "Backend, Database & Cloud",
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "Node.js", icon: SiNodedotjs, level: 55 },
      { name: "MongoDB", icon: SiMongodb, level: 82 },
      { name: "Supabase", icon: SiSupabase, level: 68 },
      { name: "Firebase", icon: SiFirebase, level: 80 },
      { name: "Vercel", icon: SiVercel, level: 90 },
      { name: "AWS", icon: SiAmazonwebservices, level: 70 },
      { name: "Cloudinary", icon: SiCloudinary, level: 85 },
    ],
  },
  {
    title: "Programming Languages",
    color: "from-emerald-500 to-teal-500",
    skills: [
      { name: "JavaScript", icon: SiJavascript, level: 92 },
      { name: "TypeScript", icon: SiTypescript, level: 90 },
      { name: "SQL", icon: SiSqlite, level: 55 },
    ],
  },
  {
    title: "Development Tools",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git", icon: SiGit, level: 90 },
      { name: "VS Code", icon: SiVscodium, level: 95 },
      { name: "Postman", icon: SiPostman, level: 85 },
      { name: "Figma", icon: SiFigma, level: 80 },
      { name: "Docker", icon: SiDocker, level: 50 },
      { name: "npm / yarn", icon: SiNpm, level: 90 },
    ],
  },
];

export default function TechnicalArsenal() {
  return (
    <section className="relative w-full max-w-7xl mx-auto px-4 py-5 md:px-20 overflow-hidden text-black/90 dark:text-white">
      {/* Ambient background */}
      <div className="absolute -top-24 -left-24 w-72 h-72 bg-purple-500/15 blur-3xl rounded-full" />
      <div className="absolute bottom-0 -right-24 w-72 h-72 bg-blue-500/15 blur-3xl rounded-full" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="text-center mb-10 relative z-10"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-3 tracking-tight text-purple-600 dark:text-purple-400">
          Technical Arsenal
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
          Technologies, tools, and languages I use to build scalable and maintainable applications.
        </p>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        {categories.map((cat, index) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
          >
            <Card className="relative h-full rounded-xl bg-white/70 dark:bg-gray-900/70 backdrop-blur-lg
              border border-gray-200/50 dark:border-gray-700/50 shadow-lg hover:shadow-xl transition-all">
              
              {/* Gradient bar */}
              <div className={`h-0.5 w-full rounded-t-xl bg-linear-to-r ${cat.color}`} />

              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-semibold">
                  {cat.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {cat.skills.map((skill) => {
                  const Icon = skill.icon;
                  const isLearning = (skill.level ?? 0) < 80;

                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.04 }}
                      className="group relative flex flex-col items-center justify-center gap-1.5
                        p-3 rounded-lg border border-gray-200 dark:border-gray-700
                        bg-gray-50 dark:bg-gray-800 shadow-sm hover:shadow-md"
                    >
                      {/* Progress Ring */}
                      <div className="relative w-12 h-12">
                        <svg className="w-full h-full -rotate-90">
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            className="text-gray-300 dark:text-gray-700"
                          />
                          <circle
                            cx="24"
                            cy="24"
                            r="20"
                            stroke="currentColor"
                            strokeWidth="3"
                            fill="none"
                            strokeDasharray={126}
                            strokeDashoffset={
                              126 - (126 * (skill.level ?? 0)) / 100
                            }
                            className="text-purple-500 transition-all duration-700"
                          />
                        </svg>
                        <Icon className="absolute inset-0 m-auto w-4 h-4 text-purple-600 dark:text-purple-400" />
                      </div>

                      <span className="text-[11px] font-medium text-center">
                        {skill.name}
                      </span>

                      {/* Badge */}
                      {isLearning && (
                        <span className="text-[8px] px-1.5 py-0.5 rounded-full bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300">
                          Learning
                        </span>
                      )}

                      {/* Tooltip */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity
                        text-[9px] px-2 py-0.5 rounded bg-black text-white whitespace-nowrap">
                        {skill.experience || `${skill.level}% proficiency`}
                      </div>
                    </motion.div>
                  );
                })}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
