"use client";

import { useGetProducts } from "@/queries/useGetAccounts";
import { LoaderCircle, MapPin, Shield, Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { formatCurrency } from "../lib/utils";

interface ProductProps {
  id: string;
  name: string;
  price: number;
  stock: number;
  image?: string;
}

const ProductCard = () => {
  const productQuery = useGetProducts();
  const products = productQuery.data || [];

  const isLoading = productQuery.isLoading;

  if (isLoading) {
    return (
      <div className="animate-spin flex h-full w-full justify-center items-center size-10">
        <LoaderCircle />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-4 md:grid-cols-2 lg:grid-cols-6 gap-6">
      {products.map((product: ProductProps) => (
        <Card
          key={product.id}
          className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 shadow-sm"
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
              <h3 className="text-3xl font-medium text-gray-800 line-clamp-2 mb-2 group-hover:text-green-600 transition-colors">
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
                <span className="text-xs text-gray-600">(4.8)</span>
                <span className="text-xs text-gray-400">•</span>
                <span className="text-xs text-gray-600">250+ terjual</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductCard;
