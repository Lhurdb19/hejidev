"use client";

import { Bell } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

export default function AdminBell() {
  const [unreadCount, setUnreadCount] = useState(0);

  const fetchUnread = async () => {
    const { count } = await supabase
      .from("contacts")
      .select("*", { count: "exact", head: true })
      .eq("is_read", false);

    setUnreadCount(count || 0);
  };

  useEffect(() => {
    fetchUnread();
    const interval = setInterval(fetchUnread, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Bell className="w-6 h-6 text-gray-700 dark:text-gray-200" />

      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold px-2 py-0.5 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
}
