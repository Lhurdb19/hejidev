// pages/api/reply-message.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
import { sendMail } from "@/lib/sendMail";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const { messageId, to, subject, reply } = req.body;

  if (!messageId || !to || !reply) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // Send reply email with modern UI
    await sendMail({
      to,
      subject: subject ? `Re: ${subject}` : "Re: Your message",
      html: `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <style>
          body { font-family: 'Inter', sans-serif; background-color:#f9f9fb; margin:0; padding:0; color:#333; }
          .container { max-width:600px; margin:0 auto; background:#fff; border-radius:12px; padding:24px; box-shadow:0 4px 16px rgba(0,0,0,0.05); }
          p { font-size:16px; line-height:1.6; }
          .footer { margin-top:24px; font-size:14px; color:#888; }
        </style>
      </head>
      <body>
        <div class="container">
          <p>${reply.replace(/\n/g, "<br/>")}</p>
          <div class="footer">
            Best regards,<br/>
            <strong>Hejidev</strong>
          </div>
        </div>
      </body>
      </html>
      `,
    });

    // Update Supabase
    await supabase
      .from("contacts")
      .update({
        replied: true,
        is_read: true,
        replied_at: new Date().toISOString(),
      })
      .eq("id", messageId);

    return res.status(200).json({ success: true });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}
