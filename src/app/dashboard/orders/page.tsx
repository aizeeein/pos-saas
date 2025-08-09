import { QueryClient } from "@tanstack/react-query";
import OrdersList from "./_components/orders-list";
import { fetchOrders, ordersKeys } from "@/queries/orders/getOrders";

export default async function OrdersPage() {
  const qc = new QueryClient();
  await qc.prefetchQuery({
    queryKey: [ordersKeys.all],
    queryFn: fetchOrders,
  });

  return <OrdersList />;
}
