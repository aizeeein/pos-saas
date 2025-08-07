"use client";

import { useGetProducts } from "@/queries/useGetProducts";
import { Shield, Star } from "lucide-react";
import { Card, CardContent } from "../../../../components/ui/card";
import Image from "next/image";
import { formatCurrency } from "../../../../lib/utils";
import { SyncLoader } from "react-spinners";

import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store";
import { Button } from "@/components/ui/button";
import { addToCart, decrementQty } from "@/store/cartSlice";
import { useRouter } from "next/navigation";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
}

const ProductCard = () => {
  const { data: products = [], isLoading } = useGetProducts();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const router = useRouter();

  // Hitung total item, qty, dan total harga
  const itemsArray = Object.values(cartItems);
  const totalItems = itemsArray.length;
  const totalQty = itemsArray.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = itemsArray.reduce(
    (sum, i) => sum + i.quantity * i.price,
    0
  );

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SyncLoader color="#000000" size={25} />
      </div>
    );
  }
  return (
    <>
      <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(200px,1fr))]">
        {products.map((product: ProductProps) => {
          const inCart = cartItems[product.id];

          return (
            <Card
              key={product.id}
              className="cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
            >
              <CardContent className="p-0">
                <div className="relative w-full h-48 overflow-hidden">
                  <Image
                    src={product.image || ""}
                    alt="url"
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-1">
                    <Shield className="w-4 h-4 text-green-600" />
                  </div>
                </div>

                <div className="p-3">
                  <h3 className="text-3xl font-medium text-gray-800 line-clamp-2 mb-2 hover:text-green-600 transition-colors">
                    {product.name}
                  </h3>

                  <div className="mb-2">
                    <div className="flex items-center gap-1 mb-1">
                      <span className="text-lg font-bold text-gray-900">
                        {formatCurrency(product.price)}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-2">
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`w-3 h-3 ${
                            star <= 4
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-xs text-gray-600">250+ terjual</span>
                  </div>
                  <span className="text-xs text-gray-600">
                    Sisa stock {product.stock}
                  </span>
                </div>
              </CardContent>
              <div className="p-3 border-t">
                {inCart ? (
                  <div className="flex items-center justify-center space-x-2">
                    <Button
                      size={"sm"}
                      variant={"outline"}
                      onClick={() => dispatch(decrementQty(product.id))}
                    >
                      -
                    </Button>
                    <span>{inCart.quantity}</span>
                    <Button
                      disabled={inCart.quantity === product.stock}
                      size={"sm"}
                      variant={"outline"}
                      onClick={() =>
                        dispatch(
                          addToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                          })
                        )
                      }
                    >
                      +
                    </Button>
                  </div>
                ) : product.stock > 0 ? (
                  <Button
                    className="w-full"
                    onClick={() =>
                      dispatch(
                        addToCart({
                          id: product.id,
                          name: product.name,
                          price: product.price,
                          image: product.image,
                        })
                      )
                    }
                  >
                    Add to Cart
                  </Button>
                ) : (
                  <div>
                    <Button className="w-full" variant="destructive" disabled>
                      Out of stock
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>      
    </>
  );
};

export default ProductCard;
