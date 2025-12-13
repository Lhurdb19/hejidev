import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useRouter } from "next/router";

export default function withAdmin(Page: any) {
  return function ProtectedPage(props: any) {
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      const checkAuth = async () => {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        // check admin role from DB
        const { data: adminData } = await supabase
          .from("profiles")
          .select("role")
          .eq("id", user.id)
          .single();

        if (!adminData || adminData.role !== "admin") {
          router.push("/");
          return;
        }

        setLoading(false);
      };

      checkAuth();
    }, []);

    if (loading) {
      return <div className="p-10 text-center">Checking admin access...</div>;
    }

    return <Page {...props} />;
  };
}
