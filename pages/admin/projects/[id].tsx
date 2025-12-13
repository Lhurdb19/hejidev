// pages/admin/projects/[id].tsx
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/admin/Layout";
import withAdmin from "@/utils/withAdmin";
import { supabase } from "@/lib/supabase";

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

  useEffect(() => {
    if (!id) return;
    const fetchProject = async () => {
      const { data, error } = await supabase.from("projects").select("*").eq("id", id).single();
      if (error) return;
      setTitle(data.title);
      setDescription(data.description);
      setGithub(data.github);
      setLiveUrl(data.live_url);
      setImageUrl(data.image_url);
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
      const fileName = `${Date.now()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("projects")
        .upload(fileName, imageFile);

      if (uploadError) {
        alert(uploadError.message);
        setLoading(false);
        return;
      }

      const { data: publicUrlData } = supabase.storage.from("projects").getPublicUrl(fileName);
      updatedImageUrl = publicUrlData.publicUrl;
    }

    const { error } = await supabase.from("projects").update({
      title,
      description,
      github,
      live_url: liveUrl,
      image_url: updatedImageUrl,
    }).eq("id", id);

    if (error) alert(error.message);
    else alert("Project updated successfully!");

    setLoading(false);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this project?")) return;

    const { error } = await supabase.from("projects").delete().eq("id", id);
    if (error) alert(error.message);
    else router.push("/admin/projects");
  };

  if (loading) return <DashboardLayout>Loading project...</DashboardLayout>;

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6">Edit Project</h2>
      <form onSubmit={handleUpdate} className="space-y-4 max-w-lg">
        <input type="text" placeholder="Project Title" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-3 border rounded" required />
        <textarea placeholder="Project Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-3 border rounded" required />
        <input type="text" placeholder="GitHub Link" value={github} onChange={(e) => setGithub(e.target.value)} className="w-full p-3 border rounded" />
        <input type="text" placeholder="Live URL" value={liveUrl} onChange={(e) => setLiveUrl(e.target.value)} className="w-full p-3 border rounded" />
        <input type="file" onChange={(e) => setImageFile(e.target.files ? e.target.files[0] : null)} className="w-full" accept="image/*" />
        {imageUrl && <img src={imageUrl} alt="Project Image" className="w-32 h-32 object-cover" />}
        <div className="flex gap-4">
          <button type="submit" className="bg-black text-white px-6 py-3 rounded hover:opacity-80">Update Project</button>
          <button type="button" onClick={handleDelete} className="bg-red-600 text-white px-6 py-3 rounded hover:opacity-80">Delete Project</button>
        </div>
      </form>
    </DashboardLayout>
  );
}

export default withAdmin(EditProject);