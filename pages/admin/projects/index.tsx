import DashboardLayout from "@/components/admin/Layout";
import { supabase } from "@/lib/supabase";
import withAdmin from "@/utils/withAdmin";
import { useEffect, useState } from "react";
import Link from "next/link";

function ProjectsPage() {
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState<any[]>([]);

  const fetchProjects = async () => {
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: false });

    if (!error) setProjects(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  return (
    <DashboardLayout>
      <div className="flex justify-between mb-6">
        <h2 className="text-2xl font-bold">Projects</h2>
        <Link href="/admin/projects/create">
          <div className="bg-black text-white px-4 py-2 rounded">Add Project</div>
        </Link>
      </div>

      {loading ? (
        <div className="space-y-4">Loading...</div>
      ) : (
        <div className="space-y-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-white p-4 rounded shadow flex justify-between">
              <div>
                <h3 className="font-semibold">{p.title}</h3>
                <p className="text-sm text-gray-500">{p.description}</p>
              </div>
              <Link href={`/admin/projects/${p.id}`} className="text-blue-600">
                Edit
              </Link>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default withAdmin(ProjectsPage);
