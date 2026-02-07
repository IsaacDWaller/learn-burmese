"use client";

import { classNames } from "@/lib/class-name-generator";
import { Menu } from "@base-ui/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function UserNavigationLink({
  name,
  href,
  index,
  numberOfNavigationLinks,
}: {
  name: string;
  href: string;
  index: number;
  numberOfNavigationLinks: number;
}) {
  const pathname = usePathname();

  return (
    <Link
      key={name}
      href={href}
      aria-current={href === pathname ? "page" : undefined}
    >
      <Menu.Item
        className={classNames(
          "w-48 border-x border-gray-700 px-4 py-2",
          href === pathname
            ? "cursor-default bg-gray-800 text-white"
            : "cursor-pointer bg-gray-900 text-gray-400 transition-all ease-in-out hover:bg-gray-800 hover:text-white",
          index <= 0 ? "rounded-t-md border-t" : "",
          index >= numberOfNavigationLinks - 1 ? "rounded-b-md border-b" : "",
        )}
        disabled={href === pathname}
      >
        {name}
      </Menu.Item>
    </Link>
  );
}
