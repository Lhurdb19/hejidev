"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

export default function CTASection() {
  return (
    <section className="max-w-8xl w-full py-20 bg-linear-to-br from-primary/60 to-primary text-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="w-full mx-auto px-6 text-center space-y-6"
      >
        <h2 className="text-3xl md:text-4xl font-bold">
          Let’s Build Something Great Together 🚀
        </h2>

        <p className="text-lg text-white/90 max-w-2xl mx-auto">
          I’m open to frontend, full-stack, and freelance opportunities.
          If you have a project or idea, let’s talk.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Button asChild size="lg" variant="secondary">
            <Link href="#contact">Contact Me</Link>
          </Button>

          <Button asChild size="lg" variant="outline">
            <Link href="/projects">View Projects</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
