"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/admin/Layout";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function TrashMessages() {
  const [messages, setMessages] = useState<any[]>([]);

  const fetchTrash = async () => {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .not("deleted_at", "is", null)
      .order("deleted_at", { ascending: false });

    if (error) {
      toast.error("Failed to load trash");
      return;
    }

    setMessages(data || []);
  };

  useEffect(() => {
    fetchTrash();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">🗑️ Trash</h2>

      {messages.map((msg) => (
        <div
          key={msg.id}
          className="border p-4 rounded-md flex justify-between mb-3"
        >
          <div>
            <p className="font-semibold">{msg.name}</p>
            <p className="text-sm text-muted-foreground">{msg.subject}</p>
          </div>

          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={async () => {
                const res = await fetch("/api/restore-message", {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ id: msg.id }),
                });

                if (res.ok) {
                  toast.success("Message restored");
                  fetchTrash();
                }
              }}
            >
              ♻️ Restore
            </Button>
          </div>
        </div>
      ))}
    </DashboardLayout>
  );
}
