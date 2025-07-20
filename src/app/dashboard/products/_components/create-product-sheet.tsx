'use client'

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useForm } from "react-hook-form";
import {
  createProductSchema,
  createProductSchemaType,
} from "../../../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNewProduct } from "@/hooks/products/use-new-products";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/api/products";
import { toast } from "sonner";
import { ProductForms } from "./product-form";

export const NewProductSheet = () => {
  const { isOpen, onClose } = useNewProduct();

  console.log("isOpen from zustand: ", isOpen)

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>New Product</SheetTitle>
          <SheetDescription>Create new product</SheetDescription>
        </SheetHeader>
        <ProductForms />
      </SheetContent>
    </Sheet>
  );
};
