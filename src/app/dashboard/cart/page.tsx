"use client";

import { Button } from "@/components/ui/button";
import { formatCurrency } from "@/lib/utils";
import { AppDispatch, RootState } from "@/store";
import { addToCart, decrementQty, removeFromCart } from "@/store/cartSlice";
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
    router.push("/dashboard/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">Cart</h1>
        <p>Your cart is empty</p>
      </div>
    );
  }
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between border-b pb-2"
          >
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-sm text-gray-600">
                {formatCurrency(item.price)} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => dispatch(decrementQty(item.id))}
              >
                -
              </Button>
              <span>{item.quantity}</span>
              <Button
                size="sm"
                variant="outline"
                onClick={() =>
                  dispatch(
                    addToCart({
                      id: item.id,
                      name: item.name,
                      price: item.price,
                      image: item.image,
                    })
                  )
                }
              >
                +
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => dispatch(removeFromCart(item.id))}
              >
                Hapus
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 flex justify-between items-center">
        <p className="text-xl font-semibold">Total: {formatCurrency(total)}</p>
        <Button onClick={handleCheckout}>Checkout</Button>
      </div>
    </div>
  );
}
