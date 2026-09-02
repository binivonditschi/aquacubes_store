import { NextRequest, NextResponse } from "next/server";
import { mollieClient } from "@/lib/mollie";
import { prisma } from "@/lib/prisma";

const ALLOWED_COUNTRIES = ["DE", "AT"];

export async function POST(req: NextRequest) {
  try {
    const { email, name, country, items, total } = await req.json();

    if (!email || !items || items.length === 0) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!ALLOWED_COUNTRIES.includes(country)) {
      return NextResponse.json({ error: "We currently only ship to Germany and Austria." }, { status: 400 });
    }

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const order = await prisma.order.create({
      data: {
        status: "pending",
        total,
        customerEmail: email,
        country,
        items: JSON.stringify(items),
      },
    });

    const payment = await mollieClient.payments.create({
      amount: {
        currency: "EUR",
        value: total.toFixed(2),
      },
      description: `Aquacubes order for ${name || email}`,
      redirectUrl: `${baseUrl}/checkout/success?orderId=${order.id}`,
      cancelUrl: `${baseUrl}/checkout/cancel`,
      webhookUrl: `${baseUrl}/api/mollie/webhook`,
      metadata: {
        orderId: order.id,
        email,
        name,
        country,
      },
    });

    await prisma.order.update({
      where: { id: order.id },
      data: { mollieId: payment.id },
    });

    return NextResponse.json({ checkoutUrl: payment.getCheckoutUrl() });
  } catch (error) {
    console.error("Mollie payment creation error:", error);
    return NextResponse.json({ error: "Failed to create payment" }, { status: 500 });
  }
}
