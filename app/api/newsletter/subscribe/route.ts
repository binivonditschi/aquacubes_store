import { NextRequest, NextResponse } from "next/server";

const CRM_FUNCTIONS_URL = "https://qiimdduitaqbrcbwrzbx.supabase.co/functions/v1";

export async function POST(req: NextRequest) {
  try {
    const { email, name } = await req.json();

    if (!email || typeof email !== "string") {
      return NextResponse.json({ error: "Missing email" }, { status: 400 });
    }

    const res = await fetch(`${CRM_FUNCTIONS_URL}/capture-lead`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name?.trim() || email.split("@")[0],
        email,
        interest: "newsletter",
        source: "website",
      }),
    });

    const data = await res.json();
    if (!res.ok || !data.ok) {
      console.error("CRM capture-lead error:", res.status, data);
      return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json({ error: "Failed to subscribe" }, { status: 500 });
  }
}
