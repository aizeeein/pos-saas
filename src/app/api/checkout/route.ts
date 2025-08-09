import { db } from "@/db/db";
import { auth } from "@/lib/auth";
import { orderItem, orders, product } from "@/schema";
import { eq, inArray, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

export const runtime = "nodejs";

const payloadSchema = z.object({
  items: z
    .array(
      z.object({
        id: z.string().min(1),
        quantity: z.coerce.number().int().min(1),
      })
    )
    .min(1),
});

export async function POST(req: Request) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user.id;

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //new

    const raw = await req.json().catch(() => ({}));
    const parsed = payloadSchema.safeParse(
      Array.isArray(raw) ? { items: raw } : raw
    );

    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid payload", details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const { items } = parsed.data;

    const ids = items.map((i) => i.id);
    const rows = await db
      .select({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.image,
      })
      .from(product)
      .where(inArray(product.id, ids));

    const byId = new Map(rows.map((r) => [r.id, r]));

    // validasi stock & produk

    for (const { id, quantity } of items) {
      const p = byId.get(id);
      if (!p) {
        return NextResponse.json(
          { error: `Produk tidak ditemukan: ${id}` },
          { status: 404 }
        );
      }
      if (quantity > p.stock) {
        return NextResponse.json(
          {
            error: `Quantity produk tidak cukup untuk ${p.name}. Sisa produk ${p.stock}, requested ${quantity}`,
            code: "INSUFFICIENT_STOCK",
            productId: id,
            available: p.stock,
          },
          { status: 409 }
        );
      }
    }

    // Hitung total
    const total = items.reduce((sum, { id, quantity }) => {
      const p = byId.get(id)!;
      return sum + p.price * quantity;
    }, 0);

    // Transaksi: buat orders + order_items + kurangi stok
    const created = await db.transaction(async (tx) => {
      const [ord] = await tx
        .insert(orders)
        .values({ userId, total })
        .returning({ id: orders.id });

      for (const { id, quantity } of items) {
        const p = byId.get(id)!;

        await tx.insert(orderItem).values({
          orderId: ord.id,
          productId: id,
          quantity,
          price: p.price,
        });

        await tx
          .update(product)
          .set({
            stock: sql`${product.stock} - ${quantity}`,
            updatedAt: sql`now()`,
          })
          .where(eq(product.id, id));
      }

      return ord;
    });
    return NextResponse.json(
      { success: "true", orderId: created.id, total },
      { status: 201 }
    );
  } catch (err) {
    console.error("[CHECKOUT_POST]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
