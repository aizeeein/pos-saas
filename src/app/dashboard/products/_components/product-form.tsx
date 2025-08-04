"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { createProductSchema } from "../../../../../types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/queries/createProducts";
import { toast } from "sonner";
import { useCallback } from "react";
import { useNewProduct } from "@/hooks/products/use-new-products";

export type CreateProductSchema = z.infer<typeof createProductSchema>;

export const ProductForms = () => {
  const queryClient = useQueryClient();
  const newProduct = useNewProduct();
  const form = useForm<CreateProductSchema>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      toast.error("Failed to upload image");
    }

    const { url } = await res.json();
    console.log("image URL: ", url);
    form.setValue("image", url);
  };

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
    (values: CreateProductSchema) => {
      toast.loading("Creating product...", { id: "create-product" });
      mutate(values, {
        onSettled: () => toast.dismiss("create-product"),
      });
      newProduct.onClose();
    },
    [mutate, open]
  );

  return (
    <div className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="Enter stock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image</FormLabel>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {form.watch("image") && (
            <img
              src={form.watch("image")}
              alt="Preview"
              className="rounded-md object-cover w-32 h-32"
            />
          )}
          <Button type="submit">Create Product</Button>
        </form>
      </Form>
    </div>
  );
};
