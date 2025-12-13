"use client";

import Link from "next/link";
import { LayoutDashboard, Mail, Folder, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/navigation";

export default function Sidebar() {
  const router = useRouter();

  const logout = async () => {
    await supabase.auth.signOut();
    router.push("/");
  };

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-white text-black/90 dark:bg-gray-800 border-r dark:border-gray-700 p-6">
      <h2 className="text-2xl font-bold mb-8">Admin Panel</h2>

      <nav className="space-y-2">
        <Link href="/admin" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <LayoutDashboard size={18} /> Dashboard
        </Link>

        <Link href="/admin/messages" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Mail size={18} /> Messages
        </Link>

        <Link href="/admin/projects" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <Folder size={18} /> Projects
        </Link>

        <Link href="/admin/users" className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-700">
          <User size={18} /> Users
        </Link>
      </nav>

      <Button
        variant="destructive"
        className="mt-10 w-full flex gap-2"
        onClick={logout}
      >
        <LogOut size={16} /> Logout
      </Button>
    </aside>
  );
}
