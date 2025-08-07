"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Logo({
  fontSize = "2xl",
}: // iconSize = 20,
{
  fontSize?: string;
  iconSize?: number;
}) {
  return (
    <Link
      href="/"
      className={cn("text-2xl font-extrabold flex items-center", fontSize)}
    >
      <Image
        src="/KOMIDA-02.svg"
        alt="logo"
        className="size-12 bg-transparent"
        width={2}
        height={4}
      />

      <div>
        <span className="bg-gradient-to-r from-emerald-500 to bg-emerald-600 bg-clip-text text-transparent">
          KSP
        </span>
        <span className="text-stone-700 dark:text-stone-300">MitraDhuafa</span>
      </div>
    </Link>
  );
}

export default Logo;
