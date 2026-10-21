import { NextRequest, NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { DELIVERY_REGIONS, isRegion } from "@/lib/i18n";
import {
  PACKAGES,
  SPARES_KIT_PRICE,
  isPackageId,
  isSpecies,
  isTerm,
  termMonths,
  type LeasingConfig,
} from "@/lib/leasing";

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user?.email) {
      return NextResponse.json({ error: "Not signed in" }, { status: 401 });
    }

    const { pkg, term, species, region, sparesKit } = await req.json();
    if (!isPackageId(pkg) || !isTerm(term) || !isSpecies(species) || !isRegion(region)) {
      return NextResponse.json({ error: "Invalid configuration" }, { status: 400 });
    }
    if (!DELIVERY_REGIONS.includes(region)) {
      return NextResponse.json({ error: "Region not available for direct orders" }, { status: 400 });
    }

    const plan = PACKAGES[pkg];
    const config: LeasingConfig = {
      pkg,
      term,
      months: termMonths(pkg, term),
      species,
      region,
      sparesKit: sparesKit === true,
      monthlyRate: plan.monthlyRate,
      deposit: plan.deposit,
    };
    const productName = `Aquacube Model Pro · ${plan.name}`;

    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

    const order = await prisma.order.create({
      data: {
        status: "pending",
        total: plan.deposit,
        customerEmail: user.email,
        country: region,
        items: JSON.stringify([
          { id: pkg, name: `Kaution · ${productName}`, price: plan.deposit, quantity: 1, config },
        ]),
      },
    });

    const description = [
      `${config.months} Monate Leasing à €${plan.monthlyRate.toLocaleString("de-DE")}/Monat netto`,
      `Ziel-Spezies: ${species}`,
      config.sparesKit ? `Ersatzteilset (+ €${SPARES_KIT_PRICE.toLocaleString("de-DE")} einmalig, separat)` : null,
      "Kaution rückzahlbar bis zur finalen Auftragsbestätigung",
    ]
      .filter(Boolean)
      .join(" · ");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: user.email,
      client_reference_id: order.id,
      // Delivery goes to the installation country the customer confirmed.
      shipping_address_collection: {
        allowed_countries: [region as Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry],
      },
      line_items: [
        {
          price_data: {
            currency: "eur",
            product_data: { name: `Kaution · ${productName}`, description },
            unit_amount: plan.deposit * 100,
          },
          quantity: 1,
        },
      ],
      success_url: `${baseUrl}/danke?orderId=${order.id}`,
      cancel_url: `${baseUrl}/checkout/cancel`,
      metadata: {
        orderId: order.id,
        pkg,
        term,
        months: String(config.months),
        species,
        region,
        sparesKit: String(config.sparesKit),
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
