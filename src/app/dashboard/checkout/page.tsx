"use client";

import { AlertModal } from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { clearCart } from "@/store/cartSlice";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

export default function CheckoutPage() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const queryClient = useQueryClient();
  const dispatch = useDispatch<AppDispatch>();

  const items = Object.values(
    useSelector((state: RootState) => state.cart.items)
  );
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    setIsProcessing(true);

    // Update database
    try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: items.map((i) => ({id: i.id, quantity: i.quantity})),
      }),
    })
    
    const data = await res.json().catch(() => null)

    if (!res.ok) {
      if (res.status === 409 && data?.code === "INSUFFICIENT_STOCK") {
        toast.error(
          `Stok ${data?.productId ?? ""} tidak cukup. Tersedia: ${data?.available ?? 0}`
        );
      } else {
        toast.error(data?.error ?? "Failed to place order");
      }
      return;      
    }

    queryClient.invalidateQueries({ queryKey: ["products"] });
    // Kosongkan keranjang
    
    dispatch(clearCart());
    toast.success("Pesanan berhasil dibuat!");
    router.push("/dashboard/products");
  } catch {
    toast.error("Network error")
  } finally {
    setIsProcessing(false)
    setOpen(false)
  }
}

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={handlePlaceOrder}
        loading={isProcessing}
        title="Pastikan pesananmu sudah sesuai ya!"
        description="Jika sudah sesuai silahkan menekan tombol continue"
        isCheckout={true}
      />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>
        {items.length === 0 ? (
          <p>Keranjang kosong</p>
        ) : (
          <>
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <span>
                    {item.name} ({item.quantity} x {formatCurrency(item.price)})
                  </span>
                  <span>{formatCurrency(item.price * item.quantity)}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 flex justify-between items-center">
              <p>Total Bayar: {formatCurrency(total)}</p>
              <Button disabled={isProcessing} onClick={() => setOpen(true)}>
                {isProcessing ? "Memproses..." : "Place Order"}
              </Button>
            </div>
          </>
        )}
      </div>
    </>
  );
}
