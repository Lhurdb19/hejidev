import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { name, email, phone, subject, message } = req.body;

  try {
    // Dynamic import to avoid Turbopack issues
    const { sendMail } = await import("@/lib/sendMail");

    // 1️⃣ Save the message in Supabase
    const { error: supabaseError } = await supabase.from("contacts").insert([
      {
        name,
        email,
        phone,
        subject,
        message,
      },
    ]);

    if (supabaseError) {
      console.error("Supabase insert error:", supabaseError);
      return res.status(500).json({ success: false, error: supabaseError.message });
    }

    // 2️⃣ Send email to admin
    await sendMail({
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Form Message: ${subject}`,
      html: `
        <h2>New Contact Message</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `,
    });

    // 3️⃣ Send autoresponse to user
    await sendMail({
      to: email,
      subject: "We received your message",
      html: `
        <p>Hi ${name},</p>
        <p>Thank you for reaching out! We have received your message and will get back to you shortly.</p>
        <p>Best regards,<br/>Hejidev Portfolio Team</p>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
