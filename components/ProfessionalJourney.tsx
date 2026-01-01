"use client";

import { FaCalendarAlt, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiCloudinary, SiJavascript } from "react-icons/si";
import { Wallet } from "lucide-react";
import { motion } from "framer-motion";

interface Experience {
  role: string;
  company: string;
  date: string;
  location: string;
  description: string;
  achievements: string[];
  tech: any[];
}

const experiences: Experience[] = [
  // ... include all your experience objects here as in your snippet
  {
    role: "Intern – Frontend Developer",
    company: "Smart Trans Express",
    date: "Jun 2024 – Present",
    location: "Osogbo, Nigeria",
    description: "Contributed to building the frontend of Smart Trans Express applications using React, JavaScript, and module.css. Implemented responsive layouts, reusable components, and interactive features to enhance user experience. Collaborated with the design and backend teams to ensure smooth integration and delivered high-quality code following best practices.",
    achievements: [
      "Developed multiple reusable UI components improving frontend efficiency",
      "Optimized application performance for faster load times",
      "Collaborated successfully with backend to integrate APIs"
    ],
    tech: [SiReact, SiJavascript],
  },
  {
    role: "Full Stack Developer",
    company: "Shopease E-commerce Project",
    date: "2025",
    location: "Remote",
    description: "Designed and developed a full-featured e-commerce platform called Shopease using Next.js, TypeScript, TailwindCSS, Shadcn, Nodemailer, NextAuth, Cloudinary, MongoDB, and Paystack. Implemented user authentication, secure payment gateways, image optimization, and a responsive UI. Worked on both frontend and backend, ensuring scalable and maintainable code.",
    achievements: [
      "Implemented secure payment gateway with Paystack",
      "Integrated NextAuth for seamless authentication",
      "Optimized media assets using Cloudinary for faster load times"
    ],
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiCloudinary, Wallet],
  },
  {
    role: "Full Stack Developer",
    company: "Mayor Homeland Property",
    date: "2025",
    location: "Remote",
    description: "Developed a property management system for Mayor Homeland Property using Next.js, TypeScript, TailwindCSS, Shadcn, Nodemailer, NextAuth, Cloudinary, and MongoDB. Built features including property listings, secure authentication, image uploads, and client-side interactivity. Ensured high performance and maintainable code with a focus on user experience.",
    achievements: [
      "Delivered a fully functional property management system",
      "Implemented secure authentication and optimized image handling",
      "Enhanced frontend UI for responsive client-side experience"
    ],
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiExpress, SiMongodb, SiCloudinary],
  },
  {
    role: "Full Stack Developer – Music App",
    company: "Plugify",
    date: "2024",
    location: "Remote",
    description: "Built a music streaming platform with playlists, search functionality, and user interactions using Next.js, TypeScript, TailwindCSS, Node.js, and MongoDB. Integrated backend APIs and optimized database queries. Focused on creating a seamless, responsive user experience with modern UI components.",
    achievements: [
      "Implemented advanced search and playlist functionality",
      "Optimized backend queries for faster performance",
      "Created responsive UI improving user engagement"
    ],
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb],
  },
  {
    role: "Full Stack Developer – Streaming Platform",
    company: "NitroFlix",
    date: "2025",
    location: "Remote",
    description: "Developed NitroFlix, a film streaming platform with authentication, subscription management, and content display using Next.js, TypeScript, TailwindCSS, Node.js, and MongoDB. Integrated secure payment processing, responsive layouts, and cloud storage. Ensured cross-platform compatibility and maintainable architecture for future scalability.",
    achievements: [
      "Built full streaming platform from scratch",
      "Integrated authentication and subscription management",
      "Optimized content delivery for performance across devices"
    ],
    tech: [SiNextdotjs, SiTypescript, SiTailwindcss, SiNodedotjs, SiMongodb],
  },
];

export default function ProfessionalJourney() {
  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 md:px-16 py-12 sm:py-16 overflow-hidden">
      <h2 className="text-3xl sm:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-4 text-center">
        Professional Journey
      </h2>
      <p className="text-center text-gray-700 dark:text-gray-300 mb-8 sm:mb-12 text-sm sm:text-base">
        Building innovative solutions while mastering modern web technologies.
      </p>

      <div className="relative">
        {/* Vertical timeline line */}
        <div className="absolute left-5/5 transform -translate-x-1/2 h-full border-l-2 border-purple-600 dark:border-purple-400"></div>

        <div className="flex flex-col gap-8 sm:gap-12">
          {experiences.map((exp, idx) => {
            const isLeft = idx % 2 === 0;

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative w-full flex justify-between items-start"
              >
                {/* Experience Card */}
                <div className={`w-full sm:w-5/5 z-10 ${isLeft ? "pr-4 sm:pr-8" : "pl-4 sm:pl-8"}`}>
                  <div className="bg-white dark:bg-gray-900 p-4 sm:p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 flex flex-col items-start text-left text-sm sm:text-base">
                    <h3 className="text-lg sm:text-2xl font-semibold text-gray-900 dark:text-gray-100">{exp.role}</h3>
                    <a href="#" className="text-purple-600 dark:text-purple-400 font-medium text-xs sm:text-sm">{exp.company}</a>
                    <div className="flex flex-wrap items-center gap-2 sm:gap-4 text-gray-500 dark:text-gray-400 text-xs sm:text-sm mt-1">
                      <span className="flex items-center gap-1 text-[11px]"><FaCalendarAlt /> {exp.date}</span>
                      <span className="flex items-center gap-1 text-[11px]"><FaMapMarkerAlt /> {exp.location}</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 leading-5 md:leading-7 mt-2 text-sm">{exp.description}</p>

                    <div className="mt-2">
                      <div className="flex items-center gap-2 mb-1 font-bold text-gray-900 dark:text-gray-100 text-[13px]">
                        <FaTrophy /> Key Achievements
                      </div>
                      <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 text-[11px] sm:text-[12px]">
                        {exp.achievements.map((ach, i) => (
                          <li key={i}>{ach}</li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2 sm:mt-3">
                      {exp.tech.map((Icon, i) => (
                        <div key={i} className="bg-gray-100 dark:bg-gray-800 px-1 py-1 sm:px-2 rounded-full text-purple-600 dark:text-purple-400 flex items-center gap-1 sm:text-[10px]">
                          <Icon className="w-4 h-4" /> {Icon.displayName || "Tech"}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Timeline circle */}
                <div className="absolute left-5/5 transform -translate-x-1/2 mt-5 sm:mt-6 w-3 sm:w-5 h-3 sm:h-5 bg-purple-600 dark:bg-purple-400 rounded-full border-2 border-white dark:border-gray-900 z-20"></div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}