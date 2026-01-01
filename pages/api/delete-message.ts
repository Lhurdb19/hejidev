import type { NextApiRequest, NextApiResponse } from "next";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "DELETE") {
    return res.status(405).end();
  }

  const { id } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Message ID required" });
  }

  const { error } = await supabaseAdmin
    .from("contacts")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Delete error:", error);
    return res.status(500).json({ error: error.message });
  }

  return res.status(200).json({ success: true });
}
