import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({ orderBy: { position: "asc" } });
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const count = await prisma.product.count();
  const product = await prisma.product.create({
    data: {
      name: body.name,
      description: body.description,
      price: body.price,
      image: body.image,
      category: body.category,
      stock: body.stock ?? 0,
      isVisible: body.isVisible ?? true,
      position: count,
    },
  });
  return NextResponse.json(product, { status: 201 });
}
