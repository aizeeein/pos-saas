import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getActiveRoute(pathname: string, routes: { href: string }[]) {
  const sortedRoutes = [...routes].sort(
    (a, b) => b.href.length - a.href.length
  );

  return (
    sortedRoutes.find((route) => pathname.startsWith(`/${route.href}`)) ||
    routes[0]
  );
}

export function formatCurrency(value: number) {
  return Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(value);
}