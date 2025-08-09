"use client";

import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency } from "@/lib/utils";
import { fetchOrders } from "@/queries/orders/getOrders";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import Link from "next/link";

export default function OrdersList() {
  const { data: orders = [], isLoading } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) return <div>Loading...</div>;
  if (orders.length === 0) return <p>Belum ada history pesanan</p>;

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Riwayat Pesanan</h1>
      <div className="grid gap-4">
        {orders.map((o) => (
          <Card key={o.id} className="hover:shadow-lg">
            <CardContent className="flex justify-between items-center">
              <div>
                <p className="font-semibold">Order #{o.id}</p>
                <p className="text-sm text-gray-600">
                  {format(new Date(o.createdAt), "dd/MM/yyyy HH:mm")}
                </p>
                <p className="text-sm">{o.items.length} item</p>
              </div>
              <div className="text-right">
                <p className="font-bold">{formatCurrency(o.total)}</p>
                <Link
                  href={`/dashboard/orders/${o.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  View Details →
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
