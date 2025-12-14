"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Phone, Facebook } from "lucide-react";

export default function Footer() {
  return (
    <footer className="max-w-8xl w-full px-0 md:px-20 border-t bg-black/70 dark:bg-gray-800">
      <div className="w-full mx-auto px-4 md:px-0 py-12 grid gap-8 md:grid-cols-3">
        
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
            <li><Link href="#about" className="hover:underline">About</Link></li>
            <li><Link href="#contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* CONTACT & SOCIAL */}
        <div>
          <h4 className="font-semibold mb-3">Connect</h4>
          <div className="flex flex-col gap-3 text-sm">
            <Link href="mailto:hejidev19@gmail.com" className="flex items-center gap-2 hover:text-primary">
              <Mail className="w-4 h-4" /> hejidev19@gmail.com
            </Link>
            <Link href="tel:+2348130693571" className="flex items-center gap-2 hover:text-primary">
              <Phone className="w-4 h-4" /> +234 813 069 3571
            </Link>
            <div className="flex gap-4 mt-2">
              <Link href="https://github.com/lhurdb19" target="_blank">
                <Github className="w-4 h-4 hover:text-primary" />
              </Link>
              <Link href="https://linkedin.com/in/hejidev" target="_blank">
                <Linkedin className="w-4 h-4 hover:text-black/90" />
              </Link>
              <Link href="https://facebook.com/haryomidey15" target="_blank">
                <Facebook className="w-4 h-4 hover:text-blue-500" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-xs text-muted-foreground py-4 border-t">
        © {new Date().getFullYear()} Hejidev. All rights reserved.
      </div>
    </footer>
  );
}
