import { NextRequest, NextResponse } from "next/server";
import { products } from "@/lib/products-store";

export async function POST(req: NextRequest) {
  const { orderedIds } = await req.json();
  
  orderedIds.forEach((id: string, index: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      product.position = index;
    }
  });

  return NextResponse.json({ success: true });
}
