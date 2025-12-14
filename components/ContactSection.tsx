"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, Github, Linkedin, Send } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { toast } from "sonner";

export default function ContactSection() {
    const [loading, setLoading] = useState(false);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const res = await fetch("/api/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form),
        });

        const data = await res.json();

        if (data.success) {
            toast.success("Message sent successfully!");
            setForm({
                name: "",
                email: "",
                phone: "",
                subject: "",
                message: "",
            });
        } else {
            toast.error("Something went wrong. Try again.");
        }

        setLoading(false);
    };


    return (
        <section
            id="contact"
            className="w-full max-w-7xl mx-auto px-4 md:px-20 py-20"
        >
            <motion.h2
                className="text-3xl md:text-4xl font-bold text-center mb-12"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
            >
                Get In Touch
            </motion.h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                {/* Contact Info */}
                <motion.div
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Card className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl space-y-6">
                        <h3 className="text-2xl font-semibold">Let’s work together</h3>

                        <p className="text-gray-600 dark:text-gray-300">
                            Feel free to reach out for collaborations, job opportunities, or
                            just to say hello.
                        </p>

                        <div className="space-y-4">
                            <a
                                href="tel:+2347011560069"
                                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition"
                            >
                                <Phone className="h-5 w-5" />
                                +234 701 156 0069
                            </a>

                            <a
                                href="mailto:hejidev19@gmail.com"
                                className="flex items-center gap-3 text-gray-700 dark:text-gray-300 hover:text-primary transition"
                            >
                                <Mail className="h-5 w-5" />
                                hejidev19@gmail.com
                            </a>
                        </div>

                        {/* Social Links */}
                        <div className="flex gap-4 pt-4">
                            <a
                                href="https://github.com/lhurdb19"
                                target="_blank"
                                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition"
                            >
                                <Github />
                            </a>
                            <a
                                href="https://linkedin.com/in/hejidev"
                                target="_blank"
                                className="p-3 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-primary hover:text-white transition"
                            >
                                <Linkedin />
                            </a>
                        </div>
                    </Card>
                </motion.div>

                {/* Contact Form */}
                <motion.div
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <Card className="p-8 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl">
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <Input
                                placeholder="Your Name"
                                value={form.name}
                                required
                                onChange={(e) =>
                                    setForm({ ...form, name: e.target.value })
                                }
                            />

                            <Input
                                type="email"
                                placeholder="Your Email"
                                value={form.email}
                                required
                                onChange={(e) =>
                                    setForm({ ...form, email: e.target.value })
                                }
                            />
                            <Input
                                type="phone"
                                placeholder="Your Phone Number"
                                value={form.phone}
                                required
                                onChange={(e) =>
                                    setForm({ ...form, phone: e.target.value })
                                }
                            />
                            <Input
                                placeholder="Subject"
                                value={form.subject}
                                required
                                onChange={(e) =>
                                    setForm({ ...form, subject: e.target.value })
                                }
                            />

                            <Textarea
                                placeholder="Your Message"
                                rows={5}
                                value={form.message}
                                required
                                onChange={(e) =>
                                    setForm({ ...form, message: e.target.value })
                                }
                            />

                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Sending..." : "Send Message"}
                                <Send className="ml-2 h-4 w-4" />
                            </Button>
                        </form>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
