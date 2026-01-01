import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";
import { sendMail } from "@/lib/sendMail";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") return res.status(405).end();

  const { messageId, to, subject, reply } = req.body;

  if (!messageId || !to || !reply) {
    return res.status(400).json({ error: "Missing fields" });
  }

  try {
    // 🔹 Get original message (for context)
    const { data: original, error: fetchError } = await supabaseAdmin
      .from("contacts")
      .select("name, email, subject, message, created_at")
      .eq("id", messageId)
      .single();

    if (fetchError || !original) {
      return res.status(500).json({ error: "Original message not found" });
    }

    // 🔹 Send styled reply email
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
    body {
      font-family: 'Inter', system-ui, sans-serif;
      background-color: #f9f9fb;
      margin: 0;
      padding: 0;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 12px;
      padding: 24px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.05);
    }
    h1 {
      color: #7c3aed;
      font-size: 24px;
      margin-bottom: 12px;
    }
    p {
      font-size: 16px;
      line-height: 1.6;
      margin: 8px 0;
    }
    .label {
      font-weight: 600;
      color: #111;
    }
    .box {
      background: #f8fafc;
      padding: 16px;
      border-radius: 10px;
      margin-top: 12px;
    }
    .divider {
      margin: 28px 0;
      border-top: 1px solid #e5e7eb;
    }
    .button {
      display: inline-block;
      margin-top: 20px;
      padding: 12px 24px;
      background: #7c3aed;
      color: #ffffff !important;
      border-radius: 8px;
      text-decoration: none;
      font-weight: 600;
    }
    .signature {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-top: 24px;
    }
    .avatar {
      width: 44px;
      height: 44px;
      border-radius: 50%;
      background: #7c3aed;
      color: #fff;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
    .footer {
      font-size: 14px;
      color: #888;
      margin-top: 6px;
    }
    @media (prefers-color-scheme: dark) {
      body {
        background-color: #0f172a;
        color: #e5e7eb;
      }
      .container {
        background: #020617;
      }
      .box {
        background: #020617;
      }
      .divider {
        border-color: #1e293b;
      }
    }
  </style>
</head>
<body>
  <div class="container">

    <h1>Reply from Hejidev</h1>

    <p>Hello ${original.name},</p>
    <p>Thank you for reaching out. Below is my response to your message:</p>

    <!-- ADMIN REPLY -->
    <div class="box">
      ${reply.replace(/\n/g, "<br/>")}
    </div>

    <!-- SIGNATURE -->
    <div class="signature">
      <div class="avatar">H</div>
      <div>
        <strong>Hejidev</strong>
        <div class="footer">
          Frontend Engineer<br/>
          ${new Date().toLocaleString()}
        </div>
      </div>
    </div>

    <a href="https://hejidev.vercel.app/" class="button">
      View Portfolio
    </a>

    <div class="divider"></div>

    <!-- ORIGINAL MESSAGE -->
    <h1 style="font-size:20px;">Original Message</h1>

    <p><span class="label">From:</span> ${original.name} (${original.email})</p>
    <p><span class="label">Subject:</span> ${original.subject || "-"}</p>

    <div class="box">
      ${original.message.replace(/\n/g, "<br/>")}
    </div>

  </div>
</body>
</html>
`,
    });

    // 🔹 Update DB (ADMIN privileges)
    const { error } = await supabaseAdmin
      .from("contacts")
      .update({
        replied: true,
        is_read: true,
        replied_at: new Date().toISOString(),
      })
      .eq("id", messageId);

    if (error) {
      console.error("DB update error:", error);
      return res.status(500).json({ error: error.message });
    }

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Failed to send reply" });
  }
}
