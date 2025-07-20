"use client";

import { useMountedState } from "react-use";

import { NewProductSheet } from "../dashboard/products/_components/create-product-sheet";
import { useEffect, useState } from "react";

export const SheetProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

useEffect(() => {
  setIsMounted(true);
}, []);

if (!isMounted) return null;
  return (
    <>
      <NewProductSheet />
    </>
  );
};
