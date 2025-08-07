import { db } from "@/db/db";
import { product } from "@/schema";
import { eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const items: { id: string; quantity: number }[] = await req.json();

  for (const { id, quantity } of items) {
    const [row] = await db
      .select({ stock: product.stock })
      .from(product)
      .where(eq(product.id, id));

    if (!row) {
      return NextResponse.json(
        { error: `Product with id=${id} not found` },
        { status: 404 }
      );
    }
    if (quantity > row.stock) {
      return NextResponse.json(
        {
          error: `Insufficient stock for product ${id}. Available: ${row.stock}`,
        },
        { status: 400 }
      );
    }
  }

  await Promise.all(
    items.map(({ id, quantity }) =>
      db
        .update(product)
        .set({ stock: sql`${product.stock} - ${quantity}` })
        .where(eq(product.id, id))
    )
  );

  return NextResponse.json({ success: true });
}
