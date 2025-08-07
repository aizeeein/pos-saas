import { db } from "@/db/db";
import { auth } from "@/lib/auth";
import { getCurrentUser } from "@/lib/auth/get-current-user";
import { product } from "@/schema";
import { asc, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session?.user.id;
    const body = await req.json();

    const { name, price, stock, image } = body;
    if (!name || !price || !stock) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const inserted = await db
      .insert(product)
      .values({
        name,
        price,
        stock,
        image,
        userId,
      })
      .returning();
    return NextResponse.json({ product: inserted[0] }, { status: 201 });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  } finally {
    revalidatePath("/dashboard/products");
  }
}

export async function GET() {
  try {
    const user = await getCurrentUser();
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const products = await db
      .select()
      .from(product)
      .where(eq(product.userId, user.id))
      .orderBy(asc(product.name));

    return NextResponse.json(products, { status: 200 });
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
    } else {
      console.error(err);
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
