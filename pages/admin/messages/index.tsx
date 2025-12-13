"use client";

import { useEffect, useState } from "react";
import DashboardLayout from "@/components/admin/Layout";
import withAdmin from "@/utils/withAdmin";
import { supabase } from "@/lib/supabase";
import {
    Table,
    TableHeader,
    TableRow,
    TableHead,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

interface Message {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject?: string;
    message: string;
    created_at: string;
    is_read?: boolean;
    replied?: boolean;
    replied_at?: string;
}

function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selected, setSelected] = useState<Message | null>(null);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState("");
    const [sending, setSending] = useState(false);

    const fetchMessages = async () => {
        const { data } = await supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false });

        if (data) setMessages(data);
        setLoading(false);
    };

    useEffect(() => {
        fetchMessages();

        const channel = supabase
            .channel("contacts-realtime")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "contacts" },
                (payload) => {
                    setMessages((prev) => [payload.new as Message, ...prev]);
                    toast(`📩 New message from ${payload.new.name}`);
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const markAsRead = async (id: string) => {
        await supabase.from("contacts").update({ is_read: true }).eq("id", id);
        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
        );
    };

    const deleteMessage = async (id: string) => {
        if (!confirm("Delete this message?")) return;
        await supabase.from("contacts").delete().eq("id", id);
        setMessages((prev) => prev.filter((m) => m.id !== id));
    };

    return (
        <DashboardLayout>
            <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {messages.map((msg) => (
                            <TableRow key={msg.id}>
                                <TableCell>{msg.name}</TableCell>
                                <TableCell>{msg.email}</TableCell>
                                <TableCell>{msg.subject || "-"}</TableCell>
                                <TableCell>
                                    {msg.replied ? (
                                        <span className="text-blue-600 font-semibold">Replied</span>
                                    ) : msg.is_read ? (
                                        <span className="text-green-600 font-semibold">Read</span>
                                    ) : (
                                        <span className="text-red-600 font-semibold">Unread</span>
                                    )}
                                </TableCell>


                                <TableCell className="text-right flex gap-2 justify-end">
                                    <Button
                                        size="icon"
                                        variant="outline"
                                        onClick={() => {
                                            setSelected(msg);
                                            setReply("");
                                            if (!msg.is_read) markAsRead(msg.id);
                                        }}
                                    >
                                        <Eye className="h-4 w-4" />
                                    </Button>

                                    <Button
                                        size="icon"
                                        variant="destructive"
                                        onClick={() => deleteMessage(msg.id)}
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            {/* MESSAGE + REPLY DIALOG */}
            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Message from {selected?.name}
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">{selected?.email}</p>
                    {selected?.phone && <p>📞 {selected.phone}</p>}

                    <p className="mt-4">{selected?.message}</p>

                    <Textarea
                        className="mt-4"
                        placeholder="Type your reply..."
                        value={reply}
                        onChange={(e) => setReply(e.target.value)}
                    />

                    <Button
                        disabled={sending || !reply}
                        onClick={async () => {
                            if (!selected) return;

                            setSending(true);

                            const res = await fetch("/api/reply-message", {
                                method: "POST",
                                headers: { "Content-Type": "application/json" },
                                body: JSON.stringify({
                                    messageId: selected.id,
                                    to: selected.email,
                                    subject: selected.subject,
                                    reply,
                                }),
                            });

                            if (res.ok) {
                                toast.success("Reply sent");
                                setMessages((prev) =>
                                    prev.map((m) =>
                                        m.id === selected.id ? { ...m, replied: true } : m
                                    )
                                );
                                setSelected(null);
                                setReply("");
                            } else {
                                toast.error("Failed to send reply");
                            }

                            setSending(false);
                        }}
                    >
                        {sending ? "Sending..." : "Send Reply"}
                    </Button>
                </DialogContent>
            </Dialog>
        </DashboardLayout>
    );
}

export default withAdmin(AdminMessages);
