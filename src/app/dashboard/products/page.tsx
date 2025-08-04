"use client";

import ProductCard from "@/app/dashboard/products/_components/product-card";
import CreateProductDialog from "./_components/create-product-dialog";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductsPage = () => {
  return (
    <div className="flex flex-1 flex-col h-full">
      <div className="flex items-center justify-between">
        <div>Product List</div>
        <CreateProductDialog />
      </div>
      <div className="h-full flex-1">
        <Suspense fallback={<UserProductSkeleton />}>
          <ProductCard />
        </Suspense>
      </div>
    </div>
  );
};

function UserProductSkeleton() {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4].map((i) => (
        <Skeleton key={i} className="h-32 w-full" />
      ))}
    </div>
  );
}

export default ProductsPage;
