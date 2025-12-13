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

const categories = [
  {
    title: "Frontend Development",
    skills: [
      { name: "HTML5", icon: SiHtml5 },
      { name: "CSS3", icon: SiCss3 },
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "React", icon: SiReact },
      { name: "Next.js", icon: SiNextdotjs },
      { name: "Tailwind CSS", icon: SiTailwindcss },
      { name: "Framer Motion", icon: SiFramer },
    ],
  },
  {
    title: "Backend, Database & Cloud",
    skills: [
      { name: "Node.js", icon: SiNodedotjs },
      { name: "MongoDB", icon: SiMongodb },
      { name: "Supabase", icon: SiSupabase },
      { name: "Firebase", icon: SiFirebase },
      { name: "Vercel", icon: SiVercel },
      { name: "AWS", icon: SiAmazonwebservices },
      { name: "Cloudinary", icon: SiCloudinary },
    ],
  },
  {
    title: "Programming Languages",
    skills: [
      { name: "JavaScript", icon: SiJavascript },
      { name: "TypeScript", icon: SiTypescript },
      { name: "SQL", icon: SiSqlite },
    ],
  },
  {
    title: "Development Tools",
    skills: [
      { name: "Git", icon: SiGit },
      { name: "VS Code", icon: SiVscodium },
      { name: "Postman", icon: SiPostman },
      { name: "Figma", icon: SiFigma },
      { name: "Docker", icon: SiDocker },
      { name: "npm/yarn", icon: SiNpm },
    ],
  },
];

export default function TechnicalArsenal() {
  return (
    <section className="w-full max-w-8xl mx-auto px-6 py-24">
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          My Technical Arsenal
        </h2>
        <p className="text-gray-600 dark:text-gray-300 text-lg md:text-xl max-w-3xl mx-auto">
          A curated showcase of modern technologies, programming languages, and tools I use to craft full-stack applications with excellence.
        </p>
      </motion.div>

      {/* Categories grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {categories.map((cat) => (
          <motion.div
            key={cat.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">{cat.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-wrap gap-3 mt-4">
                {cat.skills.map((skill) => {
                  const Icon = skill.icon;
                  return (
                    <motion.div
                      key={skill.name}
                      whileHover={{ scale: 1.1 }}
                      className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-full shadow-md cursor-pointer transition-all duration-300 hover:bg-purple-600/10 dark:hover:bg-purple-400/20"
                    >
                      <Icon className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                      <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                        {skill.name}
                      </span>
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
