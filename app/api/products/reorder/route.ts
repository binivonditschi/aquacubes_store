import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { orderedIds } = await req.json();

  await Promise.all(
    orderedIds.map((id: string, index: number) =>
      prisma.product.update({ where: { id }, data: { position: index } })
    )
  );

  return NextResponse.json({ success: true });
}
