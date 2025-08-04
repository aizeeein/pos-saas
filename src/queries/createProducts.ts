export const createProduct = async (data: {
  name: string;
  price: number;
  stock: number;
  image?: string;
}) => {
  const res = await fetch("/api/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include credentials for session management
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("Failed to create product");
  return res.json(); // optional, bisa return response data dari server
};
