"use client";

import { AppDispatch, RootState } from "@/store";
import {
  addToCart,
  clearCart,
  decrementQty,
  removeFromCart,
} from "@/store/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CartDialog() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) =>
    Object.values(state.cart.items)
  );

  const totalItems = cartItems.length;
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.quantity * item.price,
    0
  );

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      dispatch(removeFromCart(id));
    } else {
      const item = cartItems.find((i) => i.id === id);
      if (!item) return;
      const diff = quantity - item.quantity;
      if (diff > 0) {
        dispatch(
          addToCart({
            id: item.id,
            name: item.name,
            price: item.price,
            image: item.image,
          })
        );
      } else {
        dispatch(decrementQty(id));
      }
    }
  };

  const onCheckout = () => {
    setOpen(false);
    router.push("/dashboard/checkout");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => setOpen(open)}>
      <DialogTrigger asChild>
        <Button variant={"outline"} className="relative">
          <ShoppingCart className="mr-2 h-4 w-4" />
          Cart
          {totalQuantity > 0 && (
            <Badge className="absolute -top-2">{totalQuantity}</Badge>
          )}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping Cart
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div className="grid grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
            <div className="text-center">
              <div className="text-2xl font-bold">{totalItems}</div>
              <div className="text-sm text-muted-foreground">Products</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">{totalQuantity}</div>
              <div className="text-sm text-muted-foreground">Quantity</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {formatCurrency(totalPrice)}
              </div>
              <div className="text-sm text-muted-foreground">Total</div>
            </div>
          </div>
          <div className="space-y-3 max-h-64 overflow-y-auto">
            {cartItems.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Your cart is empty
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-3 p-3 bg-card rounded-lg border"
                >
                  {item.image && (
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={48}
                      height={48}
                      className="object-cover rounded"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(item.price)} each
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="h-8 w-8 p-0"
                    >
                      <Plus className="h-3 w-3" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                      className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="space-y-2">
              <Button
                className="w-full bg-primary hover:bg-primary/90"
                onClick={onCheckout}
              >
                Checkout - {formatCurrency(totalPrice)}
              </Button>
              <Button
                variant="outline"
                onClick={() => dispatch(clearCart())}
                className="w-full"
              >
                Clear Cart
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
