import { SignOutButton } from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    <div>Unauthenticated</div>;
  }

  return (
    <div>
      {session ? (
        <div>
          <p>Hello {session.user.id}</p>
          <SignOutButton />
          <Button>
            <Link href={"/dashboard"}>Go To Dashboard</Link>
          </Button>
        </div>
      ) : (
        <Button>
          <Link href={"/login"}>Go to login</Link>
        </Button>
      )}
    </div>
  );
}
