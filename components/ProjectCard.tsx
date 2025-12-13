interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link?: string;
}

export default function ProjectCard({
  project,
  onEdit,
  onDelete,
}: {
  project: Project;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="border rounded-lg shadow p-4 flex flex-col">
      <img src={project.image_url} className="w-full h-48 object-cover rounded mb-2" />
      <h2 className="font-bold text-lg">{project.title}</h2>
      <p className="text-gray-700 mt-1">{project.description}</p>
      {project.link && (
        <a href={project.link} target="_blank" className="text-blue-500 mt-2">
          View Project
        </a>
      )}
      <div className="mt-4 flex gap-2">
        <button
          className="bg-yellow-400 text-white px-3 py-1 rounded"
          onClick={() => onEdit(project.id)}
        >
          Edit
        </button>
        <button
          className="bg-red-500 text-white px-3 py-1 rounded"
          onClick={() => onDelete(project.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
