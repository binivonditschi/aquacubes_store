import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { items, total } = await req.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const order = await prisma.order.create({
      data: {
        status: "pending",
        total,
        customerEmail: "",
        items: JSON.stringify(items),
      },
    });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["DE", "AT", "DK", "CN", "NO"],
      },
      line_items: items.map((item: { name: string; price: number; quantity: number }) => ({
        price_data: {
          currency: "eur",
          product_data: { name: item.name },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
        adjustable_quantity: { enabled: true, minimum: 1, maximum: 20 },
      })),
      success_url: `${baseUrl}/checkout/success?orderId=${order.id}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        orderId: order.id,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { stripeSessionId: session.id },
    });

    return NextResponse.json({ checkoutUrl: session.url });
  } catch (error) {
    console.error("Stripe checkout session creation error:", error);
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
  }
}
