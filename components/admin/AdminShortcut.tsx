// pages/_app.tsx or a component included in all pages
import { useEffect } from "react";
import { useRouter } from "next/router";

export default function AdminShortcut() {
  const router = useRouter();

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") { // Ctrl + Shift + A
        router.push("/admin/secret-login-4f7b2c");
      }
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  return null;
}
