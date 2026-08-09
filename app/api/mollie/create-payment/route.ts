import { NextRequest, NextResponse } from "next/server";
import { mollieClient } from "@/lib/mollie";

export async function POST(req: NextRequest) {
  try {
    const { email, name, items, total, kautionTotal, subscriptionMonthlyTotal } = await req.json();

    if (!email || !items || items.length === 0) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const hasSubscriptions = items.some((i: any) => i.purchaseType === "subscription");
    const hasPreorder = items.some((i: any) => i.purchaseType === "preorder");
    
    let description = `Aquacubes order for ${name || email}`;
    if (hasSubscriptions) {
      description = `Aquacubes kaution + subscription for ${name || email}`;
    } else if (hasPreorder) {
      description = `Aquacubes pre-order kaution for ${name || email}`;
    }

    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: total.toFixed(2),
      },
      description,
      redirectUrl: `${baseUrl}/checkout/success?orderId=${Date.now()}`,
      cancelUrl: `${baseUrl}/checkout/cancel`,
      webhookUrl: `${baseUrl}/api/mollie/webhook`,
      metadata: {
        email,
        name,
        items: JSON.stringify(items),
        kautionTotal: kautionTotal?.toFixed(2) || "0",
        subscriptionMonthlyTotal: subscriptionMonthlyTotal?.toFixed(2) || "0",
        hasSubscriptions: hasSubscriptions ? "true" : "false",
        hasPreorder: hasPreorder ? "true" : "false",
      },
    });

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (error) {
    console.error("Mollie payment creation error:", error);
    return NextResponse.json(
      { error: "Failed to create payment" },
      { status: 500 }
    );
  }
}
