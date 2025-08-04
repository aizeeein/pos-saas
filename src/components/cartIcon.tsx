"use client";

import { RootState } from "@/store";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useSelector } from "react-redux";

export const CartIcon = () => {
  const count = Object.values(
    useSelector((state: RootState) => state.cart.items)
  ).reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Link href="/dashboard/cart" className="relative">
      <ShoppingCart className="suze-24" />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-600 text-white text-xs rounded-full px-1">
          {count}
        </span>
      )}
    </Link>
  );
};
