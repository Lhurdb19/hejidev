// pages/_app.tsx
import AdminShortcut from "@/components/admin/AdminShortcut";
import { ThemeToggle } from "@/components/ThemeToggle";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AdminShortcut /> {/* Hidden admin login shortcut */}
      
      {/* FIXED THEME TOGGLE */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <Component {...pageProps} />
      <Toaster position="top-right" richColors />
    </>
  );
}
