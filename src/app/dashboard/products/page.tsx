'use client'

import ProductCard from "@/components/product-card";
import CreateProductDialog from "./_components/create-product-dialog";
import { Button } from "@/components/ui/button";
import { useNewProduct } from "@/hooks/products/use-new-products";

const ProductsPage = () => {
  const newProduct = useNewProduct()
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center justify-between">
        <div>Product List</div>
        <CreateProductDialog />
        <Button onClick={newProduct.onOpen} size={"sm"}>
          Open Sheet
        </Button>
      </div>
      <ProductCard />
    </div>
  );
};

export default ProductsPage;
