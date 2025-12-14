"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface Project {
  id: number;
  title: string;
  description: string;
  image_url: string;
  github?: string;
  live_url?: string;
}

interface ProjectsSectionProps {
  projects: Project[];
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [showAll, setShowAll] = useState(false);

  const visibleProjects = showAll ? projects : projects.slice(0, 4);

  return (
    <section id="projects" className="py-20">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-600 dark:text-purple-400">
        Recent Projects
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence>
          {visibleProjects.map((project) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="overflow-hidden hover:shadow-xl transition shadow-md dark:shadow-none">
                <CardHeader className="p-0">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="w-full h-48 object-cover"
                  />
                </CardHeader>

                <CardContent className="p-5 space-y-3">
                  <CardTitle className="text-xl">{project.title}</CardTitle>

                  <p className="text-gray-800 dark:text-gray-200 text-sm">
                    {project.description}
                  </p>

                  <div className="flex gap-3 pt-3">
                    {project.live_url && (
                      <Button variant="default" size="sm" asChild>
                        <Link href={project.live_url} target="_blank">
                          Live Demo
                        </Link>
                      </Button>
                    )}

                    {project.github && (
                      <Button variant="outline" size="sm" asChild>
                        <Link href={project.github} target="_blank">
                          GitHub
                        </Link>
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* See More Button */}
      {!showAll && projects.length > 4 && (
        <div className="flex justify-center mt-10">
          <Button size="lg" onClick={() => setShowAll(true)}>
            See More
          </Button>
        </div>
      )}
    </section>
  );
}
