import nodemailer from "nodemailer";

export async function sendMail({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.ADMIN_EMAIL,
      pass: process.env.ADMIN_EMAIL_PASSWORD, // Gmail App Password
    },
  });

  await transporter.sendMail({
    from: `"Hejidev Portfolio" <${process.env.ADMIN_EMAIL}>`,
    to,
    subject,
    html,
  });
}
