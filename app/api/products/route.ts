import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products-store";

export async function GET() {
  return NextResponse.json(products.sort((a, b) => a.position - b.position));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...body,
    position: products.length,
    isVisible: body.isVisible ?? true,
  };
  products.push(newProduct);
  return NextResponse.json(newProduct, { status: 201 });
}
