"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editProductSchemaType } from "../../types";
import axios from "axios";
import { toast } from "sonner";

export const useEditProduct = (productId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: editProductSchemaType) => {
      const res = await axios.patch(`/api/products/${productId}`, data);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Product berhasil di update");
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
    onError: () => {
      toast.error("Gagal mengupdate produk");
    },
  });
};
