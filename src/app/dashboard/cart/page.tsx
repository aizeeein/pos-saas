"use client";

import { AppDispatch, RootState } from "@/store";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";

export default function CartPage() {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const items = Object.values(cartItems);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const handleCheckout = () => {
    router.push("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Keranjang Belanja</h1>
        <p>Keranjang anda kosong</p>
      </div>
    );
  }
  return (
    <div>

    </div>
  )
}

