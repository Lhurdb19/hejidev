"use client";

import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import AdminHeader from "./AdminHeader";

export default function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar />

      <div className="flex-1 ml-64">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
