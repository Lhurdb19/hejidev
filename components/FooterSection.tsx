import Link from "next/link";
import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-8xl w-full border-t bg-black/70 dark:bg-gray-800">
      <div className="w-full mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
        
        {/* BRAND */}
        <div>
          <h3 className="text-xl font-bold">Hejidev</h3>
          <p className="text-sm text-muted-foreground mt-2 max-w-xs">
            Frontend & Full-Stack Developer focused on building clean,
            scalable, and user-friendly applications.
          </p>
        </div>

        {/* QUICK LINKS */}
        <div>
          <h4 className="font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link href="/" className="hover:underline">Home</Link></li>
            <li><Link href="/projects" className="hover:underline">Projects</Link></li>
            <li><Link href="/about" className="hover:underline">About</Link></li>
            <li><Link href="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* SOCIAL */}
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <div className="flex gap-4">
            <Link href="https://github.com/yourusername" target="_blank">
              <Github className="w-5 h-5 hover:text-primary" />
            </Link>
            <Link href="https://linkedin.com/in/yourusername" target="_blank">
              <Linkedin className="w-5 h-5 hover:text-primary" />
            </Link>
            <Link href="mailto:hejidev19@gmail.com">
              <Mail className="w-5 h-5 hover:text-primary" />
            </Link>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground py-4 border-t">
        © {new Date().getFullYear()} Hejidev. All rights reserved.
      </div>
    </footer>
  );
}
