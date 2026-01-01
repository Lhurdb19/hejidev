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
}

function AdminMessages() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [selected, setSelected] = useState<Message | null>(null);
    const [loading, setLoading] = useState(true);
    const [reply, setReply] = useState("");
    const [sending, setSending] = useState(false);

    const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
    const [deleting, setDeleting] = useState(false);


    const fetchMessages = async () => {
        const { data, error } = await supabase
            .from("contacts")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            toast.error("Failed to load messages");
            return;
        }

        setMessages(data || []);
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
            .on(
                "postgres_changes",
                { event: "DELETE", schema: "public", table: "contacts" },
                (payload) => {
                    setMessages((prev) =>
                        prev.filter((m) => m.id !== payload.old.id)
                    );
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const markAsRead = async (id: string) => {
        await fetch("/api/mark-read", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        setMessages((prev) =>
            prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
        );
    };

    const deleteMessage = async (id: string) => {
        if (!confirm("Delete this message permanently?")) return;

        const res = await fetch("/api/delete-message", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id }),
        });

        if (!res.ok) {
            toast.error("Failed to delete message");
            return;
        }

        toast.success("Message deleted");
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
                                        onClick={() => setDeleteTarget(msg)}
                                    >

                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            )}

            <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Message from {selected?.name}
                        </DialogTitle>
                    </DialogHeader>

                    <p className="text-sm text-muted-foreground">{selected?.email}</p>
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

            {/* DELETE CONFIRMATION OVERLAY */}
<Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
  <DialogContent className="max-w-md">
    <DialogHeader>
      <DialogTitle className="text-red-600">
        Delete Message?
      </DialogTitle>
    </DialogHeader>

    <p className="text-sm text-muted-foreground">
      This action is permanent and cannot be undone.
    </p>

    <div className="mt-4 p-3 rounded-md bg-muted text-sm">
      <p className="font-medium">{deleteTarget?.name}</p>
      <p className="text-muted-foreground truncate">
        {deleteTarget?.subject || "No subject"}
      </p>
    </div>

    <div className="flex justify-end gap-3 mt-6">
      <Button
        variant="outline"
        onClick={() => setDeleteTarget(null)}
      >
        Cancel
      </Button>

      <Button
        variant="destructive"
        disabled={deleting}
        onClick={async () => {
          if (!deleteTarget) return;

          setDeleting(true);

          const res = await fetch("/api/delete-message", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: deleteTarget.id }),
          });

          if (res.ok) {
            toast.success("Message deleted");
            setDeleteTarget(null);
          } else {
            toast.error("Failed to delete message");
          }

          setDeleting(false);
        }}
      >
        {deleting ? "Deleting..." : "Delete"}
      </Button>
    </div>
  </DialogContent>
</Dialog>

        </DashboardLayout>
    );
}

export default withAdmin(AdminMessages);


// "use client";

// import { useEffect, useState } from "react";
// import DashboardLayout from "@/components/admin/Layout";
// import withAdmin from "@/utils/withAdmin";
// import { supabase } from "@/lib/supabase";
// import {
//   Table,
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import { Eye, Trash2 } from "lucide-react";
// import { toast } from "sonner";
// import { Textarea } from "@/components/ui/textarea";

// interface Message {
//   id: string;
//   name: string;
//   email: string;
//   phone?: string;
//   subject?: string;
//   message: string;
//   created_at: string;
//   is_read?: boolean;
//   replied?: boolean;
// }

// function AdminMessages() {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [selected, setSelected] = useState<Message | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [reply, setReply] = useState("");
//   const [sending, setSending] = useState(false);

//   // ✅ REQUIRED FOR DELETE DIALOG
//   const [deleteTarget, setDeleteTarget] = useState<Message | null>(null);
//   const [deleting, setDeleting] = useState(false);

//   /* ---------------- FETCH ---------------- */
//   const fetchMessages = async () => {
//     const { data, error } = await supabase
//       .from("contacts")
//       .select("*")
//       .order("created_at", { ascending: false });

//     if (error) {
//       toast.error("Failed to load messages");
//       return;
//     }

//     setMessages(data || []);
//     setLoading(false);
//   };

//   useEffect(() => {
//     fetchMessages();

//     const channel = supabase
//       .channel("contacts-realtime")
//       .on(
//         "postgres_changes",
//         { event: "INSERT", schema: "public", table: "contacts" },
//         (payload) => {
//           setMessages((prev) => [payload.new as Message, ...prev]);
//           toast(`📩 New message from ${payload.new.name}`);
//         }
//       )
//       .subscribe();

//     return () => {
//       supabase.removeChannel(channel);
//     };
//   }, []);

//   /* ---------------- ACTIONS ---------------- */
//   const markAsRead = async (id: string) => {
//     await fetch("/api/mark-read", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ id }),
//     });

//     setMessages((prev) =>
//       prev.map((m) => (m.id === id ? { ...m, is_read: true } : m))
//     );
//   };

//   /* ---------------- UI ---------------- */
//   return (
//     <DashboardLayout>
//       <h2 className="text-3xl font-bold mb-6">Contact Messages</h2>

//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Subject</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className="text-right">Actions</TableHead>
//             </TableRow>
//           </TableHeader>

