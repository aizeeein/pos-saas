"use client";

import React, { useState } from "react";

import {
  HomeIcon,
  HouseIcon,
  Layers2Icon,
  MenuIcon,
  Package,
  SettingsIcon,
  ShoppingBagIcon,
  ShoppingCart,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { Button, buttonVariants } from "./ui/button";
import { usePathname } from "next/navigation";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import Logo from "./logo";
import { getActiveRoute } from "@/lib/utils";
import { SignOutButton } from "./sign-out";

const routes = [
  {
    href: "dashboard",
    label: "Home",
    icon: HomeIcon,
  },
  {
    href: "dashboard/products",
    label: "Products",
    icon: ShoppingCart,
  },
  {
    href: "dashboard/inventory",
    label: "Inventory",
    icon: Package,
  },
];

function DesktopSidebar() {
  const pathname = usePathname();

  const activeRoute = getActiveRoute(pathname, routes);

  return (
    <div className="hidden relative md:block min-w-[280px] max-w-[280px] h-screen overflow-hidden w-full bg-primary/5 dark:bg-secondary/30 dark:text-foreground text-muted-foreground border-r-4 border-separate">
      <div className="flex items-center justify-center gap-2 border-b-[1px] border-separate p-4">
        <Logo />
      </div>
      <div className="flex flex-col p-2 h-screen">
        <div className="flex flex-col flex-grow gap-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={`/${route.href}`}
              className={buttonVariants({
                variant:
                  activeRoute?.href === route.href
                    ? "sidebarActiveItem"
                    : "sidebarItem",
              })}
            >
              <route.icon size={20} />
              {route.label}
            </Link>
          ))}
        </div>
        <div className="mt-auto pt-4 border-t border-border">
          <SignOutButton />
        </div>
      </div>
    </div>
  );
}

export function MobileSidebar() {
  const [isOpen, setOpen] = useState(false);
  const pathname = usePathname();

  const activeRoute = getActiveRoute(pathname, routes)

  return (
    <div className="block border-separate bg-background md:hidden">
      <nav className="flex items-center justify-between px-8">
        <Sheet open={isOpen} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent
            className="w-[400px] sm:w-[540px] space-y-4"
            side={"left"}
          >
            <SheetTitle className="sr-only">Menu</SheetTitle>
            <Logo />
            <div className="flex flex-col gap-1">
              {routes.map((route) => (
                <Link
                  key={route.href}
                  href={`/${route.href}`}
                  className={buttonVariants({
                    variant:
                      activeRoute.href === route.href
                        ? "sidebarActiveItem"
                        : "sidebarItem",
                  })}
                  onClick={() => setOpen((prev) => !prev)}
                >
                  <route.icon size={20} />
                  {route.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </div>
  );
}

export default DesktopSidebar;
