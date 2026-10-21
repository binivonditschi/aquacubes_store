import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
import { DELIVERY_REGIONS, isRegion } from "@/lib/i18n";
import {
  PACKAGES,
  STRIPE_PAYMENT_LINKS,
  isPackageId,
  isSpecies,
  isTerm,
  termMonths,
  type LeasingConfig,
} from "@/lib/leasing";

/**
 * Records the reservation, then hands back the package's Stripe Payment Link.
 * The order id travels as client_reference_id so the webhook can mark it paid.
 */
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

    const order = await prisma.order.create({
      data: {
        status: "pending",
        total: plan.deposit,
        customerEmail: user.email,
        country: region,
        items: JSON.stringify([
          { id: pkg, name: `Kaution · Aquacube Model Pro · ${plan.name}`, price: plan.deposit, quantity: 1, config },
        ]),
      },
    });

    const paymentUrl = new URL(STRIPE_PAYMENT_LINKS[pkg]);
    paymentUrl.searchParams.set("client_reference_id", order.id);
    paymentUrl.searchParams.set("prefilled_email", user.email);

    return NextResponse.json({ paymentUrl: paymentUrl.toString(), orderId: order.id });
  } catch (error) {
    console.error("Leasing reservation error:", error);
    return NextResponse.json({ error: "Failed to create reservation" }, { status: 500 });
  }
}
