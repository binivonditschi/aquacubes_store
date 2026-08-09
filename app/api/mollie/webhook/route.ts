import { NextRequest, NextResponse } from "next/server";
import { mollieClient } from "@/lib/mollie";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const paymentId = formData.get("id") as string;

    if (!paymentId) {
      return NextResponse.json({ error: "No payment ID" }, { status: 400 });
    }

    const payment = await mollieClient.payments.get(paymentId);

    if (payment.isPaid()) {
      const metadata = payment.metadata as Record<string, string> | undefined;
      console.log("Payment paid:", paymentId);
      console.log("Has subscriptions:", metadata?.hasSubscriptions);
      console.log("Has preorder:", metadata?.hasPreorder);
    } else if (payment.isCanceled()) {
      console.log("Payment cancelled:", paymentId);
    } else if (payment.hasFailed()) {
      console.log("Payment failed:", paymentId);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
