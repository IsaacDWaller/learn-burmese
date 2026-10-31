"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";

export function NavLink({ href, ...props }: React.ComponentProps<typeof Link>) {
  const pathname = usePathname();

  return (
    <Link
      href={href}
      onClick={(event) => pathname === href && event.preventDefault()}
      {...props}
    />
  );
}
