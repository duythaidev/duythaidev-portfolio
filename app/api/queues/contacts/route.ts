import { env } from "@/lib/env";
import { handleCallback } from "@vercel/queue";
import { Resend } from "resend";

const resend = new Resend(env.RESEND_API_KEY);

export const POST = handleCallback(async (data, metadata) => {
  try {
    const { subject, message, from } = data as {
      subject: string;
      message: string;
      from: string;
      to: string;
    };

    //Tự gửi cho mình
    await resend.emails.send({
      from: env.EMAIL,
      to: env.EMAIL,
      subject: subject || "Liên hệ từ website",
      text: message || "Nội dung trống",
    });
    console.log("Email sent:", metadata.messageId);
  } catch (error: any) {
    console.error("Lỗi khi gửi mail từ Queue:", error);
    throw error;
  }
});
