import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await req.json();
  try {
    const product = await prisma.product.update({
      where: { id },
      data: {
        name: body.name,
        description: body.description,
        price: body.price,
        image: body.image,
        category: body.category,
        stock: body.stock,
        isVisible: body.isVisible,
      },
    });
    return NextResponse.json(product);
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    await prisma.product.delete({ where: { id } });
  } catch {
    return NextResponse.json({ error: "Product not found" }, { status: 404 });
  }

  const remaining = await prisma.product.findMany({ orderBy: { position: "asc" } });
  await Promise.all(
    remaining.map((p, i) => prisma.product.update({ where: { id: p.id }, data: { position: i } }))
  );

  return NextResponse.json({ success: true });
}
