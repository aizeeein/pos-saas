import LoginForm from "@/components/login-form"
import { auth } from "@/lib/auth"
import { GalleryVerticalEnd } from "lucide-react"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function LoginPage() {
  const session = await auth.api.getSession({
    headers: await headers()
  })
  if (session && session.user) {
    redirect("/dashboard")
  }
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex flex-row gap-2 font-bold">
        <GalleryVerticalEnd />
        <p>ZeinPlay</p>
      </div>
      <LoginForm />
    </div>
  )
}
