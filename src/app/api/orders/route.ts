import { db } from "@/db/db";
import { auth } from "@/lib/auth";
import { orderItem, orders, product } from "@/schema";
import { desc, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { OrderItemView } from "../../../../types";

type Row = {
  orderId: string;
  productId: string;
  name: string | null;
  image: string | null;
  quantity: number;
  price: number;
};

export async function GET() {
  const session = await auth.api.getSession({ headers: await headers() });
  const userId = session?.user.id;

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
  const rows: Row[] = await db
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

  const itemsByOrder = new Map<string, OrderItemView[]>();
  for (const r of rows) {
    const arr = itemsByOrder.get(r.orderId) ?? [];
    arr.push({
      productId: r.productId,
      name: r.name,
      image: r.image,
      quantity: r.quantity,
      price: r.price,
      subtotal: r.price * r.quantity,
    });
    itemsByOrder.set(r.orderId, arr);
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
