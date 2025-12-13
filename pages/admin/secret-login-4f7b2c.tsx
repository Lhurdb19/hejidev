// pages/admin/secret-login-4f7b2c.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/lib/supabase";

export default function HiddenAdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretKey, setSecretKey] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SECRET_KEY = process.env.NEXT_PUBLIC_ADMIN_KEY;

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Optional secret key check
    if (SECRET_KEY && secretKey !== SECRET_KEY) {
      setError("Not authorized");
      return;
    }

    setLoading(true);
    const { data: authData, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
      return;
    }

    // Check if user role is admin
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", authData.user?.id)
      .single();

    if (!profile || profile.role !== "admin") {
      setError("Access denied: Not an admin");
      await supabase.auth.signOut();
      setLoading(false);
      return;
    }

    // Redirect to admin dashboard
    router.push("/admin");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 text-black/80">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>

        {SECRET_KEY && (
          <input
            type="text"
            placeholder="Secret Key"
            value={secretKey}
            onChange={(e) => setSecretKey(e.target.value)}
            className="w-full p-3 mb-4 border rounded"
            required
          />
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-4 border rounded"
          required
        />

        {error && <p className="text-red-500 mb-4">{error}</p>}

        <button
          type="submit"
          className="w-full bg-black text-white p-3 rounded hover:opacity-80"
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
}