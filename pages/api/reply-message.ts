import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "@/lib/supabase";
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
        // 1️⃣ Send reply email
        await sendMail({
            to,
            subject: subject ? `Re: ${subject}` : "Re: Your message",
            html: `
        <p>${reply.replace(/\n/g, "<br/>")}</p>
        <br/>
        <p>Best regards,<br/>Hejidev</p>
      `,
        });

        // 2️⃣ Update Supabase
        await supabase
            .from("contacts")
            .update({
                replied: true,
                is_read: true, // 🔥 IMPORTANT
                replied_at: new Date().toISOString(),
            })
            .eq("id", messageId);


        return res.status(200).json({ success: true });
    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: error.message });
    }
}
