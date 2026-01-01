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

    const channel = supabase
      .channel("contacts-count")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "contacts" },
        fetchUnread
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  return (
    <div className="relative">
      <Bell className="w-6 h-6" />
      {unreadCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 rounded-full">
          {unreadCount}
        </span>
      )}
    </div>
  );
}
