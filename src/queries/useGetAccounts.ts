import { useQuery } from "@tanstack/react-query";

// src/queries/useGetProducts.ts
export const useGetProducts = () => {
  const query = useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await fetch("/api/products");

      if (!response.ok) throw new Error("Failed to fetch products");

      

      const data = await response.json();
      return data;
    },
  });

  return query
};
