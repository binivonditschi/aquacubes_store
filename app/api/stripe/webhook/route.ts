import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const signature = req.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    return NextResponse.json({ error: "Missing signature or webhook secret" }, { status: 400 });
  }

  const body = await req.text();

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (error) {
    console.error("Stripe webhook signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  try {
    if (event.type === "checkout.session.completed" || event.type === "checkout.session.async_payment_succeeded") {
      const session = event.data.object as Stripe.Checkout.Session;
      const email = session.customer_details?.email;
      const country =
        session.collected_information?.shipping_details?.address?.country ??
        session.customer_details?.address?.country;
      const paidData = {
        status: "paid",
        ...(email ? { customerEmail: email } : {}),
        ...(country ? { country } : {}),
      };
      const updated = await prisma.order.updateMany({
        where: { stripeSessionId: session.id },
        data: paidData,
      });
      // Payment Link checkouts aren't created by us, so match them by the order id
      // we passed along as client_reference_id.
      if (updated.count === 0 && session.client_reference_id) {
        await prisma.order.updateMany({
          where: { id: session.client_reference_id },
          data: { ...paidData, stripeSessionId: session.id },
        });
      }
    } else if (event.type === "checkout.session.async_payment_failed" || event.type === "checkout.session.expired") {
      const session = event.data.object as { id: string };
      await prisma.order.updateMany({
        where: { stripeSessionId: session.id },
        data: { status: "failed" },
      });
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Stripe webhook handling error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}
