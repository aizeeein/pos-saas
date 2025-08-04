"use client";

import { formatCurrency } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns"
import { CellAction } from "./cell-action";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type ProductType = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
  createdAt: Date;
  updatedAt: Date;
};

export const columns: ColumnDef<ProductType>[] = [
  {
    accessorKey: "no",
    header: "No",
    cell: ({ row }) => row.index + 1,
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "price",
    header: "Price",
    cell: ({ row }) => {
        const price: number = row.getValue("price");
        return formatCurrency(price)
    }
  },
  {
    accessorKey: "stock",
    header: "Stock",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ row }) => {
        const date: Date = row.getValue("createdAt");
        return format(date, "dd/MM/yyyy HH:mm:ss")
    }
  },
  {
    id: "actions",
    cell: ({row}) => <CellAction data={row.original} />
  },
];
