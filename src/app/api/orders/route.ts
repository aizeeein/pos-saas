import { db } from "@/db/db";
import { auth } from "@/lib/auth";
import { orderItem, orders, product } from "@/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = (session as any)?.user?.id ?? (session as any)?.userId;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userOrders = await db
    .select()
    .from(orders)
    .where(eq(orders.userId, userId))
    .orderBy(desc(orders.createdAt));

  if (userOrders.length === 0) {
    return NextResponse.json([]);
  }

  const orderIds = userOrders.map((o) => o.id);

  // Ambil item+produk sekali jalan, lalu kelompokkan
  const itemRows = await db
    .select({
      orderId: orderItem.orderId,
      productId: orderItem.productId,
      quantity: orderItem.quantity,
      price: orderItem.price,
      name: product.name,
      image: product.image,
    })
    .from(orderItem)
    .leftJoin(product, eq(orderItem.productId, product.id))
    .where(inArray(orderItem.orderId, orderIds));

  const itemsByOrder = new Map<string, any[]>();
  for (const row of itemRows) {
    const list = itemsByOrder.get(row.orderId) ?? [];
    list.push({
      productId: row.productId,
      quantity: row.quantity,
      price: row.price,
      product: {
        id: row.productId,
        name: row.name,
        image: row.image,
      },
    });
    itemsByOrder.set(row.orderId, list);
  }

  const result = userOrders.map((o) => ({
    id: o.id,
    userId: o.userId,
    total: o.total,
    createdAt: o.createdAt,
    items: itemsByOrder.get(o.id) ?? [],
  }));

  return NextResponse.json(result);
}