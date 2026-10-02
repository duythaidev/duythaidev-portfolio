import { send } from "@vercel/queue";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { messageId } = await send("contacts", data);

    return NextResponse.json({
      success: true,
      messageId,
      message: "Đã đẩy mail vào hàng đợi thành công!",
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
