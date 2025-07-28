"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import {
  createProductSchema,
  createProductSchemaType,
} from "../../../../../types";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/lib/api/products";
import { useRouter } from "next/navigation";
import ImageUpload from "./image-upload";
import { ProductForms } from "./product-form";

const CreateProductDialog = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loading, setIsLoading] = useState(false);

  const form = useForm<createProductSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      image: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: createProduct,
    onSuccess: () => {
      toast.success("Product berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error(`Gagal menambahkan produk`);
    },
  });

  const onSubmit = useCallback(
    (values: createProductSchemaType) => {
      toast.loading("Creating product...", { id: "create-product" });
      mutate(values, {
        onSettled: () => toast.dismiss("create-product"),
      });
      setOpen(!open);
    },
    [mutate, open]
  );

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(open) => {
          form.reset();
          setOpen(open);
        }}
      >
        <DialogTrigger asChild>
          <Button>Create Product</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle className="py-6 flex justify-center items-center font-bold text-2xl">
            Create New Product
          </DialogTitle>
          <ProductForms />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProductDialog;
