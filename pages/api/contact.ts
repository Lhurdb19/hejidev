// pages/api/contact.ts
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

    // 2️⃣ Send email to admin (modern UI)
    await sendMail({
      to: process.env.ADMIN_EMAIL!,
      subject: `New Contact Form Message: ${subject}`,
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #f9f9fb; margin:0; padding:0; color:#333; }
          .container { max-width: 600px; margin: 0 auto; background:#fff; border-radius:12px; padding:24px; box-shadow:0 4px 16px rgba(0,0,0,0.05); }
          h1 { color:#7c3aed; font-size:24px; margin-bottom:16px; }
          p { font-size:16px; line-height:1.6; }
          .label { font-weight:600; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>New Contact Message</h1>
          <p><span class="label">Name:</span> ${name}</p>
          <p><span class="label">Email:</span> ${email}</p>
          <p><span class="label">Phone:</span> ${phone || "-"}</p>
          <p><span class="label">Subject:</span> ${subject || "-"}</p>
          <p><span class="label">Message:</span><br/>${message.replace(/\n/g, "<br/>")}</p>
        </div>
      </body>
      </html>
      `,
    });

    // 3️⃣ Send autoresponse to user (modern UI)
    await sendMail({
      to: email,
      subject: "We received your message",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: 'Inter', sans-serif; background-color: #f9f9fb; margin:0; padding:0; color:#333; }
          .container { max-width: 600px; margin: 0 auto; background:#fff; border-radius:12px; padding:24px; box-shadow:0 4px 16px rgba(0,0,0,0.05); text-align:center; }
          h1 { color:#7c3aed; font-size:24px; margin-bottom:16px; }
          p { font-size:16px; line-height:1.6; margin:12px 0; }
          .button { display:inline-block; margin-top:20px; padding:12px 24px; background:#7c3aed; color:#fff; border-radius:8px; text-decoration:none; font-weight:600; }
          .button:hover { background:#6b21a8; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>Hello ${name},</h1>
          <p>Thank you for reaching out! We have received your message and will get back to you shortly.</p>
          <p>Meanwhile, you can explore my portfolio or contact me directly:</p>
          <a href="https://hejidev.vercel.app/" class="button">Visit Portfolio</a>
          <p style="margin-top:24px;">Best regards,<br/><strong>Hejidev</strong></p>
        </div>
      </body>
      </html>
      `,
    });

    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error(err);
    res.status(500).json({ success: false, error: err.message });
  }
}
