// pages/admin/projects/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/admin/Layout";
import withAdmin from "@/utils/withAdmin";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

function EditProject() {
  const router = useRouter();
  const { id } = router.query;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [github, setGithub] = useState("");
  const [liveUrl, setLiveUrl] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(true);

  // 🔹 Technologies
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");

  const addTechnology = () => {
    if (!techInput.trim()) return;
    if (technologies.includes(techInput.trim())) return;
    setTechnologies([...technologies, techInput.trim()]);
    setTechInput("");
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  useEffect(() => {
    if (!id) return;

    const fetchProject = async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        toast.error("Failed to load project");
        return;
      }

      setTitle(data.title || "");
      setDescription(data.description || "");
      setGithub(data.github || "");
      setLiveUrl(data.live_url || "");
      setImageUrl(data.image_url || "");
      setTechnologies(data.technologies || []);
      setLoading(false);
    };

    fetchProject();
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let updatedImageUrl = imageUrl;

    if (imageFile) {
      const fileExt = imageFile.name.split(".").pop();
      const fileName = `project-${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, imageFile, { upsert: true });

      if (uploadError) {
        toast.error("Image upload failed");
        setLoading(false);
        return;
      }

      const { data } = supabase.storage
        .from("projects")
        .getPublicUrl(fileName);

      updatedImageUrl = data.publicUrl;
    }

    const { error } = await supabase
      .from("projects")
      .update({
        title,
        description,
        github,
        live_url: liveUrl,
        image_url: updatedImageUrl,
        technologies,
      })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update project");
    } else {
      toast.success("Project updated successfully!");
    }

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!toast.message("Are you sure you want to delete this project?")) return;

    const { error } = await supabase
      .from("projects")
      .delete()
      .eq("id", id);

    if (!error) {
      toast.success("Project deleted");
      router.push("/admin/projects");
    }
  };

  if (loading) {
    return (
      <DashboardLayout>
        <p>Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Edit Project</h2>

      <form onSubmit={handleUpdate} className="space-y-4 max-w-lg">
        {/* Title */}
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Project title"
          className="w-full p-3 border rounded"
          required
        />

        {/* Description */}
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Project description"
          className="w-full p-3 border rounded min-h-[120px]"
          required
        />

        {/* GitHub URL */}
        <input
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          placeholder="GitHub repository URL"
          className="w-full p-3 border rounded"
        />

        {/* Live URL */}
        <input
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          placeholder="Live project URL"
          className="w-full p-3 border rounded text-white"
        />

        {/* Image Upload */}
        <div className="space-y-2">
          {imageUrl && (
            <img
              src={imageUrl}
              alt="Project"
              className="w-full h-40 object-cover rounded text-white"
            />
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            className="w-full text-white"
          />
        </div>

        {/* Technologies */}
        <div>
          <div className="flex gap-2 mb-2">
            <input
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              placeholder="Add technology (e.g. Next.js)"
              className="flex-1 p-3 border rounded text-white"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="bg-black text-white px-4 rounded"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.map((t) => (
              <span
                key={t}
                onClick={() => removeTechnology(t)}
                className="bg-purple-100 px-3 py-1 rounded-full cursor-pointer text-sm"
              >
                {t} ✕
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-3 rounded"
          >
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-600 text-white px-6 py-3 rounded"
          >
            Delete
          </button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default withAdmin(EditProject);
