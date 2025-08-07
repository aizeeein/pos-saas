"use client";

import { DataTable } from "@/components/ui/data-table";
import { useGetProducts } from "@/queries/useGetProducts";
import { SyncLoader } from "react-spinners";
import { columns } from "./columns";
import CreateProductDialog from "../../products/_components/create-product-dialog";

const InventoryClient = () => {
  const { data = [], isLoading } = useGetProducts();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <SyncLoader color="#000000" size={25} />
      </div>
    );
  }
  return (
    <div>
      <div className="pb-4 flex justify-between">
        <h1>Product Inventory</h1>
        <CreateProductDialog />
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default InventoryClient;
