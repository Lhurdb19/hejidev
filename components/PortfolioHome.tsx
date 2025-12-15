"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface Project {
  id: number;
  title: string;
  description: string;
  github?: string;
  live_url?: string;
  image_url?: string;
  technologies?: string[];
  created_at: string;
}

export default function PortfolioHome() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true }); // <-- Oldest first

    if (error) console.error("Error fetching projects:", error.message);
    else if (data) setProjects(data);

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Only display 4 projects initially
  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <div className="w-full max-w-7xl mx-auto py-1 px-4 md:px-20 space-y-5">

      {/* Projects Section */}
      <section id="projects" className="space-y-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-600 dark:text-purple-400">
          My Projects
        </h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading projects...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <AnimatePresence>
              {visibleProjects.map((project, index) => (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="overflow-hidden transform transition hover:scale-105 duration-300 p-0 gap-0 min-h-[300px] md:min-h-[400px] flex flex-col justify-between">
                    {project.image_url && (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="w-full h-35 md:h-48 object-cover rounded-t"
                      />
                    )}
                    <div className="p-2 space-y-2 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-xs md:text-sm font-semibold">{project.title}</h3>
                        <p className="text-gray-800 dark:text-gray-200 text-[10px] md:text-[11px]">{project.description}</p>

                        {/* Technologies */}
                        {project.technologies && project.technologies.length > 0 && (
                          <div className="flex flex-wrap gap-1 pt-1">
                            {project.technologies.map((tech, i) => (
                              <span
                                key={i}
                                className="text-[8px] px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2 mt-1 flex-wrap">
                        {project.github && (
                          <Button asChild variant="outline">
                            <Link href={project.github} target="_blank" className="text-xs">
                              GitHub
                            </Link>
                          </Button>
                        )}
                        {project.live_url && (
                          <Button asChild>
                            <Link href={project.live_url} target="_blank" className="text-xs">
                              Live Demo
                            </Link>
                          </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* See More Button */}
        {!showAll && projects.length > 4 && (
          <div className="flex justify-center mt-10">
            <Button size="lg" onClick={() => setShowAll(true)}>
              See More
            </Button>
          </div>
        )}
      </section>
    </div>
  );
}