//           <TableBody>
//             {messages.map((msg) => (
//               <TableRow key={msg.id}>
//                 <TableCell>{msg.name}</TableCell>
//                 <TableCell>{msg.email}</TableCell>
//                 <TableCell>{msg.subject || "-"}</TableCell>
//                 <TableCell>
//                   {msg.replied ? (
//                     <span className="text-blue-600 font-semibold">Replied</span>
//                   ) : msg.is_read ? (
//                     <span className="text-green-600 font-semibold">Read</span>
//                   ) : (
//                     <span className="text-red-600 font-semibold">Unread</span>
//                   )}
//                 </TableCell>

//                 <TableCell className="text-right flex gap-2 justify-end">
//                   <Button
//                     size="icon"
//                     variant="outline"
//                     onClick={() => {
//                       setSelected(msg);
//                       setReply("");
//                       if (!msg.is_read) markAsRead(msg.id);
//                     }}
//                   >
//                     <Eye className="h-4 w-4" />
//                   </Button>

//                   <Button
//                     size="icon"
//                     variant="destructive"
//                     onClick={() => setDeleteTarget(msg)}
//                   >
//                     <Trash2 className="h-4 w-4" />
//                   </Button>
//                 </TableCell>
//               </TableRow>
//             ))}
//           </TableBody>
//         </Table>
//       )}

//       {/* ---------------- VIEW MESSAGE ---------------- */}
//       <Dialog open={!!selected} onOpenChange={() => setSelected(null)}>
//         <DialogContent>
//           <DialogHeader>
//             <DialogTitle>
//               Message from {selected?.name}
//             </DialogTitle>
//           </DialogHeader>

//           <p className="text-sm text-muted-foreground">{selected?.email}</p>
//           <p className="mt-4">{selected?.message}</p>

//           <Textarea
//             className="mt-4"
//             placeholder="Type your reply..."
//             value={reply}
//             onChange={(e) => setReply(e.target.value)}
//           />

//           <Button
//             disabled={sending || !reply}
//             onClick={async () => {
//               if (!selected) return;

//               setSending(true);

//               const res = await fetch("/api/reply-message", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                   messageId: selected.id,
//                   to: selected.email,
//                   subject: selected.subject,
//                   reply,
//                 }),
//               });

//               if (res.ok) {
//                 toast.success("Reply sent");
//                 setSelected(null);
//                 setReply("");
//               } else {
//                 toast.error("Failed to send reply");
//               }

//               setSending(false);
//             }}
//           >
//             {sending ? "Sending..." : "Send Reply"}
//           </Button>
//         </DialogContent>
//       </Dialog>

//       {/* ---------------- DELETE CHOICE DIALOG (ADD HERE ✅) ---------------- */}
//       <Dialog open={!!deleteTarget} onOpenChange={() => setDeleteTarget(null)}>
//         <DialogContent className="max-w-md">
//           <DialogHeader>
//             <DialogTitle className="text-red-600">
//               Delete Message?
//             </DialogTitle>
//           </DialogHeader>

//           <p className="text-sm text-muted-foreground">
//             Choose how you want to delete this message.
//           </p>

//           <div className="mt-4 p-3 rounded-md bg-muted text-sm">
//             <p className="font-medium">{deleteTarget?.name}</p>
//             <p className="text-muted-foreground truncate">
//               {deleteTarget?.subject || "No subject"}
//             </p>
//           </div>

//           <div className="flex flex-col gap-3 mt-6">
//             {/* SOFT DELETE */}
//             <Button
//               variant="outline"
//               disabled={deleting}
//               onClick={async () => {
//                 if (!deleteTarget) return;

//                 setDeleting(true);

//                 const res = await fetch("/api/soft-delete-message", {
//                   method: "PATCH",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({ id: deleteTarget.id }),
//                 });

//                 if (res.ok) {
//                   toast.success("Message moved to Trash");
//                   setMessages((prev) =>
//                     prev.filter((m) => m.id !== deleteTarget.id)
//                   );
//                   setDeleteTarget(null);
//                 } else {
//                   toast.error("Failed to move message to trash");
//                 }

//                 setDeleting(false);
//               }}
//             >
//               🗑️ Move to Trash (Soft Delete)
//             </Button>

//             {/* HARD DELETE */}
//             <Button
//               variant="destructive"
//               disabled={deleting}
//               onClick={async () => {
//                 if (!deleteTarget) return;

//                 if (!confirm("This will permanently delete the message. Continue?"))
//                   return;

//                 setDeleting(true);

//                 const res = await fetch("/api/delete-message", {
//                   method: "DELETE",
//                   headers: { "Content-Type": "application/json" },
//                   body: JSON.stringify({ id: deleteTarget.id }),
//                 });

//                 if (res.ok) {
//                   toast.success("Message permanently deleted");
//                   setMessages((prev) =>
//                     prev.filter((m) => m.id !== deleteTarget.id)
//                   );
//                   setDeleteTarget(null);
//                 } else {
//                   toast.error("Failed to delete message");
//                 }

//                 setDeleting(false);
//               }}
//             >
//               ❌ Permanent Delete
//             </Button>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </DashboardLayout>
//   );
// }

// export default withAdmin(AdminMessages);
