"use client";

import Link from "next/link";
import AdminBell from "./AdminBell";

export default function AdminHeader() {
  return (
    <header className="w-full h-16 border-b flex items-center justify-between px-6 bg-background">
      <h1 className="font-bold text-lg">Admin</h1>

      <div className="flex items-center gap-6">
        <Link href="/admin/messages">
          <AdminBell />
        </Link>
      </div>
    </header>
  );
}
