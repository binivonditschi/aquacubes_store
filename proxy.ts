import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";
import { prisma } from "@/lib/prisma";

export async function proxy(request: NextRequest) {
  let response = NextResponse.next();

  const { response: refreshedResponse, user } = await updateSession(request, response);
  response = refreshedResponse;

  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    if (!user) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    const profile = await prisma.profile.findUnique({ where: { id: user.id } });
    if (profile?.role !== "admin") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  if (pathname === "/checkout" && !user) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("next", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Vercel's production edge network sets this automatically per visitor.
  let country = request.headers.get("x-vercel-ip-country") || "";

  // Non-Vercel hosts never get that header, so fall back to a public geo-IP
  // lookup — but only outside local dev, so working locally isn't affected
  // by the developer's own location. Skip if already resolved this session.
  if (!country && process.env.NODE_ENV === "production" && !request.cookies.get("shipCountry")?.value) {
    try {
      const geoRes = await fetch("https://get.geojs.io/v1/ip/country.json", {
        signal: AbortSignal.timeout(2000),
      });
      if (geoRes.ok) {
        const data = await geoRes.json();
        country = data.country || "";
      }
    } catch {
      // Network hiccup or API down — fail open, no cookie set below.
    }
  }

  if (country) {
    response.cookies.set("shipCountry", country, {
      path: "/",
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
