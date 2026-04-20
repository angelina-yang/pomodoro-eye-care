import { NextRequest, NextResponse } from "next/server";
import { isRateLimited, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers);
    if (isRateLimited(`register:${ip}`, 5, 60 * 1000)) {
      return NextResponse.json({ error: "Too many requests" }, { status: 429 });
    }

    const { name, email, newsletter } = await req.json();
    if (!email || !email.includes("@") || email.length > 320) {
      return NextResponse.json({ error: "Valid email required" }, { status: 400 });
    }

    if (!name || typeof name !== "string" || name.length > 200) {
      return NextResponse.json({ error: "Valid name required" }, { status: 400 });
    }

    // 1. Log to signup webhook (always — captures all signups)
    const sheetWebhook = process.env.GOOGLE_SHEET_WEBHOOK;
    if (sheetWebhook) {
      try {
        const sheetPayload = JSON.stringify({
          name,
          email,
          newsletter: Boolean(newsletter),
          source: "pomodoro",
        });

        const sheetRes = await fetch(sheetWebhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: sheetPayload,
          redirect: "manual",
        });

        if (sheetRes.status === 302 || sheetRes.status === 301) {
          const redirectUrl = sheetRes.headers.get("location");
          if (redirectUrl) {
            await fetch(redirectUrl);
          }
        }

        console.log(`[Register] Webhook response: ${sheetRes.status}`);
      } catch (sheetErr) {
        console.error("[Register] Webhook logging failed:", sheetErr);
      }
    }

    // 2. Subscribe to Substack (only if user opted in)
    if (newsletter) {
      try {
        await fetch("https://angelinayang.substack.com/api/v1/free", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            first_url: "https://pomodoro.twosetai.com",
            first_referrer: "pomodoro",
          }),
        });
      } catch {
        console.error("[Register] Substack subscription failed");
      }
    }

    console.log(`[Register] ${name} <${email}> newsletter=${newsletter}`);

    return NextResponse.json({ success: true });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Registration failed";
    console.error(`[Register Error] ${message}`);
    return NextResponse.json({ success: true });
  }
}
