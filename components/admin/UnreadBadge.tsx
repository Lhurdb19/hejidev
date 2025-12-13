"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Badge } from "@/components/ui/badge";

export default function UnreadBadge() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const fetchUnread = async () => {
      const { count } = await supabase
        .from("contacts")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);

      setCount(count || 0);
    };

    fetchUnread();
  }, []);

  if (count === 0) return null;

  return (
    <Badge className="ml-auto bg-red-600 text-white">
      {count}
    </Badge>
  );
}
