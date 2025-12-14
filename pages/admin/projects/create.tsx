"use client";

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

  // 🔹 NEW: technologies state
  const [technologies, setTechnologies] = useState<string[]>([]);
  const [techInput, setTechInput] = useState("");

  // 🔹 NEW: helpers
  const addTechnology = () => {
    if (!techInput.trim()) return;
    setTechnologies([...technologies, techInput.trim()]);
    setTechInput("");
  };

  const removeTechnology = (tech: string) => {
    setTechnologies(technologies.filter(t => t !== tech));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let imageUrl = "";

    if (imageFile) {
      const ext = imageFile.name.split(".").pop();
      const fileName = `${Date.now()}.${ext}`;
      const filePath = `public/${fileName}`;

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

    const { error } = await supabase.from("projects").insert([
      {
        title,
        description,
        github,
        live_url: liveUrl,
        image_url: imageUrl,
        technologies, // 🔹 NEW
      },
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
      setTechnologies([]);
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
          className="w-full p-3 border rounded-2xl border-b-purple-900 text-white"
          required
        />

        <textarea
          placeholder="Project Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 border rounded-2xl border-b-purple-900 text-white"
          required
        />

        <input
          type="text"
          placeholder="GitHub Link"
          value={github}
          onChange={(e) => setGithub(e.target.value)}
          className="w-full p-3 border rounded-2xl border-b-purple-900 text-white"
        />

        <input
          type="text"
          placeholder="Live URL"
          value={liveUrl}
          onChange={(e) => setLiveUrl(e.target.value)}
          className="w-full p-3 border rounded-2xl border-b-purple-900 text-white"
        />

        {/* 🔹 NEW: Technologies UI */}
        <div>
          <label className="block mb-2 font-medium">Technologies Used</label>
          <div className="flex gap-2 mb-2">
            <input
              type="text"
              placeholder="e.g React"
              value={techInput}
              onChange={(e) => setTechInput(e.target.value)}
              className="flex-1 p-3 border rounded-2xl border-b-purple-900 text-white"
            />
            <button
              type="button"
              onClick={addTechnology}
              className="bg-black text-white px-4 rounded-2xl"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {technologies.map((tech) => (
              <span
                key={tech}
                onClick={() => removeTechnology(tech)}
                className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm cursor-pointer"
              >
                {tech} ✕
              </span>
            ))}
          </div>
        </div>

        <input
          type="file"
          onChange={(e) => setImageFile(e.target.files?.[0] || null)}
          accept="image/*"
        />

        <button
          type="submit"
          className="bg-white/60 text-black/80 px-6 py-3 rounded-2xl hover:opacity-80"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Project"}
        </button>
      </form>
    </DashboardLayout>
  );
}

export default withAdmin(AddProject);
