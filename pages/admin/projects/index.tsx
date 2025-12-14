import DashboardLayout from "@/components/admin/Layout";
import { supabase } from "@/lib/supabase";
import withAdmin from "@/utils/withAdmin";
import { useEffect, useState } from "react";
import Link from "next/link";

function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("projects").select("*").order("created_at", { ascending: false })
      .then(({ data }) => {
        setProjects(data || []);
        setLoading(false);
      });
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link href="/admin/projects/create" className="bg-white/60 text-black/80 px-4 py-2 rounded">
          Add Project
        </Link>
      </div>

      {loading ? "Loading..." : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded-2xl shadow overflow-hidden">
              {p.image_url && <img src={p.image_url} className="h-40 w-full object-cover" />}
              <div className="p-4">
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">{p.description}</p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {p.technologies?.map((t: string) => (
                    <span key={t} className="text-xs bg-purple-100 px-2 py-1 rounded-full">{t}</span>
                  ))}
                </div>

                <Link href={`/admin/projects/${p.id}`} className="text-blue-600 text-sm mt-3 inline-block">
                  Edit →
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default withAdmin(ProjectsPage);
