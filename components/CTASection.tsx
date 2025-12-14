"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function CTASection() {
  const [gradient, setGradient] = useState("linear-gradient(135deg, #6366f1, #9333ea)");

  useEffect(() => {
    let t = 0;
    const animate = () => {
      // Generate smooth color transitions using sine waves
      const r1 = Math.floor(99 + 50 * Math.sin(t));
      const g1 = Math.floor(102 + 50 * Math.sin(t + 2));
      const b1 = Math.floor(241 + 50 * Math.sin(t + 4));

      const r2 = Math.floor(147 + 50 * Math.sin(t + 1));
      const g2 = Math.floor(51 + 50 * Math.sin(t + 3));
      const b2 = Math.floor(234 + 50 * Math.sin(t + 5));

      setGradient(`linear-gradient(135deg, rgb(${r1},${g1},${b1}), rgb(${r2},${g2},${b2}))`);
      t += 0.01;
      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  return (
    <section
      className="max-w-11xl w-full py-20 text-white"
      style={{ background: gradient }}
    >
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
