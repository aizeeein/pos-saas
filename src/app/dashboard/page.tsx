import ProductCard from "@/components/product-card";
import { SignOutButton } from "@/components/sign-out";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return <div>Unauthenticated</div>;
  }

  return (
    <div className="p-4">
      <div>
        Hello World
      </div>
    </div>
  );
}
