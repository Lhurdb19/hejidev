// pages/projects/index.tsx
"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Project {
  id: number;
  title: string;
  description: string;
  github?: string;
  live_url?: string;
  image_url?: string;
  created_at: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from<Project>("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects:", error.message);
    } else if (data) {
      setProjects(data);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  if (loading) return <p className="text-center mt-10">Loading projects...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 space-y-6">
      <h1 className="text-3xl font-bold text-center">Our Projects</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <Card key={project.id} className="overflow-hidden">
            {project.image_url && (
              <img
                src={project.image_url}
                alt={project.title}
                className="w-full h-48 object-cover rounded-t"
              />
            )}
            <div className="p-4 space-y-2">
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-gray-600 text-sm">{project.description}</p>
              <div className="flex gap-2 mt-2">
                {project.github && (
                  <Button asChild variant="outline">
                    <Link href={project.github} target="_blank">
                      GitHub
                    </Link>
                  </Button>
                )}
                {project.live_url && (
                  <Button asChild>
                    <Link href={project.live_url} target="_blank">
                      Live Demo
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
