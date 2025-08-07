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
import { createProduct } from "@/queries/createProducts";
import { BarLoader } from "react-spinners";

const CreateProductDialog = () => {
  const [isUploading, setIsUploading] = useState(false);
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false);

  const form = useForm<createProductSchemaType>({
    resolver: zodResolver(createProductSchema),
    defaultValues: {
      name: "",
      price: 0,
      stock: 0,
      image: "",
    },
  });

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload-image", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      toast.error("Failed to upload image");
      setIsUploading(false);
      return;
    }

    const { url } = await res.json();
    console.log("image URL: ", url);
    form.setValue("image", url);
    setIsUploading(false);
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
          <div className="p-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
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
                        <Input
                          type="number"
                          placeholder="Enter price"
                          {...field}
                        />
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
                        <Input
                          type="number"
                          placeholder="Enter stock"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <FormLabel>Image</FormLabel>
                      <FormControl>
                        <div>
                          <Input
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            disabled={isUploading || isPending}
                          />
                          {isUploading && (
                            <div className="flex justify-center items-center mt-2 p-4">
                              <BarLoader color="#0040ff" height={7} />
                            </div>
                          )}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {form.watch("image") && (
                  <div className="relative flex justify-center items-center w-32 h-32 mx-auto">
                    <img
                      src={form.watch("image")}
                      alt="Preview"
                      className="rounded-md object-cover object-center w-full h-full"
                    />
                    <Button
                      onClick={() => form.setValue("image", "")}
                      type="button"
                      className="absolute top-0 right-0 bg-white/70 hover:bg-white/100 text-red-600 rounded-full p-2 m-2"
                    >
                      X
                    </Button>
                  </div>
                )}
                <Button
                  className="w-full"
                  disabled={isPending || isUploading}
                  type="submit"
                >
                  Create Product
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CreateProductDialog;
