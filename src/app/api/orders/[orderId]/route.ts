import { db } from "@/db/db";
import { auth } from "@/lib/auth";
import { orderItem, orders, product } from "@/schema";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const userId = session?.user.id;
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!orderId) {
      return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
    }

    // Ambil order hanya milik user saat ini
    const [ord] = await db
      .select({
        id: orders.id,
        userId: orders.userId,
        total: orders.total,
        createdAt: orders.createdAt,
      })
      .from(orders)
      .where(and(eq(orders.id, orderId), eq(orders.userId, userId)));

    if (!ord) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Ambil item + info produk

    const items = await db
      .select({
        productId: orderItem.productId,
        quantity: orderItem.quantity,
        price: orderItem.price,
        name: product.name,
        image: product.image,
      })
      .from(orderItem)
      .leftJoin(product, eq(orderItem.productId, product.id))
      .where(eq(orderItem.orderId, orderId));

    const data = {
      id: ord.id,
      total: ord.total,
      createdAt: ord.createdAt,
      items: items.map((i) => ({
        ...i,
        subtotal: i.price * i.quantity,
      })),
    };
    return NextResponse.json({ data });
  } catch (err) {
    console.error("[ORDER_DETAIL_GET]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
