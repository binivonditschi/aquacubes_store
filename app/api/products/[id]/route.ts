import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products-store";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  products[index] = { ...products[index], ...body };
  return NextResponse.json(products[index]);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const index = products.findIndex((p) => p.id === id);
  if (index === -1) {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
  products.splice(index, 1);
  products.forEach((p, i) => (p.position = i));
  return NextResponse.json({ success: true });
}
