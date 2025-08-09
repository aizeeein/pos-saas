import { z } from "zod";

export const createProductSchema = z.object({
  name: z.string().min(1),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  image: z.string().optional(),
});

export type createProductSchemaType = z.infer<typeof createProductSchema>;

export const editProductSchema = z.object({
  name: z.string().min(0),
  price: z.coerce.number().min(0),
  stock: z.coerce.number().min(0),
  image: z.string().optional(),
})

export type editProductSchemaType = z.infer<typeof editProductSchema>;

export type OrderItemView = {
  productId: string;
  quantity: number;
  price: number;            // harga saat transaksi
  name: string | null;
  image: string | null;
  subtotal: number;         // price * quantity
};