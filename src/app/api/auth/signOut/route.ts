import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const session = await auth.api.getSession({ headers: req.headers });

  if (session) {
    await auth.api.revokeSession({
      headers: new Headers(req.headers),
      body: {
        token: session.session.token,
      },
    });
  }

  const res = NextResponse.json({ message: "Signed out" });
  res.cookies.set("auth_session", "", {
    path: "/",
    maxAge: 0, // ❌ delete cookie
  });

  return res;
}
