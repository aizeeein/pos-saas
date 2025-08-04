import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";

export const useDeleteProduct = (productId?: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`/api/products/${productId}`);
      return await response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Produk berhasil dihapus");
    },
    onError: () => {
      toast.error("Failed to delete product");
    },
  });

  return mutation;
};
