"use client";

import { classNames } from "@/lib/class-name-generator";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavbarNavigationLink({
  name,
  href,
}: {
  name: string;
  href: string;
}) {
  const pathname = usePathname();

  return (
    <Link
      key={name}
      href={href}
      aria-current={href === pathname ? "page" : undefined}
      className={classNames(
        "flex items-center border-t-2 border-b-2 border-t-transparent",
        href === pathname
          ? "cursor-default border-b-indigo-500 text-white"
          : "border-b-transparent text-gray-400 transition-all ease-in-out hover:border-b-gray-600 hover:text-white",
      )}
      onClick={(event) => {
        if (href === pathname) event.preventDefault();
      }}
    >
      {name}
    </Link>
  );
}
