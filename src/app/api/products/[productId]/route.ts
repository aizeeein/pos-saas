import { db } from "@/db/db";
import { auth } from "@/lib/auth";
import { product } from "@/schema";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const result = await db
      .delete(product)
      .where(eq(product.id, productId))
      .returning({ id: product.id });

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.log("[DELETE_PRODUCT]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ productId: string }> }
) {
  const { productId } = await params;
  if (!productId) {
    return NextResponse.json(
      { error: "Product ID is required" },
      { status: 400 }
    );
  }

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { name, price, stock, image } = body;

  if (!name || !price || !stock) {
    return NextResponse.json({ error: "Data is required" }, { status: 400 });
  }

  try {
    const result = await db
      .update(product)
      .set({ name, price, stock, image })
      .where(eq(product.id, productId))
      .returning({
        id: product.id,
        name: product.name,
        price: product.price,
        stock: product.stock,
        image: product.image,
      });

    const updated = result[0] ?? null;
    return NextResponse.json({ success: true, updated });
  } catch (error) {
    console.error("[PATCH_PRODUCT]", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
