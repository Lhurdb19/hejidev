"use client";

import DashboardLayout from "@/components/admin/Layout";
import withAdmin from "@/utils/withAdmin";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

function AdminDashboard() {
  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    replied: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const { data } = await supabase.from("contacts").select("*");

      if (!data) return;

      setStats({
        total: data.length,
        unread: data.filter((m) => !m.is_read).length,
        replied: data.filter((m) => m.replied).length,
      });
    };

    fetchStats();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-3xl font-bold mb-6">Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Total Messages</p>
          <h3 className="text-3xl font-bold">{stats.total}</h3>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Unread</p>
          <h3 className="text-3xl font-bold text-red-600">{stats.unread}</h3>
        </Card>

        <Card className="p-6">
          <p className="text-sm text-muted-foreground">Replied</p>
          <h3 className="text-3xl font-bold text-blue-600">{stats.replied}</h3>
        </Card>
      </div>
    </DashboardLayout>
  );
}

export default withAdmin(AdminDashboard);
