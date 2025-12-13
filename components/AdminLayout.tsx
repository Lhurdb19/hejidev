import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      <AdminSidebar />
      <div className="flex-1 p-6 bg-gray-100 min-h-screen">
        {children}
      </div>
    </div>
  );
}
