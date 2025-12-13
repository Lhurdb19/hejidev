import DashboardLayout from "@/components/admin/Layout";
import withAdmin from "@/utils/withAdmin";
import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";

function UsersPage() {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const { data, error } = await supabase.from("profiles").select("*");
    if (!error) setUsers(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-bold mb-6 text-black/80">Registered Users</h2>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="space-y-4 text-black/80">
          {users.map((u) => (
            <div key={u.id} className="bg-white p-4 rounded shadow">
              <p className="font-semibold">{u.full_name}</p>
              <p>{u.email}</p>
              <p>{u.phone}</p>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default withAdmin(UsersPage);
