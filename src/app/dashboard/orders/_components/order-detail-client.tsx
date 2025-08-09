"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatCurrency } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import { id as idLocale } from "date-fns/locale"

type OrderItem = {
  productId: string;
  quantity: number;
  price: number;
  name: string | null;
  image: string | null;
  subtotal: number;
};

type OrderDetail = {
  id: string;
  total: number;
  createdAt: string | Date | null;
  items: OrderItem[];
};

async function fetchOrder(orderId: string): Promise<OrderDetail> {
  const res = await fetch(`/api/orders/${orderId}`, {
    credentials: "include",
    cache: "no-store",
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body?.error || "Failed to fetch order");
  }
  const { data } = await res.json();
  return data;
}

export default function OrderDetailClient({ orderId }: { orderId: string }) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["order", orderId],
    queryFn: () => fetchOrder(orderId),
  });
  if (isLoading) {
    return (
      <div className="space-y-4">
        <Skeleton className="h-10 w-64" />
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="border-0 shadow-sm">
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-16 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="space-y-4">
        <p>Gagal memuat order.</p>
        <Button>
          <Link href={"/dashboard/products"}>Kembali</Link>
        </Button>
      </div>
    );
  }

  const created = data.createdAt ? format(new Date(data.createdAt), "dd MMM yyyy, HH:mm", {locale: idLocale}) : "-";

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Order #{data.id.slice(0, 8)}</h1>
          <p className="text-sm text-muted-foreground">Tanggal: {created}</p>
        </div>
        <Button asChild variant="outline">
          <Link href="/dashboard/products">Kembali ke Produk</Link>
        </Button>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        {/* Items */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardContent className="p-0">
            {data.items.length === 0 ? (
              <div className="p-6 text-sm text-muted-foreground">Tidak ada item.</div>
            ) : (
              <ul className="divide-y">
                {data.items.map((item) => (
                  <li key={item.productId} className="p-4 flex items-center gap-4">
                    <div className="relative w-16 h-16 rounded overflow-hidden bg-muted">
                      {item.image ? (
                        <Image
                          src={item.image}
                          alt={item.name ?? "Product"}
                          fill
                          className="object-cover"
                        />
                      ) : null}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium truncate">{item.name ?? "Produk"}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.quantity} × {formatCurrency(item.price)}
                      </p>
                    </div>
                    <div className="font-semibold">{formatCurrency(item.subtotal)}</div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>

        {/* Summary */}
        <Card className="border-0 shadow-sm">
          <CardContent className="p-6 space-y-3">
            <h2 className="text-lg font-semibold">Ringkasan</h2>
            <div className="flex justify-between text-sm">
              <span>Subtotal</span>
              <span>{formatCurrency(data.total)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Ongkir</span>
              <span>{formatCurrency(0)}</span>
            </div>
            <div className="border-t pt-3 flex justify-between text-base font-bold">
              <span>Total</span>
              <span>{formatCurrency(data.total)}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
