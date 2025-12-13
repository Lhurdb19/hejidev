import { useState } from "react";
import DashboardLayout from "@/components/admin/Layout";
import withAdmin from "@/utils/withAdmin";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

function AddProject() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [github, setGithub] = useState("");
    const [liveUrl, setLiveUrl] = useState("");
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        let imageUrl = "";

        // Upload image
        if (imageFile) {
  const ext = imageFile.name.split(".").pop();
  const fileName = `${Date.now()}.${ext}`;
  const filePath = `public/${fileName}`; // <-- add a folder inside the bucket

  const { error: uploadError } = await supabase.storage
    .from("projects")
    .upload(filePath, imageFile, { upsert: false });

  if (uploadError) {
    toast.error(uploadError.message);
    setLoading(false);
    return;
  }

  const { data } = supabase.storage
    .from("projects")
    .getPublicUrl(filePath);

  imageUrl = data.publicUrl;
}


        // Insert project
        const { error } = await supabase.from("projects").insert([
            { title, description, github, live_url: liveUrl, image_url: imageUrl },
        ]);

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Project added successfully!");
            setTitle("");
            setDescription("");
            setGithub("");
            setLiveUrl("");
            setImageFile(null);
        }

        setLoading(false);
    };

    return (
        <DashboardLayout>
            <h2 className="text-2xl font-bold mb-6 text-black/80">Add New Project</h2>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-lg text-black/80">
                <input
                    type="text"
                    placeholder="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border rounded-2xl border-b-purple-900"
                    required
                />

                <textarea
                    placeholder="Project Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border rounded-2xl border-b-purple-900"
                    required
                />

                <input
                    type="text"
                    placeholder="GitHub Link"
                    value={github}
                    onChange={(e) => setGithub(e.target.value)}
                    className="w-full p-3 border rounded-2xl border-b-purple-900"
                />

                <input
                    type="text"
                    placeholder="Live URL"
                    value={liveUrl}
                    onChange={(e) => setLiveUrl(e.target.value)}
                    className="w-full p-3 border rounded-2xl border-b-purple-900"
                />

                <input
                    type="file"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    accept="image/*"
                />

                <button
                    type="submit"
                    className="bg-black text-white px-6 py-3 rounded-2xl hover:opacity-80"
                    disabled={loading}
                >
                    {loading ? "Adding..." : "Add Project"}
                </button>
            </form>
        </DashboardLayout>
    );
}

export default withAdmin(AddProject);
