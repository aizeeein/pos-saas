"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ProductType } from "./columns";
import { Button } from "@/components/ui/button";
import { Edit, MoreHorizontal, TrashIcon } from "lucide-react";
import { useState } from "react";
import { AlertModal } from "@/components/alert-modal";
import { toast } from "sonner";
import { useDeleteProduct } from "@/queries/useDeleteProduct";
import EditProductDialog from "../../products/_components/edit-product-dialog";

interface CellActionProps {
  data: ProductType;
}

export const CellAction = ({ data }: CellActionProps) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const deleteMutation = useDeleteProduct(data.id);

  const defaultValues = {
    name: data.name,
    price: data.price,
    stock: data.stock,
    image: data.image,
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await deleteMutation.mutateAsync();
      console.log("Product deleted:", data.id);
    } catch (error) {
      toast.error("Gagal menghapus produk");
    } finally {
      setIsLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <EditProductDialog
        open={editOpen}
        productId={data.id}
        setOpen={setEditOpen}
        defaultValues={defaultValues}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant={"ghost"}>
            <span className="sr-only">Open Menu</span>
            <MoreHorizontal className="size-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => setEditOpen(true)}>
            <Edit className="mr-2 size-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <TrashIcon className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
